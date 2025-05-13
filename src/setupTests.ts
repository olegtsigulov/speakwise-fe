// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock localStorage for testing
class LocalStorageMock {
  private store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

// Mock window.location for testing redirects
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    assign: jest.fn(),
    replace: jest.fn(),
  },
  writable: true,
});

// Suppress React Error Boundary warnings in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Error boundaries should implement getDerivedStateFromError/.test(args[0]) ||
    /ReactDOM.render is no longer supported/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};
