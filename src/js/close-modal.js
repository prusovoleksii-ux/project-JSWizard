const refs = {
  backdrop: document.querySelector('.backdrop'),
  modalCloseBtn: document.querySelector('.js-close-modal'),
};
refs.modalCloseBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onKeydownEscape);
const isModalOpen = () => {
  return !refs.backdrop.classList.contains('is-hidden');
};

function onKeydownEscape(e) {
  if (e.key === 'Escape' && isModalOpen()) {
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
  document.body.classList.remove('no-scroll');
}

function openModal() {
  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}
