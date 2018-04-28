

module.exports = function (request, response, next) {

    if(request.session.user == undefined)
    {
        response.redirect('/signup');
    }
    else
    {
        // console.log('!!!')
        response.render('checkout', {u_name: request.session.user.username});

    }


};