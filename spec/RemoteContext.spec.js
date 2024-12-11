import { RemoteContext } from '@themost/remoting';
import { RemoteServer } from '@themost/remoting/platform-server';
import { getApplication, serveApplication } from '@themost/test';
import {DataCacheStrategy, DefaultDataCacheStrategy} from '@themost/data';

describe('RemoteContext', () => {

    /**
     * @type {import('express').Application}
     */
    let container;
    /**
     * @type {import('http').Server}
     */
    let server;
    beforeAll((done) => {
        container = getApplication();
        /**
         * @type {import('@themost/express').ExpressDataApplication}
         */
        const app = container.get('ExpressDataApplication');
        app.useService(RemoteServer);
        serveApplication(container).then((result) => {
            server = result;
            return done();
        });
    });

    afterAll(async () => {
        /**
         * @type {import('@themost/express').ExpressDataApplication}
         */
        const app = container.get('ExpressDataApplication');
        const cache = app.getConfiguration().getStrategy(DataCacheStrategy);
        if (cache instanceof DefaultDataCacheStrategy) {
            await cache.finalize();
        }
        /**
         * @type {RemoteServer}
         */
        const remote = app.getService(RemoteServer);
        if (remote) {
            // shutdown grpc server
            await remote.server.forceShutdown();
        }
        if (server) {
            await new Promise((resolve) => {
                server.close(() => {
                    resolve();
                });
            });
        }
    });

    it('should get model', async () => {
        const context = new RemoteContext();
        expect(context).toBeTruthy();
        const model = await context.getModel('Product');
        expect(model).toBeTruthy();
    })
})