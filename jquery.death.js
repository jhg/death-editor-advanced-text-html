(function($){

$.fn.editor = function(options) {
  var settings = $.extend({}, $.fn.editor.defaults, options);
  this.addClass(settings.class_editor).after(settings.tag).css('display','none')
    .keyup(refreshEditionArea).each(refreshEditionArea)
    .next().attr('contenteditable', true).addClass(settings.class_editor)
    .focusout(refreshTextArea).keyup(refreshTextArea).change(refreshTextArea);
  // If controls is true then make controls layer
  if (settings.controls != false) {
    this.before(settings.tag).prev().addClass(settings.class_controls)
      .each(function(){
        for (i in settings.controls){
          var control = $.extend({
              render: $.fn.editor.renderControl,
              config: $.fn.editor.configControl
          }, settings.controls[i]);
          control.config(
            $(this).append(control.render(control))
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
$.fn.editor.renderControl = function(control){
    return '<input class="'+control.command+'" type="button" value="'+control.text+'" />';
};

// Configurator by default
$.fn.editor.configControl = function(control){
    control.click(function(){
      document.execCommand(control.attr('class'), null, null);
    });
};

// Configuration by default
$.fn.editor.defaults = {
    controls: [{text:'B',command:'bold'},
               {text:'I',command:'italic'},
               {text:'U',command:'underline'},
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
