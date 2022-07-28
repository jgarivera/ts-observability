import { createLogger, nameFromLevel, safeCycles, stdSerializers, WriteFn } from 'bunyan';
import { createWriteStream } from 'fs';

class StringLevelNameStream implements WriteFn {
    constructor(private filePath: string) {}

    write(log: any): void {
        const fileStream = createWriteStream(this.filePath, {
            flags: 'a',
            encoding: 'utf8',
        });

        const clonedLog = Object.assign({}, log, {
            level: nameFromLevel[log.level],
        });

        const logLine = JSON.stringify(clonedLog, safeCycles()) + '\n';
        process.stdout.write(logLine);
        fileStream.write(logLine);
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
            type: 'raw',
            stream: new StringLevelNameStream('/workspace/app.log'),
        },
    ],
});
