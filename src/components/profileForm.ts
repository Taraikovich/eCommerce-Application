import { realTimeValidation } from '../utils/formValidator';
import { getUserId } from '../state/getUserId';

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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

  private formAdress = document.createElement('form');

  constructor() {
    this.form.className = 'form';
    this.formAdress.className = 'form-adress';

    const userTitle = document.createElement('div');
    userTitle.textContent = 'User information';
    this.form.appendChild(userTitle);

    const adressTitle = document.createElement('div');
    adressTitle.textContent = 'User adresses';
    this.formAdress.appendChild(adressTitle);


    this.form.addEventListener('input', (e) => {
      realTimeValidation(e);
    });
    this.formAdress.addEventListener('input', (e) => {
      realTimeValidation(e);
    });
  }

  createForm(): HTMLFormElement {
    return this.form;
  }
  
  createAdressesForm(): HTMLFormElement {
    return this.formAdress;
  }



  public populateUserData(): void {
    const userId = getUserId();
    if (userId) {
      const userData = getUserDataFromLocalStorage(userId);
      if (userData) {
        this.fillFormWithUserData(userData);
      }
    }
  }

  private fillFormWithUserData(userData: UserData): void {
    const { firstName, lastName, dateOfBirth, country } = userData;
  
    const firstNameInput = document.createElement('div');
    firstNameInput.textContent = firstName;
    this.form.appendChild(firstNameInput);

    const lastNameInput = document.createElement('div');
    lastNameInput.textContent = lastName;
    this.form.appendChild(lastNameInput);

    const dateOfBirthInput = document.createElement('div');
    dateOfBirthInput.textContent = dateOfBirth;
    this.form.appendChild(dateOfBirthInput);

    const countryInput = document.createElement('div');
    countryInput.textContent = country;
    this.formAdress.appendChild(countryInput);
  }
}
