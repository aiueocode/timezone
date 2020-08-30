//Local time = your computer time
//Time zone time = specieid time zone time

/*
  Get current your location time
*/
function currentLocal() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const currentTime = moment().tz(timezone).format("YYYY-MM-DD HH:mm ZZ");
	$("#currentLocal").html("Local Current Time: " + currentTime);
}

/*
  Convert to specific time zone time from your location time
*/
function convertFromCurrentTimeZoneTime() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	$("#result").html(
	`<li class="list-group-item"> ${$("#timezone").val()}: ${moment().tz($("#timezone").val()).format('YYYY-MM-DD HH:mm ZZ')}`);
	$("#result").css("color", "blue");
}

/*
  Convert to your local time from specific time zone time
*/
function convertFromCurrentLocalTime() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	$("result").html( 
	`<li class="list-group-item"> ${$("#timezone").val()}: ${moment().tz($("#timezone").val()).format('YYYY-MM-DD HH:mm ZZ')}`);
	$("#result").css("color", "blue");
}

/*
  Create time zone pull down menus.
*/
function createZoneList() {
	let labelFor = "timeZoneList";
	let selectId = "timezone";
	let onClick = "";
	if ($("#typeselect").val() == 1) {
		//local to timezone
		onClick = "convertFromCurrentTimeZoneTime()";
	} else {
		//timezone to local
		onClick = "convertFromCurrentLocalTime()";
	}
	let output = "#timezoneselect";

	const timeZones = moment.tz.names();
	let selections = `<label for="${labelFor}">Time Zones: </label>
	<select type="select" id="${selectId}">`;
	for(let timeZone of timeZones) {
		selections += `<option value="${timeZone}">${timeZone}</option>`;
	}
	selections += `<input type="button" onclick="${onClick}" value="Get time(Current)" class="m-3">`;
	$(output).html(selections);
}

/*
	When Reload button pressed.
	Reload current local time and preset times.
*/
function currentReload() {
	currentLocal();
	presetLoad(PRESET);
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
	$("#presetzones").html(presetZones);
}

/*
  Get date from the form.
*/
function getDate() {
	let id = "#date";
	const date = $(id).val();
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
function getTime() {
	let h = "#time-h";
	let m = "#time-m";
	let er = "#error-for-time";

	const hh = $(h).val();
	const mm = $(m).val();
	const ss = "00";
	if (hh > 23 || hh < 0 || mm > 59 || mm < 0) {
		$(er).html("Input is invalid.");
		$(er).css("color","red");
	}
	return hh + ":" + mm + ":" + ss;
}

/*
  Convert specified local date and time to zone date and time
*/
function convertFromLocalDateAndTime() {
	const date = getDate();
	const time = getTime();
	const formatedDateTime = date + " " + time;
	if(moment(formatedDateTime, "YYYY-MM-DD HH:mm:ss").isValid()) {
		$("#result").html( 
		`<li class="list-group-item"> ${$("#timezone").val()}: ${moment(formatedDateTime, "YYYY-MM-DD HH:mm:ss").tz($("#timezone").val()).format('YYYY-MM-DD HH:mm ZZ')}</li>`);
		$("#result").css("color", "blue");
	} else {
		$("#result").html("Format Error!!");
		$("#result").css("color", "red");
	}
}

/*
 Convert specified zone date and time to local date and time.
*/
function convertFromZoneDateAndTime() {
	const date = getDate();
	const time = getTime();
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
		let zoneTime = moment.tz(formatedDateTime, $("#timezone").val());
		let yourTime = zoneTime.tz(localTimeZone).format("YYYY-MM-DD HH:mm:ss z");
		$("#result").html( 
		`<li class="list-group-item"> ${localTimeZone}: ${yourTime}</li>`);
		$("#result").css("color", "blue");
	} else {
		$("#result").html("Format Error!!");
		$("#result").css("color", "red");
	}
}

/*
	Submit
*/

function submitSpecified() {
	if($("#typeselect").val() == 1) {
		//Local to Timezone(specified)
		convertFromLocalDateAndTime();
	} else {
		//Time zone to Local(specified)
		convertFromZoneDateAndTime();
	}
}

/* 
  Config for preset time zones
  If you would like to have preset time zones, you can simply add time zone names as array here. You can see the time zone list on time zone pulldown.
  ex.) ["Pacific/Fiji", "America/Boise", "PST8PDT"]
*/
const PRESET = ["Japan", "PST8PDT", "America/Boise"];

/*
  Initial process
*/
// current time auto reload
currentLocal();
setInterval(currentLocal, 10000);

//Create time zones list 
createZoneList();
createZoneList(1);

//Preset load
presetLoad(PRESET);