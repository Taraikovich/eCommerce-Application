import { realTimeValidation } from '../utils/formValidator';
import { getUserId } from '../state/getUserId'; 

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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

    const firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.value = firstName;
    this.form.appendChild(firstNameInput);

    const lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.value = lastName;
    this.form.appendChild(lastNameInput);

    const dateOfBirthInput = document.createElement('input');
    dateOfBirthInput.type = 'text';
    dateOfBirthInput.value = dateOfBirth;
    this.form.appendChild(dateOfBirthInput);
  }
}