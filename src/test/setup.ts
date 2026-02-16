import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './msw/server';

vi.mock('gsap', () => {
  const timeline = vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
  }));

  const gsap = {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    timeline,
    context: (callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    },
  };

  return { gsap };
});

vi.mock('gsap/ScrollTrigger', () => {
  const ScrollTrigger = {
    defaults: vi.fn(),
    refresh: vi.fn(),
    create: vi.fn(() => ({ kill: vi.fn() })),
    getAll: vi.fn(() => []),
    maxScroll: vi.fn(() => 1000),
  };

  return { ScrollTrigger };
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();

  if (!('ResizeObserver' in window)) {
    vi.stubGlobal(
      'ResizeObserver',
      class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  }
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
