var Client=require('../models/clients');

module.exports = function (request, response, next) {

    console.log("Profile session: ", request.session.user);

    if(request.session.user == undefined || request.session.user.u_name == "NULL")
    {
        response.redirect('/signup');
    }
    else
    {
        //harvey 4.29
        var p_name =  request.session.user.username;
        Client.findOne({'username':p_name}, function(err, res) {
            if (res == null)
            {
                response.redirect('/signup');
            }
            else {
                var r_name = res.username;
                var r_pwd = res.password;
                var r_email = res.email;

                console.log("r_name: ",r_name);
                console.log("r_pwd: ", r_pwd);
                console.log("r_email: ",r_email);

                var nr_pwd = "*".repeat(r_pwd.length-1).concat(r_pwd.substring(r_pwd.length-1));

                console.log("Transfered pwd: ", nr_pwd);

                response.render('profile', {title:'Profile Page', u_name:r_name, u_pwd: r_pwd, nu_pwd: nr_pwd, u_email:r_email, uid:request.session.userid.uid});

            }
        });






        // response.render('profile', {title:'Profile Page', u_name:request.session.user.username,
        //     uid:request.session.userid.uid});
    }


};
