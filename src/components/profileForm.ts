import { updateProfileData } from '../api/updateProfileData';
import { getUserId } from '../state/getUserId';
// import { formValidation, realTimeValidation } from '../utils/formValidator';



export interface UserData {
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  email: string;
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

  private isEmailValid = true;

  private editButton: HTMLButtonElement;

  private editPassButton: HTMLButtonElement;

  private modal: HTMLDivElement;

  private closeModalButton: HTMLSpanElement;

  private editForm: HTMLFormElement;

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

  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private dateOfBirthInput: HTMLInputElement;

  private countryInput: HTMLInputElement;

  private countryInputB: HTMLInputElement;

  private cityInput: HTMLInputElement;

  private cityInputB: HTMLInputElement;

  private streetInput: HTMLInputElement;

  private streetInputB: HTMLInputElement;

  private postalInput: HTMLInputElement;

  private postalInputB: HTMLInputElement;

  private shippingForm: HTMLDivElement;

  private shippingAdressLabel: HTMLDivElement;

  private billingForm: HTMLDivElement;

  private billingAdressLabel: HTMLDivElement;

  private userTitle: HTMLDivElement;

  private addressTitle: HTMLDivElement;

  private firstNameInputTitle: HTMLDivElement;

  private lastNameInputTitle: HTMLDivElement;

  private dateOfBirthInputTitle: HTMLDivElement;

  private shippingInputTitle: HTMLDivElement;

  private billingInputTitle: HTMLDivElement;

  private countryInputTitle: HTMLDivElement;

  private cityInputTitle: HTMLDivElement;

  private streetInputTitle: HTMLDivElement;

  private postalInputTitle: HTMLDivElement;

  private successMessage: HTMLDivElement;

  private emailInputTitle: HTMLDivElement;

  private emailInput: HTMLInputElement;

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

    this.closeModalButton = document.createElement('span');
    this.closeModalButton.id = 'close-modal';
    this.closeModalButton.className = 'close';
    this.closeModalButton.textContent = '×';
    this.closeModalButton.addEventListener('click', () => this.closeModal());

    this.editForm = document.createElement('form');
    this.editForm.id = 'edit-form';
    this.editForm.addEventListener('submit', (e) => this.saveUserData(e));

    this.successMessage = document.createElement('div');
    this.successMessage.className = 'success-message';
    this.successMessage.textContent = 'Changes have been saved successfully!';
    this.successMessage.style.display = 'none';
    this.form.appendChild(this.successMessage);

    this.emailInputTitle = document.createElement('div');
    this.emailInputTitle.textContent = 'Email';
    this.emailInputTitle.className = 'info-input-title';
    this.emailInput = document.createElement('input');
    this.emailInput.className = 'info-input';
    this.emailInput.type = 'text';
    this.editForm.appendChild(this.emailInputTitle);
    this.editForm.appendChild(this.emailInput);

    this.firstNameInputTitle = document.createElement('div');
    this.firstNameInputTitle.textContent = 'First Name';
    this.firstNameInputTitle.className = 'info-input-title';
    this.firstNameInput = document.createElement('input');
    this.firstNameInput.className = 'info-input';
    this.firstNameInput.type = 'text';
    this.editForm.appendChild(this.firstNameInputTitle);
    this.editForm.appendChild(this.firstNameInput);

    this.lastNameInputTitle = document.createElement('div');
    this.lastNameInputTitle.textContent = 'Last Name';
    this.lastNameInputTitle.className = 'info-input-title';
    this.lastNameInput = document.createElement('input');
    this.lastNameInput.className = 'info-input';
    this.lastNameInput.type = 'text';
    this.editForm.appendChild(this.lastNameInputTitle);
    this.editForm.appendChild(this.lastNameInput);

    this.dateOfBirthInputTitle = document.createElement('div');
    this.dateOfBirthInputTitle.textContent = 'Date of birth';
    this.dateOfBirthInputTitle.className = 'info-input-title';
    this.dateOfBirthInput = document.createElement('input');
    this.dateOfBirthInput.className = 'info-input';
    this.dateOfBirthInput.type = 'text';
    this.editForm.appendChild(this.dateOfBirthInputTitle);
    this.editForm.appendChild(this.dateOfBirthInput);

    this.shippingInputTitle = document.createElement('div');
    this.shippingInputTitle.textContent = 'Shipping address';
    this.shippingInputTitle.className = 'title-address';
    this.countryInputTitle = document.createElement('div');
    this.countryInputTitle.textContent = 'Country';
    this.countryInputTitle.className = 'info-input-title';
    this.countryInput = document.createElement('input');
    this.countryInput.className = 'info-input';
    this.countryInput.type = 'text';
    this.editForm.appendChild(this.shippingInputTitle);
    this.editForm.appendChild(this.countryInputTitle);
    this.editForm.appendChild(this.countryInput);

    this.cityInputTitle = document.createElement('div');
    this.cityInputTitle.textContent = 'City';
    this.cityInputTitle.className = 'info-input-title';
    this.cityInput = document.createElement('input');
    this.cityInput.className = 'info-input';
    this.countryInput.type = 'text';
    this.editForm.appendChild(this.cityInputTitle);
    this.editForm.appendChild(this.cityInput);

    this.streetInputTitle = document.createElement('div');
    this.streetInputTitle.textContent = 'Street';
    this.streetInputTitle.className = 'info-input-title';
    this.streetInput = document.createElement('input');
    this.streetInput.className = 'info-input';
    this.streetInput.type = 'text';
    this.editForm.appendChild(this.streetInputTitle);
    this.editForm.appendChild(this.streetInput);

    this.postalInputTitle = document.createElement('div');
    this.postalInputTitle.textContent = 'Postal code';
    this.postalInputTitle.className = 'info-input-title';
    this.postalInput = document.createElement('input');
    this.postalInput.className = 'info-input';
    this.postalInput.type = 'text';
    this.editForm.appendChild(this.postalInputTitle);
    this.editForm.appendChild(this.postalInput);

    this.billingInputTitle = document.createElement('div');
    this.billingInputTitle.textContent = 'Billing address';
    this.billingInputTitle.className = 'title-address';
    this.countryInputTitle = document.createElement('div');
    this.countryInputTitle.textContent = 'Country';
    this.countryInputTitle.className = 'info-input-title';
    this.countryInputB = document.createElement('input');
    this.countryInputB.className = 'info-input';
    this.countryInputB.type = 'text';
    this.editForm.appendChild(this.billingInputTitle);
    this.editForm.appendChild(this.countryInputTitle);
    this.editForm.appendChild(this.countryInputB);

    this.cityInputTitle = document.createElement('div');
    this.cityInputTitle.textContent = 'City';
    this.cityInputTitle.className = 'info-input-title';
    this.cityInputB = document.createElement('input');
    this.cityInputB.className = 'info-input';
    this.countryInputB.type = 'text';
    this.editForm.appendChild(this.cityInputTitle);
    this.editForm.appendChild(this.cityInputB);

    this.streetInputTitle = document.createElement('div');
    this.streetInputTitle.textContent = 'Street';
    this.streetInputTitle.className = 'info-input-title';
    this.streetInputB = document.createElement('input');
    this.streetInputB.className = 'info-input';
    this.streetInputB.type = 'text';
    this.editForm.appendChild(this.streetInputTitle);
    this.editForm.appendChild(this.streetInputB);

    this.postalInputTitle = document.createElement('div');
    this.postalInputTitle.textContent = 'Postal code';
    this.postalInputTitle.className = 'info-input-title';
    this.postalInputB = document.createElement('input');
    this.postalInputB.className = 'info-input';
    this.postalInputB.type = 'text';
    this.editForm.appendChild(this.postalInputTitle);
    this.editForm.appendChild(this.postalInputB);

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

    // this.emailInput.addEventListener('input', (e) => {
    //   realTimeValidation(e);
    // });
  }

  

  createForm(): HTMLFormElement {
    this.form.appendChild(this.modal);
    return this.form;
  }

  private openModal(): void {
    this.modal.style.display = 'none';

    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      console.log(userData);
      if (userData) {
        this.firstNameInput.value = userData.firstName;
        this.lastNameInput.value = userData.lastName;
        this.dateOfBirthInput.value = userData.dateOfBirth;
        this.emailInput.value = userData.email;
        this.countryInput.value = userData.addresses[0].country;
        this.cityInput.value = userData.addresses[0].city;
        this.streetInput.value = userData.addresses[0].streetName;
        this.postalInput.value = userData.addresses[0].postalCode;
        this.countryInputB.value = userData.addresses[1].country;
        this.cityInputB.value = userData.addresses[1].city;
        this.streetInputB.value = userData.addresses[1].streetName;
        this.postalInputB.value = userData.addresses[1].postalCode;
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
        userData.email = this.emailInput.value;
        userData.addresses[0].country = this.countryInput.value;
        userData.addresses[0].city = this.cityInput.value;
        userData.addresses[0].streetName = this.streetInput.value;
        userData.addresses[0].postalCode = this.postalInput.value;
        userData.addresses[1].country = this.countryInputB.value;
        userData.addresses[1].city = this.cityInputB.value;
        userData.addresses[1].streetName = this.streetInputB.value;
        userData.addresses[1].postalCode = this.postalInputB.value;
        await updateProfileData(userData);
        this.populateUserData();
      this.showSuccessMessage();
      setTimeout(() => this.hideSuccessMessage(), 3000);
      
    }
  }
  this.closeModal();
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
