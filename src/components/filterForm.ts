export class FilterForm {
  private form = document.createElement('form');

  private type = this.addFieldset('type');

  private color = this.addFieldset('color');

  private gender = this.addFieldset('for');

  constructor() {
    this.form.className = 'form form_filter form_filter-hide';

    this.form.append(
      this.gender,
      this.type,
      this.color,
      this.addFormBtn(),
      this.addSelector('sort', 'sort: ')
    );

    this.gender.append(
      this.addCheckbox('male', 'gender'),
      this.addCheckbox('female', 'gender'),
      this.addCheckbox('kids', 'gender')
    );

    this.type.append(
      this.addCheckbox('cane', 'type'),
      this.addCheckbox('folding', 'type')
    );

    this.color.append(
      this.addCheckbox('black', 'color'),
      this.addCheckbox('blue', 'color'),
      this.addCheckbox('pink', 'color'),
      this.addCheckbox('gray', 'color'),
      this.addCheckbox('orange', 'color'),
      this.addCheckbox('multicolour', 'color')
    );
  }

  create() {
    return this.form;
  }

  private addFieldset(legendText: string): HTMLFieldSetElement {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = legendText;
    fieldset.append(legend);
    return fieldset;
  }

  private addCheckbox(name: string, attribute: string): HTMLElement {
    const queryString = window.location.search;

    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name;
    if (queryString.includes(name)) checkbox.checked = true;
    checkbox.setAttribute('filter', attribute);
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = name;
    wrapper.append(checkbox, label);

    return wrapper;
  }

  private addSelector(name: string, labelText: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const select = document.createElement('select');
    select.name = name;
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = labelText;
    select.append(
      this.createOption('name.en-US asc', 'name (a-z)'),
      this.createOption('name.en-US desc', 'name (z-a)'),
      this.createOption('price asc', 'price (cheap first)'),
      this.createOption('price desc', 'price (expensive first)')
    );
    wrapper.append(label, select);
    return wrapper;
  }

  private createOption(value: string, text: string): HTMLElement {
    const queryString = decodeURIComponent(window.location.search);

    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;

    if (queryString.includes(value)) option.selected = true;
    return option;
  }

  private addFormBtn() {
    const btn = document.createElement('button');
    btn.className = 'form__btn';
    btn.textContent = 'open filter';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.textContent === 'open filter') {
        btn.textContent = 'close filter';
      } else {
        btn.textContent = 'open filter';
      }
      this.form.classList.toggle('form_filter-hide');
    });

    return btn;
  }
}
