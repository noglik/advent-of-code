import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import { AddressInfo, Server } from 'net';
import { GenericContainer } from 'testcontainers';
import { createServer } from '../src/app';
import { setup as setupClient, close as closeClient } from '../src/db';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

declare module 'mocha' {
  export interface Context {
    serverInstance: Server;
    server: ChaiHttp.Agent;
    container: Awaited<ReturnType<GenericContainer['start']>>;
  }
}

// TODO: mock logger

const DB_NAME = 'kryha';
const PORT = 27017;

before(async function () {
  this.timeout(20000);
  this.container = await new GenericContainer('mongo:4.4.4-bionic')
    .withExposedPorts(PORT)
    .withEnv('MONGO_INITDB_DATABASE', DB_NAME)
    .start();

  const host = this.container.getHost();
  const port = this.container.getMappedPort(PORT);

  await setupClient(`mongodb://${host}:${port}/${DB_NAME}`);

  this.serverInstance = createServer().listen();
  const address = this.serverInstance.address() as AddressInfo;
  const localUrl = `http://localhost:${address.port}`;
  this.server = chai.request(localUrl);
});

after(function () {
  this.serverInstance.close();
  closeClient();
  this.container.stop();
});
