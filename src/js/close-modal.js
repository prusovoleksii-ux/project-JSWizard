import { refs } from './refs';
export const isModalOpen = () => {
  return !refs.backdrop.classList.contains('is-hidden');
};

export function onKeydownEscape(e) {
  if (e.key === 'Escape' && isModalOpen()) {
    closeModal();
  }
}

export function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

export function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.body.style.paddingRight = '';
}

export function openModal() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.classList.add('no-scroll');
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  refs.backdrop.classList.remove('is-hidden');
}
