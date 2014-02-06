var log = require('../../log.js');
var sys = require('sys');

var step = {
	player1: null,
	player2: null
}

var scores = {
	player1: 0,
	player2: 0
}

var winner = null;

setTimeout(function() {
	start();
}, 3000);

process.on("message", function(m) {
	//log.l("MASTER", "Got message: " + sys.inspect(m));

	if (m.m.action = 'step') {
		if (step[m.sender] === null) {
			step[m.sender] = m.m.step;
		}
	}

	if ( (step.player1 !== null) && (step.player2 !== null) ) {
		test( function() {
			log.l("MASTER", "Winner: " + winner + "\nStep: " + sys.inspect(step)+ "\nScore: " + sys.inspect(scores));

			sendResult();

			step.player1 = null;
			step.player2 = null;
			log.l("MASTER", "Starting new game");
			setTimeout(function() {
				start();
			}, 3000);
		} );
	}


});


function start() {
	console.log("started");
	var message = {
		sender: null,
		receiver: "player1",
		m: {
			"action": "start"
		}
	}

	process.send(message);

	var message = {
		sender: null,
		receiver: "player2",
		m: {
			"action": "start"
		}
	}

	process.send(message);

}

function sendResult() {
	console.log("sending result");
	var message = {
		sender: null,
		receiver: "player1",
		m: {
			"action": "result",
			"data": step
		}
	}

	process.send(message);

	var message = {
		sender: null,
		receiver: "player2",
		m: {
			"action": "result",
			"data": step
		}
	}

	process.send(message);

}

function test( callback ) {
	if (step.player1 === step.player2) {
		log.l("MASTER", "Draw.");
		winner = 'none';
	} else if (step.player1 == "rock") {
		if (step.player2 == "scissors") {
			scores.player1++;
			winner = "player1";
		} else {
			scores.player2++;
			winner = "player2";
		}
	} else if (step.player1 == "paper") {
		if (step.player2 == "rock") {
			scores.player1++;
			winner = "player1";
		} else {
			scores.player2++;
			winner = "player2";
		}
	} else if (step.player1 == "scissors") {
		if (step.player2 == "paper") {
			scores.player1++;
			winner = "player1";
		} else {
			scores.player2++;
			winner = "player2";
		}
	}


	callback();
}