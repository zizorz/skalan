import {UserController} from "./controller/UserController";
import {RatingController} from "./controller/RatingController";

export const Routes = [
    //User
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/users",
        controller: UserController,
        action: "remove"
    },

    //Rating
    {
        method: "get",
        route: "/ratings",
        controller: RatingController,
        action: "all"
    },
    {
        method: "get",
        route: "/ratings/:id",
        controller: RatingController,
        action: "one"
    },
    {
        method: "post",
        route: "/ratings",
        controller: RatingController,
        action: "save"
    },
];