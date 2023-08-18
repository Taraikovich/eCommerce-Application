import { Router } from '../src/router/router';
import { RegisterPageView } from '../src/views/registerPageView';

const router = new Router();

const testRegisterPage = new RegisterPageView(router);

testRegisterPage.emailInput.value = 'gjhggjh';

const failEmailValidation = testRegisterPage.validateEmail();

test('email', () => {
  expect(failEmailValidation).toEqual(false);
});

testRegisterPage.emailInput.value = 'sample@sample.com';

const successEmailValidation = testRegisterPage.validateEmail();

test('email', () => {
  expect(successEmailValidation).toEqual(true);
});
