import got from "got";
import * as cheerio from "cheerio";
import {page} from "./pagina";
import fs from "fs";

import {DynamoDBClient, ListTablesCommand, CreateTableCommand} from "@aws-sdk/client-dynamodb"


(async ()=> {
    
    
    const client = new DynamoDBClient({ region: "us-east-1", 
        credentials: {
            accessKeyId: "dummy",
            secretAccessKey: "dummy", 
        },
        endpoint: "http://localstack:4566"
    })
    const command = new ListTablesCommand({});

    try {
        const result = await client.send(command);
        const tables = new Set(result.TableNames) 
        if (!tables.has("dividends")) {
            const createDividendsTable = new CreateTableCommand(
                {TableName: "dividends", 
                AttributeDefinitions: [
                    {AttributeName:"tickerSymbol", AttributeType: "S"}, 
                    {AttributeName:"exDate", AttributeType: "S"}
                 ],
                KeySchema: [{
                    AttributeName: "tickerSymbol",
                    KeyType: "HASH"
                }, 
                {
                    AttributeName: "exDate",
                    KeyType: "HASH"
                }
            ]}
            )

            await client.send(createDividendsTable);
            }
        console.log(result.TableNames)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
    
    /*
    const tickers = ['petr4'];

    for (const ticker of tickers) { 
        
        const page = await got.get("http://dividendobr.com/tabex.php");
        const $ = cheerio.load(page.body)
        const tables = $("table", "#dilist" )
        
        type dividend = {
            company: string;
            approvalDate: string;
            type: string;
            exDate: string;
            paymentDate: string;
            value: string[]
        }
        
        const dividends: Array<dividend> = [];
        
        tables.each( (idx, el)=> {
            const values: Array<string> = []; 
            $("td", el).each((i, el2)=> {
               switch (i) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                case 12:
                    values.push($(el2).text())
                    break;
               } 
            })
            dividends.push({
                company: values[0],
                approvalDate: values[1],
                type: values[2],
                exDate: values[3],
                paymentDate: values[4],
                value: values.slice(5)

            })
        })
        
        console.log(dividends)

           }
*/
})()
