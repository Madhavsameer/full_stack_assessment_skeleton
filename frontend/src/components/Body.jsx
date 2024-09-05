import HomeCardContainer from "./HomeCardContainer";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

const Body = () => {
  const homes = useSelector((store) => store.homes.homes);

  return (
    <div>
      <HomeCardContainer homes={homes} />
      {homes?.length > 0 && <Pagination homes={homes} />}
    </div>
  );
};

export default Body;
