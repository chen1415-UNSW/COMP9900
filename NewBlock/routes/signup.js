module.exports = function (request, response, next) {

    console.log("Sign Up session: ", request.session.user);

    if(request.session.user == undefined || request.session.user == "NULL")
    {
        // console.log("Sign Up No username Yet!");
        response.render('signup', {title:'Log In Page', u_name:"NULL"});
    }
    else
    {
        console.log(request.session.user.username);
        response.render('signup', {title:'Log In Page', u_name:request.session.user.username,
            uid:request.session.userid.uid});
    }


};
