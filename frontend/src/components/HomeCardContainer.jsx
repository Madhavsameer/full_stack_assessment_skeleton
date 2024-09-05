import React from "react";
import useHomesByUser from "../hooks/useHomesByUser";
import HomeCard from "./HomeCard";
import Spinner from "./Spinner";
import { useSelector } from 'react-redux';

const HomeCardContainer = ({homes}) => {

  const selectedUserId = useSelector((store) => store.users.selectedUserId);
  const { error, loading } = useHomesByUser(selectedUserId);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {homes?.length > 0 ? (
          homes.map((home) => (
            <HomeCard
              key={home.id}
              id={home.id}
              streetAddress={home.street_address}
              state={home.state}
              zip={home.zip}
              sqft={home.sqft}
              beds={home.beds}
              baths={home.baths}
              listPrice={home.list_price}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-screen">
            <p>Nothing to show</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeCardContainer;
