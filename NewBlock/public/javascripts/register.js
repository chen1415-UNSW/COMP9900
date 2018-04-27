// Can also be used with $(document).ready()
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });
});
function submitForm() {
    let frm = $('#signUpForm');
    frm.submit(function (e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/SignUpControl",
            data:frm.serialize(),
            success: function (response) {
                if(response.success){
                    alert("Reister success!");
                    window.location='http://localhost:3000/signup'
                    //在这里定义一个session对象，将这个表格里的username，存到session里面
                }else{
                    alert("Register Fail! Pleas try again.");
                    window.location='http://localhost:3000/register'
                }

            },})
    })}