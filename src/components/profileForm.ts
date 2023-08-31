import { updateProfileData } from '../api/updateProfileData';
import { getUserId } from '../state/getUserId';

export interface UserData {
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
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

  private editButton: HTMLButtonElement;

  private modal: HTMLDivElement;

  private closeModalButton: HTMLSpanElement;

  private editForm: HTMLFormElement;

  private firstNameDisplay: HTMLDivElement;

  private lastNameDisplay: HTMLDivElement;

  private dateOfBirthDisplay: HTMLDivElement;

  private countryDisplay: HTMLDivElement;

  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private dateOfBirthInput: HTMLInputElement;

  private countryInput: HTMLInputElement;

  private shippingForm: HTMLDivElement;

  private shippingAdressLabel: HTMLDivElement;

  private billingForm: HTMLDivElement;

  private billingAdressLabel: HTMLDivElement;

  constructor() {
    this.form.className = 'form';

    this.editButton = document.createElement('button');
    this.editButton.textContent = 'Edit';
    this.editButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
    });

    this.modal = document.createElement('div');
    this.modal.id = 'modal';
    this.modal.className = 'modal';

    this.closeModalButton = document.createElement('span');
    this.closeModalButton.id = 'close-modal';
    this.closeModalButton.className = 'close';
    this.closeModalButton.textContent = '×';
    this.closeModalButton.addEventListener('click', () => this.closeModal());

    this.editForm = document.createElement('form');
    this.editForm.id = 'edit-form';
    this.editForm.addEventListener('submit', (e) => this.saveUserData(e));

    this.firstNameInput = document.createElement('input');
    this.firstNameInput.id = 'first-name-input';
    this.firstNameInput.type = 'text';
    this.editForm.appendChild(this.firstNameInput);

    this.lastNameInput = document.createElement('input');
    this.lastNameInput.id = 'last-name-input';
    this.lastNameInput.type = 'text';
    this.editForm.appendChild(this.lastNameInput);

    this.dateOfBirthInput = document.createElement('input');
    this.dateOfBirthInput.id = 'date-of-birth-input';
    this.dateOfBirthInput.type = 'text';
    this.editForm.appendChild(this.dateOfBirthInput);

    this.countryInput = document.createElement('input');
    this.countryInput.id = 'country-input';
    this.countryInput.type = 'text';
    this.editForm.appendChild(this.countryInput);

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
    this.shippingAdressLabel.id = 'shipping-adress-label';
    this.shippingAdressLabel.textContent = 'Shipping adress';

    this.countryDisplay = document.createElement('div');
    this.countryDisplay.id = 'country-display';

    this.billingForm = document.createElement('div');
    this.billingForm.id = 'billing-form';

    this.billingAdressLabel = document.createElement('div');
    this.billingAdressLabel.id = 'billing-adress-label';
    this.billingAdressLabel.textContent = 'Billing adress';

    this.form.appendChild(this.editButton);
    this.form.appendChild(this.firstNameDisplay);
    this.form.appendChild(this.lastNameDisplay);
    this.form.appendChild(this.dateOfBirthDisplay);

    this.form.appendChild(this.shippingForm);
    this.shippingForm.appendChild(this.shippingAdressLabel);
    this.shippingForm.appendChild(this.countryDisplay);
    this.form.appendChild(this.billingForm);
    this.billingForm.appendChild(this.billingAdressLabel);

    this.modal.appendChild(this.closeModalButton);
    this.modal.appendChild(this.editForm);
  }

  createForm(): HTMLFormElement {
    this.form.appendChild(this.modal);
    return this.form;
  }

  private openModal(): void {
    this.modal.style.display = 'block';

    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      console.log(userData);
      if (userData) {
        this.firstNameInput.value = userData.firstName;
        this.lastNameInput.value = userData.lastName;
        this.dateOfBirthInput.value = userData.dateOfBirth;
        this.countryInput.value = userData.addresses[0].country;
      }
    }
  }

  private closeModal(): void {
    this.modal.style.display = 'none';
  }

  private async saveUserData(e: Event): Promise<void> {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      if (userData) {
        userData.firstName = this.firstNameInput.value;
        userData.lastName = this.lastNameInput.value;
        userData.dateOfBirth = this.dateOfBirthInput.value;
        await updateProfileData(userData);
        this.populateUserData();
      }
    }
    this.closeModal();
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

  public populateUserData(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      const shippingAddress = userData?.addresses.find(
        (adress) => adress.id === userData.defaultShippingAddressId
      );
      if (userData) {
        this.updateFirstNameDisplay(userData.firstName);
        this.updateLastNameDisplay(userData.lastName);
        this.updateDateOfBirthDisplay(userData.dateOfBirth);
        this.updateCountryDisplay(shippingAddress?.country as string);
      }
    }
  }
}
