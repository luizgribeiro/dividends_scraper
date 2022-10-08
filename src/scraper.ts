import got from "got-cjs";
import * as cheerio from "cheerio";
import { page } from "./pagina";
import fs from "fs";
import { dbClientFactory } from "./infra/data/dynamo";

export type Dividend = {
  company: string;
  approvalDate: string;
  type: string;
  exDate: string;
  paymentDate: string;
  value: string[];
};

export const scrapeDividends = async (): Promise<Dividend[]> => {
  const page = await got.get("http://dividendobr.com/tabex.php");
  const $ = cheerio.load(page.body);
  const tables = $("table", "#dilist");

  const dividends: Array<Dividend> = [];

  tables.each((idx, el) => {
    const values: Array<string> = [];
    $("td", el).each((i, el2) => {
      switch (i) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 11:
        case 12:
          values.push($(el2).text());
          break;
      }
    });
    dividends.push({
      company: values[0],
      approvalDate: values[1],
      type: values[2],
      exDate: values[3],
      paymentDate: values[4],
      value: values.slice(5),
    });
  });

  return dividends;
};
