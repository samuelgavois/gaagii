(function($) {
	Ecrisle.layout.documents = { 
		init : function() {
			//BEGIN DECLARATION DE TOUS LES EVENTS
			//Création du document
			$("#ecrisle-button-create-document").bind("click.ecrisle-button-create-document", function(event) {
				setInterval(function() {
					var $form = $("#ecrisle-form-document");
					$form.find("[name='name']").focus();
				}, 500);
			});
			
			//Submit du formulaire
			$("#ecrisle-form-document").on('submit', function() {
				Ecrisle.layout.documents.createDocument();
				return false;
			});
			$("#ecrisle-popup-button-create-document").bind("click.ecrisle-popup-button-create-document", function(event) {
				$("#ecrisle-form-document").submit();
			});
			//END DECLARATION DE TOUS LES EVENTS
			
		},
		
		createDocument : function() {
			var $form = $("#ecrisle-form-document");
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
	var self = Ecrisle.layout.documents;
})($);
$(window).ready(function(){
	Ecrisle.layout.documents.init();
	
});
