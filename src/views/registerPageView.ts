import { View } from './view';
import { RegistratinForm } from '../components/registrtionForm';
import { LoginButton } from '../components/loginButton';

export class RegisterPageView extends View {
  private registrationForm = new RegistratinForm();

  constructor() {
    super();
    this.createContent();
  }

  createContent(): void {
    const sectionLogin = this.createSection('registr-login');
    sectionLogin.append(
      this.createParagraph('Do you have an account? '),
      new LoginButton().createButton()
    );

    const sectionRegistrForm = this.createSection('registr-form');
    sectionRegistrForm.append(this.registrationForm.createForm());

    this.main.append(
      this.addH1('Fill out the form to create an account'),
      sectionLogin,
      sectionRegistrForm
    );
  }
}
