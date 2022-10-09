import { scrapeDividends } from "./scraper";
import { parseDividends } from "./transforms";
import { storeDividends } from "./infra/data/storeDividends";

export const run = async () => {
  console.log("Starting to run dividends scraper");
  const dividends = await scrapeDividends();

  const parsedDividends = parseDividends(dividends);

  await storeDividends(parsedDividends);
  console.log("Dividends scraper ran successfully");
};
