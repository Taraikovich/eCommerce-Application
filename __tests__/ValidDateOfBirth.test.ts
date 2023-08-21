import { isValidDateOfBirth } from '../src/utils/formValidator';

describe('isValidDateOfBirth function', () => {
  test('should return true for valid date of birth', () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 20); // Текущему возрасту должно быть больше минимального

    const validDateOfBirth = currentDate.toISOString().substr(0, 10);

    const result = isValidDateOfBirth(validDateOfBirth);
    expect(result).toBe(true);
  });

  test('should return false for date of birth below the minimum age', () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 10); // Текущему возрасту должно быть меньше минимального

    const invalidDateOfBirth = currentDate.toISOString().substr(0, 10);

    const result = isValidDateOfBirth(invalidDateOfBirth);
    expect(result).toBe(false);
  });

  test('should return false for invalid date of birth format', () => {
    const invalidDateOfBirth = '2021-13-32'; // Некорректный месяц и день

    const result = isValidDateOfBirth(invalidDateOfBirth);
    expect(result).toBe(false);
  });
});
