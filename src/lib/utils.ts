import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import BigNumber from 'bignumber.js';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const formatCompactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(46)}`;

export const setComma = (num: number): string =>
  num.toLocaleString(undefined, { maximumFractionDigits: 4 });

export const formatTon = (nano: number): number =>
  parseFloat(new BigNumber(nano).dividedBy(1_000_000_000).toString());
