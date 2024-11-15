import axios from "axios";
const BASE_URL = "http://localhost:8080/auction";

export const totalAuctionList = () => axios.get(`${BASE_URL}`);

export const antiqueList = () => axios.get(`${BASE_URL}/antique`);

export const limitedList = () => axios.get(`${BASE_URL}/limited`);

export const discontinuationList = () => axios.get(`${BASE_URL}/discontinuation`);

export const artProductList = () => axios.get(`${BASE_URL}/artproduct`);

export const valuablesList = () => axios.get(`${BASE_URL}/valuables`);

export const liveList = ()=> axios.get("http://localhost:8080/live");

export const postDetail = (postId) => axios.get(`${BASE_URL}/${postId}`);

export const antiqueSearchItem = (searchItem) => {
    const encodedSearchItem = encodeURIComponent(searchItem);
    return axios.get(`${BASE_URL}/antique`, {
        params: { q: encodedSearchItem }
    });
};

