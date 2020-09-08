/*
	ELEMENT
*/
/*
	ATTR - SHORT CUT FOR GET ATTRIBUTE AND SET ATTRIBUTE

	- GET AND SET.
	- IF GET AND ATTRIBUTE IS NOT EXITING SO RETURN VALUE IS "NULL"
*/
Element.prototype._attr = function(attr, val)
{

    if (this._isNode() === false)
    {
        if (typeof val !== "undefined")
        {
            this.setAttribute(attr, "" + val + "");
            return this;
        }
        else
        {
            return this.getAttribute(attr);
        }
    }
    else
    {
        this._fEach(

            function(o)
            {
                if (typeof val !== "undefined")
                {
                    o.setAttribute(attr, "" + val + "");
                    return o;
                }
                else
                {
                    return o.getAttribute(attr);
                }
            }
        );
    }

    return this;
};

Element.prototype._removeAttr = function(attr)
{

    if (this._isNode() === false)
    {
        this.removeAttribute(attr);
    }
    else
    {
        // return this.removeAttribute( attr );

        this._fEach(

            function(o)
            {
                o.removeAttribute(attr);
                return o;
            }
        );
    }

    return this;
};

/*
	PROPERTIES
*/
Element.prototype._prop = function(prop, val)
{

    if (this._isNode() === false)
    {

        if (typeof val !== "undefined")
        {
            this["" + prop + ""] = val;
            return this;
        }
        else
        {
            return this["" + prop + ""];
        }
    }
    else
    {
        this._fEach(

            function(o)
            {
                if (typeof val !== "undefined")
                {
                    o["" + prop + ""] = val;
                    return o;
                }
                else
                {
                    return o["" + prop + ""];
                }
            }
        );
    }
};

/*
	EMPTY : REMOVE CHILD
*/
Element.prototype._empty = function()
{

    var node = this;

    while (node.lastChild)
    {
        node.removeChild(node.lastChild);
    }

    return this;
};
/*
	REMOVE
*/
Element.prototype._remove = function()
{

    var node = this.cloneNode(true);

    this.parentNode.removeChild(this);

    return node;
};
/*
	TOOLS
*/
Element.prototype._isNode = function()
{

    return false;
};

Element.prototype._tagName = function()
{

    return ("" + this.tagName + "").toUpperCase();
};

/*
	CLASS
*/
//	https://www.jamestease.co.uk/blether/vanilla-js-equivalent-jquery-find-parent-data-remove-class-empty-append#classes
//
Element.prototype._removeClass = function(cls)
{

    var cnt, len;
    var l = cls.split(" ");

    if (this._isNode() === false)
    {
        for (cnt = 0, len = l.length; cnt < len; cnt++)
        {
            this.classList.remove("" + l[cnt] + "");
        }
    }
    else
    {
        this._fEach(

            function(o)
            {
                for (cnt = 0, len = l.length; cnt < len; cnt++)
                {
                    o.classList.remove("" + l[cnt] + "");
                }
            }
        );
    }

    return this;
};

Element.prototype._addClass = function(cls)
{

    if (this._isNode() === false)
    {
        this.classList.add("" + cls + "");
    }
    else
    {
        this._fEach(

            function(o)
            {
                o.classList.add("" + cls + "");
            }
        );
    }

    return this;
};

Element.prototype._hasClass = function(cls)
{

    return this.classList.contains("" + cls + "");

};
/*
	TRAVERSING
*/
Element.prototype._next = function()
{

    return this.nextElementSibling;
};

Element.prototype._prev = function()
{

    return this.previousElementSibling;
};

Element.prototype._firstChild = function()
{

    return this.children[0];
};

/*
	MANIPULATION	
*/
Element.prototype._append = function(a)
{

    if (typeof a === "string")
    {
        a = a.toDom();
    }

    this.appendChild(a);

    return this;
};

Element.prototype._appendHtml = function(a)
{

    this.insertAdjacentHTML('beforeend', a);

    return this;
};

Element.prototype._after = function(a)
{

    this.insertAdjacentHTML('afterend', a);

    return this;
};

Element.prototype._insertAfter = function(a)
{

    if (typeof a === "string")
    {
        a = a.toDom();
    }

    this.parentNode.insertBefore(a, this.nextSibling);

    return this;
};

/*
	HIDE / SHOW
*/
Element.prototype._hide = function()
{

    if (this._isNode() === false)
    {
        this.style.display = "none";
    }
    else
    {
        this._fEach(

            function(o)
            {
                o.style.display = "none";
            }
        );
    }

    return this;
};

Element.prototype._show = function()
{

    if (this._isNode() === false)
    {
        this.style.display = "";
    }
    else
    {
        this._fEach(

            function(o)
            {
                o.style.display = "";
            }
        );
    }

    return this;
};

Element.prototype._getWidth = function()
{

    var width = this.offsetWidth;
    var style = getComputedStyle(this);
    return (width - parseInt(style.marginLeft) - parseInt(style.marginRight) - parseInt(style.paddingLeft) - parseInt(style.paddingRight) - parseInt(style.borderLeftWidth) - parseInt(style.borderRightWidth));
};

/*
    QUERY SELECTOR
*/
Element.prototype._Qs = function(q)
{
    return this.querySelector(q);
};

/*
    PARENT UNTIL
*/
Object.defineProperty(Element.prototype, '_parentUntil',
{
    enumerable: false,
    value: function(selector, filter)
    {
        var el = this;
        var result = [];
        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        // match start from parent
        el = el.parentElement;
        while (el && !matchesSelector.call(el, selector))
        {
            if (!filter)
            {
                result.push(el);
            }
            else
            {
                if (matchesSelector.call(el, filter))
                {
                    result.push(el);
                }
            }
            el = el.parentElement;
        }
        return result;
    }
});