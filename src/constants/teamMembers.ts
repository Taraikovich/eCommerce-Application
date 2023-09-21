export type PersonalInfo = {
  name: string;
  role: string;
  bio: string;
  github: string;
  featuresImplemented: string[];
};

export const igor: PersonalInfo = {
  name: 'Igor Taraikovich',
  role: 'Front-End Developer / Team leader',
  bio: 'Former System Administrator from Belarus. Currently live in Georgia.Holds a degree in Economics. Transitioning to the world of Frontend Development. Passionate about creating seamless user experiences and beautiful websites.',
  github: 'https://github.com/Taraikovich',
  featuresImplemented: [
    'webpack configuration',
    'router configuration',
    'api interaction',
    'basic site design',
    'catalog page',
    'product page',
    'discount code processing',
  ],
};

export const veronika: PersonalInfo = {
  name: 'Veronika Nemirova',
  role: 'Front-End Developer',
  bio: `I am eager to embark on my Front-End Development journey at RSSchool! Having successfully completed Stage 0 at RS School, I'm excited to further expand my knowledge and skills. I'm a quick learner who enjoys tackling various tasks, and I'm eager to gain fresh insights into the IT world.`,
  github: 'https://github.com/veronikanemirova',
  featuresImplemented: [
    'webpack configuration',
    'router configuration',
    'login form',
    'user page',
    'basket page',
  ],
};

export const alexey: PersonalInfo = {
  name: 'Alexey Petrov',
  role: 'Front-End Developer',
  bio: `Presently, I am engaged in freelance work based in Moscow, where my specialization is system administrator. My journey includes the successful completion of programming courses at Hexlet, providing me with a solid foundation in Python, Java, and JavaScript. My genuine eagerness is fueled by a desire to continuously explore and embrace new perspectives within the dynamic realm of IT.`,
  github: 'https://github.com/al-pet',
  featuresImplemented: ['webpack configuration', 'registration page'],
};

export const aboutUs = `<p>We are a trio of aspiring front-end developers, brought together by our shared journey at the RSSchool. Our dedication to achieving tangible results and our insatiable thirst for acquiring new skills have forged us into a formidable and close-knit team.</p>

<p>To kickstart our collaboration, we established a Discord group where we could seamlessly exchange vital information and host virtual meetings. Additionally, we leveraged GitHub Projects to efficiently manage our project, enabling us to break down complex tasks into manageable sub-tasks and distribute them among ourselves. This streamlined approach allowed us to maintain clarity in our project execution.</p>

<p>The remarkable synergy within our team, combined with our commitment to our shared goals, culminated in the creation of a successful product - the very website you are currently viewing on your screen.</p>`;
