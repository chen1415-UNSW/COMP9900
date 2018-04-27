module.exports = function (request, response, next) {

    console.log("Profile session: ", request.session.user);

    if(request.session.user == undefined || request.session.user.u_name == "NULL")
    {
        response.render('profile', {title:'Profile Page', u_name:"NULL"});
    }
    else
    {
        console.log(request.session.user.username);
        response.render('profile', {title:'Profile Page', u_name:request.session.user.username});
    }


};