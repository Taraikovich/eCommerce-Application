import { View } from './view';
import { Router } from '../router/router';

export class LoginPageView extends View {
  private emailInput: HTMLInputElement = document.createElement('input');

  private passwordInput: HTMLInputElement = document.createElement('input');

  private showPasswordCheckbox: HTMLInputElement =
    document.createElement('input');

  private loginButton: HTMLButtonElement = document.createElement('button');

  private registerButton: HTMLButtonElement = document.createElement('button');

  private emailErrorText: HTMLDivElement = document.createElement('div');

  private passwordErrorText: HTMLDivElement = document.createElement('div');

  constructor(private router: Router) {
    super();
    this.createContent();
    this.initializeInputs();
    this.initializeRegisterButton();
    this.initializeErrorTexts();
  }

  private createContent(): void {
    this.main.textContent = 'Welcome back';
  }

  private initializeErrorTexts(): void {
    this.emailErrorText.className = 'error-text';
    this.passwordErrorText.className = 'error-text';
    this.main.insertBefore(this.emailErrorText, this.passwordInput);
    this.main.insertBefore(this.passwordErrorText, this.passwordInput);
  }

  private initializeInputs(): void {
    this.emailInput = document.createElement('input');
    this.emailInput.className = 'input';
    this.emailInput.type = 'email';
    this.emailInput.placeholder = 'Email';

    const emailIcon = document.createElement('img');
    emailIcon.src = require('../images/lock.png');
    emailIcon.alt = 'Email Icon';
    

    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.emailInput.insertBefore(emailIcon, this.emailInput.firstChild);

    this.passwordInput = document.createElement('input');
    this.passwordInput.className = 'input';
    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Password';

    const passwordIcon = document.createElement('img');
    passwordIcon.src = require('../images/lock.png');
    passwordIcon.alt = 'Password Icon';
    const passwordShowIcon = document.createElement('img');
    passwordShowIcon.src = require('../images/eye.png');
    passwordShowIcon.alt = 'Password Show Icon';

    this.passwordInput.addEventListener(
      'input',
      this.validatePassword.bind(this)
    );
    this.passwordInput.insertBefore(
      passwordIcon,
      this.passwordInput.firstChild
    );
    this.passwordInput.insertBefore(
      passwordShowIcon,
      this.passwordInput.lastChild
    );

    this.showPasswordCheckbox = document.createElement('input');
    this.showPasswordCheckbox.type = 'checkbox';
    this.showPasswordCheckbox.addEventListener(
      'change',
      this.togglePasswordVisibility
    );

    const showPasswordLabel = document.createElement('label');
    showPasswordLabel.textContent = 'Show Password';
    showPasswordLabel.appendChild(this.showPasswordCheckbox);
    // Append inputs to the main content

    this.loginButton = document.createElement('button');
    this.loginButton.textContent = 'Login';
    this.loginButton.addEventListener('click', this.handleLogin.bind(this));

    this.loginButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.handleLogin();
      }
    });

    this.main.appendChild(this.emailInput);
    this.main.appendChild(this.emailErrorText);
    this.main.appendChild(this.passwordInput);
    this.main.appendChild(showPasswordLabel);
    this.main.appendChild(this.loginButton);
  }

  private togglePasswordVisibility = (): void => {
    if (this.showPasswordCheckbox.checked) {
      this.passwordInput.type = 'text';
    } else {
      this.passwordInput.type = 'password';
    }
  };

  private validateEmail(): boolean {
    const emailValue = this.emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      this.emailInput.setCustomValidity('Invalid email address');
      this.emailErrorText.textContent = 'Invalid email address';
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
      this.passwordErrorText.textContent = 'Password must be at least 8 characters long';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!uppercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one uppercase letter'
      );
      this.passwordErrorText.textContent = 'Password must contain at least one uppercase letter';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!lowercasePattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one lowercase letter'
      );
      this.passwordErrorText.textContent = 'Password must contain at least one lowercase letter';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!digitPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one digit'
      );
      this.passwordErrorText.textContent = 'Password must contain at least one digit';
      this.passwordInput.classList.add('invalid-input');
      return false;
    } else if (!specialCharacterPattern.test(passwordValue)) {
      this.passwordInput.setCustomValidity(
        'Password must contain at least one special character'
      );
      this.passwordErrorText.textContent = 'Password must contain at least one special character';
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
