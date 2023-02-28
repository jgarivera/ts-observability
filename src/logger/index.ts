import { createLogger, stdSerializers } from 'bunyan';
import StringLevelNameStream from './string-level-name-stream';

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
