import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// https://stackoverflow.com/a/12646864/1090359
export function shuffleArray<T>(array: Array<T>) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// taken from shadcn, helps fixing tailwind classname conflicts
// along with handling conditional class selection
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lerpColour = (color1: string, color2: string, amount: number) => {
  const c1 = color1.match(/\d+/g)?.map(Number) || [];
  const c2 = color2.match(/\d+/g)?.map(Number) || [];

  return `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * amount)}, ${Math.round(
    c1[1] + (c2[1] - c1[1]) * amount
  )}, ${Math.round(c1[2] + (c2[2] - c1[2]) * amount)})`;
};

export function getPrev<T>(arr: Array<T>, index: number) {
  return (index - 1 + arr.length) % arr.length;
}

export function getNext<T>(arr: Array<T>, index: number) {
  return (index + 1) % arr.length;
}
