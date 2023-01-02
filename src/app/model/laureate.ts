import { Languages } from "./languages";
import { Links } from "./links";

export interface Laureate {
  id: string;
  knownName: Languages;
  fullName: Languages;
  contribution: string;
  sortOrder: string;
  motivation: Languages;
  links: Links;
}