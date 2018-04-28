// module.exports = function (request, response, next) {
//
//     if()
//
//     response.render('addproduct');
//
// };

module.exports = function (request, response, next) {

    console.log("Add Product session: ", request.session.user);

    if(request.session.user == undefined || request.session.user == "NULL")
    {
        // console.log("Sign Up No username Yet!");
        response.redirect('/signup');
    }
    else
    {
        console.log(request.session.user.username);
        response.render('addproduct', {title:'Add Product Page', u_name:request.session.user.username});
    }


};