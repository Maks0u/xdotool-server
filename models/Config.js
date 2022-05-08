export default class Config {
	constructor() {
		this.port = process.env.XDOTOOL_PORT;
		this.host = process.env.XDOTOOL_HOST;
		this.corsOptions = {
			origin: process.env.XDOTOOL_CORS_ORIGIN,
		};
	}
}
