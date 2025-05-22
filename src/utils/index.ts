import { ColorPad } from '../types';

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const take = (amount: number) => (xs: any[]) => xs.slice(0, amount);
export const last = (a: any[]) => (b: any[]) => a[b.length - 1];

// double :: Fn -> Fn
export const double = <T extends any>(x: T): [T, T] => [x, x];

export const addRandomToSequence = (config: ColorPad[]) =>
  config[Math.floor(Math.random() * config.length)];

export const panic = (errorMessage: string) => {
  throw new Error(errorMessage);
};

export function debounce(func: (...p: any[]) => any, ms: number, immediate = false) {
  let timeoutId: any = null; // Stores the timeout ID. This is "managed state" within the closure.
  // This is the function that will be returned and called.
  return (...args: any[]) => {
    // Function to execute the original function
    const callLater = () => {
      timeoutId = null; // Clear the timeoutId once the function is called
      if (!immediate) {
        func(...args);
      }
    };

    const callNow = immediate && !timeoutId;

    // Clear the previous timeout, if any
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(callLater, ms);

    // If immediate is true and there's no existing timeout, call the function immediately
    if (callNow) {
      func(...args);
    }
  };
}
