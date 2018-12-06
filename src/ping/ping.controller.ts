import {Controller, Get, Res, Session} from '@nestjs/common';

@Controller('ping')
export class PingController {

    @Get()
    ping(@Session() session) {

        console.log(session);

        const minimist = require('minimist');

        let args = minimist(process.argv.slice(2), {
            default: {
                port: 8080
            },
        });

        session.inc++;

        const port = args.port;

        return {
            status: 'success',
            data: {
                session_time: session.time,
                session_inc: session.inc,
                port: port
            },
        };
    }

    @Get('session_init')
    session_init(@Session() session) {

        console.log(session);

        session.time = (new Date()).getTime();
        session.inc = 0;

        return {
            status: 'success',
            data: {
                session_time: session.time,
            },
        };
    }

    @Get('session_destroy')
    session_destroy(@Res() res, @Session() session) {

        console.log(session);

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

        console.log(session);

        return JSON.stringify(session);
    }
}
