module.exports = function (request, response, next) {

    console.log("Profile session: ", request.session.user);

    if(request.session.user == undefined || request.session.user.u_name == "NULL")
    {
        response.redirect('/signup');
    }
    else
    {
        console.log(request.session.user.username);
        response.render('profile', {title:'Profile Page', u_name:request.session.user.username,
            uid:req.session.userid.uid});
    }


};
