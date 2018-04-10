/* 验证用户登录
* */
function validUser(uname, upwd, callback)
{
    var loginRlt = false;
    if (uname === "test" && upwd === "12345")
    {
        loginRlt = true;
        console.log("YES!")
    }
    callback(loginRlt);
}






// noinspection JSAnnotator
module.exports = function (request, response, next) {

    console.log('--- enter login module ---')

    var userName = request.query.username;
    var userPassword = request.query.upassword;

    console.log(userName, userPassword);

    validUser(userName, userPassword, function (loginResult) {
        if(loginResult)
        {
            response.redirect('/cart');
            return;
        }
        response.redirect('/error');
        return;


    })
};