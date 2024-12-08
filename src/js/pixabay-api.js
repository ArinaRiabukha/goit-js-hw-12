const getPhotos = (img) => {
    const API_KEY = "47393342-0b139bb531c328d079618af8b";
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: img,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => data.hits)
        .catch((error) => {
            console.error("Failed to fetch photos:", error);
            return [];
        });
};

export default getPhotos;