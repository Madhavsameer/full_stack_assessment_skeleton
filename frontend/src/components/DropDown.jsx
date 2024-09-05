import React from "react";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";

const DropDown = () => {
  const { error, loading, handleChange, userData } = useUser();
  const selectedUserId = useSelector((store) => store.users.selectedUserId);
  const isNoneDisabled = selectedUserId !== null;

  if (loading) return <p>loading..</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex ml-5 p-4 gap-5">
      <p>Select user</p>
      <select
        className="bg-black text-white"
        onChange={handleChange}
        value={
          userData?.find((user) => user.id === selectedUserId)?.username || ""
        }
      >
        <option value="" disabled={isNoneDisabled}>
          None
        </option>
        {userData && userData.length > 0 ? (
          userData.map((user) => (
            <option value={user.username} key={user.id}>
              {user.username}
            </option>
          ))
        ) : (
          <option disabled>No users available</option>
        )}
      </select>
      {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}
    </div>
  );
};

export default DropDown;
