module.exports = function (request, response, next) {

    console.log("View Order History session: ", request.session.user);

    //功能待添加

    if(request.session.user == undefined || request.session.user == "NULL")
    {
        // console.log("Sign Up No username Yet!");
        response.render('signup', {title:'Log In Page', u_name:"NULL"});
    }
    else
    {
        console.log("可以进入orderhistory页面");
        response.render('orderhistory', {title:'View History Page', u_name:request.session.user.username,
            uid:request.session.userid.uid});
    }

};
