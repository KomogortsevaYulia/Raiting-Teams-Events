import { DataSource } from "typeorm"
import { userInit1667625253170 } from "./migrations/1667625253170-userInit"
import { User } from "./users/entities/user.entity"

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'raiting_teams_events',
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