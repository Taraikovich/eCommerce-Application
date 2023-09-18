import { View } from './view';
import { PersonalCard } from '../components/personalCard';
import { igor, aboutUs, veronika, alexey } from '../constants/teamMembers';

export class AboutUsPageView extends View {
  personalCard = new PersonalCard();

  constructor() {
    super();
    this.createContent();
  }

  private createContent(): void {
    const personalCards = document.createElement('section');
    personalCards.className = 'personal-cards';

    const aboutUsSection = this.createSection('about-us');
    aboutUsSection.innerHTML = aboutUs;

    personalCards.append(
      this.personalCard.createCard(igor),
      this.personalCard.createCard(veronika),
      this.personalCard.createCard(alexey)
    );

    this.main.append(
      this.addH1('About us'),
      aboutUsSection,
      this.addH2('Out team'),
      personalCards,
      this.addRssLogo()
    );
  }

  private addRssLogo(): HTMLElement {
    const wrapper = document.createElement('a');
    wrapper.className = 'rss-logo';
    wrapper.href = 'https://rs.school/';
    wrapper.target = '_blank';
    const logo = new Image();
    logo.src = require('../images/rs_school.svg');
    wrapper.append(logo);
    return wrapper;
  }
}
