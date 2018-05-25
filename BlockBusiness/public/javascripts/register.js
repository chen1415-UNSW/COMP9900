// Can also be used with $(document).ready()
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });
});
function submitForm() {
    let frm = $('#signUpForm');
    frm.unbind('submit').bind('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/SignUpControl",
            data:frm.serialize(),
            success: function (response) {
                if(response.success){
                    alert("Reister success!");
                    window.location='http://localhost:3000/signup'
                    
                }else{
                    alert("Register Fail! Pleas try again.");
                }

            },})
    })}