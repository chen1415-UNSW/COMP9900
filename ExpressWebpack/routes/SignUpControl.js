var Client=require('../models/clients');


module.exports = function (request, response, next)
{
    console.log("-----Enter the SignUpControl functuion------");
    // var name = request.body.id()
    var username = request.body.user_name;
    var email = request.body.email;
    var pwd = request.body.password;
    var pwd2 = request.body.re_password;

    console.log(username);
    console.log(email);
    console.log(pwd);
    console.log(pwd2);


    Client.findOne({'username':username},function (err,res) {
        result=res;
        if(result == null)
        {
            if(pwd === pwd2)
            {
                var cliententity=new Client({username:username,password:pwd, email:email});
                cliententity.save();
                return response.json({success:true});
            }else {
                return response.json({success:false});
            }
        }
        else {
            return response.json({success:false});
        }

    });

    console.log("-----Complete Process-----");

};