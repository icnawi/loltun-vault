import { ColorPad } from '../types';

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const take = (amount: number) => (xs: any[]) => xs.slice(0, amount);
export const last = (a: any[]) => (b: any[]) => a[b.length - 1];
export const repeat = () => {};

export const addRandomToSequence = (config: ColorPad[]) =>
  config[Math.floor(Math.random() * config.length)];

export const panic = (errorMessage: string) => {
  throw new Error(errorMessage);
};
