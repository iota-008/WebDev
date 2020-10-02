function getRemainingTime(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	// var t = endtime - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

function intializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daySpan = clock.querySelector(".days");
	var hoursSpan = clock.querySelector(".hours");
	var minutesSpan = clock.querySelector(".minutes");
	var secondsSpan = clock.querySelector(".seconds");

	function updateClock() {
		var t = getRemainingTime(endtime);
		daySpan.innerHTML = t.days;
		hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
		minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
		secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

		if (t.total < 0) {
			clearInterval(timeinterval);

			alert("TIME HAS ARRIVED!!!");
			document.getElementById("day").innerHTML = 0;
			document.getElementById("hour").innerHTML = 0;
			document.getElementById("minute").innerHTML = 0;
			document.getElementById("second").innerHTML = 0;
		}
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

function start() {
	var endtime =
		parseInt(document.getElementById("day").textContent) * 24 * 60 * 60 * 1000 +
		parseInt(document.getElementById("hour").textContent) * 60 * 60 * 1000 +
		parseInt(document.getElementById("minute").textContent) * 60 * 1000 +
		parseInt(document.getElementById("second").textContent) * 1000;

	console.log(endtime);
	var dateobj = Date.now();
	dateobj += endtime;
	dateobj = new Date(dateobj);
	intializeClock("clockdiv", dateobj);
}

function reset() {
	document.getElementById("day").innerHTML = 0;
	document.getElementById("hour").innerHTML = 0;
	document.getElementById("minute").innerHTML = 0;
	document.getElementById("second").innerHTML = 0;
}

document.getElementById("start").addEventListener("click", start);

document.getElementById("reset").addEventListener("click", reset);
