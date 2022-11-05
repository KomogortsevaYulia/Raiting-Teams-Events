import { DataSource } from "typeorm"
import { userInit1667625253170 } from "./src/migrations/1667625253170-userInit"
import { User } from "./src/users/entities/user.entity"
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [User],
    synchronize: false,
    migrations: [userInit1667625253170],
});