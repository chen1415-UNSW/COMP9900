
module.exports = function (request, response, next) {


    request.session.destroy();
    response.redirect('/index');


};