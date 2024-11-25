
/**
 * 한국식 날짜 표기법으로 변경
 * */
export function formatToKoreanDate(dateString) {

    if (!dateString) {
        console.error("날짜 정보 없음");
    }

    if (typeof dateString !== "string") {
        console.error("날짜 형식 잘못됨 :", dateString);
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

}


