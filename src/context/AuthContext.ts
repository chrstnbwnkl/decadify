import { createContext } from "react";

export interface IAuthContext {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  product: string;
  type: string;
  uri: string;
}

export const AuthContext = createContext<IAuthContext>({
  country: "",
  display_name: "",
  email: "",
  explicit_content: { filter_enabled: false, filter_locked: false },
  external_urls: { spotify: "" },
  followers: { href: "", total: 0 },
  href: "",
  id: "",
  images: [],
  product: "",
  type: "",
  uri: "",
});
