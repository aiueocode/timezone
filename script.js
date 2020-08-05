function currentLocal() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const currentTime = moment().tz(timezone).format("MM-DD-YYYY HH:mm ZZ");
	document.getElementById("currentLocal").innerHTML = "Local time: " + currentTime; 
}

function getTimeZoneTime() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	document.getElementById("timezonetime").innerHTML = 
	`<li class="list-group-item"> ${document.getElementById("timezone").value}: ${moment().tz(document.getElementById("timezone").value).format('MM-DD-YYYY HH:mm ZZ')}`;
}

function createZoneList() {
	const timeZones = moment.tz.names();
	let selections = `<label for="timeZoneList">Time Zones: </label>
	<select type="select" id="timezone" name="timezone_select">`;
	for(let timeZone of timeZones) {
		selections += `<option value="${timeZone}">${timeZone}</option>`;
	}
	selections += `<input type="button" onclick="getTimeZoneTime()" value="Get time(Current)" class="m-3">`;
document.getElementById("timezoneselect").innerHTML = selections;
}

function presetLoad(PRESET) {
	let presetZones = `<ul class="list-group">`;
	if(PRESET.length !== 0) {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		for(pre of PRESET) {
			let time = moment().tz(pre).format('MM-DD-YYYY HH:mm ZZ')
			presetZones += `<li class="list-group-item"> ${pre}: ${time} </li>`;
		}
		presetZones += "</ul>"
	}
	return presetZones;
}

function getDate() {
	const date = document.getElementById("date").value;
	let formatedDate = "";
	if (moment(date, 'MM-DD-YYYY').isValid()) {
		//valid date
		formatedDate = date;
	} else {
		//Invalid date
		formatedDate = moment().format("MM-DD-YYYY");
	}
	return formatedDate;
}

function getTime() {
	const hh = document.getElementById("time-h").value;
	const mm = document.getElementById("time-m").value;
	const ss = "00";
	if (hh > 23 || hh < 0 || mm > 59 || mm < 0) {
		document.getElementById("error-for-date").innerHTML = "Input is invalid.";
		document.getElementById("error-for-date").style.color = "red";
	}
	return hh + ":" + mm + ":" + ss;
}

function getDateAndTime() {
	const date = getDate();
	const time = getTime();
	const formatedDateTime = date + " " + time;
	if(moment(formatedDateTime, "MM-DD-YYYY hh:mm:ss").isValid()) {
		document.getElementById("timezonetime").innerHTML = 
		`<li class="list-group-item"> ${document.getElementById("timezone").value}: ${moment(formatedDateTime, "MM-DD-YYYY hh:mm:ss").tz(document.getElementById("timezone").value).format('MM-DD-YYYY HH:mm ZZ')}</li>`;
		document.getElementById("timezonetime").style.color = "blue";
	} else {
		document.getElementById("timezonetime").innerHTML = "Format Error!!";
		document.getElementById("timezonetime").style.color = "red";
	}

}
/* 
  Config for preset time zones
  If you would like to have preset time zones, you can simply add time zone names as array here.
  ex.) ["Pacific/Fiji", "America/Boise", "PST8PDT"]
*/
const PRESET = ["Japan", "PST8PDT", "America/Boise"];

/*
  process
*/
// current time auto reload
currentLocal();
setInterval(currentLocal, 10000);

//Create time zones list 
createZoneList();

//Preset load
document.getElementById("presetzones").innerHTML = presetLoad(PRESET);