import { Address, Customer } from '@commercetools/platform-sdk';
import { deleteAddress } from '../api/deleteAddress';
import { addAddress } from '../api/addAddress';
import { updatePassword } from '../api/updatePassword';
import { updateProfileData } from '../api/updateProfileData';
import { getUserId } from '../state/getUserId';
import { formValidation } from '../utils/formValidator';
import { editAddress } from '../api/editAddress';
import { changeDefaultAddress } from '../api/changeDefaultAddress';

export interface UserData {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: UserDataAddress[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  email: string;
  password: string;
}

export interface UserDataAddress {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
  id?: string;
}

function getUserDataFromLocalStorage(): UserData | null {
  const userDataStr = localStorage.getItem('userData');

  if (userDataStr) {
    return JSON.parse(userDataStr);
  }
  return null;
}

export class ProfileForm {
  private form: HTMLDivElement;

  private wrapperUserForm: HTMLDivElement;

  private wrapperInfoForm: HTMLDivElement;

  private wrapperAddressForm: HTMLDivElement;

  private wrapperShipForm: HTMLDivElement;

  private wrapperBilForm: HTMLDivElement;

  private wrapperShipBilForm: HTMLDivElement;

  private wrapperEditButton: HTMLDivElement;

  private editButton: HTMLButtonElement;

  private editAddressButton: HTMLButtonElement;

  private editPassButton: HTMLButtonElement;

  private modalPass: HTMLDivElement;

  private modalAddress: HTMLDivElement;

  private modal: HTMLDivElement;

  private closeModalButton: HTMLSpanElement;

  private closeModalButtonPass: HTMLSpanElement;

  private closeModalButtonAddress: HTMLSpanElement;

  private editForm: HTMLFormElement;

  private editFormPass: HTMLFormElement;

  private editFormAddress: HTMLFormElement;

  private firstNameDisplay: HTMLDivElement;

  private lastNameDisplay: HTMLDivElement;

  private dateOfBirthDisplay: HTMLDivElement;

  private emailDisplay: HTMLDivElement;

  private shippingForm: HTMLDivElement;

  private shippingAdressLabel: HTMLDivElement;

  private billingForm: HTMLDivElement;

  private billingAdressLabel: HTMLDivElement;

  private userTitle: HTMLDivElement;

  private addressTitle: HTMLDivElement;

  private shippingInputTitle: HTMLDivElement;

  private billingInputTitle: HTMLDivElement;

  private successMessage: HTMLDivElement;

  private isBillingAddressType = false;

  constructor() {
    this.form = document.createElement('div');
    this.wrapperUserForm = document.createElement('div');
    this.wrapperUserForm.className = 'wrapper-profile';
    this.wrapperInfoForm = document.createElement('div');
    this.wrapperInfoForm.className = 'wrapper-info';
    this.wrapperAddressForm = document.createElement('div');
    this.wrapperAddressForm.className = 'wrapper-address';
    this.wrapperShipBilForm = document.createElement('div');
    this.wrapperShipBilForm.className = 'wrapper-ship-bill';
    this.wrapperShipForm = document.createElement('div');
    this.wrapperShipForm.className = 'wrapper-profile';
    this.wrapperBilForm = document.createElement('div');
    this.wrapperBilForm.className = 'wrapper-profile';
    this.wrapperEditButton = document.createElement('div');
    this.wrapperEditButton.className = 'wrapper-edit-button';
    this.form.className = 'form-profile';
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

    this.editAddressButton = document.createElement('button');
    this.editAddressButton.textContent = 'Add new address';
    this.editAddressButton.className = 'edit-address-button';
    this.editAddressButton.addEventListener('click', () => {
      this.isBillingAddressType = false;
      this.openModalAddress();
    });

    const buttonBilling = document.createElement('button');
    buttonBilling.textContent = 'Add new billing address';
    buttonBilling.className = 'edit-address-button';
    buttonBilling.addEventListener('click', () => {
      this.isBillingAddressType = true;
      this.openModalAddress();
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

    this.modalAddress = document.createElement('div');
    this.modalAddress.id = 'modal-address';
    this.modalAddress.className = 'modal';
    this.modalAddress.style.display = 'none';

    this.modalPass = document.createElement('div');
    this.modalPass.id = 'modal-pass';
    this.modalPass.className = 'modal';
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

    this.closeModalButtonAddress = document.createElement('span');
    this.closeModalButtonAddress.id = 'close-modal-address';
    this.closeModalButtonAddress.className = 'close';
    this.closeModalButtonAddress.textContent = '×';
    this.closeModalButtonAddress.addEventListener('click', () =>
      this.closeModalAddress()
    );

    this.editForm = document.createElement('form');
    this.editForm.id = 'edit-form';
    this.editForm.addEventListener('submit', (e) => this.saveUserData(e));

    this.editFormPass = document.createElement('form');
    this.editFormPass.id = 'edit-form-pass';
    this.editFormPass.addEventListener('submit', (e) =>
      this.updateUserPassword(e)
    );

    this.editFormAddress = document.createElement('form');
    this.editFormAddress.id = 'edit-form-address';

    this.successMessage = document.createElement('div');
    this.successMessage.className = 'success-message';
    this.successMessage.textContent = 'Changes have been saved successfully!';
    this.successMessage.style.display = 'none';
    this.form.appendChild(this.successMessage);
    this.appendInput('Email', 'email', this.editForm, 'email');
    this.appendInput('First Name', 'firstName', this.editForm);
    this.appendInput('Last Name', 'lastName', this.editForm);
    this.appendInput('Date of birth', 'birth', this.editForm);

    this.appendInput('Country', 'country', this.editFormAddress);
    this.appendInput('City', 'city', this.editFormAddress);
    this.appendInput('Street', 'street', this.editFormAddress);
    this.appendInput('Postal code', 'post-code', this.editFormAddress);

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

    this.emailDisplay = document.createElement('div');
    this.emailDisplay.id = 'email-display';
    this.emailDisplay.className = 'form-frame';

    this.shippingForm = document.createElement('div');
    this.shippingForm.id = 'shipping-form';

    this.shippingAdressLabel = document.createElement('div');
    this.shippingAdressLabel.className = 'address-label';
    this.shippingAdressLabel.textContent = 'Shipping address';

    this.billingForm = document.createElement('div');
    this.billingForm.id = 'billing-form';

    this.billingAdressLabel = document.createElement('div');
    this.billingAdressLabel.className = 'address-label';
    this.billingAdressLabel.textContent = 'Billing address';

    this.wrapperUserForm.appendChild(this.userTitle);
    this.wrapperInfoForm.appendChild(this.firstNameDisplay);
    this.wrapperInfoForm.appendChild(this.lastNameDisplay);
    this.wrapperInfoForm.appendChild(this.dateOfBirthDisplay);
    this.wrapperInfoForm.appendChild(this.emailDisplay);
    this.wrapperUserForm.appendChild(this.wrapperInfoForm);
    this.wrapperEditButton.appendChild(this.editButton);
    this.wrapperEditButton.appendChild(this.editPassButton);
    this.wrapperUserForm.appendChild(this.wrapperEditButton);

    this.wrapperAddressForm.appendChild(this.addressTitle);
    this.wrapperShipForm.appendChild(this.shippingInputTitle);
    this.wrapperShipForm.appendChild(this.shippingForm);
    this.shippingForm.appendChild(this.shippingAdressLabel);
    this.wrapperShipForm.appendChild(this.editAddressButton);

    this.wrapperShipBilForm.appendChild(this.wrapperShipForm);
    this.wrapperShipBilForm.appendChild(this.wrapperBilForm);

    this.wrapperBilForm.appendChild(this.billingInputTitle);
    this.wrapperBilForm.appendChild(this.billingForm);
    this.billingForm.appendChild(this.billingAdressLabel);
    this.wrapperBilForm.appendChild(buttonBilling);
    this.wrapperAddressForm.appendChild(this.wrapperShipBilForm);
    this.form.appendChild(this.wrapperUserForm);
    this.form.appendChild(this.wrapperAddressForm);

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
    saveButtonPass.className = 'button';
    this.editFormPass.appendChild(saveButtonPass);

    const cancelButtonPass = document.createElement('input');
    cancelButtonPass.type = 'button';
    cancelButtonPass.value = 'Cancel';
    cancelButtonPass.className = 'button';
    cancelButtonPass.textContent = 'Cancel';
    this.editFormPass.appendChild(cancelButtonPass);

    cancelButtonPass.addEventListener('click', () => this.closeModalPass());

    this.modalPass.appendChild(this.closeModalButtonPass);
    this.modalPass.appendChild(this.editFormPass);

    const saveButtonAddress = document.createElement('input');
    saveButtonAddress.value = 'Save';
    saveButtonAddress.type = 'submit';
    saveButtonAddress.className = 'button';
    this.editFormAddress.appendChild(saveButtonAddress);

    const cancelButtonAddress = document.createElement('input');
    cancelButtonAddress.type = 'button';
    cancelButtonAddress.value = 'Cancel';
    cancelButtonAddress.className = 'button';
    cancelButtonAddress.textContent = 'Cancel';
    this.editFormAddress.appendChild(cancelButtonAddress);

    cancelButtonAddress.addEventListener('click', () =>
      this.closeModalAddress()
    );

    this.modalAddress.appendChild(this.closeModalButtonAddress);
    this.modalAddress.appendChild(this.editFormAddress);
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

  createForm(): HTMLDivElement {
    this.form.appendChild(this.modal);
    this.form.appendChild(this.modalPass);
    this.form.appendChild(this.modalAddress);
    return this.form;
  }

  private openModal(): void {
    this.modal.style.display = 'none';

    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      if (userData) {
        const formElement = this.editForm as HTMLFormElement;

        const firstNameInput = formElement.elements.namedItem(
          'firstName'
        ) as HTMLInputElement;
        const lastNameInput = formElement.elements.namedItem(
          'lastName'
        ) as HTMLInputElement;
        const birthInput = formElement.elements.namedItem(
          'birth'
        ) as HTMLInputElement;
        const emailInput = formElement.elements.namedItem(
          'email'
        ) as HTMLInputElement;

        if (firstNameInput) {
          firstNameInput.value = userData.firstName;
        }
        if (lastNameInput) {
          lastNameInput.value = userData.lastName;
        }
        if (birthInput) {
          birthInput.value = userData.dateOfBirth;
        }
        if (emailInput) {
          emailInput.value = userData.email;
        }
      }
    }
  }

  private openModalPass(): void {}

  private openModalAddress(address?: Address): void {
    this.modalAddress.style.display = 'block';
    const editCallback = (e: SubmitEvent) => {
      this.editAddress(e, address?.id as string);
    };
    const addCallback = (e: SubmitEvent) => {
      this.addAddress(e, this.isBillingAddressType);
    };
    this.editFormAddress.removeEventListener('submit', editCallback);
    this.editFormAddress.removeEventListener('submit', addCallback);
    if (address) {
      const {
        country,
        city,
        streetName: street,
        postalCode: postCode,
      } = address;

      const form = this.editFormAddress as HTMLFormElement;
      const countryInput = form.elements.namedItem(
        'country'
      ) as HTMLInputElement;
      const cityInput = form.elements.namedItem('city') as HTMLInputElement;
      const streetInput = form.elements.namedItem('street') as HTMLInputElement;
      const postCodeInput = form.elements.namedItem(
        'post-code'
      ) as HTMLInputElement;

      if (countryInput) {
        countryInput.value = country || '';
      }
      if (cityInput) {
        cityInput.value = city || '';
      }
      if (streetInput) {
        streetInput.value = street || '';
      }
      if (postCodeInput) {
        postCodeInput.value = postCode || '';
      }

      form.addEventListener('submit', editCallback);
    } else {
      const form = this.editFormAddress as HTMLFormElement;
      const countryInput = form.elements.namedItem(
        'country'
      ) as HTMLInputElement;
      const cityInput = form.elements.namedItem('city') as HTMLInputElement;
      const streetInput = form.elements.namedItem('street') as HTMLInputElement;
      const postCodeInput = form.elements.namedItem(
        'post-code'
      ) as HTMLInputElement;

      if (countryInput) {
        countryInput.value = '';
      }
      if (cityInput) {
        cityInput.value = '';
      }
      if (streetInput) {
        streetInput.value = '';
      }
      if (postCodeInput) {
        postCodeInput.value = '';
      }

      form.addEventListener('submit', addCallback);
    }
  }

  private closeModal(): void {
    this.modal.style.display = 'none';
  }

  private closeModalPass(): void {
    this.modalPass.style.display = 'none';
  }

  private closeModalAddress(): void {
    this.modalAddress.style.display = 'none';
  }

  private async updateUserPassword(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        const currentPassword = formData.get('current-password') as string;
        const newPassword = formData.get('password') as string;

        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          const result = await updatePassword(
            userData.id,
            userData.version,
            currentPassword,
            newPassword,
            e
          );
          if (result) {
            this.showSuccessMessage();
            setTimeout(() => this.hideSuccessMessage(), 3000);
            this.closeModalPass();
          }
        }
      }
    }
  }

  private async addAddress(e: SubmitEvent, isBilling: boolean): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        const data: UserDataAddress = {
          country: formData.get('country') as string,
          city: formData.get('city') as string,
          postalCode: formData.get('post-code') as string,
          streetName: formData.get('street') as string,
        };
        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          const result = await addAddress(userData, data, isBilling, e);
          if (result) {
            this.populateUserData();
            this.showSuccessMessage();
            setTimeout(() => this.hideSuccessMessage(), 3000);
            this.closeModalAddress();
          }
        }
      }
    }
  }

  private async editAddress(e: SubmitEvent, addressId: string): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        const data: UserDataAddress = {
          country: formData.get('country') as string,
          city: formData.get('city') as string,
          postalCode: formData.get('post-code') as string,
          streetName: formData.get('street') as string,
        };
        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          const result = await editAddress(userData, addressId, data, e);
          if (result) {
            this.populateUserData();
            this.showSuccessMessage();
            setTimeout(() => this.hideSuccessMessage(), 3000);
            this.closeModalAddress();
          }
        }
      }
    }
  }

  private async deleteUserAddress(address: Address): Promise<void> {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();

      if (userData) {
        const result = await deleteAddress(userData, address.id as string);
        if (result) {
          this.populateUserData();
          this.showSuccessMessage();
          setTimeout(() => this.hideSuccessMessage(), 3000);
        }
      }
    }
  }

  private async markAsDefaultAddress(
    address: Address,
    isBilling: boolean
  ): Promise<void> {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();

      if (userData) {
        const result = await changeDefaultAddress(
          userData,
          address.id as string,
          isBilling
        );
        if (result) {
          this.populateUserData();
          this.showSuccessMessage();
          setTimeout(() => this.hideSuccessMessage(), 3000);
        }
      }
    }
  }

  private async saveUserData(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      const formData = new FormData(e.target as HTMLFormElement);
      if (userData) {
        userData.firstName = formData.get('firstName') as string;
        userData.lastName = formData.get('lastName') as string;
        userData.dateOfBirth = formData.get('birth') as string;
        userData.email = formData.get('email') as string;

        const formValid = formValidation(e as SubmitEvent);
        if (formValid) {
          const result = await updateProfileData(userData, e);
          if (result) {
            this.populateUserData();
            this.showSuccessMessage();
            setTimeout(() => this.hideSuccessMessage(), 3000);
            this.closeModal();
          }
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

  private updateEmailDisplay(email: string): void {
    this.emailDisplay.textContent = `Email: ${email}`;
  }

  public populateUserData(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage();
      if (userData) {
        this.updateFirstNameDisplay(userData.firstName);
        this.updateLastNameDisplay(userData.lastName);
        this.updateDateOfBirthDisplay(userData.dateOfBirth);
        this.updateEmailDisplay(userData.email);
        this.populateAddresses(userData as Customer);
      }
    }
  }

  private populateAddresses(userData: Customer) {
    this.shippingForm.innerHTML = '';
    this.billingForm.innerHTML = '';
    const shippingAddresses: Address[] = [];
    const billingAddresses: Address[] = [];
    userData.addresses.forEach((address: Address) => {
      if (userData.billingAddressIds?.includes(address.id as string)) {
        billingAddresses.push(address);
      } else {
        shippingAddresses.push(address);
      }
    });
    shippingAddresses.forEach((address: Address) => {
      this.populateAddress(address, this.shippingForm, userData);
    });
    billingAddresses.forEach((address: Address) => {
      this.populateAddress(address, this.billingForm, userData);
    });
    console.log(shippingAddresses, billingAddresses);
  }

  private populateAddress(
    address: Address,
    div: HTMLDivElement,
    userData: Customer
  ) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';
    const markAsDefault = document.createElement('button');
    markAsDefault.textContent = 'Mark as Default';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    if (
      address.id === userData.defaultBillingAddressId ||
      address.id === userData.defaultShippingAddressId
    ) {
      deleteButton.disabled = true;
      markAsDefault.disabled = true;
    }
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    deleteButton.addEventListener('click', () => {
      this.deleteUserAddress(address);
    });
    markAsDefault.addEventListener('click', () => {
      this.markAsDefaultAddress(
        address,
        userData.billingAddressIds?.includes(address?.id as string) as boolean
      );
    });
    editButton.addEventListener('click', () => {
      this.openModalAddress(address);
    });
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper-address';
    const def = document.createElement('div');
    def.textContent = `Default`;
    const country = document.createElement('div');
    country.textContent = `Country: ${address.country}`;
    const city = document.createElement('div');
    city.textContent = `City: ${address.city}`;
    const street = document.createElement('div');
    street.textContent = `Street: ${address.streetName}`;
    const postCode = document.createElement('div');
    postCode.textContent = `Postal code: ${address.postalCode}`;
    if (
      address.id === userData.defaultBillingAddressId ||
      address.id === userData.defaultShippingAddressId
    ) {
      wrapper.appendChild(def);
    }
    wrapper.appendChild(country);
    wrapper.appendChild(city);
    wrapper.appendChild(street);
    wrapper.appendChild(postCode);
    buttonWrapper.appendChild(deleteButton);
    buttonWrapper.appendChild(editButton);
    buttonWrapper.appendChild(markAsDefault);
    wrapper.appendChild(buttonWrapper);
    div.appendChild(wrapper);
  }
}
