

function validataPwd(pwd, pwd2, callback)
{
    var RegisterResult = false;
    if(pwd == pwd2)
    {
        RegisterResult = true;
    }
    callback(RegisterResult);
}


module.exports = function (request, response, next)
{
    console.log("-----Enter the SignUpControl functuion!!!!!!------")
    // var name = request.body.id()
    var username = request.body.user_name;
    var email = request.body.email;
    var pwd = request.body.password;
    var pwd2 = request.body.re_password;

    console.log(username);
    console.log(email);
    console.log(pwd);
    console.log(pwd2);

    validataPwd(pwd, pwd2, function (RegisterResult) {
        if(RegisterResult) {
            response.redirect('/index');
            return;
        }
        response.redirect('/error');
        
    });

    console.log("-----Complete Process-----");

};