/**********************************************************************************************************************************
 * Available methods
 * 
 * $().convert_timestamp(options) = UNIX Timestamp converter
 * 
 * $().convert_seconds(options) = Raw Second Converter
 * 
 * $().number_padding(options) = Number Padding
 * 
 **********************************************************************************************************************************/




(function($){
	alert('here');
	/**********************************************************************************************************************************
	 * UNIX Timestamp converter
	 * 
	 * Description
	 * 		This method takes in a UNIX timestamp and converts it into a JavaScript object containing the day, month, year, hours, 
	 * 			seconds, milliseconds, and am/pm designation. The timestamp is placed inside the first set of parenthesis.
	 * 
	 * 
	 * Example
	 * 		time = $(1391796802).convert_timestamp();
	 * 
	 * 
	 * Options
	 * 		military_time => BOOL
	 * 			Whether or not to show the hours in military, 24 hour, designation. Default is true.
	 **********************************************************************************************************************************/
	$.fn.convert_timestamp = function(options) {
		var timestamp = this[0];
		
		// Default Settings
        var settings = $.extend({
            military_time : true
        }, options);
        
        if(timestamp == undefined){
			return false;
		}
		
		var date = new Date(timestamp*1000);
		
		if(date.getHours() < 12){
			designation = 'am';
		}else{
			designation = 'pm';
		}
		
		if(!settings.military_time){
			if(date.getHours() > 12){
				hours = date.getHours() - 12;
			}else if(date.getHours() == 0){
				hours = 12;
			}else{
				hours = date.getHours();
			}
		}else{
			hours = date.getHours();
		}
		
		hours = $(hours).number_padding();
		
		var string = {
			month : 		$(date.getMonth()+1).number_padding(),
			day : 			$(date.getDate()).number_padding(),
			year : 			date.getFullYear(),
			hours : 		hours,
			minutes : 		$(date.getMinutes()).number_padding(),
			seconds : 		$(date.getSeconds()).number_padding(),
			milliseconds : 	$(date.getMilliseconds()).number_padding({ string_length : 3 }),
			designation : 	designation
		}
		
        return string;
	};
	
	/**********************************************************************************************************************************
	 * Raw Second Converter
	 * 
	 * Description
	 * 		Takes in a raw number of seconds and converts it to days, hours, minutes, and seconds
	 * 
	 * 
	 * Example
	 * 		duration = $(3600).convert_seconds();
	 * 
	 * 
	 * Options
	 * 		padding => BOOL 
	 * 			Whether or not to make sure the number is always two digits. If true, the number will be 
	 * 				returned as two digits, but will be in string format. Default is false
	 **********************************************************************************************************************************/
	$.fn.convert_seconds = function(options){
		var seconds = this[0];
		
		// Default Settings
		var settings = $.extend({
            padding : false
        }, options);
		
		var days 	= Math.floor(seconds / 86400);
		var hours 	= Math.floor(seconds / 3600) % 24;
		var minutes = Math.floor(seconds / 60) % 60;
		var seconds = seconds % 60;
		
		if(settings.padding){
			days 	= $(days).number_padding();
			hours 	= $(hours).number_padding();
			minutes = $(minutes).number_padding();
			seconds = $(seconds).number_padding();
		}
		
		var difference = {
			days 	: days,
			hours 	: hours,
			minutes : minutes,
			seconds : seconds
		}
		
		return difference;
	}
	
	/**********************************************************************************************************************************
	 * Number Padding
	 * 
	 * Description
	 * 		Takes a number or a string and pads it to a certain length with a certain character on either end of the input and 
	 * 			returns a string.
	 * 
	 * 
	 * Example
	 * 		days = $(2).number_padding();
	 * 
	 * 
	 * Options
	 * 		string_length => INTEGER 
	 * 			The total length that should be returned for the string. Default is two characters.
	 * 
	 * 		padding_character => STRING 
	 * 			The character to pad the string with. Default is '0'.
	 * 
	 * 		which_end => STRING 
	 * 			Which side to place the padding on. Options are either 'front' or 'back'. Default is front.
	 **********************************************************************************************************************************/
	
	$.fn.number_padding = function(options){
		number = this[0];
		
		// Default Settings
        var settings = $.extend({
            string_length : 2,
            padding_character: '0',
            which_end : 'front'
        }, options);
		
		number = number+'';
		
		while(number.length < settings.string_length){
			if(settings.which_end == 'front'){
				number = settings.padding_character+number;
			}else{
				number = number+settings.padding_character;
			}
		}
		
		return number;
	}
}(jQuery));
