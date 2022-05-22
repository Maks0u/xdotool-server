import envFile from '../env.js';

export default class Config {
	constructor() {
		this.port = process.env.XDOTOOL_PORT || envFile.XDOTOOL_PORT;
		this.host = process.env.XDOTOOL_HOST || envFile.XDOTOOL_HOST;
		this.corsOptions = {
			origin: process.env.XDOTOOL_CORS_ORIGIN || envFile.XDOTOOL_CORS_ORIGIN,
		};
	}
}
