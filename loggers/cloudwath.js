const { CloudWatchLogsClient, PutLogEventsCommand } = require("@aws-sdk/client-cloudwatch-logs");


const awsConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.REGION,
};

// Crea un cliente de CloudWatch Logs
const cloudWatchLogsClient = new CloudWatchLogsClient(awsConfig);

// Nombre del grupo de registros y del flujo de registros en CloudWatch Logs
const logGroupName = 'user-pica-logs';
const logStreamName = 'user';

// Función para enviar un registro a CloudWatch Logs
exports.sendRegisterLogs = async (registro, nivel = "INFO") => {
    const params = {
        logGroupName: logGroupName,
        logStreamName: logStreamName,
        logEvents: [
            {
                message: `[${nivel}] ${registro}`,
                timestamp: new Date().getTime(),

            },
        ],
    };


    await cloudWatchLogsClient.send(new PutLogEventsCommand(params));

}