import axios from "axios";

export const totalAuctionList = () => axios.get("http://localhost:8080/auction");

export const antiqueList = () => axios.get("http://localhost:8080/auction/antique");

export const limitedList = () => axios.get("http://localhost:8080/auction/limited");

export const discontinuationList = () => axios.get("http://localhost:8080/auction/discontinuation");

export const artProductList = () => axios.get("http://localhost:8080/auction/artproduct");

export const valuablesList = () => axios.get("http://localhost:8080/auction/valuables");

export const liveList = ()=> axios.get("http://localhost:8080/live");

export const postDetail = (postId) => axios.get(`http://localhost:8080/auction/${postId}`);
