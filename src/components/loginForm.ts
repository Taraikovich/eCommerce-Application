import { formValidation } from '../utils/formValidator';
import { login } from '../api/login';

export class LoginForm {
  private form = document.createElement('form');

  constructor() {
    this.form.className = 'form';
    this.form.append(
      this.addInput('email', 'email', 'E-mail'),
      this.addInput('password', 'password', 'Password'),
      this.addSubmitBtn()
    );
  }

  createForm(): HTMLFormElement {
    return this.form;
  }

  private addInput(
    inputType: string,
    name: string,
    placeholder?: string,
    labelText?: string
  ): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const input = document.createElement('input');
    input.type = inputType;
    input.name = name;
    if (placeholder) input.placeholder = placeholder;
    const error = document.createElement('div');
    error.className = 'form__error';
    input.addEventListener('input', () => {
      error.textContent = '';
      input.style.border = '1px solid #ccc';
    });

    if (inputType === 'email') {
      wrapper.className = `form__${name} form__${name}_input`;
    }

    if (inputType === 'password') {
      wrapper.className = `form__${name} form__${name}_input`;
      const showPass = document.createElement('div');
      showPass.className = 'show-pass';
      showPass.addEventListener('mousedown', () => {
        input.type = 'text';
      });

      showPass.addEventListener('mouseup', () => {
        input.type = 'password';
      });
      wrapper.append(input, showPass, error);
    } else if (inputType === 'date') {
      const label = document.createElement('label');
      label.setAttribute('for', name);
      if (labelText) label.textContent = labelText;
      wrapper.append(label, input, error);
    } else {
      wrapper.append(input, error);
    }

    return wrapper;
  }

  private addSubmitBtn(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'submit';

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValid = formValidation(e);
      if (formValid) login(e);
    });

    return input;
  }
}
