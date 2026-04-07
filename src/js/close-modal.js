import { refs } from './refs';
import { setOrderData } from './modal-order.js';
export const isModalOpen = () => {
  return refs.backdrop.classList.contains('is-open');
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
  refs.backdrop.classList.remove('is-open');

  document.body.classList.remove('no-scroll');
  document.body.style.paddingRight = '';
}

export function openModal() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.classList.add('no-scroll');
  document.body.style.paddingRight = `${scrollBarWidth}px`;

  requestAnimationFrame(() => {
    refs.backdrop.classList.add('is-open');
  });
}

export function closeOrderModal() {
  if (refs.orderBackdrop) {
    refs.orderBackdrop.classList.remove('is-open');
  }
  document.body.classList.remove('no-scroll');
  document.body.style.paddingRight = '';
}
export function onOrderBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeOrderModal();
  }
}
export function onOrderKeydownEscape(e) {
  if (e.key === 'Escape' && refs.orderBackdrop?.classList.contains('is-open')) {
    closeOrderModal();
  }
}

export function openOrderModal(product, color) {
  if (!refs.orderBackdrop) return;
  setOrderData(product, color);

  console.log('openOrderModal викликано з:', { product, color }); // добавьте для проверки
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.classList.add('no-scroll');
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  requestAnimationFrame(() => {
    if (refs.backdrop?.classList.contains('is-open')) {
      refs.backdrop.classList.remove('is-open');
    }
    refs.orderBackdrop.classList.add('is-open');
  });
}
