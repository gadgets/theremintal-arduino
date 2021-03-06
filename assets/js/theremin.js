$(function(){

    var prefix =    'orientation' in screen ? '' :
                    'mozOrientation' in screen ? 'moz' :
                    'msOrientation' in screen ? 'ms' :
                    null;

    //theremin = new Theremin();
    //theremin.start();

    $(".type-trigger").click(function() {
		var type = $(this).data('type')
		theremin.oscillator.type = type;
    });

});


function Theremin() {

    this.context = new AudioContext(); //webkit browsers only
    this.oscillator = this.context.createOscillator();
    this.level = this.context.createGain();
    this.playing = false;

    this.oscillator.type = 'sine'; // sine wave
    this.oscillator.frequency.value = 440;
    this.oscillator.start(0);
    this.level.gain.value = 0;

    this.oscillator.connect(this.level);
    this.level.connect(this.context.destination);

};

Theremin.prototype.oscillator = null;
Theremin.prototype.playing = null;
Theremin.prototype.level = null;
Theremin.prototype.last_level = 0;
Theremin.prototype.last_y = 0;

Theremin.prototype.start = function() {

    var that = this;

    // setup all of the things to read

    //window.onmousemove = that.readMouse;

    $(document).keydown(function(event) {
        if(event.which == 80) {
            //console.log(event);
            that.play();
        }
    });

    $(document).keyup(function(event) {
        if(event.which == 80) {
            that.stop();
        }
    });

};

Theremin.prototype.play = function() {

    var that = this;

    that.playing = true;
    if (that.last_level == 0){
        that.last_level = .5;
    }
    that.level.gain.value = that.last_level;
}


Theremin.prototype.stop = function() {

    var that = this;

    that.playing = false;
    that.level.gain.value = 0;

}



Theremin.prototype.readMouse = function(event) {

    var that = this;

    if (theremin.playing == true) {

        theremin.frequencyConstraint(event.clientX)
        var percent = (theremin.last_y/$(document).height()) * 100;
        var new_gain = ((100 - Math.round(percent)) * .01);
        theremin.level.gain.value = new_gain;

        theremin.last_level = new_gain;
        theremin.last_y = event.clientY;

    }

};


Theremin.prototype.setFrequency = function(value) {
	var self = this;
	if (theremin.playing == true) {
        theremin.frequencyConstraint(value);
    }
}

Theremin.prototype.frequencyConstraint = function(event_x) {

    var that = this;
	
    var c1 = 263.74;
    var b6 = 1059.94;
    var range = b6 - c1;

    var x_percentage = (event_x/97) * 100;
    var freq = (x_percentage * (range/100)) + c1;
    that.oscillator.frequency.value = freq;

};

Theremin.prototype.addEffect = function() {
    return 1;

}



/*Theremin.prototype.frequencyList = [

    {
        freq: 32.70,
        note: "C1",
        cm: 1054.94
    },

    {
        freq: 34.65,
        name: "C#1",
        cm: 995.73
    },
    {
        freq: 36.71,
        name: "D1",
        cm: 939.85
    },
    {
        freq: 38.89,
        name: "D#1/Eb1",
        cm: 887.10
    },
    {
        freq: 41.20,
        name: "E1",
        cm: 837.31
    }
    {
        freq: 43.65
        name: "F1",
        cm: 790.31
    },
    46.25: {
        name: "F#1/Gb1",
        cm: 745.96
    },
    49.00: {
        name: "G1",
        cm: 704.09
    },
    51.91: {
        name: "G#1/Ab1",
        cm: 664.57
    },
    55.00: {
        name: "A1",
        cm: 627.27
    },
    58.27: {
        name: "A#1/Bb1",
        cm: 592.07
    },
    61.74: {
        name: "B1",
        cm: 558.84
    },
    65.41: {
        name: "C2",
        cm: 527.47
    }
    69.30: {
        name: "C#2/Db2",
        cm: 497.87
    },
    73.42: {
        name: "D2",
        cm: 469.92
    },
    77.78: {
        name: "D#2/Eb2",
        cm: 443.55
    },
    82.41: {
        name: "E2",
        cm: 418.65
    },
    87.31: {
        name: "F2",
        cm: 395.16
    },
    92.50: {
        name: "F#2/Gb2",
        cm: 372.98
    },
    98.00: {
        name: "G2",
        cm: 352.04
    },
    103.83: {
        name: "G#2/Ab2",
        cm: 332.29
    }
/*A2	110.00	313.64
 A#2/Bb2 	116.54	296.03
B2	123.47	279.42
C3	130.81	263.74
 C#3/Db3 	138.59	248.93
D3	146.83	234.96
 D#3/Eb3 	155.56	221.77
E3	164.81	209.33
F3	174.61	197.58
 F#3/Gb3 	185.00	186.49
G3	196.00	176.02
 G#3/Ab3 	207.65	166.14
A3	220.00	156.82
 A#3/Bb3 	233.08	148.02
B3	246.94	139.71
C4	261.63	131.87
 C#4/Db4 	277.18	124.47
D4	293.66	117.48
 D#4/Eb4 	311.13	110.89
E4	329.63	104.66
F4	349.23	98.79
 F#4/Gb4 	369.99	93.24
G4	392.00	88.01
 G#4/Ab4 	415.30	83.07
A4	440.00	78.41
 A#4/Bb4 	466.16	74.01
B4	493.88	69.85

]*/
