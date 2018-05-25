var Client=require('../models/clients');

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
            if(res.password == pwd)
            {
                request.session.user = {'username': uname};
                request.session.userid = {'uid': res._id};


                return response.json({success:true});
            }else if(res.password != pwd)
            {
                return response.json({success:false});
            }
        }
    });

    console.log("----Complete the LogInControl----");
};
