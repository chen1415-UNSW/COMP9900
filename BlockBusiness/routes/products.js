
module.exports = function (request, response, next) {
    // response.render('products');


    console.log("Contact session: ", request.session.user);

    if(request.session.user == undefined || request.session.user.u_name == "NULL")
    {
        response.redirect('/signup');
    }
    else
    {
        console.log(request.session.user.username);
        response.render('products', {title:'Products Page', u_name:request.session.user.username,
            uid:request.session.userid.uid});
    }

};
