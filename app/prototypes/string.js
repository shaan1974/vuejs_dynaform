/*
    REPLACE ALL
*/
String.prototype.replaceAll = function(target, replacement)
{
    return this.split(target).join(replacement);
};
/*
    BLENGTH
  	String.prototype.BLENGTH 	= function()	 		{	return unescape(encodeURIComponent( this.toString() )).length;	};		
*/
String.prototype.BLENGTH = function()
{
    //	VARS
    //
    var cr, cl;

    //  CHECK DEPENDING OF BROWSER
    //
    if ((navigator.userAgent.match(/(MSIE |Trident.*rv[ :])([0-9]+)/) !== null) || (navigator.appVersion.indexOf('Edge') > -1))
    {
        cl = window.unescape(encodeURIComponent(this.toString())).length;
        cr = 0;

        if (encodeURIComponent(this.toString()).match(/(%0A|%0D)/gi) !== null)
        {
            cr = encodeURIComponent(this.toString()).match(/(%0A|%0D)/gi).length;
        }

        return cl + cr;
    }
    else
    {
        cl = (new TextEncoder('utf-8').encode(this.toString())).length;
        cr = 0;

        if (encodeURIComponent(this.toString()).match(/(%0A|%0D)/gi) !== null)
        {
            cr = encodeURIComponent(this.toString()).match(/(%0A|%0D)/gi).length;
        }

        return cl + cr;
    }
};
/*
	IS REG
*/
String.prototype.isReg = function(pattern)
{
    var patt = new RegExp("" + pattern + "", "g");
    return patt.test((this.toString()));
};
/*
    REPLACE AT
*/
String.prototype.replaceAt = function(index, character)
{
    return this.substr(0, index) + character + this.substr(index + character.length);
};
/*
    LINEARIZE
*/
String.prototype.linearize = function()
{
    var s = this.toString();

    s = s.replace(/(\r\n\t|\n|\r\t|\t)/gi, "");
    s = s.replace(/ {2,}/g, ' ');
    return s;
};
/*
    PREPARE TEMPLATE
*/
String.prototype.prepareTemplate = function()
{
    // return this.toString().slice(13, -1).trim().slice(2, -2).trim().linearize();
    return this.slice(13, -1).trim().slice(2, -2).trim().linearize();
};
/*
    REPLACE BETWEEN
*/
String.prototype.replaceBetween = function(start, end, what)
{
    return this.substring(0, start) + what + this.substring(end);
};