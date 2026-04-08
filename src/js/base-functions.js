import { page, TOTAL_ITEMS } from '../main';
import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Показати кнопку "Показати ще"
export function showLoadMoreBtn() {
  if (refs.loadMoreBtn) refs.loadMoreBtn.classList.remove('is-hidden');
}

// Сховати кнопку "Показати ще"
export function hideLoadMoreBtn() {
  if (refs.loadMoreBtn) refs.loadMoreBtn.classList.add('is-hidden');
}

// Перевірка статусу кнопки "Показати ще"
export function checkBtnStatus(totalItems) {
  if (page >= TOTAL_ITEMS) {
    hideLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}

export function scrollPage() {
  const elem = refs.furnitureList.lastElementChild;
  const height = elem.getBoundingClientRect().height;
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}

// --- TOAST ---
export const showToast = (type, title, message, position) => {
  return new Promise(resolve => {
    iziToast.destroy();
    const config = {
      timeout: 3000,
      progressBar: true,
      close: true,
      closeOnClick: true,
      position: position || 'center',
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutUp',
      titleSize: '18px',
      messageSize: '14px',
    };
    if (type === 'success') {
      config.backgroundColor = '#d4edda';
      config.titleColor = '#155724';
      config.messageColor = '#155724';
      config.iconColor = '#28a745';
      config.progressBarColor = '#28a745';
    } else if (type === 'error') {
      config.backgroundColor = '#f8d7da';
      config.titleColor = '#721c24';
      config.messageColor = '#721c24';
      config.iconColor = '#dc3545';
      config.progressBarColor = '#dc3545';
    }
    iziToast[type]({
      ...config,
      title,
      message,
      onClosing: resolve,
      onClosed: resolve,
    });
    setTimeout(resolve, config.timeout + 500);
  });
};
