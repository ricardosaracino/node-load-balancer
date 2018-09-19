import {Controller, Get, Res, Session} from '@nestjs/common';
import {randomBytes} from 'crypto';

@Controller('ping')
export class PingController {

    @Get()
    ping(@Session() session) {

        const minimist = require('minimist');

        let args = minimist(process.argv.slice(2), {
            default: {
                port: 8080
            },
        });

        const port = args.port;

        return {
            status: 'success',
            data: {
                session_time: session.time,
                port: port
            },
        };
    }

    @Get('session_init')
    session_init(@Session() session) {

        session.time = (new Date()).getTime();

        return {
            status: 'success',
            data: {
                session_time: session.time,
            },
        };
    }

    @Get('session_destroy')
    session_destroy(@Res() res, @Session() session) {

        session.destroy(() => {
            res.clearCookie('session_id', {path: '/'})
                .status(200)
                .send({
                    status: 'success',
                    data: {},
                });
        });

        return {
            status: 'failure',
            data: {},
        };
    }

    @Get('session')
    session(@Session() session) {
        return JSON.stringify(session);
    }
}
