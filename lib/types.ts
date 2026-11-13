export type Game = {
  id: string;
  name: string;
  genre: string;
  rating: string;
  players: string;
  tone: string;
  badge: string;
  description: string;
};

export type Page =
  | "home"
  | "explore"
  | "detail"
  | "server"
  | "loading"
  | "onboarding"
  | "playing"
  | "library"
  | "profile"
  | "topup"
  | "notifications"
  | "account"
  | "language"
  | "about"
  | "faq"
  | "login";
