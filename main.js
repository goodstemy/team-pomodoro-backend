const Koa = require('koa');
const bodyParser = require('koa-body-parser');
const app = new Koa();

app.use(bodyParser());

const data = {
	rooms: []
};

app.use(async ctx => {
	const body = ctx.request.body;
	if (!hasRoom(body.name)) {
		data.rooms.push({
			name: body.name,
			startTime: +new Date()
		});

		ctx.body = JSON.stringify({
			seconds: 0
		});
	} else {
		ctx.body = JSON.stringify({
			seconds: Math.floor((+new Date() - getRoomTimeByName(body.name)) / 1000)
		});
	}
});

function hasRoom(roomName) {
	return data.rooms.some(room => room.name === roomName);
}

function getRoomTimeByName(roomName) {
	let startTime;

	data.rooms.map(room => {
		if (room.name === roomName) startTime = room.startTime
	});

	return startTime;
}

app.listen(3000);
