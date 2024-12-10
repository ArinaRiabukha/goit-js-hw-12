import axios from 'axios';

const getPhotos = async (img,  page = 1, perPage = 15) => {
    const API_KEY = "47393342-0b139bb531c328d079618af8b";
    const searchParams = {
        key: API_KEY,
        q: img,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: searchParams,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch photos:", error.message);
        return { hits: [], totalHits: 0 };
    }
};

export default getPhotos;