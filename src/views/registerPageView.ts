import { View } from './view';
import { Router } from '../router/router';
import { LoginButton } from '../components/loginButton';

export class RegisterPageView extends View {
  countriesList = ['Choose your country', 'Belarus', 'Georgia', 'Russia'];

  registrationForm: HTMLFormElement = document.createElement('form');

  regFormData = new FormData();

  regDataToPost = new Object();

  bookmarks: HTMLElement = document.createElement('label');

  reg_bookmark: HTMLElement = document.createElement('label');

  login_bookmark: HTMLElement = document.createElement('label');

  emailInput: HTMLInputElement = document.createElement('input');

  emailValidationWarning: HTMLElement = document.createElement('label');

  passwordInput: HTMLInputElement = document.createElement('input');

  passwordValidationWarning: HTMLElement = document.createElement('label');

  showPasswordCheckbox: HTMLInputElement = document.createElement('input');

  firstNameInput: HTMLInputElement = document.createElement('input');

  firstNameValidationWarning: HTMLElement = document.createElement('label');

  lastNameInput: HTMLInputElement = document.createElement('input');

  lastNameValidationWarning: HTMLElement = document.createElement('label');

  dateOfBirthInput: HTMLInputElement = document.createElement('input');

  dateOfBirthValidationWarning: HTMLElement = document.createElement('label');

  regAddressFieldset: HTMLFieldSetElement = document.createElement('fieldset');

  addressFieldLegend: HTMLLegendElement = document.createElement('legend');

  streetInput: HTMLInputElement = document.createElement('input');

  streetValidationWarning: HTMLElement = document.createElement('label');

  cityInput: HTMLInputElement = document.createElement('input');

  cityValidationWarning: HTMLElement = document.createElement('label');

  postalCodeInput: HTMLInputElement = document.createElement('input');

  postalCodeValidationWarning: HTMLElement = document.createElement('label');

  countryInput: HTMLSelectElement = document.createElement('select');

  countryValidationWarning: HTMLElement = document.createElement('label');

  registrationButton: HTMLInputElement = document.createElement('input');

  //============================================================================

  constructor(private router: Router) {
    super();
    this.createContent();
    this.handleRegistrationFieldsInput();
    this.handleRegistration();
    this.isCountryChosen();
  }

  //============================================================================

  createContent(): void {

    const loginBtn = new LoginButton();

    this.bookmarks.className = 'bookmarks';
    this.reg_bookmark.className = 'bookmark';
    this.login_bookmark.className = 'bookmark';
    this.login_bookmark.classList.add('login-bookmark');
    this.reg_bookmark.textContent = 'Registration:';
    this.login_bookmark.textContent = 'Switch to login page:';
    this.registrationForm.className = 'registrationForm';
    this.registrationForm.name = 'regForm';

    this.emailInput.className = 'input';
    this.emailInput.id = 'email';
    this.emailInput.name = 'email';
    this.emailInput.type = 'email';
    this.emailInput.placeholder = 'Email';

    this.emailValidationWarning.className = 'warning';

    this.passwordInput.className = 'input-short';
    this.passwordInput.type = 'password';
    this.passwordInput.id = 'password';
    this.passwordInput.name = 'password';
    this.passwordInput.placeholder = 'Password';

    const passwordLabel = document.createElement('label');
    passwordLabel.className = 'label';

    this.showPasswordCheckbox.type = 'checkbox';
    this.showPasswordCheckbox.id = 'checkbox';

    const showPasswordLabel = document.createElement('label');
    showPasswordLabel.textContent = 'Show Password';
    showPasswordLabel.insertBefore(
      this.showPasswordCheckbox,
      showPasswordLabel.firstChild
    );
    // showPasswordLabel.appendChild(this.showPasswordCheckbox);

    this.passwordValidationWarning.className = 'warning';

    this.firstNameInput.className = 'input';
    this.firstNameInput.type = 'text';
    this.firstNameInput.name = 'firstName';
    this.firstNameInput.id = 'firstName';
    this.firstNameInput.placeholder = 'First Name';

    this.firstNameValidationWarning.className = 'warning';

    this.lastNameInput.className = 'input';
    this.lastNameInput.type = 'text';
    this.lastNameInput.name = 'lastName';
    this.lastNameInput.id = 'lastName';
    this.lastNameInput.placeholder = 'Last Name';

    this.lastNameValidationWarning.className = 'warning';

    const birthdayLabel = document.createElement('label');
    birthdayLabel.className = 'label';
    birthdayLabel.textContent = 'Date of birth -';

    this.dateOfBirthInput.className = 'input-short';
    this.dateOfBirthInput.type = 'date';
    // this.dateOfBirthInput.min = '1937-01-01';
    this.dateOfBirthInput.name = 'dateOfBirth';
    this.dateOfBirthInput.id = 'dateOfBirth';

    this.dateOfBirthValidationWarning.className = 'warning';

    this.regAddressFieldset.className = 'regAddressFieldset';
    this.regAddressFieldset.name = 'address';
    this.regAddressFieldset.id = 'address';

    this.addressFieldLegend.textContent = 'Address';

    this.streetInput.className = 'input';
    this.streetInput.type = 'text';
    this.streetInput.name = 'street';
    this.streetInput.id = 'street';
    this.streetInput.placeholder = 'Street';

    this.streetValidationWarning.className = 'warning';

    this.cityInput.className = 'input';
    this.cityInput.type = 'text';
    this.cityInput.name = 'city';
    this.cityInput.id = 'city';
    this.cityInput.placeholder = 'City';

    this.cityValidationWarning.className = 'warning';

    this.postalCodeInput.className = 'input';
    this.postalCodeInput.type = 'text';
    this.postalCodeInput.name = 'postalCode';
    this.postalCodeInput.id = 'postalCode';
    this.postalCodeInput.placeholder = 'Postal code';

    this.postalCodeValidationWarning.className = 'warning';

    this.countryInput.className = 'label';
    this.countryInput.name = 'country';
    this.countryInput.id = 'country';

    this.countriesList.forEach((element) => {
      const newOption = new Option(element);
      this.countryInput.append(newOption);
    });

    this.countryValidationWarning.className = 'warning';

    this.registrationButton.className = 'input';
    this.registrationButton.classList.add('form-submit');
    this.registrationButton.type = 'submit';
    this.registrationButton.value = 'Register me / help me';

    this.main.appendChild(this.bookmarks);
    this.bookmarks.appendChild(this.reg_bookmark);
    this.bookmarks.appendChild(this.login_bookmark);
    this.login_bookmark.append(loginBtn.createButton());
    this.main.appendChild(this.registrationForm);
    this.registrationForm.appendChild(this.emailInput);
    this.registrationForm.appendChild(this.emailValidationWarning);
    this.registrationForm.appendChild(passwordLabel);
    passwordLabel.appendChild(this.passwordInput);
    passwordLabel.appendChild(showPasswordLabel);
    this.registrationForm.appendChild(this.passwordValidationWarning);
    this.registrationForm.appendChild(this.firstNameInput);
    this.registrationForm.appendChild(this.firstNameValidationWarning);
    this.registrationForm.appendChild(this.lastNameInput);
    this.registrationForm.appendChild(this.lastNameValidationWarning);
    this.registrationForm.appendChild(birthdayLabel);
    birthdayLabel.appendChild(this.dateOfBirthInput);
    this.registrationForm.appendChild(this.dateOfBirthValidationWarning);
    this.registrationForm.appendChild(this.regAddressFieldset);
    this.regAddressFieldset.appendChild(this.addressFieldLegend);
    this.regAddressFieldset.appendChild(this.streetInput);
    this.regAddressFieldset.appendChild(this.streetValidationWarning);
    this.regAddressFieldset.appendChild(this.cityInput);
    this.regAddressFieldset.appendChild(this.cityValidationWarning);
    this.regAddressFieldset.appendChild(this.postalCodeInput);
    this.regAddressFieldset.appendChild(this.postalCodeValidationWarning);
    this.regAddressFieldset.appendChild(this.countryInput);
    this.regAddressFieldset.appendChild(this.countryValidationWarning);
    this.registrationForm.appendChild(this.registrationButton);
  }

  //============================================================================

  handleRegistrationFieldsInput = (): void => {
    this.registrationForm.addEventListener('input', (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (!target) return;
      switch (target.id) {
        case 'email':
          this.validateEmail();
          break;
        case 'checkbox':
          this.togglePasswordVisibility();
          break;
        case 'password':
          this.validatePassword();
          break;
        case 'firstName':
          this.validateFirstName();
          break;
        case 'lastName':
          this.validateLastName();
          break;
        // case 'dateOfBirth':
        //   this.validateBirthday();
        //   break;
        case 'street':
          this.validateStreet();
          break;
        case 'city':
          this.validateCity();
          break;
        case 'postalCode':
          this.validatePostalCode();
          break;
        case 'country':
          this.validateCountry();
          break;
      }
    });
  };

  //============================================================================

  handleRegistration = (): void => {
    this.registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      //const target = e.target as HTMLElement;
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      const isFirstNameValid = this.validateFirstName();
      const isLastNameValid = this.validateLastName();
      const isDateOfBirthValid = this.validateBirthday();
      const isStreetValid = this.validateStreet();
      const isCityValid = this.validateCity();
      const isPostalCodeValid = this.validatePostalCode();
      const isCountryValid = this.validateCountry();
      if (
        isEmailValid &&
        isPasswordValid &&
        isFirstNameValid &&
        isLastNameValid &&
        isDateOfBirthValid &&
        isStreetValid &&
        isCityValid &&
        isPostalCodeValid &&
        isCountryValid
      ) {
        this.regFormData = new FormData(this.registrationForm);
        this.regDataToPost = Object.fromEntries(this.regFormData);
        this.router.navigateToHome();
        alert('Registration is successful!');
      } else {
        alert('Registration failed, check your inputs, please');
      }
    });
  };

  //============================================================================

  togglePasswordVisibility = (): void => {
    if (this.showPasswordCheckbox.checked) {
      this.passwordInput.type = 'text';
    } else {
      this.passwordInput.type = 'password';
    }
  };

  //============================================================================

  validateEmail(): boolean {
    const emailValue = this.emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const warning =
      'Invalid email address, correct example: somename@somedomain.com';

    if (!emailPattern.test(emailValue)) {
      this.emailInput.setCustomValidity(warning);
      this.emailInput.classList.add('invalid-input');
      this.emailValidationWarning.textContent = warning;
      // alert(warning);
      return false;
    } else {
      this.emailInput.setCustomValidity('');
      this.emailValidationWarning.textContent = '';
      this.emailInput.classList.remove('invalid-input');
      return true;
    }
  }

  //============================================================================

  validatePassword(): boolean {
    const passwordValue = this.passwordInput.value;
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*]/;
    const warning =
      'Password must be at least 8 characters long, including upper-/lowercase char/digit/special symbol';

    if (passwordValue.trim().length < minLength) {
      this.passwordInput.setCustomValidity(warning);
      this.passwordInput.classList.add('invalid-input');
      // alert(warning);
      this.passwordValidationWarning.textContent = warning;
      return false;
    } else if (!uppercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(warning);
      this.passwordInput.classList.add('invalid-input');
      // alert(warning);
      this.passwordValidationWarning.textContent = warning;
      return false;
    } else if (!lowercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(warning);
      this.passwordInput.classList.add('invalid-input');
      // alert(warning);
      this.passwordValidationWarning.textContent = warning;
      return false;
    } else if (!digitPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(warning);
      this.passwordInput.classList.add('invalid-input');
      // alert(warning);
      this.passwordValidationWarning.textContent = warning;
      return false;
    } else if (!specialCharacterPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(warning);
      this.passwordInput.classList.add('invalid-input');
      // alert(warning);
      this.passwordValidationWarning.textContent = warning;
      return false;
    } else {
      this.passwordInput.setCustomValidity('');
      this.passwordInput.classList.remove('invalid-input');
      this.passwordValidationWarning.textContent = '';
      return true;
    }
  }

  //============================================================================

  validateFirstName(): boolean {
    const firstNameValue = this.firstNameInput.value;
    const minLength = 1;
    const digitPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*]/;
    const warning =
      'First Name must be at least 1 character long, without digits/special symbols';

    if (firstNameValue.trim().length < minLength) {
      this.firstNameInput.setCustomValidity(warning);
      this.firstNameInput.classList.add('invalid-input');
      // alert(warning);
      this.firstNameValidationWarning.textContent = warning;
      return false;
    } else if (digitPattern.test(firstNameValue)) {
      this.firstNameInput.setCustomValidity(warning);
      this.firstNameInput.classList.add('invalid-input');
      // alert(warning);
      this.firstNameValidationWarning.textContent = warning;
      return false;
    } else if (specialCharacterPattern.test(firstNameValue)) {
      this.firstNameInput.setCustomValidity(warning);
      this.firstNameInput.classList.add('invalid-input');
      // alert(warning);
      this.firstNameValidationWarning.textContent = warning;
      return false;
    } else {
      this.firstNameInput.setCustomValidity('');
      this.firstNameInput.classList.remove('invalid-input');
      this.firstNameValidationWarning.textContent = '';
      return true;
    }
  }

  //============================================================================

  validateLastName(): boolean {
    const lastNameValue = this.lastNameInput.value;
    const minLength = 1;
    const specialCharacterPattern = /[!@#$%^&*]/;
    const digitPattern = /\d/;
    const warning =
      'Last Name must be at least 1 character long, without digits/special symbols';

    if (lastNameValue.trim().length < minLength) {
      this.lastNameInput.setCustomValidity(warning);
      this.lastNameInput.classList.add('invalid-input');
      // alert(warning);
      this.lastNameValidationWarning.textContent = warning;
      return false;
    } else if (digitPattern.test(lastNameValue)) {
      this.lastNameInput.setCustomValidity(warning);
      this.lastNameInput.classList.add('invalid-input');
      // alert(warning);
      this.lastNameValidationWarning.textContent = warning;
      return false;
    } else if (specialCharacterPattern.test(lastNameValue)) {
      this.lastNameInput.setCustomValidity(warning);
      this.lastNameInput.classList.add('invalid-input');
      // alert(warning);
      this.lastNameValidationWarning.textContent = warning;
      return false;
    } else {
      this.lastNameInput.setCustomValidity('');
      this.lastNameInput.classList.remove('invalid-input');
      this.lastNameValidationWarning.textContent = '';
      return true;
    }
  }

  //============================================================================

  validateBirthday(): boolean {
    const dateOfBirthValue = this.dateOfBirthInput.value;
    const minAge = 13;
    const warning = 'Age must be more than 13 years';
    const warningIncorrect = 'Date of birth is not correct, check it, please';
    const today = new Date();

    const yearOfBirth = Number(dateOfBirthValue.substring(0, 4));
    const monthOfBirth = Number(dateOfBirthValue.substring(5, 7));
    const dayOfBirth = Number(dateOfBirthValue.substring(8));
    const maxBirthDate = new Date(
      yearOfBirth + minAge,
      monthOfBirth,
      dayOfBirth
    );

    if (maxBirthDate > today) {
      this.dateOfBirthInput.setCustomValidity(warning);
      this.dateOfBirthInput.classList.add('invalid-input');
      // alert(warning);
      this.dateOfBirthValidationWarning.textContent = warning;
      return false;
    } else if (yearOfBirth < 1937) {
      // alert('Date of birth is not correct, check it, please.');
      this.dateOfBirthValidationWarning.textContent = warningIncorrect;
      this.dateOfBirthInput.classList.add('invalid-input');
      return false;
    } else {
      this.dateOfBirthInput.setCustomValidity('');
      this.dateOfBirthInput.classList.remove('invalid-input');
      this.lastNameValidationWarning.textContent = '';
      return true;
    }
  }

  //============================================================================

  validateStreet(): boolean {
    const streetInputValue = this.streetInput.value;
    const minLength = 1;
    const warning = 'Street name must be at least 1 character long';

    if (streetInputValue.trim().length < minLength) {
      this.streetInput.setCustomValidity(warning);
      this.streetInput.classList.add('invalid-input');
      // alert(warning);
      this.streetValidationWarning.textContent = warning;
      return false;
    } else {
      this.streetInput.setCustomValidity('');
      this.streetInput.classList.remove('invalid-input');
      this.streetValidationWarning.textContent = '';
      return true;
    }
  }
  //============================================================================

  validateCity(): boolean {
    const cityInputValue = this.cityInput.value;
    const minLength = 1;
    const warning =
      'City name must be at least 1 character long, without digits/special symbols';
    const digitPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*]/;
    if (cityInputValue.trim().length < minLength) {
      this.cityInput.setCustomValidity(warning);
      this.cityInput.classList.add('invalid-input');
      // alert(warning);
      this.cityValidationWarning.textContent = warning;
      return false;
    } else if (digitPattern.test(cityInputValue)) {
      this.cityInput.setCustomValidity(warning);
      this.cityInput.classList.add('invalid-input');
      // alert(warning);
      this.cityValidationWarning.textContent = warning;
      return false;
    } else if (specialCharacterPattern.test(cityInputValue)) {
      this.cityInput.setCustomValidity(warning);
      this.cityInput.classList.add('invalid-input');
      // alert(warning);
      this.cityValidationWarning.textContent = warning;
      return false;
    } else {
      this.cityInput.setCustomValidity('');
      this.cityInput.classList.remove('invalid-input');
      this.cityValidationWarning.textContent = '';
      return true;
    }
  }
  //============================================================================

  validateCountry(): boolean {
    const countryInputValue = this.countryInput.value;
    const warning = 'Please, choose your country from the list';
    if (countryInputValue === 'Choose your country') {
      this.countryInput.setCustomValidity(warning);
      this.countryInput.classList.add('invalid-input');
      // alert(warning);
      this.countryValidationWarning.textContent = warning;
      return false;
    } else {
      this.countryInput.setCustomValidity('');
      this.countryInput.classList.remove('invalid-input');
      this.countryValidationWarning.textContent = '';
      if (this.postalCodeInput.disabled) {
        this.postalCodeInput.placeholder = 'Postal code';
        this.postalCodeValidationWarning.textContent = '';
      }
      this.postalCodeInput.disabled = false;
      this.countryInput.size = 1;
      return true;
    }
  }
  //============================================================================

  validatePostalCode(): boolean {
    const postalCodeInputValue = this.postalCodeInput.value;
    let PostalCodeLength = 6;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const specialCharacterPattern = /[!@#$%^&*]/;
    if (this.countryInput.value === 'Georgia') {
      PostalCodeLength = 4;
      this.postalCodeValidationWarning.textContent = '';
    } else {
      PostalCodeLength = 6;
      this.postalCodeValidationWarning.textContent = '';
    }
    const warning = `Postal code must consist of ${PostalCodeLength} digits`;
    if (postalCodeInputValue.length !== PostalCodeLength) {
      this.postalCodeInput.setCustomValidity(warning);
      this.postalCodeInput.classList.add('invalid-input');
      // alert(warning);
      this.postalCodeValidationWarning.textContent = warning;
      return false;
    } else if (uppercasePattern.test(postalCodeInputValue)) {
      this.postalCodeInput.setCustomValidity(warning);
      this.postalCodeInput.classList.add('invalid-input');
      // alert(warning);
      this.postalCodeValidationWarning.textContent = warning;
      return false;
    } else if (lowercasePattern.test(postalCodeInputValue)) {
      this.postalCodeInput.setCustomValidity(warning);
      this.postalCodeInput.classList.add('invalid-input');
      // alert(warning);
      this.postalCodeValidationWarning.textContent = warning;
      return false;
    } else if (specialCharacterPattern.test(postalCodeInputValue)) {
      this.postalCodeInput.setCustomValidity(warning);
      this.postalCodeInput.classList.add('invalid-input');
      // alert(warning);
      this.postalCodeValidationWarning.textContent = warning;
      return false;
    } else {
      this.postalCodeInput.setCustomValidity('');
      this.postalCodeInput.classList.remove('invalid-input');
      this.postalCodeValidationWarning.textContent = '';
      return true;
    }
  }

  //============================================================================

  isCountryChosen() {
    this.postalCodeInput.addEventListener('focus', () => {
      const warning = 'Please, choose your country from the list below, first';
      if (this.validateCountry()) {
        this.countryValidationWarning.textContent = '';
        this.postalCodeValidationWarning.textContent = '';
      } else {
        this.countryInput.size = this.countryInput.length;
        this.postalCodeValidationWarning.textContent = warning;
        this.postalCodeInput.placeholder = warning;
        this.postalCodeInput.disabled = true;
      }
    });
  }
}
//============================================================================
