import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));

                const { username } = !query ? await getUsername() : '';

                const endpoint = !query ? `/api/user/${username}` : `/api/${query}`;
                const { data, status } = await axios.get(endpoint);

                if (status === 200 || status === 201) { // Assuming 200 is success status code
                    setData(prev => ({ ...prev, isLoading: false, apiData: data, status: status }));
                } else {
                    setData(prev => ({ ...prev, isLoading: false, serverError: `Request failed with status ${status}` }));
                }
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };

        fetchData();
    }, [query]);

    return [getData, setData];
}
