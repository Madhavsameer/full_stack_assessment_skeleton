import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setRefresh } from "../redux/homeSlice";
import { baseUrl } from "../constants/baseUrl";

const useEditUsers = (homeId, onClose) => {
  const availableUsers = useSelector((store) => store.users.users);
  const [initialUsers, setInitialUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/user/find-by-home/${homeId}`
        );
        setInitialUsers(response?.data?.data.users || []); // Set initial users
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch initial users.");
        setLoading(false);
      }
    };

    if (homeId) {
      fetchInitialUsers();
    }
  }, [homeId]);

  useEffect(() => {
    if (initialUsers.length > 0) {
      setSelectedUsers(new Set(initialUsers.map((user) => user.id)));
    }
  }, [initialUsers]);


  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = new Set(prevSelectedUsers);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return newSelectedUsers;
    });
  };


  const handleSave = async () => {
    try {
      await axios.put(
        `${baseUrl}/home/update-users/${homeId}`,
        {
          userIds: Array.from(selectedUsers),
        }
      );
    } catch (error) {
      console.error("Error updating users:", err);
      setError(err.message || "Failed to update users.");
    }
  };

  const handleSaveAndClose = async () => {
    await handleSave();
    onClose();
    dispatch(setRefresh(true));
  };

  return {
    availableUsers,
    selectedUsers,
    loading,
    error,
    handleCheckboxChange,
    handleSave,
    handleSaveAndClose
  };
};

export default useEditUsers;
