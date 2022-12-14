const WebSocket = require("ws");

const createDrawServer = (server) => {
	const wsServer = new WebSocket.Server({ server });

	wsServer.on("connection", (ws, req) => {
		ws.on("message", (message) => {
			wsServer.clients.forEach((c) => {
				if (c.readyState === WebSocket.OPEN) {
					c.send(message.toString());
				}
			});
		});
	});
};
module.exports = createDrawServer;
