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
