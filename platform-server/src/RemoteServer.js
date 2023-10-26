import { ApplicationService } from '@themost/common';
import path from 'path';
import { Server, loadPackageDefinition, ServerCredentials } from '@grpc/grpc-js';
import {loadSync} from '@grpc/proto-loader';
import { ODataModelBuilder } from '@themost/data';


class RemoteServer extends ApplicationService {
    constructor(app) {
        super(app);
        const PROTO_PATH = path.resolve(__dirname, '../../protos/remote_context.proto');
        const packageDefinition = loadSync(
            PROTO_PATH,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        this.remoting = loadPackageDefinition(packageDefinition).remoting;

        const remoteServer = this.getServer();
        remoteServer.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
            remoteServer.start();
        });
    }

    getServer() {
        this.server = new Server();
        this.server.addService(this.remoting.RemoteContext.service, {
            getModel: (call, callback) => {
                const name = call.request.name;
                const service = this.application.getService(ODataModelBuilder);
                const items = service.getEntity(name).property;
                const property = items.map(({name, isBound}) => {
                     name,
                     isBound
                });
                return callback({
                    property
                });
            },
        });
        return this.server;
    }
}

export {
    RemoteServer
}