var Client=require('../models/clients');
//harvey
var cryptoscript = require('../routes/encrypter');


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
                var r_email = res.email;

                console.log("r_name: ",r_name);
                console.log("r_email: ",r_email);

                var n_email = "";
                for(i =0; i<r_email.length;i++)
                {
                    if(r_email.charAt(i) == "@")
                    {
                        n_email = n_email.substring(0,n_email.length-1);
                        n_email += r_email.charAt(i-1);
                        n_email += r_email.charAt(i);
                        // console.log(r_email.substring(0,i))
                        n_email += r_email.substring(i+1);
                        break;
                    }
                    else
                    {
                        n_email += "*";
                    }
                }
                console.log("n_email: ", n_email);
                // var n_email = "*".repeat(r_email.length-1).concat(r_email.substring(r_email.length-1));

                console.log("Transfered email: ", n_email);

                response.render('profile', {title:'Profile Page', u_name:r_name, u_email:n_email, uid:request.session.userid.uid});

            }
        });






        // response.render('profile', {title:'Profile Page', u_name:request.session.user.username,
        //     uid:request.session.userid.uid});
    }


};
