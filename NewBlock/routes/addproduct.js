module.exports = function (request, response, next) {

    console.log("Add Product session: ", request.session.user);

    if(request.session.user == undefined || request.session.user == "NULL")
    {

        response.redirect('/signup');
    }
    else
    {
        console.log(request.session.user.username);
        response.render('addproduct', {title:'Add Product',
            u_name:request.session.user.username,
            uid:request.session.userid.uid

        });
    }


};
