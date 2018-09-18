import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';



const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {
    default: {
        port: 8080
    },
});

console.log('args:', args);




const argss = require('yargs').argv;

console.log('Name: ' + argss.port);
console.log('Age: ' + argss.age);


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
