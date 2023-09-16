import { View } from './view';
import { AboutUsForm} from '../components/aboutUsForm';

export class AboutUsPageView extends View {
  private aboutUsForm = new AboutUsForm();

  constructor() {
    super();
    this.createContent();
  }


  createContent(): void {
    const sectionAbouyUsForm = this.createSection('about-us-form');
    sectionAbouyUsForm.append(
      this.aboutUsForm.createForm()
    );



    this.main.append(sectionAbouyUsForm);
  }
}

