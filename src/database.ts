import {DynamoDBClient, ListTablesCommand} from "@aws-sdk/client-dynamodb"


(async ()=> {
    const client = new DynamoDBClient({ region: "us-east-1", endpoint: "http://localstack:4569"})
    const command = new ListTablesCommand({});

    try {
        const result = await client.send(command);
        console.log(result.TableNames)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
})()
    
