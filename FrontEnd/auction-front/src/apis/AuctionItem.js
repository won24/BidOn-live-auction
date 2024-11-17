import axios from "axios";
const BASE_URL = "http://localhost:8080/auction";

export const totalAuctionList = () => axios.get(`${BASE_URL}`);

export const antiqueList = () => axios.get(`${BASE_URL}/antique`);

export const limitedList = () => axios.get(`${BASE_URL}/limited`);

export const discontinuationList = () => axios.get(`${BASE_URL}/discontinuation`);

export const artProductList = () => axios.get(`${BASE_URL}/artproduct`);

export const valuablesList = () => axios.get(`${BASE_URL}/valuables`);

export const liveList = ()=> axios.get("http://localhost:8080/live");

export const postDetail = (postId,favorite) => {
    return axios.get(`${BASE_URL}/${postId}`,{
        params: {favorite : favorite}
    });
}

export const searchItemList = (searchItem,categoryCode) => {
    const encodedSearchItem = encodeURIComponent(searchItem);
    return axios.get(`${BASE_URL}/search`, {
        params: { q: encodedSearchItem, categoryCode : categoryCode }
    });
};

export const searchItemAllList = (searchItem) => {
    const encodedSearchItem = encodeURIComponent(searchItem);
    return axios.get(`${BASE_URL}/searchitem`, {
        params: { q: encodedSearchItem }
    });
};



export const getDoneList = () =>axios.get(`${BASE_URL}/donelist`);

export const getOnList = () =>axios.get(`${BASE_URL}/onlist`);

export const getOffList = () =>axios.get(`${BASE_URL}/offlist`);
