const galleryMarkup = (images) => {
    return images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) =>`<li class="gallery-item" >
            <a href="${largeImageURL}" alt="${tags}" title=""/>
            <img src="${webformatURL}" alt="${tags}" class="gallery-image">
            <div class="gallery-container">
            <p class="item"><span class="item-text">Likes</span> <span>${likes}</span></p>
            <p class="item"><span class="item-text">Wiews</span> <span>${views}</span></p>
            <p class="item"><span class="item-text">Comments</span> <span>${comments}</span></p>
            <p class="item"><span class="item-text">Downlods</span> <span>${downloads}</span></p>
            </div></a>
            </li>`    
        )
        .join("");
};

export default galleryMarkup;
