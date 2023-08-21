import { Button } from '../src/components/button'; // Укажите правильный путь к файлу Button.ts

describe('Button class', () => {
  let buttonInstance: Button;

  beforeEach(() => {
    buttonInstance = new Button();
  });

  test('createButton method should return an HTMLButtonElement', () => {
    const result = buttonInstance.createButton();
    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  test('createButton method should return a button element', () => {
    const result = buttonInstance.createButton();
    expect(result.tagName).toBe('BUTTON');
  });
});
