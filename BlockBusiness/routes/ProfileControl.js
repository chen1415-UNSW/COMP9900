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
                var r_address = res.address;
                var r_hash = res.hash;
                // session added
                request.session.user.userhash = r_hash;

                console.log("r_name: ",r_name);
                console.log("r_pwd: ", r_pwd);
                console.log("r_email: ",r_email);

                // var nr_pwd = "*".repeat(r_pwd.length-1).concat(r_pwd.substring(r_pwd.length-1));
                var en_email = "";
                for(i=0; i<r_email.length;i++)
                {
                    if(r_email.charAt(i) !== "@")
                    {
                        en_email += "*";
                    }
                    else
                    {
                        en_email = en_email.substring(0, en_email.length-1);
                        en_email += r_email.charAt(i-1);
                        en_email += r_email.charAt(i);
                        break
                    }
                }
                for(i=0;i<r_email.length;i++)
                {
                    if(r_email.charAt(i)==="@")
                    {
                        en_email += r_email.substring(i+1, r_email.length)
                        break;
                    }
                }
                console.log("Transfered email: ", en_email);

                response.render('profile', 
                {title:'Profile Page', 
                u_name:r_name, 
                u_email:en_email, 
                uid:request.session.userid.uid, 
                u_address:r_address,
                u_hash:r_hash
                });

            }
        });
        // response.render('profile', {title:'Profile Page', u_name:request.session.user.username,
        //     uid:request.session.userid.uid});
    }


};
