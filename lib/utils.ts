import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundAmount(num: number): number {
  return Math.round(num * 10000) / 10000;
}

export function returnTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function truncateMiddle(input: string, maxLength: number): string {
  // If the input string is shorter than or equal to the maxLength, return the original string
  if (input.length <= maxLength) {
      return input;
  }

  const charsToShow = maxLength - 3; // 3 for the ellipsis
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return input.substr(0, frontChars) + '...' + input.substr(input.length - backChars);
}

export function formatDateFromTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
