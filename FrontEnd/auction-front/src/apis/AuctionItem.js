import axios from "axios";

export const totalAuctionList = () => axios.get("/auction");

export const antiqueList = () => axios.get("/auction/antique");

export const limitedList = () => axios.get("/auction/limited");

export const discontinuationList = () => axios.get("/auction/discontinuation");

export const artProductList = () => axios.get("/auction/artproduct");

export const valuablesList = () => axios.get("/auction/valuables");

export const liveList = ()=> axios.get("/live")
