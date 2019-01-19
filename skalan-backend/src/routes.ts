import {UserController} from "./controller/UserController";
import {RatingController} from "./controller/RatingController";
import {LoginController} from "./controller/LoginController";

export const Routes = [
    //Login
    {
        method: "post",
        route: "/login",
        controller: LoginController,
        action: "login",
        auth: false
    },

    //User
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all",
        auth: true
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one",
        auth: true
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save",
        auth: true,
    },
    {
        method: "delete",
        route: "/users",
        controller: UserController,
        action: "remove",
        auth: true
    },

    //Rating
    {
        method: "get",
        route: "/ratings",
        controller: RatingController,
        action: "all",
        auth: false
    },
    {
        method: "get",
        route: "/ratings/:id",
        controller: RatingController,
        action: "one",
        auth: false
    },
    {
        method: "post",
        route: "/ratings",
        controller: RatingController,
        action: "save",
        auth: true
    }
];