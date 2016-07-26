$ = require('./node_modules/jquery/dist/jquery');

$(document).ready(function(){
	
	listenMode();

});

var notification = $('.notification');

$('.notification').click(function(){
	notification.toggleClass("waiting");
	notification.toggleClass("granted");
	$('.icon').toggleClass("typcn-tick-outline");
});

function grantAccess(card){
	
	notification.removeClass("waiting");
	notification.addClass("granted");
	$('.icon').toggleClass("typcn-tick-outline");
	
	setTimeout(function() {
		listenMode();
  }, 2000);

}

function denyAccess(card){
	notification.removeClass("waiting");
	notification.addClass("denied");
	$('.icon').addClass("typcn-times-outline");
	
	setTimeout(function() {
		listenMode();
  }, 2000);
}

function clearNotifications(){
	var notification = $('.notification');
	notification.removeClass('granted');
	notification.removeClass('denied');
	
	var icon = $('.icon')
	icon.removeClass("typcn-delete-outline");
	icon.removeClass("typcn-tick-outline");

}

function listenMode(){
	clearNotifications();
	notification.addClass("waiting");
	notification.text("waiting . . .");

	//var nfc  = require('nfc').nfc
	//var util = require('util');

	//var device = new nfc.NFC();

	//device.on('read', readTag).start();

}

function readTag(tag){
	card = tag.uid.split(":").join("");

	if (card != undefined)
  	sendCheckin(card);	 
}


function sendCheckin(card){
	// make ajax request
	var url = "http://localhost:3000/checkins"
	var response = $.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: { "checkin": { "card_num" : card }},
		success: function (response) {
			console.log(response.status);
			if(response.status){
				grantAccess(response.card_num);
			} else {
				denyAccess(response.card.num);
			}
		}
	});
}


