import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {Rating} from "./entity/Rating";
import * as passport from "passport";
import {BasicStrategy} from "passport-http";
import * as bcrypt from "bcrypt";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup passport
    passport.use(new BasicStrategy(
        async function(username : string, password: string, done: any) {
            let user = await getRepository(User).findOne({userName: username});
            if (!user) { return done(null, false); }
            if (!await bcrypt.compare(password, user.password)){ return done(null, false); }
            return done(null, user);
        }
    ));

    // register express routes from defined application routes
    Routes.forEach(route => {
        let handler = (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        };

        if(route.auth) {
            return (app as any)[route.method](route.route, passport.authenticate('basic', { session: false }), handler);
        } else {
            return (app as any)[route.method](route.route, handler);
        }
    });

    // start express server
    app.listen(3000);

    let user = new User();
    user.userName = "Timber";
    user.password = "dev1234"
    await connection.manager.save(user);

    let rating = new Rating();
    rating.grade = 5;
    rating.motivation = "Not great";
    rating.user = user;
    await connection.manager.save(rating);

    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
