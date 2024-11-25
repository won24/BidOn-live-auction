import { useMemo } from "react";


/**
 * 검색 결과 경매품
 * 정렬 기준 - 경매중, 경매 예정, 경매 종료
 */
const useFilterItem = (itemList, searchItemList, checkBoxStates) => {

    // 정렬하기
    const sortItemsByStatus = (items) => {
        const order = ["on", "off", "done"];
        return items.sort((a, b) => order.indexOf(a.postStatus) - order.indexOf(b.postStatus));
    };


    const filteredMainItems = useMemo(() =>
            sortItemsByStatus(
                itemList.filter((item) =>
                    checkBoxStates.main.some(
                        (box) => box.isChecked && box.status === item.postStatus
                    )
                )
            ),
        [itemList, checkBoxStates.main]
    );

    const filteredSearchItems = useMemo(() =>
            sortItemsByStatus(
                searchItemList.filter((item) =>
                    checkBoxStates.search.some(
                        (box) => box.isChecked && box.status === item.postStatus
                    )
                )
            ),
        [searchItemList, checkBoxStates.search]
    );

    return { filteredMainItems, filteredSearchItems };
};

export default useFilterItem;
