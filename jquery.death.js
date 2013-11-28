(function($){
  $.fn.editor = function(options) {
    var settings = $.extend({}, $.fn.editor.defaults, options);
    this.addClass(settings.class_editor).after(settings.tag)//.css('display', 'none')
        .keyup(refreshEditionArea).each(refreshEditionArea)
        .next().attr('contenteditable', true)
        .focusout(refreshTextArea).keyup(refreshTextArea).change(refreshTextArea);
    this.next().addClass(settings.class_editor);
    // If controls is true then make controls layer
    if (settings.controls) {
      this.before(settings.tag).prev().addClass(settings.class_controls);
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
  // Configuration by default
  $.fn.editor.defaults = {
      controls: true,
      class_controls: 'controls',
      class_editor: 'editor',
      tag: '<div/>',
  };
}(jQuery));
