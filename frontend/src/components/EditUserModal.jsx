import React from 'react';
import useEditUsers from '../hooks/useEditUsers';

const EditUserModal = ({ homeId, onClose, streetAddress }) => {
  const {
    availableUsers,
    selectedUsers,
    loading,
    error,
    handleCheckboxChange,
    handleSaveAndClose
  } = useEditUsers(homeId, onClose);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Edit Users for {streetAddress}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mb-4">
            {availableUsers.map((user) => (
              <div key={user.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  {user.username}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white rounded py-2 px-4 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-900 ${
              selectedUsers.size === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedUsers.size === 0}
            onClick={handleSaveAndClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
