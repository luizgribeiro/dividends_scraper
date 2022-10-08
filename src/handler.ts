import { scrapeDividends } from "./scraper";
import { parseDividends } from "./transforms";
export const run = async () => {
  const dividends = await scrapeDividends();
  console.log(parseDividends(dividends));
};
