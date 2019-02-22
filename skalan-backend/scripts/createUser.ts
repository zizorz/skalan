import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "../src/entity/User";

if (process.argv.length < 4) {
    console.log("usage: ts-node createUser.ts [username] [password]");
} else {
    createUser(process.argv[2], process.argv[3]);
}

function createUser(username, password) {
    createConnection().then(async connection => {
        console.log(`Creating user with username: ${username} and password: ${password}`);
        let user = new User();
        user.username = username;
        user.password = password;
        await connection.manager.save(user);
        console.log("User created");
        process.exit();
    }).catch(error =>  {
        console.log(error);
        process.exit();
    });
}


