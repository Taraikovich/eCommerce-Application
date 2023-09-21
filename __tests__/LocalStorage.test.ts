import { getUserId } from '../src/state/getUserId';
import { setUserId } from '../src/state/setUserId';

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('getUserId function', () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  test('should return an empty string if userId is not in localStorage', () => {
    const result = getUserId();
    expect(result).toBe('');
  });

  test('should return the userId from localStorage', () => {
    const testUserId = 'test123';
    localStorage.setItem('userId', testUserId);

    const result = getUserId();
    expect(result).toBe(testUserId);
  });
});

describe('setUserId function', () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  test('should set the userId in localStorage', () => {
    const testUserId = 'test123';
    setUserId(testUserId);

    expect(localStorage.getItem('userId')).toBe(testUserId);
  });
});
