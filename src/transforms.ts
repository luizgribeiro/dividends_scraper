import type { Dividend } from "../src/scraper";

export type ParsedDividends = {
  ticker: string;
  companyName: string;
  type: string;
  values: { amount: number; type: string }[];
  approvalDate: Date;
  exDate: Date;
  paymentDate: Date;
};

export const parseDividends = (dividends: Dividend[]) => {
  return dividends.map((div) => {
    console.log(div);
    return {
      ...parseCompany(div.company),
      type: "Dividendo",
      values: parseValues(div.value),
      approvalDate: parseDate(div.approvalDate),
      exDate: parseDate(div.exDate),
      paymentDate: parseDate(div.paymentDate),
    };
  });
};

export const parseValues = (values: string[]) => {
  const splitted = values.map((v) => v.split(" "));

  return splitted.map((v) => {
    return {
      amount: parseFloat(v[1].replace(",", ".")),
      type: v[5],
    };
  });
};

export const parseCompany = (company: string) => {
  const trimmedCompany = company.trim();
  const [ticker, companyName] = trimmedCompany.split(" - ");
  return { ticker, companyName };
};

export const parseDate = (localStrDate: string) => {
  const [_, meaningFullDate] = localStrDate.split(", ");
  const [day, month, year] = meaningFullDate.split(" de ");

  const monthIdx = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11,
  };

  return new Date(parseInt(year), monthIdx[month], parseInt(day));
};
