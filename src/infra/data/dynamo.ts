import {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
} from "@aws-sdk/client-dynamodb";

export const dbClientFactory = async (): Promise<DynamoDBClient> => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy",
    },
    endpoint: "http://localstack:4566",
  });

  const listTables = new ListTablesCommand({});

  try {
    const result = await client.send(listTables);
    const tables = new Set(result.TableNames);

    if (!tables.has("dividends")) {
      const createDividendsTable = new CreateTableCommand({
        TableName: "dividends",
        AttributeDefinitions: [
          { AttributeName: "tickerSymbol", AttributeType: "S" },
          { AttributeName: "exDate", AttributeType: "S" },
        ],
        KeySchema: [
          {
            AttributeName: "tickerSymbol",
            KeyType: "HASH",
          },
          {
            AttributeName: "exDate",
            KeyType: "RANGE",
          },
        ],
        BillingMode: "PAY_PER_REQUEST",
      });

      await client.send(createDividendsTable);
    }

    return client;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
