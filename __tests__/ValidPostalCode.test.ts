import { isValidPostalCode } from '../src/utils/formValidator';

describe('isValidPostalCode function', () => {
  test('should return true for valid US postal code', () => {
    const result = isValidPostalCode('US', '12345');
    expect(result).toBe(true);
  });

  test('should return true for valid CA postal code', () => {
    const result = isValidPostalCode('CA', 'A1B 2C3');
    expect(result).toBe(true);
  });

  test('should return false for invalid CA postal code', () => {
    const result = isValidPostalCode('CA', '12345');
    expect(result).toBe(false);
  });

  test('should return true for valid GE postal code', () => {
    const result = isValidPostalCode('GE', '1234');
    expect(result).toBe(true);
  });

  test('should return true for valid RU postal code', () => {
    const result = isValidPostalCode('RU', '123456');
    expect(result).toBe(true);
  });

  test('should return true for valid BY postal code', () => {
    const result = isValidPostalCode('BY', '123456');
    expect(result).toBe(true);
  });

  test('should return false for invalid postal code with unknown country code', () => {
    const result = isValidPostalCode('XX', '123456');
    expect(result).toBe(false);
  });
});
