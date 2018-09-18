import {Controller, Get, Session} from '@nestjs/common';
import {randomBytes} from 'crypto';

@Controller('ping')
export class PingController {

    @Get()
    ping() {

        const minimist = require('minimist');

        let args = minimist(process.argv.slice(2), {
            default: {
                port: 8080
            },
        });

        const port = args.port;

        return `Ping on port ${port}`;
    }

    @Get('session_init')
    session_init(@Session() session) {

        session.token = 'test-token';
        session.rand =  randomBytes(16);

        return JSON.stringify(session);
    }

    @Get('session')
    session(@Session() session) {
        return JSON.stringify(session);
    }
}
