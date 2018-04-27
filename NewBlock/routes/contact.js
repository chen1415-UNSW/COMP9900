// module.exports = function (request, response, next) {
//
//     //
//
//     if()
//     {
//
//     }
//     console.log("Sign Out session: ", request.session.user.username);
//
//     response.render('index', {title:'Index Page', u_name:"NULL"});
//
//
// };

module.exports = function (request, response, next) {

    console.log("Contact session: ", request.session.user);

    if(request.session.user == undefined || request.session.user.u_name == "NULL")
    {
        response.render('contact', {title:'Contact Page', u_name:"NULL"});
    }
    else
    {
        console.log(request.session.user.username);
        response.render('contact', {title:'Contact Page', u_name:request.session.user.username});
    }

};