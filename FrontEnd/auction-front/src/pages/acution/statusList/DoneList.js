    import { useState } from "react";
    import * as api from "../../../apis/AuctionItem";
    import Antique from "../Antique";
    import ArtProduct from "../artProduct";
    import Discontiuation from "../discontinuation";
    import Limited from "../Limited";
    import Valuables from "../valuables";
    import AllCategory from "../categoryList/AllCategory";



const DoneList = () =>{

    const [doneList, setDoneList] = useState([]);
    const [categoryCode, setCategoryCode] = useState("");


    const getItemList = async () => {

        try {
            const response = await api.getDoneList();
            const data = response.data;

            if (data && data.length > 0) {
                setDoneList(data);
                setCategoryCode(data.categoryCode);
            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        }catch (error){
            console.error("경매 목록을 불러오는 데 실패했습니다.", error);
        }
    };

    const doneAntique = [doneList.filter(a => categoryCode === "a")];
    const doneArtProduct = [doneList.filter(ap => categoryCode === "ap")]
    const doneDiscontinuation = [doneList.filter(d=> categoryCode === "d")]
    const doneLimited = [doneList.filter(l => categoryCode === "l")]
    const doneValuables = [doneList.filter(v => categoryCode === "v")]

    return (
        <>
            <AllCategory doneList={doneList}/>
            <Antique doneAntique={doneAntique}/>
            <ArtProduct doneArtProduct={doneArtProduct}/>
            <Discontiuation doneDiscontinuation={doneDiscontinuation}/>
            <Limited doneLimited={doneLimited}/>
            <Valuables doneValuables={doneValuables}/>
        </>
    );




}
export default DoneList;