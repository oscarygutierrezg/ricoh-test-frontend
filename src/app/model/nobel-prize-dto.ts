import { Meta } from "@angular/platform-browser";
import { Languages } from "./languages";
import { Laureate } from "./laureate";
import { Links } from "./links";

export interface NobelPrizeDto {
  index: string;
  awardYear: string;
  category: Languages;
  categoryFullName: Languages;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: Links;
  laureates: Laureate[];
  meta: Meta;
  dateAwarded?: string;
}