// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='addPic']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            choose: "required",
        },
        // Specify validation error messages
        messages: {
            choose: "&nbsp;&nbsp;&nbsp;    Please choose an image",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

    $("form[name='addProduct']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            newPic: "required",
            productName:"required",
            productPrice:"required",
            productInfo:"required",
        },
        // Specify validation error messages
        messages: {
            newPic: "required",
            productName:"required",
            productPrice:"required",
            productInfo:"required",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });
});
