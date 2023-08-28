import { View } from './view';
import { ProfileForm } from '../components/profileForm';
import { getUserId } from '../state/getUserId';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '../api/BuildClient';
import { projectKey } from '../constants/constants';

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
        const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey(
          {
            projectKey,
          }
        );
        const auth = JSON.parse(localStorage.getItem('auth') as string); // Пример, используйте свою логику

        const { body } = await apiRoot
          .me()
          .get({
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          })
          .execute();
        const userData = body;
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
