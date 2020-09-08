   /**
    * Number.prototype.format(n, x, s, c)
    * 
    * @param integer n: length of decimal
    * @param integer x: length of whole part
    * @param mixed   s: sections delimiter
    * @param mixed   c: decimal delimiter
    */
   Number.prototype.format = function(n, x, s, c)
   {
       var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
           num = this.toFixed(Math.max(0, ~~n));

       return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
   };

   /*
var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345.67, 123456.789];

document.write('<p>Classic Format:</p>');
for (var i = 0, len = numbers.length; i < len; i++) {
    document.write('R$ ' + numbers[i].format(2, 3, '.', ',') + '<br />');
}
   */