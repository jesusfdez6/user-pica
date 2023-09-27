const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, ScanCommand, DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');

const dynamoDBClient = new DynamoDBClient({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const table = 'user';

exports.createUser = async data => {
    return new Promise(async (resolve, reject) => {
        const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
        data.id = uuidv4();
        const params = {
            TableName: table,
            Item: data
        }

        try {

            await ddbDocClient.send(new PutCommand(params));
            resolve(`Registro creado con exito`);

        } catch (error) {
            reject(error);
        }
    });
};

exports.getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
        const params = {
            TableName: table
        }

        try {

            const users = await ddbDocClient.send(new ScanCommand(params));
            resolve(users.Items);

        } catch (error) {
            reject(error);
        }
    });
};

exports.getUsersById = async (id) => {
    return new Promise(async (resolve, reject) => {
        const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
        const params = {
            TableName: table,
            Key: {
                id
            }
        }

        try {

            const users = await ddbDocClient.send(new GetCommand(params));
            resolve(users.Item);

        } catch (error) {
            reject(error);
        }
    });
};



