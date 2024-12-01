import  Express  from "express";
import { router as routerWa } from "./routes/wahook";
import { router as routerChat } from "./routes/chat";
import { router as routerWantHelp } from "./routes/wanthelp";
import { router as shotsRouter } from "./routes/shots";
import ExpressServer from "serverpreconfigured";
const waServer=Express();
const userServer=new ExpressServer();
export function startWaServer(){
    waServer.use('/wa',routerWa);
    waServer.listen(1111);
}
export function startUserServer(){
    userServer.initUserAuthSystem('/server/user');
    userServer.app.use('/server/chat',routerChat);
    userServer.app.use('/server/wantHelp',routerWantHelp);
    userServer.app.use('/server/shots',shotsRouter);
    userServer.listen(1110);
}
