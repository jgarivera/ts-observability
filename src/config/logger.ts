import { createLogger, nameFromLevel, stdSerializers, WriteFn } from 'bunyan';

class StringLevelNameStream implements WriteFn {
    write(data: Object): void {
        const logObject = JSON.parse(data.toString());
        // Change log level number to name and write it out
        logObject.level = nameFromLevel[logObject.level];
        process.stdout.write(JSON.stringify(logObject) + '\n');
    }
}

export const logger = createLogger({
    name: 'myapp',
    serializers: {
        err: stdSerializers.err,
        req: stdSerializers.req,
        res: stdSerializers.res,
    },
    streams: [
        {
            stream: new StringLevelNameStream(),
        },
    ],
});
