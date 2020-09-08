/*Array.prototype._move = function(from, to)
{
    this.splice(to, 0, this.splice(from, 1)[0]);
};*/

Object.defineProperty(Array.prototype, '_move',
{
    value: function(from, to)
    {
        this.splice(to, 0, this.splice(from, 1)[0]);
    }
});