var Ecrisle = {
	context : {
		ajaxTimeout : 8000,
		reloadPage : false
	}, 
	layout : {},
	variables : {},
	labels : {}
};

(function($) {
	Ecrisle.layout.common = { 
		init : function() {
			
		}
	};
	var self = Ecrisle.layout.common;
})($);
$(window).ready(function(){
	Ecrisle.layout.common.init();
});
	
Array.prototype.unset = function(val){
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index,1);
	}
}