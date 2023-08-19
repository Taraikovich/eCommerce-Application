interface ValidationRules {
  [fieldName: string]: [RegExp, string];
}

interface PostalCodePatterns {
  [countryCode: string]: RegExp;
}

const validationRules: ValidationRules = {
  firstName: [
    /^[A-Za-z]+$/,
    '✖ Must contain at least one character and no special characters or numbers',
  ],
  lastName: [
    /^[A-Za-z]+$/,
    '✖ Must contain at least one character and no special characters or numbers',
  ],
  password: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    '✖ Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  ],
  email: [
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    '✖ A properly formatted email address (e.g., example@email.com)',
  ],
  'billing-city': [
    /^[A-Za-z]+$/,
    '✖ Must contain at least one character and no special characters or numbers',
  ],
  'billing-srteet': [/.+/, '✖ Must contain at least one character'],
  'shipping-city': [
    /^[A-Za-z]+$/,
    '✖ Must contain at least one character and no special characters or numbers',
  ],
  'shipping-srteet': [/.+/, '✖ Must contain at least one character'],
};

function isValidDateOfBirth(dateOfBirth: string, minAge = 13) {
  const currentDate = new Date();
  const inputDate = new Date(dateOfBirth);
  const minAgeDate = new Date();

  minAgeDate.setFullYear(currentDate.getFullYear() - minAge);

  return inputDate <= minAgeDate;
}

function isValidPostalCode(countryCode: string, postalCode: string) {
  const postalCodePatterns: PostalCodePatterns = {
    US: /^\d{5}$/,
    CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    GE: /^\d{4}$/,
    RU: /^\d{6}$/,
    BY: /^\d{6}$/,
  };

  return postalCodePatterns[countryCode].test(postalCode) || false;
}

export function formValidation(event: SubmitEvent) {
  const form = event.target;

  if (form instanceof HTMLFormElement) {
    const formData = new FormData(form);

    let isValid = true;

    for (const key of formData.keys()) {
      if (key in validationRules) {
        if (!validationRules[key][0].test(formData.get(key) as string)) {
          const errorMessage = document.querySelector(
            `.form__${key} .form__error`
          ) as HTMLElement;
          const input = document.querySelector(
            `.form__${key} input`
          ) as HTMLElement;
          errorMessage.textContent = validationRules[key][1];
          input.style.border = '1px solid red';
          isValid = false;
        }
      }
      if (key === 'birth') {
        if (!isValidDateOfBirth(formData.get(key) as string)) {
          const errorMessage = document.querySelector(
            `.form__${key} .form__error`
          ) as HTMLElement;
          const input = document.querySelector(
            `.form__${key} input`
          ) as HTMLElement;
          input.style.border = '1px solid red';
          errorMessage.textContent = '✖ You must be at least 13 years old.';
          isValid = false;
        }
      }
      if (key === 'billing-post-code' || key === 'shipping-post-code') {
        if (key === 'billing-post-code') {
          if (
            !isValidPostalCode(
              formData.get('billing-country') as string,
              formData.get(key) as string
            )
          ) {
            const errorMessage = document.querySelector(
              `.form__${key} .form__error`
            ) as HTMLElement;
            const input = document.querySelector(
              `.form__${key} input`
            ) as HTMLElement;
            input.style.border = '1px solid red';
            errorMessage.textContent =
              '✖ Invalid postal code format for the selected country.';
            isValid = false;
          }
        }
        if (key === 'shipping-post-code') {
          if (
            !isValidPostalCode(
              formData.get('shipping-country') as string,
              formData.get(key) as string
            )
          ) {
            const errorMessage = document.querySelector(
              `.form__${key} .form__error`
            ) as HTMLElement;
            const input = document.querySelector(
              `.form__${key} input`
            ) as HTMLElement;
            input.style.border = '1px solid red';
            errorMessage.textContent =
              '✖ Invalid postal code format for the selected country.';
            isValid = false;
          }
        }
      }
    }
    return isValid;
  }
}
