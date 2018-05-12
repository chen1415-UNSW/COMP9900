var Client=require('../models/clients');
var cryptoscript = require('../routes/encrypter');


module.exports = function (request, response, next)
{
    console.log("----Enter the LogInControl----");

    var uname = request.body.u_name;
    var pwd = request.body.u_password;

    console.log(uname +"   LogInName");
    console.log(pwd +"   LogInPwd");

    Client.findOne({'username':uname},function(err,res){
        if(res == null)
        {
            return response.json({success:false});
        }
        else if(res!=null)
        {
            var en_pwd = cryptoscript.cryptPwd(pwd);
            console.log("en_pwd: ",en_pwd);


            if(res.password == en_pwd)
            {
                request.session.user = {'username': uname};
                request.session.userid = {'uid': res._id};


                return response.json({success:true});
            }else if(res.password != en_pwd)
            {
                return response.json({success:false});
            }
        }
    });

    console.log("----Complete the LogInControl----");
};
