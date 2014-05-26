(function($) {
	Ecrisle.layout.document = { 
		changed : false,
		history : new Array(),
		name: null,
		content : null,
		initialContent : null,
		
		init : function() {
			var $form = $("#ecrisle-form-document");

			//BEGIN DECLARATION DE TOUS LES EVENTS
			//Partager le document
			$("#ecrisle-button-share-document").bind("click.ecrisle-button-share-document", function(event) {
				setInterval(function() {
					var $form = $("#ecrisle-form-share-document");
					$form.find("[name='name']").focus();
				}, 500);
			});
			
			//Enregistrement du document
			$("#ecrisle-button-save-document").bind("click.ecrisle-button-save-document", function(event) {
				Ecrisle.layout.document.saveDocument();
			});
			
			//Supprimer le document
			$("#ecrisle-button-delete-document").bind("click.ecrisle-button-delete-document", function(event) {
				$this = $(this);
				$.ajax({
					url: $this.attr('data-action'),
					type: $this.attr('data-method'),
					data: {_csrf:$this.attr('data-csrf'), _id:$this.attr('data-id')},
					success: function(doc) {
						document.location.href = "/documents";
					}
				});
			});
			
			//Voir les modifications sur le document
			$("#ecrisle-button-view-document").bind("click.ecrisle-button-view-document", function(event) {
				var dmp = new diff_match_patch();
				var diff = dmp.diff_main(self.initialContent, self.content, true);
				dmp.diff_cleanupSemantic(diff);
				var ds = dmp.diff_prettyHtml(diff);
				$("#ecrisle-container-view-document").html(ds);
			});
			
			//Submit du formulaire avec le contenu du document
			$("#ecrisle-form-document").on('submit', function(event) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			});
			//Empêcher le submit du formulaire avec la touche ENTER
			$form.find("[name='name']").bind("keypress.name", function(event) {
				var charCode = event.charCode || event.keyCode;
				if (charCode == 13) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}
			});
			
			//Submit du formulaire
			$("#ecrisle-form-share-document").on('submit', function() {
				Ecrisle.layout.document.shareDocument();
				return false;
			});
			$("#ecrisle-popup-button-share-document").bind("click.ecrisle-popup-button-share-document", function(event) {
				$("#ecrisle-form-share-document").submit();
			});
			//END DECLARATION DE TOUS LES EVENTS
			
			self.content = $("#ecrisle-textarea-document").val();
			
			var tiny = tinymce.init({
				selector: '#ecrisle-textarea-document',
				statusbar: false,
				theme: "modern",
				content_css: "/css/tinymce.content.css"+"?ver="+new Date().getTime(),
				language: 'fr_FR',
				height: '100%',
				height: 500,
				plugins: [
					"fullscreen textcolor print save"
				],
				toolbar: "insertfile print undo redo | styleselect | fontselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen | l      ink image |  preview media fullpage | emoticons",
				setup : function(ed){
					ed.on('change', function(e){
						if (e.lastLevel != null) {
							Ecrisle.layout.document.changed = true;
							/*Ecrisle.layout.writer.saveDocument();

							var dmp = new diff_match_patch();
							var diff = dmp.diff_main(e.lastLevel.content, e.level.content, true);
							if (diff.length > 2) {
								dmp.diff_cleanupSemantic(diff);
							}
							var patch_list = dmp.patch_make(e.lastLevel.content, e.level.content, diff);
							var patch_text = dmp.patch_toText(patch_list)
							Ecrisle.layout.writer.history.push(patch_text);
							console.log(Ecrisle.layout.writer.history);*/
						}
					});
				}
			});
			//tinyMCE.activeEditor.execCommand("fontName", false, "Arial");
			$(function(){
				$("head").append(
					$(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"/css/tinymce.css"+"?ver="+new Date().getTime()})
				);
			});
			
			

			//setInterval("Ecrisle.layout.document.saveDocumentByInterval()", 5000);
		},
		
		isChanged : function() {
			var $form = $("#ecrisle-form-document");
			return ((Ecrisle.layout.document.changed) || (Ecrisle.layout.document.name != $form.find("[name='name']").val()));
		},

		saveDocumentByInterval : function() {
			if (tinyMCE.activeEditor != null) {
				Ecrisle.layout.document.saveDocument();
			}
		},
		
		saveDocument : function() {
			if (Ecrisle.layout.document.isChanged()) {
				var dmp = new diff_match_patch();
				var oldcontent = self.content;
				var newcontent = tinyMCE.activeEditor.getContent();
				var diff = dmp.diff_main(oldcontent, newcontent, true);
				if (diff.length > 2) {
					dmp.diff_cleanupSemantic(diff);
				}
				var patch_list = dmp.patch_make(oldcontent, newcontent, diff);
				var patch_text = dmp.patch_toText(patch_list)
						
				//$("#writer").val(tinyMCE.activeEditor.getContent());
				var $form = $("#ecrisle-form-document");
				$.ajax({
					url: "/save-document",
					type: "POST",
					data: {_id:$form.find("[name='_id']").val(), _csrf:$form.find("[name='_csrf']").val(), name:$form.find("[name='name']").val(), /*content:tinyMCE.activeEditor.getContent(),*/ patch:patch_text},
					success: function(html) {}
				});
			}
		},
		
		shareDocument : function() {
			var $form = $("#ecrisle-form-share-document");
			if ($form.find("[name='name']").val() != "" && $form.find("[name='email']").val() != "") {
			    var _emails = $form.find("[name='email']").val().split(",");
				$.ajax({
					url: $form.attr('action'),
					type: $form.attr('method'),
					data: {_csrf:$form.find("[name='_csrf']").val(), _id:$form.find("[name='_id']").val(), emails:_emails},
					success: function(doc) {
						document.location.href = "/document/"+doc._id;
					}
				});
			}
		}
		
	};
	var self = Ecrisle.layout.document;
})($);
$(window).ready(function(){
	Ecrisle.layout.document.init();
	
});