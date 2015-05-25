var five = require('johnny-five');
var Edison = require('edison-io');
var events = require('node-milight-scheduler/lib/LightEvents');

var board = new five.Board({ io: new Edison() });

var positions = [];
for (event in events) {
	positions.push(event);
}

board.on("ready", function() {
	var position;
	var getPosition = function(){
		var relValue = Math.floor((dial.value/1024)*positions.length);
		return positions[relValue];
	};
	var lcd = new five.LCD({
		controller: "JHD1313M1"
	});
	lcd.bgColor(50,150,100);
	var dial = new five.Sensor("A0");
	dial.on("data", function() {
		var oldPos = position;
		position = getPosition();
		lcd.cursor(1,0).print(position+"            ");
	});
	var button = new five.Button(4);
	button.on('press',function(){
		console.log("Position set to",position);
		events[position]();
	});
});
