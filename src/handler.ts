import { scrapeDividends } from "./scraper";
import { parseDividends } from "./transforms";
import { storeDividends } from "./infra/data/storeDividends";
import { sendEmail } from "./mailSender";

export const run = async () => {
  console.log("Starting to run dividends scraper");
  const dividends = await scrapeDividends();

  const parsedDividends = parseDividends(dividends);

  const storeResult = await storeDividends(parsedDividends);
  if (storeResult.length > 0) {
    await sendEmail(storeResult);
  }
  console.log("Dividends scraper ran successfully");
};
