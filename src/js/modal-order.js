import IMask from 'imask';

import axios from 'axios';
import { refs } from './refs';
import {
  openOrderModal,
  closeOrderModal,
  onOrderBackdropClick,
  onOrderKeydownEscape,
} from './close-modal.js';
import { showLoader, hideLoader } from './loader.js';
import { showToast } from './base-functions.js';
// --- КОНСТАНТИ ---
const STORAGE_KEY = 'modal-form-state';
const API_URL = 'https://furniture-store-v2.b.goit.study/api/orders';
// --- ЗБЕРЕЖЕННЯ ДАНИХ ТОВАРУ І КОЛЬОРУ ---
let currentProduct = null;
let selectedColor = null;
// Функція для встановлення даних товару (викликається з close-modal.js)
export function setOrderData(product, color) {
  currentProduct = product;
  selectedColor = color ? String(color) : '#1212ca';
}
// --- ЕЛЕМЕНТИ ---
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const commentInput = document.getElementById('comment');
if (
  !refs.form ||
  !nameInput ||
  !phoneInput ||
  !commentInput ||
  !refs.sendButton
) {
  console.error('Не знайдено необхідні елементи форми');
  throw new Error('Form elements not found');
}
// --- СТАН ПОЛІВ ---
let fieldStates = {
  name: { isValidated: false, wasTouched: false },
  phone: { isValidated: false, wasTouched: false },
};
// --- LOCALSTORAGE ---
const storage = {
  load: () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      nameInput.value = data.name || '';
      phoneInput.value = data.phone || '';
      commentInput.value = data.comment || '';
      return data;
    } catch {
      return {};
    }
  },
  save: () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: nameInput.value,
        phone: phoneInput.value,
        comment: commentInput.value,
      })
    );
  },
  clear: () => localStorage.removeItem(STORAGE_KEY),
};
// --- МАСКА ТЕЛЕФОНУ ---
const phoneMask = IMask(phoneInput, {
  mask: '{38} 000 000 00 00',
  lazy: true,
  placeholderChar: '_',
});
const storedData = storage.load();
if (storedData?.phone) phoneMask.value = storedData.phone;
// --- ВАЛІДАЦІЯ ІМЕНІ ---
const normalizeName = value =>
  value
    .replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ\s-]/g, '')
    .replace(/^[\s-]+/, '')
    .replace(/^([A-Za-zА-Яа-яІіЇїЄєҐґ])[\s-]/, '$1')
    .replace(/[\s-]{2,}/g, match => match[0])
    .toLowerCase()
    .replace(
      /(^|[\s-])([a-zа-яіїєґ])/g,
      (_, sep, letter) => sep + letter.toUpperCase()
    );
// --- ВАЛІДАТОРИ ---
const validators = {
  name: value => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, message: "Введіть ваше ім'я" };
    if (trimmed.length < 3)
      return { isValid: false, message: 'Мінімум 3 символи' };
    if (trimmed.length > 50)
      return {
        isValid: false,
        message: 'Введена максимальна кількість символів',
      };
    if (!/^[a-zа-яіїєґ]{2,}([\s-][a-zа-яіїєґ]{2,})*$/i.test(trimmed)) {
      return { isValid: false, message: "Некоректне ім'я" };
    }
    return { isValid: true, message: 'Поле заповнено коректно' };
  },
  phone: value => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return { isValid: false, message: 'Введіть номер телефону' };
    if (digits.length !== 12)
      return { isValid: false, message: 'Номер повинен містити 12 цифр' };
    return { isValid: true, message: 'Поле заповнено коректно' };
  },
};
// --- УПРАВЛІННЯ ВАЛІДАЦІЄЮ ---
const validation = {
  show: (input, { isValid, message }) => {
    const container = input.closest('.entry-field');
    if (!container) {
      console.warn('No .entry-field found for input:', input);
      return; // Exit early, no crash
    }
    container
      .querySelectorAll(
        '.just-validate-error-label, .just-validate-success-label'
      )
      .forEach(el => el.remove());
    input.classList.remove('is-valid', 'is-invalid');
    input.classList.add(isValid ? 'is-valid' : 'is-invalid');
    const label = document.createElement('div');
    label.className = isValid
      ? 'just-validate-success-label'
      : 'just-validate-error-label';
    label.textContent = message;
    container.appendChild(label);
  },
  clear: input => {
    const container = input.closest('.entry-field');
    container
      .querySelectorAll(
        '.just-validate-error-label, .just-validate-success-label'
      )
      .forEach(el => el.remove());
    input.classList.remove('is-valid', 'is-invalid');
  },
  validateAndShow: (input, validator, fieldName) => {
    if (!input.value.trim()) {
      validation.clear(input);
      return false;
    }
    const result = validator(input.value);
    validation.show(input, result);
    fieldStates[fieldName].isValidated = true;
    return result.isValid;
  },
};

// --- ПЕРЕВІРКА КНОПКИ ---
const updateButton = () => {
  refs.sendButton.disabled = !(
    nameInput.value.trim().length >= 3 && phoneMask.unmaskedValue.length === 12
  );
};

// --- ОБРОБНИКИ ПОЛІВ ---
const fieldHandlers = {
  name: {
    input: e => {
      e.target.value = normalizeName(e.target.value);
      if (fieldStates.name.wasTouched) {
        validation.validateAndShow(nameInput, validators.name, 'name');
      }
      updateButton();
      storage.save();
    },
    blur: () => {
      fieldStates.name.wasTouched = true;
      validation.validateAndShow(nameInput, validators.name, 'name');
    },
    focus: () => {
      fieldStates.name.wasTouched = true;
    },
  },
  phone: {
    input: () => {
      if (fieldStates.phone.wasTouched) {
        validation.validateAndShow(phoneInput, validators.phone, 'phone');
      }
      updateButton();
      storage.save();
    },
    blur: () => {
      fieldStates.phone.wasTouched = true;
      validation.validateAndShow(phoneInput, validators.phone, 'phone');
    },
    focus: () => {
      fieldStates.phone.wasTouched = true;
    },
  },
};
// --- СЛУХАЧІ ПОДІЙ ---
nameInput.addEventListener('input', fieldHandlers.name.input);
nameInput.addEventListener('blur', fieldHandlers.name.blur);
nameInput.addEventListener('focus', fieldHandlers.name.focus);
phoneInput.addEventListener('input', fieldHandlers.phone.input);
phoneInput.addEventListener('blur', fieldHandlers.phone.blur);
phoneInput.addEventListener('focus', fieldHandlers.phone.focus);
commentInput.addEventListener('input', storage.save);
// --- МОДАЛЬНЕ ВІКНО: ОБРОБНИКИ ---
const closeBtn = document.querySelector('.order-backdrop .btn-close');
if (closeBtn) {
  closeBtn.addEventListener('click', closeOrderModal);
}
if (refs.orderBackdrop) {
  refs.orderBackdrop.addEventListener('click', onOrderBackdropClick);
}
document.addEventListener('keydown', onOrderKeydownEscape);
// --- ВІДПРАВКА ФОРМИ ---
refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const nameResult = validators.name(nameInput.value);
  const phoneResult = validators.phone(phoneInput.value);
  validation.show(nameInput, nameResult);
  validation.show(phoneInput, phoneResult);
  if (!nameResult.isValid || !phoneResult.isValid) return;
  const formData = {
    name: nameInput.value.trim(),
    phone: phoneMask.unmaskedValue,
    comment: commentInput.value.trim() || 'Без коментаря',
    modelId:
      currentProduct?._id || currentProduct?.id || '682f9bbf8acbdf505592ac36',
    color: selectedColor ? String(selectedColor) : '#1212ca',
  };
  try {
    showLoader();
    await axios.post(API_URL, formData);
    hideLoader();
    refs.form.reset();
    phoneMask.value = '';
    phoneMask.updateValue();
    storage.clear();
    validation.clear(nameInput);
    validation.clear(phoneInput);
    fieldStates.name = { isValidated: false, wasTouched: false };
    fieldStates.phone = { isValidated: false, wasTouched: false };
    updateButton();
    closeOrderModal();
    await showToast('success', 'Дякуємо!', 'Ваше замовлення прийнято.');
  } catch (error) {
    hideLoader();
    console.error('Помилка відправки:', error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || 'Щось пішло не так, повторіть спробу.';
    await showToast('error', 'Помилка!', errorMessage);
  }
});

// --- ІНІЦІАЛІЗАЦІЯ ---
updateButton();
if (storedData.name || storedData.phone) {
  setTimeout(() => {
    if (storedData.name?.trim()) {
      fieldStates.name.wasTouched = true;
      validation.validateAndShow(nameInput, validators.name, 'name');
    }
    if (storedData.phone?.trim()) {
      fieldStates.phone.wasTouched = true;
      validation.validateAndShow(phoneInput, validators.phone, 'phone');
    }
  }, 100);
}
