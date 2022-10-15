import { ddbDocClient } from "./dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ParsedDividends } from "@/transforms";

export const storeDividends = async (dividends: ParsedDividends[]) => {
  try {
    const storageResult = await Promise.all(
      dividends.map((div) =>
        ddbDocClient.send(
          new PutCommand({
            TableName: "dividends-table-dev",
            Item: {
              ...div,
              approvalDate: div.approvalDate.getTime(),
            },
            ConditionExpression:
              "attribute_not_exists(approvalDate) AND attribute_not_exists(ticker)",
          })
        )
      )
    );
    return storageResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
