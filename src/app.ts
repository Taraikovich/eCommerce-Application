import { LoginForm } from './components/loginForm';
import { RegistratinForm } from './components/registrtionForm';
import './main.scss';
import { Router } from './router/router';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

new LoginForm();
new RegistratinForm();
