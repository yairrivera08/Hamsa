$(document).ready(function() {
    //when side cart toggle anchor is clicked   
    $(".side-cart-toggle").click(function(e) {
        e.preventDefault();
        $("#side-cart").toggleClass("side-cart-open");
        $(".overlay").toggle();
    });
});