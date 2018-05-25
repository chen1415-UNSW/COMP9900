var Client=require('../models/clients');
var cryptoscript = require('../routes/encrypter');
var Address = require('./addressInit');

module.exports = function (request, response, next)
{
    console.log("-----Enter the SignUpControl functuion------");
    // var name = request.body.id()
    var username = request.body.rej_name;
    var email = request.body.rej_email;
    var pwd = request.body.rej_password;
    var pwd2 = request.body.re_password;
    var address = request.body.rej_address;

    console.log(username);
    console.log(email);
    console.log(pwd);
    console.log(pwd2);


    Client.findOne({'username':username}, async function (err,res) {
        result=res;

        if(result == null)
        {
            if(pwd === pwd2)
            {
                
                var hash = await Address.getAddress(true)
                if (hash === undefined) {
                    console.log("All address used");
                    return response.json({success:false});
                } else {
                    console.log(hash.address);
                    Address.updateAddress(hash.address, false);
                    
                }
                
                var en_pwd = cryptoscript.cryptPwd(pwd);
                console.log("en_pwd: ",en_pwd);

                var cliententity=new Client(
                    {username:username, 
                     password:en_pwd, 
                     email:email,
                     address:address,
                     hash:hash.address

                    });
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
