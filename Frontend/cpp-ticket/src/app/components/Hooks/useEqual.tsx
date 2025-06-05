import { useMemo } from "react";

function areArraysEqualUnordered<T>(a: T[], b: T[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, i) => val === sortedB[i]);
}

export default function useEqual<T>(a: T, b: T): boolean {
  return useMemo(() => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return areArraysEqualUnordered(a, b);
    }
    return a === b;
  }, [a, b]);
}
