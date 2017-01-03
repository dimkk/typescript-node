import * as Server from "./server";
import * as Database from "./database";
import * as Configs from "./configurations";
import * as Mq from "./mqlistener";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Init Database
// const dbConfigs = Configs.getDatabaseConfig();
// const database = Database.init(dbConfigs);

//Starting Application Server
// const serverConfigs = Configs.getServerConfigs();
// const server = Server.init(serverConfigs, database);

// server.start(() => {
//     console.log('Server running at:', server.info.uri);
// });

Mq.init(Configs.getCfg().get("mq"));