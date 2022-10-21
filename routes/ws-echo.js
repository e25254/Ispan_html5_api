const WebSocket = require("ws");

const createEchoServer = (server) => {
	const wsServer = new WebSocket.Server({ server });
	wsServer.on("connection", (ws, req) => {
		ws.send("-----");
		ws.on("message", (message) => {
			ws.send(message.toString());
		});
	});
};

module.exports = createEchoServer;
