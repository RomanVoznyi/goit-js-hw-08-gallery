import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const btnClose = document.querySelector(".js-lightbox button[data-action='close-lightbox']");

const pictureList = galleryItems.map((el, i) => {
	return `<li class="gallery__item"><a class"gallery__link" href="#">
			<img class="gallery__image" src=${el.preview} data-source=${el.original} data-index=${i} alt="${el.description}">
			</a></li>`;
});
gallery.insertAdjacentHTML("afterbegin", pictureList.join(""));

lightbox.insertAdjacentHTML("beforeend", "<button type='button' class='lightbox__button button-left' data-action='show-left'></button>");
lightbox.insertAdjacentHTML("beforeend", "<button type='button' class='lightbox__button button-right' data-action='show-right'></button>");
const btnLeft = document.querySelector(".js-lightbox button[data-action='show-left']");
const btnRight = document.querySelector(".js-lightbox button[data-action='show-right']");
lightboxImage.setAttribute("data-index", "");

gallery.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
lightboxOverlay.addEventListener("click", closeModal);
btnLeft.addEventListener("click", showGallery);
btnRight.addEventListener("click", showGallery);

function openModal(event) {
	if (event.target.getAttribute("class") === "gallery__image") {
		lightbox.classList.add("is-open");
		lightboxImage.src = event.target.dataset.source;
		lightboxImage.alt = event.target.alt;
		lightboxImage.dataset.index = event.target.dataset.index;

		window.addEventListener("keyup", closeModal);
		checkButtonStatus(+event.target.dataset.index);
	}
}

function closeModal({ type, key }) {
	const clearModal = () => {
		lightbox.classList.remove("is-open");
		lightboxImage.src = "";
		lightboxImage.alt = "";
		lightboxImage.dataset.index = "";
		window.removeEventListener("keyup", closeModal);
	}

	if (type === "keyup") {
		if (key === "Escape") {
			clearModal();
		}
	} else {
		clearModal();
	}
}

function showGallery(event) {
	const index = +lightboxImage.dataset.index;
	const imageList = gallery.querySelectorAll(".gallery__image");

	if (event.target.dataset.action === "show-left") {
		lightboxImage.src = imageList[index - 1].dataset.source;
		lightboxImage.dataset.index = imageList[index - 1].dataset.index;
		lightboxImage.alt = imageList[index - 1].alt;
		checkButtonStatus(index - 1);
	} else {
		lightboxImage.src = imageList[index + 1].dataset.source;
		lightboxImage.dataset.index = imageList[index + 1].dataset.index;
		lightboxImage.alt = imageList[index + 1].alt;
		checkButtonStatus(index + 1);
	}
}

function checkButtonStatus(index) {
	btnLeft.disabled = index === 0;
	btnRight.disabled = index === gallery.children.length - 1;
}



