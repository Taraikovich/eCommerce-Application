import { getUserId } from '../state/getUserId';

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}

interface Address {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
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

  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement; 
  
  private dateOfBirthInput: HTMLInputElement;

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

    this.form.appendChild(this.editButton);
    this.form.appendChild(this.firstNameDisplay);
    this.form.appendChild(this.lastNameDisplay);
    this.form.appendChild(this.dateOfBirthDisplay);

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
      }
    }
  }

  private closeModal(): void {
    this.modal.style.display = 'none';
  }

  private saveUserData(e: Event): void {
    e.preventDefault();
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      if (userData) {
        userData.firstName = this.firstNameInput.value; 
        userData.lastName = this.lastNameInput.value; 
        userData.dateOfBirth = this.dateOfBirthInput.value; 
        this.updateFirstNameDisplay(userData.firstName); 
        this.updateLastNameDisplay(userData.lastName);
        this.updateDateOfBirthDisplay(userData.dateOfBirth);

        localStorage.setItem('userData', JSON.stringify(userData));
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

  public populateUserData(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      if (userData) {
        this.updateFirstNameDisplay(userData.firstName);
        this.updateLastNameDisplay(userData.lastName);
        this.updateDateOfBirthDisplay(userData.dateOfBirth);
      }
    }
  }
}

//   private fillFormWithUserData(userData: UserData): void {
//     const { firstName, lastName, dateOfBirth, addresses } = userData;

//     const userInformationFrame = document.createElement('div');
//     userInformationFrame.className = 'form-frame';

//     const userTitle = document.createElement('div');
//     userTitle.textContent = 'User information';
//     userInformationFrame.appendChild(userTitle);



//     const dateOfBirthInput = document.createElement('div');
//     dateOfBirthInput.textContent = `Date of Birth: ${dateOfBirth}`;
//     userInformationFrame.appendChild(dateOfBirthInput);

//     this.form.appendChild(userInformationFrame);

//     const userAddressesFrame = document.createElement('div');
//     userAddressesFrame.className = 'form-frame';

//     const addressTitle = document.createElement('div');
//     addressTitle.textContent = 'User addresses';
//     userAddressesFrame.appendChild(addressTitle);

//     Object.keys(addresses).forEach((addressKey) => {
//       const address = addresses[addressKey];

//       const countryInput = document.createElement('div');
//       countryInput.textContent = `Country: ${address.country}`;
//       userAddressesFrame.appendChild(countryInput);

//       const cityInput = document.createElement('div');
//       cityInput.textContent = `City: ${address.city}`;
//       userAddressesFrame.appendChild(cityInput);

//       const postalInput = document.createElement('div');
//       postalInput.textContent = `Postal code: ${address.postalCode}`;
//       userAddressesFrame.appendChild(postalInput);

//       const streetInput = document.createElement('div');
//       streetInput.textContent = `City: ${address.streetName}`;
//       userAddressesFrame.appendChild(streetInput);

//       this.form.appendChild(userAddressesFrame);
//     });
//   }
// }