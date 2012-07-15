// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.removeItem = function(item){


    var idx = jQuery.inArray(item, this);
    this.remove(idx);
};

Array.prototype.containsItem = function(item){

    var idx = jQuery.inArray(item, this);

    return idx > -1;
};

Date.prototype.isToday = function() {

    var today = new Date();

    return today.getDate() == this.getDate() && today.getMonth() == this.getMonth() && today.getFullYear() == this.getFullYear();
};

Date.prototype.isLastWeek = function() {

    var now = new Date().getTime();
    var weekAgo = new Date(now - (1000 * 60 * 60 * 24 * 7));

    return this > weekAgo;
};


Date.prototype.radiateFormat = function(){


    var daysOfWeek  = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    var monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    var meredium = 'am';
    var hours = this.getHours();
    if (hours > 12) {
        hours = hours - 12;
        meredium = 'pm';
    }

    var timestamp = hours + ':';
    var minutes = this.getMinutes();
    if (minutes < 10) {
        timestamp += '0';
    }
    timestamp += this.getMinutes()  + meredium;

    if (!this.isToday()) {
        timestamp = timestamp + ' ' + daysOfWeek[this.getDay()];
    }

    if (!this.isToday() && !this.isLastWeek()) {
        timestamp = timestamp + ', ' + this.getDate() + ' ' + monthsOfYear[this.getMonth()] + ' ' + this.getFullYear();
    }

    return timestamp;
};

var MilesBurton = MilesBurton || {};

MilesBurton.radiate = angular.module('radiate', ['ngResource']);