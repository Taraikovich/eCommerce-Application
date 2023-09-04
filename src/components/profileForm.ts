import { updatePassword } from '../api/updatePassword';
import { updateProfileData } from '../api/updateProfileData';
import { getUserId } from '../state/getUserId';
import { formValidation, realTimeValidation } from '../utils/formValidator';

export interface UserData {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  email: string;
  password: string;
}

interface Address {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
  id: string;
}

function getUserDataFromLocalStorage(userId: string): UserData | null {
  const userDataStr = localStorage.getItem('userData');

  if (userDataStr) {
    return JSON.parse(userDataStr);
  }
  return null;
}

export class ProfileForm {
  private form = document.createElement('form');

  // private isEmailValid = true;

  private editButton: HTMLButtonElement;

  private editPassButton: HTMLButtonElement;

  private modalPass: HTMLDivElement;

  private modal: HTMLDivElement;

  private closeModalButton: HTMLSpanElement;

  private closeModalButtonPass: HTMLSpanElement;

  private editForm: HTMLFormElement;

  private editFormPass: HTMLFormElement;

  private firstNameDisplay: HTMLDivElement;

  private lastNameDisplay: HTMLDivElement;

  private dateOfBirthDisplay: HTMLDivElement;

  private countryDisplay: HTMLDivElement;

  private countryDisplayB: HTMLDivElement;

  private cityDisplay: HTMLDivElement;

  private cityDisplayB: HTMLDivElement;

  private streetDisplay: HTMLDivElement;

  private streetDisplayB: HTMLDivElement;

  private postalDisplay: HTMLDivElement;

  private postalDisplayB: HTMLDivElement;

  private shippingForm: HTMLDivElement;

  private shippingAdressLabel: HTMLDivElement;

  private billingForm: HTMLDivElement;

  private billingAdressLabel: HTMLDivElement;

  private userTitle: HTMLDivElement;

  private addressTitle: HTMLDivElement;

  private shippingInputTitle: HTMLDivElement;

  private billingInputTitle: HTMLDivElement;

  private successMessage: HTMLDivElement;

  constructor() {
    this.form.className = 'form';
    this.userTitle = document.createElement('div');
    this.userTitle.className = 'title-info';
    this.userTitle.textContent = 'User information';
    this.addressTitle = document.createElement('div');
    this.addressTitle.className = 'title-info';
    this.addressTitle.textContent = 'User addresses';

    this.editPassButton = document.createElement('button');
    this.editPassButton.textContent = 'Change password';
    this.editPassButton.className = 'edit-pass-button';
    this.editPassButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModalPass();
      this.modalPass.style.display = 'block';
    });

    this.editButton = document.createElement('button');
    this.editButton.textContent = 'Edit';
    this.editButton.className = 'edit-button';
    this.editButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
      this.modal.style.display = 'block';
    });

    this.modal = document.createElement('div');
    this.modal.id = 'modal';
    this.modal.className = 'modal';
    this.modal.style.display = 'none';

    this.modalPass = document.createElement('div');
    this.modalPass.id = 'modal-pass';
    this.modalPass.className = 'modal-pass';
    this.modalPass.style.display = 'none';

    this.closeModalButton = document.createElement('span');
    this.closeModalButton.id = 'close-modal';
    this.closeModalButton.className = 'close';
    this.closeModalButton.textContent = '×';
    this.closeModalButton.addEventListener('click', () => this.closeModal());

    this.closeModalButtonPass = document.createElement('span');
    this.closeModalButtonPass.id = 'close-modal-pass';
    this.closeModalButtonPass.className = 'close';
    this.closeModalButtonPass.textContent = '×';
    this.closeModalButtonPass.addEventListener('click', () =>
      this.closeModalPass()
    );

    this.editForm = document.createElement('form');
    this.editForm.id = 'edit-form';
    this.editForm.addEventListener('submit', (e) => this.saveUserData(e));

    this.editFormPass = document.createElement('form');
    this.editFormPass.id = 'edit-form-pass';
    this.editFormPass.addEventListener('submit', (e) =>
      this.updateUserPassword(e)
    );

    this.successMessage = document.createElement('div');
    this.successMessage.className = 'success-message';
    this.successMessage.textContent = 'Changes have been saved successfully!';
    this.successMessage.style.display = 'none';
    this.form.appendChild(this.successMessage);
    this.appendInput('Email', 'email', this.editForm, 'email');
    this.appendInput('First Name', 'firstName', this.editForm);
    this.appendInput('Last Name', 'lastName', this.editForm);
    this.appendInput('Date of birth', 'birth', this.editForm);
    this.appendInput('Country', 'shipping-country', this.editForm);
    this.appendInput('City', 'shipping-city', this.editForm);
    this.appendInput('Street', 'shipping-street', this.editForm);
    this.appendInput('Postal code', 'shipping-post-code', this.editForm);
    this.appendInput('Country', 'billing-country', this.editForm);
    this.appendInput('City', 'billing-city', this.editForm);
    this.appendInput('Street', 'billing-street', this.editForm);
    this.appendInput('Postal code', 'billing-post-code', this.editForm);

    this.shippingInputTitle = document.createElement('div');
    this.shippingInputTitle.textContent = 'Shipping address';
    this.shippingInputTitle.className = 'title-address';

    this.billingInputTitle = document.createElement('div');
    this.billingInputTitle.textContent = 'Billing address';
    this.billingInputTitle.className = 'title-address';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    this.editForm.appendChild(saveButton);

    this.firstNameDisplay = document.createElement('div');
    this.firstNameDisplay.id = 'first-name-display';
    this.firstNameDisplay.className = 'form-frame';

    this.lastNameDisplay = document.createElement('div');
    this.lastNameDisplay.id = 'last-name-display';
    this.lastNameDisplay.className = 'form-frame';

    this.dateOfBirthDisplay = document.createElement('div');
    this.dateOfBirthDisplay.id = 'date-of-birth-display';
    this.dateOfBirthDisplay.className = 'form-frame';

    this.shippingForm = document.createElement('div');
    this.shippingForm.id = 'shipping-form';

    this.shippingAdressLabel = document.createElement('div');
    this.shippingAdressLabel.className = 'address-label';
    this.shippingAdressLabel.textContent = 'Shipping address';

    this.countryDisplay = document.createElement('div');
    this.countryDisplay.id = 'country-display';

    this.countryDisplayB = document.createElement('div');
    this.countryDisplayB.id = 'country-display-b';

    this.cityDisplay = document.createElement('div');
    this.cityDisplay.id = 'city-display';

    this.cityDisplayB = document.createElement('div');
    this.cityDisplayB.id = 'city-display-b';

    this.streetDisplay = document.createElement('div');
    this.streetDisplay.id = 'street-display';

    this.streetDisplayB = document.createElement('div');
    this.streetDisplayB.id = 'street-display-b';

    this.postalDisplay = document.createElement('div');
    this.postalDisplay.id = 'postal-display';

    this.postalDisplayB = document.createElement('div');
    this.postalDisplayB.id = 'postal-display-b';

    this.billingForm = document.createElement('div');
    this.billingForm.id = 'billing-form';

    this.billingAdressLabel = document.createElement('div');
    this.billingAdressLabel.className = 'address-label';
    this.billingAdressLabel.textContent = 'Billing address';

    this.form.appendChild(this.userTitle);
    this.form.appendChild(this.firstNameDisplay);
    this.form.appendChild(this.lastNameDisplay);
    this.form.appendChild(this.dateOfBirthDisplay);
    this.form.appendChild(this.addressTitle);

    this.form.appendChild(this.shippingForm);
    this.shippingForm.appendChild(this.shippingAdressLabel);
    this.shippingForm.appendChild(this.countryDisplay);
    this.shippingForm.appendChild(this.cityDisplay);
    this.shippingForm.appendChild(this.streetDisplay);
    this.shippingForm.appendChild(this.postalDisplay);
    this.form.appendChild(this.billingForm);
    this.billingForm.appendChild(this.billingAdressLabel);
    this.billingForm.appendChild(this.countryDisplayB);
    this.billingForm.appendChild(this.cityDisplayB);
    this.billingForm.appendChild(this.streetDisplayB);
    this.billingForm.appendChild(this.postalDisplayB);

    this.form.appendChild(this.editButton);
    this.form.appendChild(this.editPassButton);

    this.modal.appendChild(this.closeModalButton);
    this.modal.appendChild(this.editForm);
    this.appendInput(
      'Current password',
      'current-password',
      this.editFormPass,
      'password'
    );
    this.appendInput('New password', 'password', this.editFormPass, 'password');
    this.appendInput(
      'Confirm new password',
      'confirm-password',
      this.editFormPass,
      'password'
    );
    const saveButtonPass = document.createElement('input');
    saveButtonPass.value = 'Save';
    saveButtonPass.type = 'submit';
    this.editFormPass.appendChild(saveButtonPass);

    const cancelButtonPass = document.createElement('input');
    cancelButtonPass.type = 'button';
    cancelButtonPass.value = 'Cancel';
    cancelButtonPass.textContent = 'Cancel';
    this.editFormPass.appendChild(cancelButtonPass);

    cancelButtonPass.addEventListener('click', () => this.closeModalPass());

    this.modalPass.appendChild(this.closeModalButtonPass);
    this.modalPass.appendChild(this.editFormPass);

    // this.emailInput.addEventListener('input', (e) => {
    //   realTimeValidation(e);
    // });
  }

  appendInput(
    textContent: string,
    name: string,
    form: HTMLFormElement,
    type?: string
  ): void {
    const wrapper = document.createElement('div');
    wrapper.className = `form__${name}`;
    const inputTitle = document.createElement('div');
    inputTitle.textContent = textContent;
    inputTitle.className = 'info-input-title';
    const input = document.createElement('input');
    input.name = name;
    input.className = 'info-input';
    input.type = type ? type : 'text';
    const error = document.createElement('div');
    error.className = 'form__error';
    input.addEventListener('input', () => {
      error.textContent = '';
      input.style.border = '1px solid #ccc';
    });

    wrapper.appendChild(inputTitle);
    wrapper.appendChild(input);
    wrapper.appendChild(error);
    form.appendChild(wrapper);
  }

  createForm(): HTMLFormElement {
    this.form.appendChild(this.modal);
    this.form.appendChild(this.modalPass);
    return this.form;
  }

  private openModal(): void {
    this.modal.style.display = 'none';

    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      if (userData) {
        (this.editForm.elements as any).firstName.value = userData.firstName;
        (this.editForm.elements as any).lastName.value = userData.lastName;
        (this.editForm.elements as any).birth.value = userData.dateOfBirth;
        (this.editForm.elements as any).email.value = userData.email;
        const shippingAddress = userData?.addresses.find(
          (adress) => adress.id === userData.defaultShippingAddressId
        );
        const billingAddress = userData?.addresses.find(
          (adress) => adress.id === userData.defaultBillingAddressId
        );
        (this.editForm.elements as any)['shipping-country'].value =
          shippingAddress?.country;
        (this.editForm.elements as any)['shipping-city'].value =
          shippingAddress?.city;
        (this.editForm.elements as any)['shipping-street'].value =
          shippingAddress?.streetName;
        (this.editForm.elements as any)['shipping-post-code'].value =
          shippingAddress?.postalCode;

        (this.editForm.elements as any)['billing-country'].value =
          shippingAddress?.country;
        (this.editForm.elements as any)['billing-city'].value =
          shippingAddress?.city;
        (this.editForm.elements as any)['billing-street'].value =
          shippingAddress?.streetName;
        (this.editForm.elements as any)['billing-post-code'].value =
          shippingAddress?.postalCode;
      }
    }
  }

  private openModalPass(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
    }
  }

  private closeModal(): void {
    this.modal.style.display = 'none';
  }

  private closeModalPass(): void {
    this.modalPass.style.display = 'none';
  }

  private async updateUserPassword(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        const currentPassword = formData.get('current-password') as string;
        const newPassword = formData.get('password') as string;

        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          await updatePassword(
            userData.id,
            userData.version,
            currentPassword,
            newPassword,
            e
          );

          this.showSuccessMessage();
          setTimeout(() => this.hideSuccessMessage(), 3000);
          this.closeModalPass();
        }
      }
    }
  }

  private async saveUserData(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        userData.firstName = formData.get('firstName') as string;
        userData.lastName = formData.get('lastName') as string;
        userData.dateOfBirth = formData.get('birth') as string;
        userData.email = formData.get('email') as string;
        const shippingAddressIndex = userData?.addresses.findIndex(
          (adress) => adress.id === userData.defaultShippingAddressId
        );
        const billingAddress = userData?.addresses.find(
          (adress) => adress.id === userData.defaultBillingAddressId
        );
        userData.addresses[shippingAddressIndex].country = formData.get(
          'shipping-country'
        ) as string;
        userData.addresses[shippingAddressIndex].city = formData.get(
          'shipping-city'
        ) as string;
        userData.addresses[shippingAddressIndex].streetName = formData.get(
          'shipping-street'
        ) as string;
        userData.addresses[shippingAddressIndex].postalCode = formData.get(
          'shipping-post-code'
        ) as string;

        userData.addresses[shippingAddressIndex].country = formData.get(
          'billing-country'
        ) as string;
        userData.addresses[shippingAddressIndex].city = formData.get(
          'billing-city'
        ) as string;
        userData.addresses[shippingAddressIndex].streetName = formData.get(
          'billing-street'
        ) as string;
        userData.addresses[shippingAddressIndex].postalCode = formData.get(
          'billing-post-code'
        ) as string;

        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          await updateProfileData(userData, e);
          this.populateUserData();
          this.showSuccessMessage();
          setTimeout(() => this.hideSuccessMessage(), 3000);
          this.closeModal();
        }
      }
    }
  }

  private showSuccessMessage(): void {
    this.successMessage.style.display = 'block';
  }

  private hideSuccessMessage(): void {
    this.successMessage.style.display = 'none';
  }

  private updateFirstNameDisplay(firstName: string): void {
    this.firstNameDisplay.textContent = `First Name: ${firstName}`;
  }

  private updateLastNameDisplay(lastName: string): void {
    this.lastNameDisplay.textContent = `Last Name: ${lastName}`;
  }

  private updateDateOfBirthDisplay(dateOfBirth: string): void {
    this.dateOfBirthDisplay.textContent = `Date of Birth: ${dateOfBirth}`;
  }

  private updateCountryDisplay(country: string): void {
    this.countryDisplay.textContent = `Country: ${country}`;
  }

  private updateCityDisplay(city: string): void {
    this.cityDisplay.textContent = `City: ${city}`;
  }

  private updatestreetDisplay(streetName: string): void {
    this.streetDisplay.textContent = `Street: ${streetName}`;
  }

  private updatepostalDisplay(postalCode: string): void {
    this.postalDisplay.textContent = `Postal code: ${postalCode}`;
  }

  private updateCountryDisplayB(country: string): void {
    this.countryDisplayB.textContent = `Country: ${country}`;
  }

  private updateCityDisplayB(city: string): void {
    this.cityDisplayB.textContent = `City: ${city}`;
  }

  private updatestreetDisplayB(streetName: string): void {
    this.streetDisplayB.textContent = `Street: ${streetName}`;
  }

  private updatepostalDisplayB(postalCode: string): void {
    this.postalDisplayB.textContent = `Postal code: ${postalCode}`;
  }

  public populateUserData(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      const shippingAddress = userData?.addresses.find(
        (adress) => adress.id === userData.defaultShippingAddressId
      );
      const billingAddress = userData?.addresses.find(
        (adress) => adress.id === userData.defaultBillingAddressId
      );
      if (userData) {
        this.updateFirstNameDisplay(userData.firstName);
        this.updateLastNameDisplay(userData.lastName);
        this.updateDateOfBirthDisplay(userData.dateOfBirth);
        this.updateCountryDisplay(shippingAddress?.country as string);
        this.updateCityDisplay(shippingAddress?.city as string);
        this.updatestreetDisplay(shippingAddress?.streetName as string);
        this.updatepostalDisplay(shippingAddress?.postalCode as string);
        this.updateCountryDisplayB(billingAddress?.country as string);
        this.updateCityDisplayB(billingAddress?.city as string);
        this.updatestreetDisplayB(billingAddress?.streetName as string);
        this.updatepostalDisplayB(billingAddress?.postalCode as string);
      }
    }
  }
}
