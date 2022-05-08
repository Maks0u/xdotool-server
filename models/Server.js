import http from 'http';
import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';

export default class Server {
	constructor(config) {
		this.port = config.port;
		this.host = config.host;

		this.app = express();
		this.app.use(cors(config.corsOptions));

		this.app.use(express.static('/home/maxime/dev/xdotool_server/views/', ['html']));
		this.app.get('/api/actions/:id', this.execKey.bind(this));
	}

	start() {
		http.createServer(this.app).listen(this.port, this.host, () => console.log('Server running', this.host, this.port));
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
