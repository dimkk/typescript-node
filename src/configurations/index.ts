import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
// const configs = new nconf.Provider({
//   env: {separator:'__'},
//   argv: true,
//   store: {
//     type: 'file',
//     file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
//   }
// });

nconf
    .env({separator: '__'})
    .argv()
    .file(path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`))
    ;

export interface IMqConfiguration {
    RABBITMQ_ADDRESS: string;
    RABBITMQ_LOGIN: string;
    RABBITMQ_PASS: string;
    RABBITMQ_QUEUE: string;
}

export interface IServerConfigurations {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    console.log(nconf.get('database:connectionString'));
    return nconf.get("database");
}

export function getServerConfigs(): IServerConfigurations {
    return nconf.get("server");
}

// export function getMqConfigs(): IServerConfigurations {
//     return nconf.get("server");
// }

export function getCfg() {
    return nconf;
};