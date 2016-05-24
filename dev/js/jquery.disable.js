(function($, window){
    $.fn.disable = function(){
        $(this).prop('disabled', true);
    };

    $.fn.enable = function(){
        $(this).prop('disabled', false);
    };
})(jQuery, window);
