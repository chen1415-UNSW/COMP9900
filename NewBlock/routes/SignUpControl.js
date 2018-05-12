var Client=require('../models/clients');


module.exports = function (request, response, next)
{
    console.log("-----Enter the SignUpControl functuion------");
    // var name = request.body.id()
    var username = request.body.rej_name;
    var email = request.body.rej_email;
    var pwd = request.body.rej_password;
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
                // 5.8 创建 user fake hash
                var hash = "userhash12345678";

                var cliententity=new Client({username:username,password:pwd, email:email,hash:hash});
                cliententity.save();

                return response.json({success:true});
            }else {
                return response.json({success:false});
            }
        }
        if(result!=null) {
            return response.json({success:false});
        }

    });

    console.log("-----Complete Process-----");

};
