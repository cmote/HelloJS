Array.implement('limitTop', function(top) {
	for(var i = 0, l = this.length; i < l; i++) {
		if(this[i] > top) this[i] = top;
	}
	return this;
});
[1, 2, 3, 4, 5, 6].limitTop(4); // 返回 [1, 2, 3, 4, 4, 4]

String.implement({
	repeat: function(times) {
		var string = '';
		while(times--) string += this;
		return string;
	},
	ftw: function() {
		return this + ' FTW!';
	}
});
'moo! '.repeat(3); // 返回 "moo! moo! moo! "
'MooTools'.ftw(); // 返回 "MooTools FTW!"
('MooTools'.ftw() + ' ').repeat(2); // 返回 "MooTools FTW! MooTools FTW! "