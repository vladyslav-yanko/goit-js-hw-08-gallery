import galleryItems from "./app.js";

const galleryOfImages = document.querySelector('.js-gallery');
const imagesMarkup = createImages(galleryItems);

galleryOfImages.insertAdjacentHTML("beforeend", imagesMarkup);

function createImages(images) {
  return images.map(({preview,original,description}) =>
  {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="#"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('') 
};


galleryOfImages.addEventListener('click', onImageClick);

const modalImage = document.querySelector('.lightbox__image')

const largeImgLink = document.querySelector('.gallery__link');

const modalOpen = document.querySelector('.lightbox');


const originalImagesArrow = [];

for (const item of galleryItems) {
  originalImagesArrow.push(item.original);
};

let idxOfOpenedImage = originalImagesArrow.indexOf(modalImage.src);

function onImageClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return
  } else {
    
    
    modalOpen.classList.add('is-open');
    
   
    modalImage.src = evt.target.dataset.source;
    modalImage.alt = evt.target.alt;
  };
}


const onCloseBtnClick = document.querySelector('.lightbox__button');

onCloseBtnClick.addEventListener('click', closeModal);


const onOverlayClick = document.querySelector('.lightbox__overlay');

onOverlayClick.addEventListener('click', closeModal);


window.addEventListener('keydown', closeModalOnEscKeyClick);

function closeModal() {
  modalOpen.classList.remove('is-open');
  window.removeEventListener('keydown', onRightKeyClick);
  window.removeEventListener('keydown', onLeftKeyClick);

 
  modalImage.src = "";
  modalImage.alt = "";
}

function closeModalOnEscKeyClick(evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
}