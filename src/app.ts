import './main.scss';
import { Router } from './router/router';
import { login } from './api/login';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

const btn = document.createElement('button');
btn.textContent = 'login';
document.body.append(btn);

btn.addEventListener('click', async () => {
  const result: boolean = await login('1033837@gmail.com', '141183');
  if (result) {
    console.log('ok');
  } else {
    console.log('Incorrect login or password');
  }
});

const btn2 = document.createElement('button');
btn.textContent = 'test';
document.body.append(btn);

btn2.addEventListener('click', () => {});
