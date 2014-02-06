//Logging to console and syslog modules
var log = require('../../log.js');
var sys = require('sys');

/**
Array of played games.

Example: 
	[ 
	  { player1: 'scissors', player2: 'scissors' },
	  { player1: 'rock', player2: 'rock' },
	  { player1: 'rock', player2: 'scissors' },
	  { player1: 'paper', player2: 'paper' } 
  ]

May be used for making a decision about next step.

*/
var results = [];

process.on("message", function(m) {

	//New step logic
	if (m.m.action == "start") {

		/*
		* We can log something into console.
		*
		* log.l("Player1", "start received");
		*
		* It will looks like "[Player1]: start received"
		* Used for debugging player.
		*/

		/**
		*	Message object skeleton.
		*	It always needs to be this:
		*/
		var message = {
				sender: null,
				receiver: 'master',
				m: {
					step: null
				}
			}

		/**
		* Step choosing logic (Yes, random. 33% of each.)
		* We need to fill message.m.step with choosed step.
		* Step can be a "rock", a "paper" or a "scissors"
		*/
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

		//Sending our message to master module of the game
		process.send(message);

	}


	/**
	* After each match master sends to players a result of match.
	* This is a "result" action.
	* It stored in m.m.data section.
	* Example: { player1: 'rock', player2: 'scissors' }
	*/
	if (m.m.action == 'result') {
		//log.l("Player1", "Result received: " + sys.inspect(m.m.data));
		results.push(m.m.data);
	}

});