import { formValidation } from '../utils/formValidator';
import { createCustomer } from '../api/createCustomer';

export class RegistratinForm {
  private form = document.createElement('form');

  shippingAddress = this.addFieldset('Shipping adress');

  billingAddress = this.addFieldset('Billing adress');

  constructor() {
    this.form.className = 'form';
    this.form.append(
      this.addInput('text', 'firstName', 'First name'),
      this.addInput('text', 'lastName', 'Last name'),
      this.addInput('date', 'birth', '', 'Birth date: '),
      this.addInput('email', 'email', 'E-mail'),
      this.addInput('password', 'password', 'Password'),
      this.shippingAddress,
      this.addCheckbox(
        'addressesMatch',
        'Billing address and shipping address match.'
      ),
      this.billingAddress,
      this.addSubmitBtn()
    );

    this.shippingAddress.append(
      this.addCountrySelector('billing-country', 'Country: '),
      this.addInput('text', 'billing-city', 'City'),
      this.addInput('text', 'billing-srteet', 'Street'),
      this.addInput('text', 'billing-building', 'Building'),
      this.addInput('text', 'billing-post-code', 'Post code')
    );

    this.billingAddress.append(
      this.addCountrySelector('shipping-country', 'Country: '),
      this.addInput('text', 'shipping-city', 'City'),
      this.addInput('text', 'shipping-srteet', 'Street'),
      this.addInput('text', 'shipping-building', 'Building'),
      this.addInput('text', 'shipping-post-code', 'Post code')
    );

    document.body.append(this.form);
  }

  addInput(
    inputType: string,
    name: string,
    placeholder?: string,
    labelText?: string
  ) {
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

    if (inputType === 'password') {
      const showPass = document.createElement('div');
      showPass.textContent = 'show';
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

  addFieldset(legendText: string): HTMLFieldSetElement {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = legendText;
    fieldset.append(legend);
    return fieldset;
  }

  addCountrySelector(name: string, labelText: string) {
    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const select = document.createElement('select');
    select.name = name;
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = labelText;
    select.append(
      this.createOption('RU', 'Russia'),
      this.createOption('GE', 'Georgia'),
      this.createOption('BY', 'Belarus')
    );
    wrapper.append(label, select);
    return wrapper;
  }

  createOption(value: string, text: string) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
  }

  addCheckbox(name: string, labelText: string) {
    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name; //'addressesMatch'
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = labelText;
    wrapper.append(checkbox, label);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const billingCountry = this.billingAddress.childNodes[1]
          .childNodes[1] as HTMLInputElement;
        const shippingCountry = this.shippingAddress.childNodes[1]
          .childNodes[1] as HTMLInputElement;
        billingCountry.value = shippingCountry.value;
        for (let i = 2; i <= 5; i++) {
          const billingInput = this.billingAddress.childNodes[i]
            .childNodes[0] as HTMLInputElement;
          const shippingInput = this.shippingAddress.childNodes[i]
            .childNodes[0] as HTMLInputElement;
          billingInput.value = shippingInput.value;
        }
      }
    });

    return wrapper;
  }

  addSubmitBtn() {
    const input = document.createElement('input');
    input.type = 'submit';

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValid = formValidation(e);
      if (formValid) createCustomer(e);
    });

    return input;
  }
}
