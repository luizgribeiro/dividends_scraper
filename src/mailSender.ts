import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const REGION = "us-east-1";
const client = new SESClient({ region: REGION });

export const sendEmail = async (div: any[]) => {
  try {
    const sendCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.TO],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "Mensagem de teste",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Email de teste SES",
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
