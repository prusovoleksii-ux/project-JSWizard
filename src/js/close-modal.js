const refs = {
  backdrop: document.querySelector('.backdrop'),
  modalCloseBtn: document.querySelector('.js-close-modal'),
};
refs.modalCloseBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onKeydownEscape);

function onKeydownEscape(e) {
  if (e.key === 'Escape' && !refs.backdrop.classList.contains('is-hidden')) {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  refs.backdrop.classList.add('is-hidden');
}
