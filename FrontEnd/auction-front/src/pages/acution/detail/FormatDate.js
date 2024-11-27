/**
 * 한국식 날짜 표기법으로 변경
 */
export function formatToKoreanDate(dateInput) {
    if (!dateInput) {
        console.error("날짜 정보 없음");
        return "날짜 없음";
    }

    // 숫자인 경우 처리 (타임스탬프)
    if (typeof dateInput === "number") {
        dateInput = new Date(dateInput);
    } else if (typeof dateInput === "string") {
        // 문자열인 경우, ISO 8601 형식 또는 다른 지원되는 형식으로 변환
        dateInput = new Date(dateInput);
    }

    if (isNaN(dateInput.getTime())) {
        console.error("유효하지 않은 날짜 형식:", dateInput);
        return "유효하지 않은 날짜";
    }

    const year = dateInput.getFullYear();
    const month = dateInput.getMonth() + 1;
    const day = dateInput.getDate();
    const hours = dateInput.getHours();
    const minutes = dateInput.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
