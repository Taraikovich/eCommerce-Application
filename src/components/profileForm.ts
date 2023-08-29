import { realTimeValidation } from '../utils/formValidator';
import { getUserId } from '../state/getUserId';
import { createCustomer } from '../api/createCustomer';

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: object;
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

  constructor() {
    this.form.className = 'form';

    this.form.addEventListener('input', (e) => {
      realTimeValidation(e);
    });
  }

  createForm(): HTMLFormElement {
    return this.form;
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
    const { firstName, lastName, dateOfBirth } = userData;
    console.log(userData);

    const userInformationFrame = document.createElement('div');
    userInformationFrame.className = 'form-frame';

    const userTitle = document.createElement('div');
    userTitle.textContent = 'User information';
    userInformationFrame.appendChild(userTitle);

    const firstNameInput = document.createElement('div');
    firstNameInput.textContent = `First Name: ${firstName}`;
    userInformationFrame.appendChild(firstNameInput);

    const lastNameInput = document.createElement('div');
    lastNameInput.textContent = `Last Name: ${lastName}`;
    userInformationFrame.appendChild(lastNameInput);

    const dateOfBirthInput = document.createElement('div');
    dateOfBirthInput.textContent = `Date of Birth: ${dateOfBirth}`;
    userInformationFrame.appendChild(dateOfBirthInput);

    this.form.appendChild(userInformationFrame);

    const userAddressesFrame = document.createElement('div');
    userAddressesFrame.className = 'form-frame';

    const addressTitle = document.createElement('div');
    addressTitle.textContent = 'User addresses';
    userAddressesFrame.appendChild(addressTitle);

    // const countryInput = document.createElement('div');
    // countryInput.textContent = `Country: ${country}`;
    // userAddressesFrame.appendChild(countryInput);

    // const cityInput = document.createElement('div');
    // cityInput.textContent = `City: ${city}`;
    // userAddressesFrame.appendChild(cityInput);

    // const postalCodeInput = document.createElement('div');
    // postalCodeInput.textContent = `Postal Code: ${postalCode}`;
    // userAddressesFrame.appendChild(postalCodeInput);

    // const streetNameInput = document.createElement('div');
    // streetNameInput.textContent = `Street Name: ${streetName}`;
    // userAddressesFrame.appendChild(streetNameInput);

    this.form.appendChild(userAddressesFrame);
  }
}
