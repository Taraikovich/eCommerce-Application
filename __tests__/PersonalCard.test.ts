import { PersonalCard } from '../src/components/personalCard'; // Update with the correct path
import { PersonalInfo } from '../src/constants/teamMembers';

const personalCard = new PersonalCard();

describe('PersonalCard', () => {
  test('createCard should return an HTML element with the expected structure', () => {
    const testData: PersonalInfo = {
      name: 'John Doe',
      role: 'Software Engineer',
      bio: 'A software engineer passionate about coding.',
      featuresImplemented: ['Feature 1', 'Feature 2'],
      github: 'https://github.com/johndoe',
    };

    const card = personalCard.createCard(testData);

    expect(card).toMatchSnapshot();
  });
});
