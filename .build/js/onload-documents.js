(function($) {
	Gaagii.layout.documents = { 
		init : function() {
			//BEGIN DECLARATION DE TOUS LES EVENTS
			//Création du document
			$("#gaagii-button-create-document").bind("click.gaagii-button-create-document", function(event) {
				setInterval(function() {
					var $form = $("#gaagii-form-document");
					$form.find("[name='name']").focus();
				}, 500);
			});
			
			//Submit du formulaire
			$("#gaagii-form-document").on('submit', function() {
				Gaagii.layout.documents.createDocument();
				return false;
			});
			$("#gaagii-popup-button-create-document").bind("click.gaagii-popup-button-create-document", function(event) {
				$("#gaagii-form-document").submit();
			});
			//END DECLARATION DE TOUS LES EVENTS
			
		},
		
		createDocument : function() {
			var $form = $("#gaagii-form-document");
			if ($form.find("[name='name']").val() != "") {
				
				$.ajax({
					url: $form.attr('action'),
					type: $form.attr('method'),
					data: {_csrf:$form.find("[name='_csrf']").val(), name:$form.find("[name='name']").val()},
					success: function(doc) {
						document.location.href = "/document/"+doc._id;
					}
				});
			}
		}
	};
	var self = Gaagii.layout.documents;
})($);
$(window).ready(function(){
	Gaagii.layout.documents.init();
	
});
