import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import AntiqueItems from "./AntiqueItems";


const Antique = () =>{
    const [antiqueList, setAntiqueList] = useState([]);

    const getItemList = async () =>{
        const response = await api.antiqueLists();
        const data = await response.data;
        console.log(data);
        setAntiqueList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);

    return(
        <>
            <AntiqueItems antiqueList = {antiqueList}/>
        </>
    )
}
export default Antique;