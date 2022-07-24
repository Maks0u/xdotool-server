import http from 'http';
import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import Logger from './Logger.js';

export default class Server {
	constructor(config) {
		Object.keys(config).forEach((key) => {
			Logger.info(`${key}: ${JSON.stringify(config[key])}`);
		});

		this.port = config.port;
		this.host = config.host;

		this.app = express();
		this.app.use(cors(config.corsOptions));

		// Logger
		this.app.use((req, res, next) => {
			Logger.http(`${req.method} ${req.url}`);
			next();
		});

		this.app.get('/', this.getHome.bind(this));
		this.app.get('/api/actions/:id', this.execKey.bind(this));
	}

	start() {
		http
			.createServer(this.app)
			.listen(this.port, this.host, () => Logger.info('Server running http://' + this.host + ':' + this.port));
	}

	getHome(req, res) {
		res.status(200).sendFile('/home/maxime/dev/xdotool_server/views/index.html');
	}

	execKey(req, res) {
		const id = req.params.id;

		const action = {
			space: 'xdotool key space',
			left: 'xdotool key Left',
			right: 'xdotool key Right',
			up: 'xdotool key Up',
			down: 'xdotool key Down',
			home: 'xdotool key Home',
			// type: 'xdotool type ' + (req.query.text || ''),
		}[id];

		if (!action) {
			res.status(400).send('Bad Request').end();
			return;
		}

		exec(action);
		res.status(204).end();
	}
}
