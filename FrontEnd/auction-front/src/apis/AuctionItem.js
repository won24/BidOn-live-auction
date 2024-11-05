import axios from "axios";

export const antiqueLists = () => axios.get("/auction/antique");
