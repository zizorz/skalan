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
import * as fileUpload from "express-fileupload";
import {classToPlain} from "class-transformer";
import * as morgan from "morgan";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.use(fileUpload());

    // setup passport
    passport.use(new BasicStrategy(
        async function(username : string, password: string, done: any) {
            let user = await getRepository(User).findOne({username: username});
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
                result.then(result => res.json(classToPlain(result)));
            } else {
                res.json(classToPlain(result));
            }
        };

        if(route.auth) {
            return (app as any)[route.method](route.route, passport.authenticate('basic', { session: false }), handler);
        } else {
            return (app as any)[route.method](route.route, handler);
        }
    });

    if (process.env.NODE_ENV !== 'production') {
        app.use('/images', express.static('images'));
    }

    // start express server
    app.listen(3000);


    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
