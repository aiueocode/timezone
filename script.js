/*
  Get current your location time
*/
function currentLocal() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const currentTime = moment().tz(timezone).format("YYYY-MM-DD HH:mm ZZ");
	document.getElementById("currentLocal").innerHTML = "Local time: " + currentTime; 
}

/*
	Change type
*/
function change() {
	if(document.getElementById("typeselect").value == 1) {
		//Local to Timezone
		console.log(1);
		return 1;
	} else {
		//Time zone to Local
		console.log(2);
		return 2;
	}
}
/*
  Convert to specific time zone time from your location time
*/
function getTimeZoneTime() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	document.getElementById("timezonetime").innerHTML = 
	`<li class="list-group-item"> ${document.getElementById("timezone").value}: ${moment().tz(document.getElementById("timezone").value).format('YYYY-MM-DD HH:mm ZZ')}`;
}

/*
  Convert to your location time from specific time zone time
*/
function getYourTime() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	document.getElementById("yourtime").innerHTML = 
	`<li class="list-group-item"> ${document.getElementById("timezonel").value}: ${moment().tz(document.getElementById("timezonel").value).format('YYYY-MM-DD HH:mm ZZ')}`;
	document.getElementById("yourtime").style.color = "blue";
}

/*
  Create time zone pull down menus.
*/
function createZoneList(option) {
	let labelFor = "timeZoneList";
	let selectId = "timezone";
	let onClick = "getTimeZoneTime()";
	let output = "timezoneselect";
	if (option === 1) {
		labelFor = "timeZoneListl";
		selectId = "timezonel";
		onClick = "getYourTime()";
		output = "timezoneselectl";
	}
	const timeZones = moment.tz.names();
	let selections = `<label for="${labelFor}">Time Zones: </label>
	<select type="select" id="${selectId}">`;
	for(let timeZone of timeZones) {
		selections += `<option value="${timeZone}">${timeZone}</option>`;
	}
	selections += `<input type="button" onclick="${onClick}" value="Get time(Current)" class="m-3">`;
	document.getElementById(output).innerHTML = selections;
}

/*
  Create preset time zone current time from your location time
*/
function presetLoad(PRESET) {
	let presetZones = `<ul class="list-group">`;
	if(PRESET.length !== 0) {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		for(pre of PRESET) {
			let time = moment().tz(pre).format('YYYY-MM-DD HH:mm ZZ')
			presetZones += `<li class="list-group-item"> ${pre}: ${time} </li>`;
		}
		presetZones += "</ul>"
	}
	return presetZones;
}

/*
  Get date from the form.
*/
function getDate(option) {
	let id = "date";
	if(option === 1) {
		id = "datel"
	}
	const date = document.getElementById(id).value;
	let formatedDate = "";
	if (moment(date, 'YYYY-MM-DD').isValid()) {
		//valid date
		formatedDate = date;
	} else {
		//Invalid date
		formatedDate = moment().format("YYYY-MM-DD");
	}
	return formatedDate;
}

/*
  Get time from the form.
*/
function getTime(option) {
	let h = "time-h";
	let m = "time-m";
	let er = "error-for-time";

	if (option === 1) {
		h = "time-hl";
		m = "time-ml";
		er = "error-for-timel";
	}
	const hh = document.getElementById(h).value;
	const mm = document.getElementById(m).value;
	const ss = "00";
	if (hh > 23 || hh < 0 || mm > 59 || mm < 0) {
		document.getElementById(er).innerHTML = "Input is invalid.";
		document.getElementById(er).style.color = "red";
	}
	return hh + ":" + mm + ":" + ss;
}

/*
  Get date and time of specified zone time
*/
function getDateAndZoneTime() {
	const date = getDate();
	const time = getTime();
	const formatedDateTime = date + " " + time;
	if(moment(formatedDateTime, "YYYY-MM-DD HH:mm:ss").isValid()) {
		document.getElementById("timezonetime").innerHTML = 
		`<li class="list-group-item"> ${document.getElementById("timezone").value}: ${moment(formatedDateTime, "YYYY-MM-DD HH:mm:ss").tz(document.getElementById("timezone").value).format('YYYY-MM-DD HH:mm ZZ')}</li>`;
		document.getElementById("timezonetime").style.color = "blue";
	} else {
		document.getElementById("timezonetime").innerHTML = "Format Error!!";
		document.getElementById("timezonetime").style.color = "red";
	}
}

/*
 Get your date and time.
*/
function getDateAndYourTime() {
	const date = getDate(1);
	const time = getTime(1);
	const formatedDateTime = date + " " + time;
	if(moment(formatedDateTime, "YYYY-MM-DD HH:mm:ss").isValid()) {
		//get local time zone name
		/*
			var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
			var losAngeles = newYork.clone().tz("America/Los_Angeles");
			newYork.format();    // 2014-06-01T12:00:00-04:00
			losAngeles.format(); // 2014-06-01T09:00:00-07:00
		*/
		let localTimeZone = moment.tz.guess();
		let zoneTime = moment.tz(formatedDateTime, document.getElementById("timezonel").value);
		let yourTime = zoneTime.tz(localTimeZone).format("YYYY-MM-DD HH:mm:ss z");
		document.getElementById("yourtime").innerHTML = 
		`<li class="list-group-item"> ${localTimeZone}: ${yourTime}</li>`;
		document.getElementById("yourtime").style.color = "blue";
	} else {
		document.getElementById("yourtime").innerHTML = "Format Error!!";
		document.getElementById("yourtime").style.color = "red";
	}
}

/* 
  Config for preset time zones
  If you would like to have preset time zones, you can simply add time zone names as array here. You can see the time zone list on time zone pulldown.
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
createZoneList(1);

//Preset load
document.getElementById("presetzones").innerHTML = presetLoad(PRESET);