const WebSocket = require("ws");
const sessionParser = require(__dirname + "/session-parser");

const createChatServer = (server) => {
	const wsServer = new WebSocket.Server({ server });
	const map = new Map(); // 存放對應的名稱
	wsServer.on("connection", (ws, req) => {
		// ws.send("連線數:" + wsServer.clients.size + "---");

		map.set(ws, { name: "" });
		ws.on("message", (message) => {
			let sendMsg = ""; // 要廣播的內容
			const obj = map.get(ws);
			if (!obj.name) {
				//第一次輸入的是本人的名字
				obj.name = message.toString();
				// obj.name = prompt('請輸入你的名稱')
				sendMsg = obj.name + "進來了;目前人數" + wsServer.clients.size;
			} else {
				sendMsg = `${obj.name}:${message.toString()}`;
			}
			wsServer.clients.forEach((c) => {
				if (c.readyState === WebSocket.OPEN) {
					c.send(sendMsg);
				}
			});
		});
	});
};
module.exports = createChatServer;
