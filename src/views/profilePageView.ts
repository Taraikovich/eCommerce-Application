import { View } from './view';
import { ProfileForm, UserData } from '../components/profileForm';
import { getUserId } from '../state/getUserId';
import { getProfileData } from '../api/getProfileData';

export class ProfilePageView extends View {
  private profileForm = new ProfileForm();

  private userData?: UserData;

  constructor() {
    super();
    this.createContent();
  }

  private async createContent(): Promise<void> {
    const userProfileSection = this.createSection('user-profile');

    const userId = getUserId();
    if (userId) {
      try {
        await this.getProfile();

        if (this.userData) {
          const greeting = document.createElement('div');
          greeting.className = 'greeting';
          greeting.textContent = `Welcome, ${this.userData.firstName}!`;
          userProfileSection.appendChild(greeting);
          this.profileForm.populateUserData();
        }
      } catch (error) {
        console.error('Error while fetching user data:', error);
      }
    } else {
      const notLoggedInMessage = document.createElement('p');
      notLoggedInMessage.textContent =
        'Please log in or register to access the profile.';
      userProfileSection.appendChild(notLoggedInMessage);
    }

    this.main.append(userProfileSection, this.profileForm.createForm());
  }

  private async getProfile(): Promise<void> {
    try {
      this.userData = (await getProfileData()) as UserData;
      localStorage.setItem('userData', JSON.stringify(this.userData));
    } catch (error) {
      console.error('Error while fetching user data:', error);
    }
  }
}
