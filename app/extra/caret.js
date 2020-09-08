function doGetCaretPosition(oField)
{
    // Initialize
    var iCaretPos = 0;

    // IE Support
    if (document.selection)
    {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

    // Return results
    return (iCaretPos);
}

/*
 **  Sets the caret (cursor) position of the specified text field.
 **  Valid positions are 0-oField.length.
 */
function doSetCaretPosition(oField, iCaretPos)
{

    // IE Support
    if (document.selection)
    {

        // Set focus on the element
        oField.focus();

        // Create empty selection range
        var oSel = document.selection.createRange();

        // Move selection start and end to 0 position
        oSel.moveStart('character', -oField.value.length);

        // Move selection start and end to desired position
        oSel.moveStart('character', iCaretPos);
        oSel.moveEnd('character', 0);
        oSel.select();
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
    {
        oField.selectionStart = iCaretPos;
        oField.selectionEnd = iCaretPos;
        oField.focus();
    }
}