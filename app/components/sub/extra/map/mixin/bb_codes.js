/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP BBCODES
/*
        BBCODES :

        B               - BOLD
        I               - ITALIC
        U               - UNDERLINE
        S               - STRIKE THROUGH
        BR              - BREAK LINE
        QUOTE           - BLOCKQUOTE
        URL             - LINK WITH HREF AND VISUAL LINK THE SAME, OR HREF AND DEDICATE VISUAL LINK
        IMG             - IMAGE
        UL,LI           - LIST
        TABLE,TR,TD     - TABLE
*/
var Map_BBcodes_Mixin = {

    data: function()
    {
        return {
            "bb_code_data": [
            {
                mode: "CUSTOM",
                action: "resetContent",
                className: "button-reset",
                title: "POPUP_EDIT_BTN_ERASE"
            },
            {
                mode: "SEPARATOR",
            },
            {
                mode: "BUTTON",
                regDecode: /\[b\](.*?)\[\/b\]/ig,
                regDecodeExp: "<span style=\"font-weight:bold\">$1</span>",
                regEncode: /<span style=\"font-weight:bold\">(.*?)<\/span>/ig,
                regEncoreExp: "[b]$1[/b]",
                action: "B",
                tags: ["[b]", "[/b]"],
                className: "button-bold",
                title: "POPUP_EDIT_BTN_BOLD"
            },
            {
                mode: "BUTTON",
                regDecode: /\[i\](.*?)\[\/i\]/ig,
                regDecodeExp: "<i>$1</i>",
                regEncode: /<i>(.*?)<\/i>/ig,
                regEncoreExp: "[i]$1[/i]",
                action: "I",
                tags: ["[i]", "[/i]"],
                className: "button-italic",
                title: "POPUP_EDIT_BTN_ITALIC"
            },
            {
                mode: "BUTTON",
                regDecode: /\[u\](.*?)\[\/u\]/ig,
                regDecodeExp: "<u>$1</u>",
                regEncode: /<u>(.*?)<\/u>/ig,
                regEncoreExp: "[u]$1[/u]",
                action: "U",
                tags: ["[u]", "[/u]"],
                className: "button-underline",
                title: "POPUP_EDIT_BTN_UNDERLINE"
            },
            {
                mode: "BUTTON",
                regDecode: /\[s\](.*?)\[\/s\]/ig,
                regDecodeExp: "<span style=\"text-decoration:line-through\">$1</span>",
                regEncode: /<span style=\"text-decoration:line-through\">(.*?)<\/span>/ig,
                regEncoreExp: "[s]$1[/s]",
                action: "S",
                tags: ["[s]", "[/s]"],
                className: "button-line-through",
                title: "POPUP_EDIT_BTN_LT"
            },
            {
                mode: "SEPARATOR",
            },
            {
                mode: "BUTTON",
                regDecode: /\[br\]/ig,
                regDecodeExp: "<br/>",
                regEncode: /<br(\/)*>/ig,
                regEncoreExp: "[br]",
                action: "BR",
                tags: ["[br]\n", ""],
                className: "button-break-line",
                p: 5,
                title: "POPUP_EDIT_BTN_BR"
            },
            {
                mode: "BUTTON",
                regDecode: /\[quote\](.*?)\[\/quote\]/ig,
                regDecodeExp: "<blockquote>$1</blockquote>",
                regEncode: /<blockquote>(.*?)<\/blockquote>/ig,
                regEncoreExp: "[quote]$1[/quote]",
                action: "Q",
                tags: ["[quote]", "[/quote]"],
                className: "button-quote",
                title: "POPUP_EDIT_BTN_QUOTE"
            },
            {
                mode: "BUTTON",
                regDecode: /\[url[=]{0,1}(.*?)\](.*?)\[\/url\]/ig,
                regDecodeFunction: "linkFunc",
                regEncode: /<a href=\"(.*?)\" target=\"_blank\">(.*?)<\/a>/ig,
                regEncodeFunction: "unLinkFunc",
                action: "URL",
                tags: ["[url]", "[/url]"],
                className: "button-url",
                title: "POPUP_EDIT_BTN_URL"
            },
            {
                mode: "BUTTON",
                regDecode: /\[img\](.*?)\[\/img\]/ig,
                regDecodeExp: "<img src=\"$1\"/>",
                regEncode: /<img src=\"(.*?)\">/ig,
                regEncoreExp: "[img]$1[/img]",
                action: "IMG",
                tags: ["[img]", "[/img]"],
                className: "button-img",
                title: "POPUP_EDIT_BTN_IMG"
            },
            {
                mode: "SEPARATOR",
            },
            {
                mode: "BUTTON",
                regDecode: /\[table\](.*?)\[\/table\]/ig,
                regDecodeExp: "<table>$1</table>",
                regEncode: /<table>(.*?)<\/table>/ig,
                regEncoreExp: "[table]$1[/table]",
                action: "TABLE",
                tags: ["[table]", "[/table]"],
                className: "button-table",
                p: 7,
                title: "POPUP_EDIT_BTN_TABLE"
            },
            {
                mode: "BUTTON",
                regDecode: /\[tr\](.*?)\[\/tr\]/ig,
                regDecodeExp: "<tr>$1</tr>",
                regEncode: /<tr>(.*?)<\/tr>/ig,
                regEncoreExp: "[tr]$1[/tr]",
                action: "TR",
                tags: ["[tr]", "[/tr]"],
                className: "button-tr",
                p: 4,
                title: "POPUP_EDIT_BTN_TR"
            },
            {
                mode: "BUTTON",
                regDecode: /\[td\](.*?)\[\/td\]/ig,
                regDecodeExp: "<td>$1</td>",
                regEncode: /<td>(.*?)<\/td>/ig,
                regEncoreExp: "[td]$1[/td]",
                action: "TD",
                tags: ["[td]", "[/td]"],
                className: "button-td",
                p: 4,
                title: "POPUP_EDIT_BTN_TD"
            },
            {
                mode: "SEPARATOR",
            },
            {
                mode: "BUTTON",
                regDecode: /\[ul\](.*?)\[\/ul\]/ig,
                regDecodeExp: "<ul>$1</ul>",
                regEncode: /<ul>(.*?)<\/ul>/ig,
                regEncoreExp: "[ul]$1[/ul]",
                action: "UL",
                tags: ["[ul]", "[/ul]"],
                className: "button-ul",
                p: 4,
                title: "POPUP_EDIT_BTN_UL"
            },
            {
                mode: "BUTTON",
                regDecode: /\[li\](.*?)\[\/li\]/ig,
                regDecodeExp: "<li>$1</li>",
                regEncode: /<li>(.*?)<\/li>/ig,
                regEncoreExp: "[li]$1[/li]",
                action: "LI",
                tags: ["[li]", "[/li]"],
                className: "button-li",
                p: 4,
                title: "POPUP_EDIT_BTN_LI"
            },
            {
                mode: "SEPARATOR",
            },
            {
                mode: "CUSTOM",
                action: "previewContent",
                className: "button-preview",
                title: "POPUP_EDIT_BTN_PREVIEW"
            }],
            previewHtml: ""
        };
    },
    methods:
    {
        /*
            DEDICATES
        */
        /*
            URL
        */
        "linkFunc": function(str, p1, p2)
        {
            if (p1 === "")
            {
                p1 = p2;
            }
            return '<a href="' + p1 + '" target="_blank">' + p2 + '</a>';
        },
        "unLinkFunc": function(str, p1, p2)
        {
            if (p1 !== p2)
            {
                return '[url=' + p1 + ']' + p2 + '[/url]';
            }
            else
            {
                return '[url]' + p1 + '[/url]';
            }
        },
        /*
            SYSTEM
        */
        /*
            &#233; TO é 
        */
        "EntitiesDecode": function(str)
        {
            return ("" + str + "").replace(/&#(\d+);/g, function(match, dec)
            {
                return String.fromCharCode(dec);
            });
        },
        /*
            é TO &#233;
        */
        "EntitiesEncode": function(str)
        {
            return ("" + str + "").replace(/[\u00A0-\u00FF]/g, function(c)
            {
                return '&#' + c.charCodeAt(0) + ';';
            });
        },
        "BBcodeToHtml": function(str)
        {
            for (var i = 0; i < this.bb_code_data.length; i++)
            {
                if (typeof this.bb_code_data[i].regDecodeFunction !== "undefined")
                {
                    str = str.replace(this.bb_code_data[i].regDecode, this["" + this.bb_code_data[i].regDecodeFunction + ""]);
                }
                else
                {
                    str = str.replace(this.bb_code_data[i].regDecode, "" + this.bb_code_data[i].regDecodeExp + "");
                }
            }

            return str;
        },
        "HtmlToBBcode": function(str)
        {
            for (var i = 0; i < this.bb_code_data.length; i++)
            {
                if (typeof this.bb_code_data[i].regEncodeFunction !== "undefined")
                {
                    str = str.replace(this.bb_code_data[i].regEncode, this["" + this.bb_code_data[i].regEncodeFunction + ""]);
                }
                else
                {
                    str = str.replace(this.bb_code_data[i].regEncode, "" + this.bb_code_data[i].regEncoreExp + "");
                }
            }

            // EXTRA REPLACEMENTS
            //
            str = str.replace(/<[\/]*tbody>/ig, "");

            return str;
        },
        /*
            EDITOR ACTION FOR BBCODE BUTTON
        */
        "BBCodeEditorCommand": function(e, tg, cp)
        {
            //  IF CP IS UNDEFINED WE INITIALIZE IT WITH '0'
            //
            cp = (typeof cp === "undefined") ? 0 : cp;

            //  VARIABLES
            //
            var textarea = this.$el.querySelector(".popup-update-content-textarea");
            var value = textarea.value;
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            var selectedText = value.substring(startPos, endPos);
            var p = doGetCaretPosition(textarea);
            var st = tg[0];
            var et = tg[1];

            textarea.value = value.replaceBetween(startPos, endPos, "" + st + "" + selectedText + "" + et + "");

            //  var "cp" is use to move the cursor with added position. Like for BR command.
            //
            p = p + cp;
            doSetCaretPosition(textarea, p);

            //  CANCEL EVENT PROPAGATION
            //
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.cancelBubble = true;
            return false;
        },
        /*
            EDITOR ACTION FOR CUSTOM BUTTONS
        */
        "BBCodeEditorExecCommand": function(e, a)
        {
            switch (a)
            {
                case "resetContent":
                    var textarea = this.$el.querySelector(".popup-update-content-textarea");
                    textarea.value = "";
                    doSetCaretPosition(textarea, 0);
                    //  CANCEL EVENT PROPAGATION
                    //
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.cancelBubble = true;
                    return false;
                case "previewContent":
                    var content = this.EntitiesEncode(this.BBcodeToHtml((this.$el.querySelector("textarea").value).linearize()));
                    console.log(content);
                    this.previewHtml = "<div>" + content + "</div>";
                    break;
            }
        }
    }
};