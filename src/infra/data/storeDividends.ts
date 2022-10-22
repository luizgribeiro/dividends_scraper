import { ddbDocClient } from "./dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ParsedDividends } from "@/transforms";

export const storeDividends = async (dividends: ParsedDividends[]) => {
  const storageResult = await Promise.allSettled(
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

  return dividends
    .map((div, idx) => (storageResult[idx].status === "rejected" ? null : div))
    .filter((result) => (result === null ? false : true));
};
