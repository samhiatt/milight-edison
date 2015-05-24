var five = require('johnny-five');
var Edison = require('edison-io');

var board = new five.Board({ io: new Edison() });

board.on("ready", function() {
	var lcd = new five.LCD({
		controller: "JHD1313M1"
	});
	lcd.bgColor(50,150,100);
	var dial = new five.Sensor("A0");
	dial.on("data", function() {
		lcd.cursor(0,10).print("v:"+this.value+"    ");
	});

});
