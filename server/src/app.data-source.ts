import { DataSource } from "typeorm"
import { userInit1667625253170 } from "./migrations/1667625253170-userInit"
import { User } from "./users/entities/user.entity"
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
 
const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [User],
    synchronize: true,
    migrations: [userInit1667625253170],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;