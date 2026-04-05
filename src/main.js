import { openModal, closeModal, onBackdropClick, onKeydownEscape } from "./js/close-modal";
import { refs } from "./js/close-modal";

openModal();

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onKeydownEscape);