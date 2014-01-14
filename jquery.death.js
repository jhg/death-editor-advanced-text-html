(function($){

$.fn.editor = function(options) {
  // Get settings give or by default
  var settings = $.extend({}, $.fn.editor.defaults, options);
  // Hide textarea and make editor
  this.addClass(settings.class_editor).after(settings.tag).css('display','none')
    .keyup(refreshEditionArea).each(refreshEditionArea)
    .next().attr('contenteditable', true).addClass(settings.class_editor)
    .focusout(refreshTextArea).keyup(refreshTextArea).change(refreshTextArea);
  // If controls is true then make controls layer
  if (settings.controls != false) {
    // Make controls container and configure controls
    this.before(settings.tag).prev().addClass(settings.class_controls)
      .each(function(){
        for (i in settings.controls){
          // Get settings of control
          var control = $.extend({
              render: $.fn.editor.renderControl,
              config: $.fn.editor.configControl,
              action: $.fn.editor.configAction
          }, settings.controls[i]);
          // Render and configure control
          control.config(
            $(this).append(control.render())
            .children(':last-child')
          );
        }
      });
  }
  return this;
};

// Refresh textarea
function refreshTextArea(){
    var t = $(this);
    t.prev()[0].value = t.html();
};

// Refresh editionArea
function refreshEditionArea(){
    $(this).next().html(this.value);
};

// Render by default
$.fn.editor.renderControl = function(){
    return '<input class="'+this.command+'" type="button" value="'+this.text+'" />';
};

// Configurator by default
$.fn.editor.configControl = function(control){
    var settings = this;
    control.click(function(){
      settings.action();
    });
};

// Action by default
$.fn.editor.configAction = function(){
    document.execCommand(this.command, null, null);
};

// Configuration by default
$.fn.editor.defaults = {
    controls: [{text:'B',command:'bold'},
               {text:'I',command:'italic'},
               {text:'U',command:'underline'},
               {text:'img',command:'insertImage',action:function(){document.execCommand(this.command, null, prompt('URL:'));}},
               {text:'enl',command:'createLink',action:function(){document.execCommand(this.command, null, prompt('URL:'));}},
               {text:'</>',command:'htmlEditor',config:function(control){
                   control.click(function(){
                     var textarea = $(this).parent().next();
                     if(textarea.css('display') == 'none'){
                       textarea.css('display','block').next().css('display','none');
                     } else {
                       textarea.css('display','none').next().css('display','block');
                     }
                   });
               }},
               {text:'-',command:'insertHorizontalRule'}],
    class_controls: 'controls',
    class_editor: 'editor',
    tag: '<div/>',
};

}(jQuery));
