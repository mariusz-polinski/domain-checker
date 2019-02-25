import { getGreeting } from '../index';

test('Hello World is returned', () => {
  expect(getGreeting()).toBe('Hello World');
});