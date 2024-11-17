import { useState } from "react";
import * as api from "../../../apis/AuctionItem";
import Antique from "../Antique";
import ArtProduct from "../artProduct";
import Discontiuation from "../discontinuation";
import Limited from "../Limited";
import Valuables from "../valuables";
import AllCategory from "../categoryList/AllCategory";



const OnList = () =>{

    const [onList, setOnList] = useState({});
    const [categoryCode, setCategoryCode] = useState({});


    const getItemList = async () => {

        try {
            const response = await api.getOnList();
            const data = response.data;

            if (data && data.length > 0) {
                setOnList(data);
                setCategoryCode(data.categoryCode);
            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        }catch (error){
            console.error("경매 목록을 불러오는 데 실패했습니다.", error);
        }
    };


    const onAntique = [onList.filter(a => categoryCode === "a")];
    const onArtProduct = [onList.filter(ap => categoryCode === "ap")]
    const onDiscontinuation = [onList.filter(d=> categoryCode === "d")]
    const onLimited = [onList.filter(l => categoryCode === "l")]
    const onValuables = [onList.filter(v => categoryCode === "v")]

    return (
        <>
            <AllCategory onList={onList}/>
            <Antique onAntique={onAntique}/>
            <ArtProduct onArtProduct={onArtProduct}/>
            <Discontiuation onDiscontinuation={onDiscontinuation}/>
            <Limited onLimited={onLimited}/>
            <Valuables onValuables={onValuables}/>
        </>
    );
}
export default OnList;