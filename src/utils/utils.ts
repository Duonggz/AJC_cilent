import { type ClassValue, clsx } from "clsx";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkActiveRoute = (route: string, isIndex?: boolean) => {
  const location = useLocation();

  if (!isIndex) {
    return location.pathname.includes(route);
  }
  return location.pathname === route;
};
