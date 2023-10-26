import { RemoteContext } from '@themost/remoting';
import { RemoteServer } from '@themost/remoting/platform-server';
import { getApplication, serveApplication } from '@themost/test';

describe('RemoteContext', () => {

    beforeAll((done) => {
        const container = getApplication();
        /**
         * @type {import('@themost/express').ExpressDataApplication}
         */
        const app = container.get('ExpressDataApplication');
        app.useService(RemoteServer);
        serveApplication(container).then(() => {
            return done();
        });
    });

    it('should create instance', () => {
        const context = new RemoteContext();
        expect(context).toBeTruthy()
    })
})