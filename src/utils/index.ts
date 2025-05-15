export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const take = (amount: number) => (xs: any[]) => xs.slice(0, amount);
export const repeat = () => {};
