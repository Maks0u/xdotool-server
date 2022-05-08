import Config from './models/Config.js';
import Server from './models/Server.js';

const server = new Server(new Config());
server.start();
