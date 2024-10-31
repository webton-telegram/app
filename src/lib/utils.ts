import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const formatCompactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(46)}`;
