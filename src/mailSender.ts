import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { ParsedDividends } from "@/transforms";

const REGION = "us-east-1";
const client = new SESClient({ region: REGION });

export const sendEmail = async (dividends: ParsedDividends[]) => {
  try {
    const sendCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [...process.env.TO.split(",")],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `Olá! Novas informações de dividendos foram encontradas. Seguem os detalhes:

${dividends.map((div) => generateDividendInfo(div)).join("\n+++===+++\n")}

ticker,dataEx,paymentDate,amount,type
${dividends.map((div) => generateCsVInfo(div)).join("\n")}
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Novos dividendos Registrados!",
        },
      },
      Source: process.env.FROM,
    });

    await client.send(sendCommand);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateDividendInfo = (dividend: ParsedDividends) => {
  return `${dividend.companyName}:
${dividend.ticker}
DataEx: ${dividend.exDate.toLocaleDateString("pt-br")}
Data de pagamento: ${
    dividend.paymentDate
      ? dividend.paymentDate.toLocaleDateString("pt-br")
      : "Não informada"
  }
valores: 
  ${dividend.values.map((val) => `${val.amount} - ${val.type}`).join("\n")}
    `;
};

const generateCsVInfo = (dividend: ParsedDividends) => {
  return dividend.values
    .map(
      (d) =>
        `${dividend.ticker},${dividend.exDate.toLocaleDateString("pt-br")},${
          dividend.paymentDate
            ? dividend.paymentDate.toLocaleDateString("pt-br")
            : "não informada"
        },${d.amount},${d.type}`
    )
    .join("\n");
};
