var log = require('../../log.js');
var sys = require('sys');

var results = [];

process.on("message", function(m) {
	if (m.m.action == "start") {
		//log.l("Player2", "start received");

		var message = {
				sender: null,
				receiver: 'master',
				m: {
					step: null
				}
			}

		var randNum = Math.floor(Math.random() * 3);
		switch (randNum) {
			case 0:
				message.m.step = "rock"
				break;
			case 1:
				message.m.step = "paper"
				break;
			default:
				message.m.step = "scissors"
		}

		process.send(message);

	}

	if (m.m.action == 'result') {
		//log.l("Player2", "Result received: " + sys.inspect(m.m.data));
		results.push(m.m.data);
	}

});