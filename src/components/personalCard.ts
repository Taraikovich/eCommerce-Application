import { PersonalInfo } from '../constants/teamMembers';

export class PersonalCard {
  createCard(data: PersonalInfo): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'personal-card';
    wrapper.append(
      this.addPhoto(data.name),
      this.addName(data.name),
      this.addRole(data.role),
      this.addBio(data.bio),
      this.addFeatures(data.featuresImplemented),
      this.addGithub(data.github)
    );
    return wrapper;
  }

  private addPhoto(name: string): HTMLElement {
    const photo = document.createElement('div');
    photo.className = `personal-card__photo personal-card__photo_${name}`;
    return photo;
  }

  private addName(personalName: string): HTMLHeadElement {
    const name = document.createElement('h3');
    name.textContent = personalName;
    return name;
  }

  private addRole(personalRole: string): HTMLParagraphElement {
    const role = document.createElement('p');
    role.textContent = personalRole;
    return role;
  }

  private addBio(personalBio: string): HTMLParagraphElement {
    const bio = document.createElement('p');
    bio.textContent = personalBio;
    return bio;
  }

  private addFeatures(features: string[]): HTMLElement {
    const listWrapper = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = 'Contribution to this project:';

    const list = document.createElement('ul');
    features.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list.append(listItem);
    });

    listWrapper.append(h3, list);

    return listWrapper;
  }

  private addGithub(link: string): HTMLAnchorElement {
    const github = document.createElement('a');
    github.textContent = 'GitHub';
    github.target = '_blank';
    github.href = link;
    return github;
  }
}
