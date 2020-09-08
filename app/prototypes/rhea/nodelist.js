/*
	NODE LIST
*/
	NodeList.prototype.forEach = Array.prototype.forEach;
	NodeList.prototype._attr = Element.prototype._attr;
	NodeList.prototype._addClass = Element.prototype._addClass;
	NodeList.prototype._removeClass = Element.prototype._removeClass;
	NodeList.prototype._hide = Element.prototype._hide;
	NodeList.prototype._show = Element.prototype._show;
	NodeList.prototype._removeAttr = Element.prototype._removeAttr;
	NodeList.prototype._prop = Element.prototype._prop;

	NodeList.prototype._last = function()
	{

		return this[this.length-1]	;
	};

	NodeList.prototype._isNode = function() {
		
		return true;
	};

	NodeList.prototype._toArray = function() {
		
		return Array.prototype.slice.call( this );
	};


	/*
		_not.

		In fact as NodeList is not a real Array we have to convert it into ARRAY to get all funcitonnalities.
		After we have to revert back the process to have nodeList, as it's not possible to convert into NodeList we have to.
		Create a documentFragment and set a root node and put all ARRAY into as Child.

		Availables : 

			- ":first"
	*/
		NodeList.prototype._not = function( e ) {

			var n = this;
			n = Array.prototype.slice.call( this );

			switch(e)
			{
				case ":first" :
									n = n.splice(1, n.length-1 );
									break;
			}

			var fragment = document.createDocumentFragment();
			var div = document.createElement("div");
				div.id="TMP_NODE";
			fragment.appendChild( div );
			
			for(var i=0;i<n.length;i++)
			{
				fragment.querySelector("div").appendChild( n[i].cloneNode(true) );
			}


			return fragment.querySelectorAll("#TMP_NODE > *");
		};	

	/*
		FILTER CONTENT WITH REG EXPRESSION
	*/
		NodeList.prototype._filterContent = function( text  )
		{
			var elements = this;

			return Array.prototype.filter.call
			(
				elements, 
				function(element)
				{
					return RegExp(text).test(element.textContent);
				}
			);
		};