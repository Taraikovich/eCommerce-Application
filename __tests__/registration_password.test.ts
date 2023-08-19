import { Router } from '../src/router/router';
import { RegisterPageView } from '../src/views/registerPageView';

const router = new Router();

const testRegisterPage = new RegisterPageView(router);

testRegisterPage.passwordInput.value = '1!Qfjkl';

const failPasswordValidation = testRegisterPage.validatePassword();

test('password', () => {
  expect(failPasswordValidation).toEqual(false);
});

testRegisterPage.passwordInput.value = '1!Qfjklu';

const successPasswordValidation = testRegisterPage.validatePassword();

test('password', () => {
  expect(successPasswordValidation).toEqual(true);
});
