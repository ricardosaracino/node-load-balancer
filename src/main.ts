import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import * as helmet from 'helmet';
import * as fs from 'fs';

import * as session from 'express-session';
import sessionFileStore = require('session-file-store');

// C:\Users\Ricardo\Projects\node-load-balancer>npm run start:dev -- --port=8090 --name=sdf

const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {
    default: {
        port: 8080
    },
});

async function bootstrap() {

    let httpsOptions = {
        key: fs.readFileSync("./docker/ssl/server.key"),
        cert: fs.readFileSync("./docker/ssl/server.crt")
    };

    const app = await NestFactory.create(AppModule, {httpsOptions});

    const FileStore = sessionFileStore(session);

    app.use(session({
        store: new FileStore({}),
        secret: 'we-are-venom', // todo makerandstr?
        name: 'session_id',
        resave: false,
        saveUninitialized: false,
        maxAge: 60 * 60 * 1000,

        cookie: {
            path: '/',
            httpOnly: true,
            // todo
            secure: true, // this is the cause of the issues
            signed: true,
            sameSite: true,
            maxAge: 60 * 60 * 1000,
        },
    }));

    app.use(helmet());

    const port = args.port;

    console.log(`Listening on port ${port}`);

    //app.setGlobalPrefix('api');

    await app.listen(port);
}

bootstrap();
