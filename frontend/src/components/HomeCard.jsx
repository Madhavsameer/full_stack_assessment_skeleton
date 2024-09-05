import { useState } from "react";
import EditUserModal from "./EditUserModal";

const HomeCard = ({
  id,
  streetAddress,
  state,
  zip,
  sqft,
  beds,
  baths,
  listPrice,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-100 p-4 shadow-lg rounded-md grid">
      <p className="text-lg font-bold">{streetAddress}</p>
      <p>List Price: ${listPrice}</p>
      <p>State: {state}</p>
      <p>Zip: {zip}</p>
      <p>Sqft: {sqft}</p>
      <p>Beds: {beds}</p>
      <p>Baths: {baths}</p>
      <button
        className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-900"
        onClick={handleEditClick}
      >
        Edit Users
      </button>
      {isModalOpen && (
        <EditUserModal
          homeId={id}
          streetAddress={streetAddress}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomeCard;
