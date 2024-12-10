import getPhotos from "./js/pixabay-api";
import galleryMarkup from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let Lightboxgallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});

let currentPage = 1; 
let currentSearch = "";
let loadedImages = 0;

const form = document.getElementById("search-form");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");
const loadBtn= document.querySelector(".load-button")
loadBtn.style.display = "none";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        iziToast.info({
            title: '',
            message: 'Please, enter a search term!',
            messageColor: '#FAFAFB',
            backgroundColor: '#EF4040',
            position: 'topRight',
        });
        return;
    }
    currentSearch = searchTerm; 
    currentPage = 1; 
    loadedImages = 0;
    gallery.innerHTML = ''; 
    loader.style.display = "block";
    loadBtn.style.display = "none";
    try {
        const data = await getPhotos(searchTerm, currentPage);
        const hits = data.hits;
        const totalHits = data.totalHits;

        if (!hits.length) {
            iziToast.info({
                title: '',
                backgroundColor: '#EF4040',
                messageColor: '#FAFAFB',
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: 'topRight',
            });
        } else {
            loadedImages += hits.length;
            gallery.innerHTML = galleryMarkup(hits);
            Lightboxgallery.refresh();

            if (loadedImages < totalHits) {
                loadBtn.style.display = "block"; 
            } else {
                loadBtn.style.display = "none";
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            messageColor: '#FAFAFB',
            backgroundColor: '#EF4040',
            position: 'topRight',
        });
    }finally {
        loader.style.display = "none";
    }
});

loadBtn.addEventListener("click", async () => {
    currentPage += 1;
    loader.style.display = "block";

    try {
        const data = await getPhotos(currentSearch, currentPage);

        if (data.hits.length) {
            loadedImages += data.hits.length; 
            gallery.innerHTML += galleryMarkup(data.hits);
            Lightboxgallery.refresh();
    
                window.scrollBy({
                    top: 570, 
                    behavior: "smooth",
                });

            if (loadedImages >= data.totalHits) {
                loadBtn.style.display = "none";
                iziToast.info({
                    message: 'We`re sorry, but you`ve reached the end of search results.',
                    messageColor: '#FAFAFB',
                    backgroundColor: '#91A9FF',
                    position: 'topRight',
                });
            }
        }
    } catch (error) {
        console.error("Error loading more photos:", error);
        iziToast.error({
            message: 'Failed to load more images. Please try again later.',
            messageColor: '#FAFAFB',
            backgroundColor: '#EF4040',
            position: 'topRight',
        });
    } finally {
        loader.style.display = "none";
    }
});