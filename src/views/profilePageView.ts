import { View } from './view';
import { ProfileForm } from '../components/profileForm';
import { getUserId } from '../state/getUserId';
import { getProfileData } from '../api/getProfileData';

export class ProfilePageView extends View {
  private profileForm = new ProfileForm();

  constructor() {
    super();
    this.createContent();
  }

  private async createContent(): Promise<void> {
    const userProfileSection = this.createSection('user-profile');

    const userId = getUserId();
    if (userId) {
      try {
        const userData =  await getProfileData();
        localStorage.setItem('userData', JSON.stringify(userData));

        if (userData) {
          const greeting = document.createElement('p');
          greeting.textContent = `Welcome, ${userData.firstName}!`;
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
}
