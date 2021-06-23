enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

type logLevelStrings = keyof typeof LogLevel;

function printImportant(key: logLevelStrings, message: string) {
    const num = LogLevel[key];
    console.log(`num : ${num}`);
    console.log(`LogLevel.WARN : ${LogLevel.WARN}`);
    if(num <= LogLevel.WARN) {
        console.log('Log level key is : ', key);
        console.log('Log level value is : ', num);
        console.log('Log level message is : ', message);
    }
}
printImportant('ERROR', 'This is a message');