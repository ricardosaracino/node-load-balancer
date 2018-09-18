import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

// C:\Users\Ricardo\Projects\node-load-balancer>npm run start:dev -- --port=8090 --name=sdf

const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {
    default: {
        port: 8080
    },
});

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const port = args.port;

    console.log(`Listening on port ${port}`);

    //app.setGlobalPrefix('api');

    await app.listen(port);
}

bootstrap();
