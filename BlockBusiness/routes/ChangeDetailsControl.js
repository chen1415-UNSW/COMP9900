var Client=require('../models/clients');
//harvey
var cryptoscript = require('../routes/encrypter');

module.exports = function (request, response, next) {

    console.log("-----Enter Change Details----");

    var uname = request.session.user.username;
    var email = request.body.p_email;
    var pwd = request.body.p_password;
    var re_pwd = request.body.pr_password;
    var n_address = request.body.p_address;

    console.log(uname +"   ChangDetail Name");
    console.log(email + "ChangeDetail Email");
    console.log(pwd +"   ChangeDetail Pwd");
    console.log(re_pwd + "ChangeDetails RePwd");

    if(pwd != re_pwd)
    {
        return response.json({success:false});
    }else{

        var en_pwd = cryptoscript.cryptPwd(pwd);
        console.log("en_pwd: ",en_pwd);

        Client.findOneAndUpdate({'username':uname},{'password':en_pwd,'email':email, 'address':n_address},function(err,res){
            if(err)
            {
                console.log(err);
                return response.json({success:false});
            }else
            {
                return response.json({success:true});
            }
        });
    }
};