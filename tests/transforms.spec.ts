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
  const parseCompany = (company: string) => {
    const trimmedCompany = company.trim();
    const [ticker, companyName] = trimmedCompany.split(" - ");
    return { ticker, companyName };
  };

  const parseDate = (localStrDate: string) => {
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
  it("toDividendsObj", () => {});
});
