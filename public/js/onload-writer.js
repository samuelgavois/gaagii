(function($) {
	Gaagii.layout.writer = { 
		changed : false,
		history : new Array(),
		name: null,
		content : null,
		initialContent : null,
		
		init : function() {
			self.content = $("#gaagii-textarea-document").val();
			
			var tiny = tinymce.init({
				selector: '#gaagii-textarea-document',
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
							Gaagii.layout.writer.changed = true;
							/*Gaagii.layout.writer.saveDocument();

							var dmp = new diff_match_patch();
							var diff = dmp.diff_main(e.lastLevel.content, e.level.content, true);
							if (diff.length > 2) {
								dmp.diff_cleanupSemantic(diff);
							}
							var patch_list = dmp.patch_make(e.lastLevel.content, e.level.content, diff);
							var patch_text = dmp.patch_toText(patch_list)
							Gaagii.layout.writer.history.push(patch_text);
							console.log(Gaagii.layout.writer.history);*/
						}
					});
				}
			});
			$(function(){
				$("head").append(
					$(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"/css/tinymce.css"+"?ver="+new Date().getTime()})
				);
			});
			
			//Enregistrement du document
			$("#gaagii-button-save-document").bind("click.gaagii-button-save-document", function(event) {
				Gaagii.layout.writer.saveDocument();
			});
			
			//Supprimer le document
			$("#gaagii-button-delete-document").bind("click.gaagii-button-delete-document", function(event) {
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
			$("#gaagii-button-view-document").bind("click.gaagii-button-view-document", function(event) {
				var dmp = new diff_match_patch();
				var diff = dmp.diff_main(self.initialContent, self.content, true);
				dmp.diff_cleanupSemantic(diff);
				var ds = dmp.diff_prettyHtml(diff);
				$("#gaagii-container-view-document").html(ds);
			});
			
			//Submit du formulaire
			$("#gaagii-form-document").on('submit', function() {
				
				return false;
			});

			//setInterval("Gaagii.layout.writer.saveDocumentByInterval()", 5000);
		},
		
		isChanged : function() {
			var $form = $("#gaagii-form-document");
			return ((Gaagii.layout.writer.changed) || (Gaagii.layout.writer.name != $form.find("[name='name']").val()));
		},

		saveDocumentByInterval : function() {
			if (tinyMCE.activeEditor != null) {
				Gaagii.layout.writer.saveDocument();
			}
		},
		
		saveDocument : function() {
			if (Gaagii.layout.writer.isChanged()) {
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
				var $form = $("#gaagii-form-document");
				$.ajax({
					url: $form.attr('action'),
					type: $form.attr('method'),
					data: {_id:$form.find("[name='_id']").val(), _csrf:$form.find("[name='_csrf']").val(), name:$form.find("[name='name']").val(), /*content:tinyMCE.activeEditor.getContent(),*/ patch:patch_text},
					success: function(html) {}
				});
			}
		}
		
	};
	var self = Gaagii.layout.writer;
})($);
$(document).ready(function(){
	Gaagii.layout.writer.init();
	
});