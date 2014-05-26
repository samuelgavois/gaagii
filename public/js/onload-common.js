var Gaagii = {
	context : {
		ajaxTimeout : 8000,
		reloadPage : false
	}, 
	layout : {},
	variables : {},
	labels : {}
};

(function($) {
	Gaagii.layout.common = { 
		init : function() {
			
		}
	};
	var self = Gaagii.layout.common;
})($);
$(window).ready(function(){
	Gaagii.layout.common.init();
});
	
Array.prototype.unset = function(val){
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index,1);
	}
}