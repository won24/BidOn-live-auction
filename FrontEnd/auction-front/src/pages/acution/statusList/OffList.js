import { useState } from "react";
import * as api from "../../../apis/AuctionItem";
import Antique from "../Antique";
import ArtProduct from "../artProduct";
import Discontiuation from "../discontinuation";
import Limited from "../Limited";
import Valuables from "../valuables";
import AllCategory from "../categoryList/AllCategory";



const OffList = () =>{

    const [offList, setOffList] = useState({});
    const [categoryCode, setCategoryCode] = useState({});


    const getItemList = async () => {

        try {
            const response = await api.getOffList();
            const data = response.data;

            if (data && data.length > 0) {
                setOffList(data);
                setCategoryCode(data.categoryCode);
            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        }catch (error){
            console.error("경매 목록을 불러오는 데 실패했습니다.", error);
        }
    };


    const offAntique = [offList.filter(a => categoryCode === "a")];
    const offArtProduct = [offList.filter(ap => categoryCode === "ap")]
    const offDiscontinuation = [offList.filter(d=> categoryCode === "d")]
    const offLimited = [offList.filter(l => categoryCode === "l")]
    const offValuables = [offList.filter(v => categoryCode === "v")]

    return (
        <>
            <AllCategory offList={offList}/>
            <Antique offAntique={offAntique}/>
            <ArtProduct offArtProduct={offArtProduct}/>
            <Discontiuation offDiscontinuation={offDiscontinuation}/>
            <Limited offLimited={offLimited}/>
            <Valuables offValuables={offValuables}/>
        </>
    );
}
export default OffList;