(function($) {
	Gaagii.layout.folders = { 
		init : function() {
			//BEGIN DECLARATION DE TOUS LES EVENTS
			//Création du dossier
			$("#gaagii-button-create-folder").bind("click.gaagii-button-create-folder", function(event) {
				setTimeout(function() {
					var $form = $("#gaagii-form-folder");
					$form.find("[name='name']").focus();
				}, 500);
			});
			
			//Submit du formulaire
			$("#gaagii-form-folder").on('submit', function() {
				Gaagii.layout.folders.createFolder();
				return false;
			});
			$("#gaagii-popup-button-create-folder").bind("click.gaagii-popup-button-create-folder", function(event) {
				$("#gaagii-form-folder").submit();
			});
			//END DECLARATION DE TOUS LES EVENTS
			
		},
		
		createFolder : function() {
			var $form = $("#gaagii-form-folder");
			if ($form.find("[name='name']").val() != "") {
				$.ajax({
					url: $form.attr('action'),
					type: $form.attr('method'),
					data: {_csrf:$form.find("[name='_csrf']").val(), name:$form.find("[name='name']").val(), idParent:$form.find("[name='idParent'] option:selected").attr("name")},
					success: function(doc) {
						document.location.href = "/documents";
					}
				});
			}
		}
	};
	var self = Gaagii.layout.folders;
})($);
$(window).ready(function(){
	Gaagii.layout.folders.init();
	
});
