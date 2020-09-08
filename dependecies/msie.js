/*
    ALL POLYFILL ARE EMULATED WITH : https://github.com/zloirock/core-js

    EXCEPT :
    - CSS VARS
    - ELEMENT PROTOTYPE : "MATCHES", "CLOSEST".
*/
function is_MSIE()
{
    return (navigator.userAgent.match(/(MSIE |Trident.*rv[ :])([0-9]+)/) !== null) ? true : false;
}

var __isMsie = is_MSIE();

if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
    Element.prototype.closest = function(s)
    {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType == 1);
        return null;
    };