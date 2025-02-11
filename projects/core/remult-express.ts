import * as express from 'express';
import { createRemultServer, RemultServer, RemultServerOptions } from './server/expressBridge';
import { initAsyncHooks } from './server/initAsyncHooks';

export function remultExpress(options?:
    RemultServerOptions<express.Request> & {
        bodyParser?: boolean;
        bodySizeLimit?: string;
    }): express.RequestHandler & RemultServer {
    let app = express.Router();

    if (!options) {
        options = {};
    }
    if (options.bodySizeLimit === undefined) {
        options.bodySizeLimit = '10mb';
    }
    if (options?.bodyParser !== false) {
        app.use(express.json({ limit: options.bodySizeLimit }));
        app.use(express.urlencoded({ extended: true, limit: options.bodySizeLimit }));
    }
    initAsyncHooks();
    const server = createRemultServer(options);
    server.registerRouter(app);
    return Object.assign(app, {
        getRemult: (req) => server.getRemult(req),
        openApiDoc: (options: { title: string }) => server.openApiDoc(options),
        registerRouter: x => server.registerRouter(x),
        withRemult: (...args) => server.withRemult(...args)

    } as RemultServer);

}