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

  constructor() {
    this.form.className = 'form';
    this.userTitle = document.createElement('div');
    this.userTitle.className = 'title-info';
    this.userTitle.textContent = 'User information';
    this.addressTitle = document.createElement('div');
    this.addressTitle.className = 'title-info';
    this.addressTitle.textContent = 'User addresses';

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

    this.countryInputB = document.createElement('input');
    this.countryInputB.id = 'country-input-b';
    this.countryInputB.type = 'text';
    this.editForm.appendChild(this.countryInputB);

    this.cityInput = document.createElement('input');
    this.cityInput.id = 'city-input';
    this.countryInput.type = 'text';
    this.editForm.appendChild(this.cityInput);

    this.cityInputB = document.createElement('input');
    this.cityInputB.id = 'city-input';
    this.countryInputB.type = 'text';
    this.editForm.appendChild(this.cityInputB);

    this.streetInput = document.createElement('input');
    this.streetInput.id = 'street-input';
    this.streetInput.type = 'text';
    this.editForm.appendChild(this.streetInput);

    this.streetInputB = document.createElement('input');
    this.streetInputB.id = 'street-input-b';
    this.streetInputB.type = 'text';
    this.editForm.appendChild(this.streetInputB);

    this.postalInput = document.createElement('input');
    this.postalInput.id = 'postal-input';
    this.postalInput.type = 'text';
    this.editForm.appendChild(this.postalInput);

    this.postalInputB = document.createElement('input');
    this.postalInputB.id = 'postal-input-b';
    this.postalInputB.type = 'text';
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

    this.modal.appendChild(this.closeModalButton);
    this.modal.appendChild(this.editForm);
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
