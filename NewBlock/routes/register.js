module.exports = function (request, response, next) {

    console.log("Register session: ", request.session.user);

    if(request.session.user == undefined)
    {
        // console.log("Sign Up No username Yet!");
        response.render('register', {title:'Register In Page', u_name:"NULL"});
    }
    else
    {
        console.log(request.session.user.username);
        response.render('sigregisternup', {title:'Register In Page', u_name:request.session.user.username});
    }

};