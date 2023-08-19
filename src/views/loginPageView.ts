import { View } from './view';
import { Router } from '../router/router';

export class LoginPageView extends View {
  private emailInputWarpper: HTMLDivElement = document.createElement('div');

  private emailInput: HTMLInputElement = document.createElement('input');

  private passwordlInputWarpper: HTMLDivElement = document.createElement('div');

  private passwordInput: HTMLInputElement = document.createElement('input');

  private showPasswordCheckbox: HTMLInputElement =
    document.createElement('input');

  private loginButton: HTMLButtonElement = document.createElement('button');

  private registerButton: HTMLButtonElement = document.createElement('button');

  private emailErrorText: HTMLDivElement = document.createElement('div');

  private passwordErrorText: HTMLDivElement = document.createElement('div');

  private passwordShowIcon: HTMLImageElement = document.createElement('img');

  private passwordHideIcon: HTMLImageElement = document.createElement('img');

  constructor(private router: Router) {
    super();
    this.createContent();
    this.initializeInputs();
    this.initializeRegisterButton();
    this.initializeErrorTexts();
    this.initializePasswordIcons();
  }

  private createContent(): void {
    this.main.textContent = '';
  }

  private initializeErrorTexts(): void {
    this.emailErrorText.className = 'error-text-email';
    this.passwordErrorText.className = 'error-text-password';
    this.main.insertBefore(this.emailErrorText, this.passwordlInputWarpper);
    this.main.insertBefore(this.passwordErrorText, this.passwordlInputWarpper);
  }

  private initializeInputs(): void {
    this.emailInputWarpper.className = 'input-email-wrapper';
    this.emailInput = document.createElement('input');
    this.emailInput.className = 'input-email';
    this.emailInput.type = 'email';
    this.emailInput.placeholder = 'Email';

    const emailIcon = new Image();
    emailIcon.src = require('../images/email.png');
    emailIcon.alt = 'Email Icon';
    emailIcon.className = 'input-email-icon';

    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.emailInputWarpper.appendChild(this.emailInput);
    this.emailInputWarpper.appendChild(emailIcon);

    this.passwordInput = document.createElement('input');
    this.passwordlInputWarpper.className = 'input-password-wrapper';
    this.passwordInput.className = 'input-password';
    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Password';

    const passwordIcon = new Image();
    passwordIcon.src = require('../images/lock.png');
    passwordIcon.alt = 'Password Icon';
    passwordIcon.className = 'input-password-icon';

    this.passwordInput.addEventListener(
      'input',
      this.validatePassword.bind(this)
    );
    this.passwordlInputWarpper.appendChild(this.passwordInput);
    this.passwordlInputWarpper.appendChild(passwordIcon);

    this.showPasswordCheckbox = document.createElement('input');
    this.showPasswordCheckbox.type = 'checkbox';
    this.passwordShowIcon.addEventListener('click', () => {
      this.showPasswordCheckbox.checked = !this.showPasswordCheckbox.checked;
      this.togglePasswordVisibility();
    });
    this.passwordHideIcon.addEventListener('click', () => {
      this.showPasswordCheckbox.checked = !this.showPasswordCheckbox.checked;
      this.togglePasswordVisibility();
    });

    this.loginButton = document.createElement('button');
    this.loginButton.textContent = 'Login';
    this.loginButton.className = 'login-button';
    this.loginButton.addEventListener('click', this.handleLogin.bind(this));

    this.loginButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.handleLogin();
      }
    });

    this.main.appendChild(this.emailInputWarpper);
    this.main.appendChild(this.emailErrorText);
    this.main.appendChild(this.passwordlInputWarpper);
    this.main.appendChild(this.loginButton);
  }

  private initializePasswordIcons(): void {
    this.passwordShowIcon.src = require('../images/eye-open.png');
    this.passwordShowIcon.alt = 'Password Show Icon';
    this.passwordShowIcon.className = 'input-password-showicon';
    this.passwordShowIcon.addEventListener(
      'click',
      this.togglePasswordVisibility
    );

    this.passwordHideIcon.src = require('../images/eye-close.png');
    this.passwordHideIcon.alt = 'Password Hide Icon';
    this.passwordHideIcon.className = 'input-password-hideicon';
    this.passwordHideIcon.addEventListener(
      'click',
      this.togglePasswordVisibility
    );

    this.passwordlInputWarpper.appendChild(this.passwordInput);
    this.passwordlInputWarpper.appendChild(this.passwordShowIcon);
    this.passwordlInputWarpper.appendChild(this.passwordHideIcon);
  }

  private togglePasswordVisibility = (): void => {
    if (this.showPasswordCheckbox.checked) {
      this.passwordInput.type = 'text';
      this.passwordShowIcon.style.display = 'inline';
      this.passwordHideIcon.style.display = 'none';
    } else {
      this.passwordInput.type = 'password';
      this.passwordShowIcon.style.display = 'none';
      this.passwordHideIcon.style.display = 'inline';
    }
  };

  private validateEmail(): boolean {
    const emailValue = this.emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      this.emailInput.setCustomValidity('Invalid email address');
      this.emailErrorText.textContent =
        'Please enter a valid email address (for example: user@example.com)';
      this.emailInput.classList.add('invalid-input');
      return false;
    } else {
      this.emailInput.setCustomValidity('');
      this.emailErrorText.textContent = '';
      this.emailInput.classList.remove('invalid-input');
      return true;
    }
  }

  private validatePassword(): boolean {
    const passwordValue = this.passwordInput.value;
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*]/;

    if (passwordValue.trim().length < minLength) {
      this.passwordInput.setCustomValidity(
        'Password must be at least 8 characters long'
      );
      this.passwordErrorText.textContent =
        'Password must be at least 8 characters long';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!uppercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one uppercase letter'
      );
      this.passwordErrorText.textContent =
        'Password must contain at least one uppercase letter';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!lowercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one lowercase letter'
      );
      this.passwordErrorText.textContent =
        'Password must contain at least one lowercase letter';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!digitPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one digit'
      );
      this.passwordErrorText.textContent =
        'Password must contain at least one digit';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!specialCharacterPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one special character'
      );
      this.passwordErrorText.textContent =
        'Password must contain at least one special character';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else {
      this.passwordInput.setCustomValidity('');
      this.passwordErrorText.textContent = '';
      this.passwordInput.classList.remove('invalid-input');
      return true;
    }
  }

  private handleLogin = (): void => {
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (isEmailValid && isPasswordValid) {
      this.router.navigateToHome();
      console.log('Login successful');
    } else {
      console.log('Invalid email or password');
    }
  };

  private initializeRegisterButton(): void {
    this.registerButton.textContent = 'Register';
    this.registerButton.className = 'reg-button';
    this.registerButton.addEventListener(
      'click',
      this.handleRegister.bind(this)
    );
    this.main.appendChild(this.registerButton);
  }

  private handleRegister(): void {
    this.router.navigateToRegister();
  }
}
