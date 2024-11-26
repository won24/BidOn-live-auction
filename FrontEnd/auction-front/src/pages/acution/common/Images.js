import * as api from "./AuctionAPIs";


/**
 * PostId 로 이미지 가져오기
 * @param {Array} postIds - 게시물 ID 목록
 * @returns {Object} -각 포스트의 이미지는 배열로 가져옴
 */
export const getImagesForPosts = async (postIds) => {
    const imageMap = {};
    for (const id of postIds) {
        try {
            const response = await api.getBoardImg(id);
            const data = response.data;
            imageMap[id] = data.map((item) => item.imageUrl);
        } catch (error) {
            console.error(`Post ID ${id}의 이미지를 가져오는 중 오류 발생:`, error);
            imageMap[id] = []; // 오류 발생 시 빈 배열로 대체
        }
    }
    return imageMap;
};


/**
 * 디테일 페이지 이미지 가져오기
 * postId 로 해당 이미지 가져오기
 */
export const getPostImages = async (postId) => {
    try {
        const response = await api.getBoardImg(postId);
        const data = response.data;

        // 이미지 URL 배열 반환
        return data.map((item) => item.imageUrl);
    } catch (error) {
        console.error(`게시글(${postId}) 이미지를 가져오는 중 오류가 발생했습니다:`, error);
        return []; // 오류 시 빈 배열 반환
    }
};