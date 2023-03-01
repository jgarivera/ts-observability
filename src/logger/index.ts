import Logger, { createLogger, stdSerializers } from 'bunyan';
import StringLevelNameStream from './string-level-name-stream';

export class ApplicationLogger {
    private logger: Logger;

    public constructor(private serviceName: string) {
        this.logger = createLogger({
            name: this.serviceName,
            serializers: {
                err: stdSerializers.err,
                req: stdSerializers.req,
                res: stdSerializers.res,
            },
            streams: [
                {
                    type: 'raw',
                    stream: new StringLevelNameStream(
                        `/workspace/${this.serviceName}.log`
                    ),
                },
            ],
        });
    }

    public getInstance(): Logger {
        return this.logger;
    }
}
