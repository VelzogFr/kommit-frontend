import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Déclare les tokens maison de index.css, sinon twMerge ne sait pas que
// rounded-field écrase rounded-lg et garde les deux classes.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["field", "panel"],
      "drop-shadow": ["card", "button"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
