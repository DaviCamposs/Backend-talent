import "reflect-metadata"
import { Application } from "./adaptares/rest/Application";
import { loginUserRoute } from "./adaptares/rest/routes/LoginUserRoute";
import { registerUserRoute } from "./adaptares/rest/routes/RegisterUserRoute";
import { Route } from "./adaptares/rest/routes/Route";

const routeList: Route[] = [];
routeList.push(registerUserRoute)
routeList.push(loginUserRoute)

const application: Application = new Application(routeList);
application.startServerOnPort(parseInt(process.argv[1]) | 3000);

export default application;