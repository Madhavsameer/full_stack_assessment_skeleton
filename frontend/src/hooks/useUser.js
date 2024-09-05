import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSelectedUserId } from "../redux/usersSlice";
import { setCurrentPage } from "../redux/paginationSlice";
import { baseUrl } from "../constants/baseUrl";

const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.users.users);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          `${baseUrl}/user/find-all/`
        );
        dispatch(setUsers(response?.data?.data)); 
      } catch (err) {
        setError(err);
      } finally {
       setLoading(false); 
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    const selectedUsername = event.target.value;
    const selectedUser = userData?.find(
      (user) => user.username === selectedUsername
    );
    if (selectedUser) {
      dispatch(setSelectedUserId(selectedUser.id)); 
      dispatch(setCurrentPage(1));
    }
  };

  return { error, loading, handleChange, userData };
};

export default useUser;
