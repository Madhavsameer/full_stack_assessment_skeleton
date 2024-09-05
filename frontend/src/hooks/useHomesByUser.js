import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch , useSelector} from 'react-redux';
import { setHomes, setRefresh } from '../redux/homeSlice';
import { setTotalPages } from '../redux/paginationSlice';
import { baseUrl } from '../constants/baseUrl';

const useHomesByUser = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const refresh = useSelector((store) => store.homes.refresh);
  const page = useSelector((store) => store.pagination.currentPage);

  useEffect(() => {

    const fetchData = async () => {
      if(!id) return;
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/home/find-by-user/${id}?page=${page}`);
        dispatch(setHomes(response?.data?.data?.homes));
        dispatch(setTotalPages(response?.data?.data?.totalPages));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        dispatch(setRefresh(false));
      }
    };

    fetchData();
  }, [id, page, refresh]);

  return { loading, error };
};

export default useHomesByUser;
