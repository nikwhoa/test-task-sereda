import '@testing-library/jest-dom';

// Mock window.scrollTo if needed
if (typeof window.scrollTo !== 'function') {
  window.scrollTo = jest.fn();
}

// Mock IntersectionObserver if needed
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

beforeEach(() => {
  // Create portal root element
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  // Clean up portal root
  const portalRoot = document.getElementById('portal-root');
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});
