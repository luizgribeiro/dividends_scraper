import { ddbDocClient } from "./dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ParsedDividends } from "@/transforms";
import hash from "object-hash";

export const storeDividends = async (dividends: ParsedDividends[]) => {
  const storageResult = await Promise.allSettled(
    dividends.map((div) =>
      ddbDocClient.send(
        new PutCommand({
          TableName: "dividends-table-dev-1",
          Item: {
            ...div,
            approvalDate: div.approvalDate.getTime(),
            entryHash: hash.MD5(div),
          },
          ConditionExpression:
            "attribute_not_exists(approvalDate) AND attribute_not_exists(ticker) AND attribute_not_exists(entryHash)",
        })
      )
    )
  );

  return dividends
    .map((div, idx) => (storageResult[idx].status === "rejected" ? null : div))
    .filter((result) => (result === null ? false : true));
};
