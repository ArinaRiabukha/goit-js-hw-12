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

const form = document.getElementById("search-form");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");

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
    loader.style.display = "block";
    try {
        const data = await getPhotos(searchTerm);

        if (!data.length) {
            iziToast.info({
                title: '',
                backgroundColor: '#EF4040',
                messageColor: '#FAFAFB',
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: 'topRight',
            });
        } else {
            gallery.innerHTML = galleryMarkup(data);
            Lightboxgallery.refresh();
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
