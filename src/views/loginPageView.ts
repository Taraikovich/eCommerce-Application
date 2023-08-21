import { View } from './view';
import { LoginForm } from '../components/loginForm';
import { RegisterButton } from '../components/registerButton';

export class LoginPageView extends View {
  private loginForm = new LoginForm();

  constructor() {
    super();
    this.createContent();
  }

  private createContent(): void {
    const sectionRegistr = this.createSection('login-create');
    sectionRegistr.append(
      this.createParagraph("Don't have an account?"),
      new RegisterButton().createButton()
    );

    const sectionLoginForm = this.createSection('login-form');
    sectionLoginForm.append(this.loginForm.createForm());

    this.main.append(
      this.addH1('Enter your email and password to log in to your account.'),
      sectionRegistr,
      sectionLoginForm,
      this.loginForm.createForm()
    );
  }
}
