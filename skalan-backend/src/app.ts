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

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

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
    user.username = "Timber";
    user.password = "dev1234";
    await connection.manager.save(user);

    let user2 = new User();
    user2.username = "Ramsey";
    user2.password = "dev1234";
    await connection.manager.save(user2);

    let rating = new Rating();
    rating.grade = 5;
    rating.motivation = "Jag åt en Calzone med rådjur. Pizzakanten var utsökt med en krispig botten. Tomatsåsen var lagom kraftig men aningen för söt. Köttet var skivat i fina tunna skivor men saknade smak. Som helhet var det en bra måltid.";
    rating.what = "Pizza Calzone";
    rating.where = "Pizzeria Milano, Stockholm";
    rating.user = user;
    rating.imageUrl = "http://www.fnstatic.co.uk/images/content/recipe/calzone-pizza.jpg";
    await connection.manager.save(rating);

    rating = new Rating();
    rating.grade = 9;
    rating.motivation = "Pasta Alfredo är båda gott och går snabbt att göra. Rätten uppskattas av vuxna och barn och passar både till vardagsmiddagen och till fest.";
    rating.what = "Pasta Alfredo";
    rating.where = "Vezzo, Umeå";
    rating.user = user2;
    rating.imageUrl = 'https://icase.azureedge.net/imagevaultfiles/id_186593/cf_259/pasta-alfredo-724258.jpg';
    await connection.manager.save(rating);

    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
