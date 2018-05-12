var Client=require('../models/clients');

module.exports = function (request, response, next)
{
    console.log("----Enter the LogInControl----");

    var uname = request.body.u_name;
    var pwd = request.body.u_password;

    console.log(uname +"   LogIn");
    console.log(pwd +"   LogIn");

    Client.findOne({'username':uname},function(err,res){
        result = res;
        if(result == null)
        {
            return response.json({success:false});
        }
        else
        {
            if(result.password == pwd)
            {
                return response.json({success:true});
            }else
            {
                return response.json({success:false});
            }
        }
    });

    console.log("----Complete the LogInControl----");

};