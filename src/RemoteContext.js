import path from 'path';
import {loadSync} from '@grpc/proto-loader';
import {loadPackageDefinition, ChannelCredentials} from '@grpc/grpc-js';

class RemoteContext {

    constructor() {
        const PROTO_PATH = path.resolve(__dirname, '../protos/remote_context.proto');
        const packageDefinition = loadSync(
            PROTO_PATH,
            {keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        /**
         * @type {{ RemoteContext: any }}
         */
        const { remoting }  = loadPackageDefinition(packageDefinition);
        this.client = new remoting.RemoteContext('localhost:50051', ChannelCredentials.createInsecure());
    }

    /**
     * @param {string} name
     * @returns {Promise<any>}
     */
    getModel(name) {
        return new Promise((resolve, reject) => {
            this.client.getModel({ name }, (err, response) => {
                if (err) {
                    return reject(err);
                }
                return resolve(response);
            });
        });
    }
}

export {
    RemoteContext
}