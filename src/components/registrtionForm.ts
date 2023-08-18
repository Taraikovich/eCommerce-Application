export class RegistratinForm {
  private form = document.createElement('form');

  shippingAddress = this.addFieldset('Shipping adress');

  constructor() {
    this.form.append(
      this.addTextInput('firstName', 'First name'),
      this.addTextInput('lastName', 'Last name'),
      this.addEmailInput('email', 'E-mail'),
      this.addPassInput('password', 'Password'),
      this.addDateInput('birth', 'Birth date: '),
      this.shippingAddress
    );
    this.shippingAddress.append(
      this.addCountrySelector('shipping-city', 'Country: '),
      this.addTextInput('shipping-city', 'City'),
      this.addTextInput('shipping-srteet', 'Street'),
      this.addTextInput('shipping-post-code', 'Post code')
    );

    document.body.append(this.form);
  }

  addTextInput(name: string, placeholder: string) {
    const wraper = document.createElement('div');
    wraper.className = name;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.placeholder = placeholder;
    wraper.append(input);
    return wraper;
  }

  addEmailInput(name: string, placeholder: string) {
    const wraper = document.createElement('div');
    wraper.className = name;
    const input = document.createElement('input');
    input.type = 'email';
    input.name = name;
    input.placeholder = placeholder;
    wraper.append(input);
    return wraper;
  }

  addPassInput(name: string, placeholder: string) {
    const wraper = document.createElement('div');
    wraper.className = name;
    const input = document.createElement('input');
    input.type = 'password';
    input.name = name;
    input.placeholder = placeholder;
    wraper.append(input);
    return wraper;
  }

  addDateInput(name: string, labelText: string) {
    const wraper = document.createElement('div');
    wraper.className = name;
    const input = document.createElement('input');
    input.type = 'date';
    input.name = name;
    input.id = name;
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = labelText;
    wraper.append(label, input);
    return wraper;
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
    const select = document.createElement('select');
    select.name = name;
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = labelText;
    select.append(
      this.createOption('RU', 'Russia'),
      this.createOption('DE', 'Germany')
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
}
