import { realTimeValidation } from '../utils/formValidator';
import { getUserId } from '../state/getUserId';

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: { [key: string]: Address };
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
      console.log(userData);
      if (userData) {
        this.fillFormWithUserData(userData);
      }
    }
  }

  private fillFormWithUserData(userData: UserData): void {
    const { firstName, lastName, dateOfBirth, addresses } = userData;

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

  Object.keys(addresses).forEach((addressKey) => {
    const address = addresses[addressKey];

  const countryInput = document.createElement('div');
  countryInput.textContent = `Country: ${address.country}`;
  userAddressesFrame.appendChild(countryInput);

  const cityInput = document.createElement('div');
  cityInput.textContent = `City: ${address.city}`;
  userAddressesFrame.appendChild(cityInput);

  const postalInput = document.createElement('div');
  postalInput.textContent = `Postal code: ${address.postalCode}`;
  userAddressesFrame.appendChild(postalInput);

  const streetInput = document.createElement('div');
  streetInput.textContent = `City: ${address.streetName}`;
  userAddressesFrame.appendChild(streetInput);


  this.form.appendChild(userAddressesFrame);
  });
}
}
