import { ServerBase } from "./serverBase";
import { Server } from "http";

export default class MyServer extends ServerBase {
    public creat(): void {
        let server = new Server();
        server.listen
    }
    public open(): void {
        throw new Error("Method not implemented.");
    }
    public close(): void {
        throw new Error("Method not implemented.");
    }
    public connect(): void {
        throw new Error("Method not implemented.");
    }

}