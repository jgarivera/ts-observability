import { nameFromLevel, safeCycles, WriteFn } from 'bunyan';
import { createWriteStream } from 'fs';

export default class StringLevelNameStream implements WriteFn {
    public constructor(private filePath: string) {}

    public write(log: any): void {
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
