import {
  parseCompany,
  parseDividends,
  parseDate,
  parseValues,
} from "../src/transforms";

describe("Data transforms made on dividends info array", () => {
  const DividendSample = {
    company: "ITUB - itau unibanco holding s.a.   \n",
    approvalDate: "segunda-feira, 06 de Dezembro de 2021",
    type: "Dividendo",
    exDate: "segunda-feira, 03 de Outubro de 2022",
    paymentDate: "terça-feira, 01 de Novembro de 2022",
    value: [
      "R$ 0,015 por ação ITAUUNIBANCO ON N1",
      "R$ 0,015 por ação ITAUUNIBANCO PN N1",
    ],
  };
  describe("parseCompany", () => {
    it("Should return only the company ticker", () => {
      const trimmedCompany = {
        ticker: "ITUB",
        companyName: "itau unibanco holding s.a.",
      };
      expect(parseCompany(DividendSample.company)).toEqual(trimmedCompany);
    });
  });
  describe("parseDate", () => {
    it("Should return a valid date from the parsed string", () => {
      const parsedApprovalDate = new Date(2021, 11, 6);

      expect(parseDate(DividendSample.approvalDate)).toEqual(
        parsedApprovalDate
      );
    });
  });
  describe("parseValues", () => {
    it("Should return an array with amount and type for the provided array of values", () => {
      expect(parseValues(DividendSample.value)).toEqual([
        { type: "ON", amount: 0.015 },
        { type: "PN", amount: 0.015 },
      ]);
    });
  });

  describe("parseDividends", () => {
    it("Should return an array with dividends objects with all it's fields parsed", () => {
      expect(parseDividends([DividendSample])).toEqual([
        {
          ticker: "ITUB",
          companyName: "itau unibanco holding s.a.",
          type: "Dividendo",
          values: [
            { type: "ON", amount: 0.015 },
            { type: "PN", amount: 0.015 },
          ],
          approvalDate: new Date(2021, 11, 6),
          exDate: new Date(2022, 9, 3),
          paymentDate: new Date(2022, 10, 1),
        },
      ]);
    });
  });
});
