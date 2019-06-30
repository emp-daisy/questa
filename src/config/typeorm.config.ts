import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const db = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.RDS_TYPE || db.type,
    host: process.env.RDS_HOSTNAME || db.host,
    port: process.env.RDS_PORT || db.port,
    username: process.env.RDS_USERNAME || db.username,
    password: process.env.RDS_PASSWORD || db.password,
    database: process.env.RDS_DB_NAME || db.database,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: process.env.TYPEORM_SYNC || db.synchronize,
};
