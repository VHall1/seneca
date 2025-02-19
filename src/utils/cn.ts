import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This was taken from shadcn

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
