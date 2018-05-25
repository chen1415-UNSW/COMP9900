var Blocks=require('../models/block');


module.exports = function (request, response, next) {

    console.log("View Order History Sale session: ", request.session.user);

    if(request.session.user == undefined || request.session.user == "NULL")
    {
        // console.log("Sign Up No username Yet!");
        response.render('signup', {title:'Log In Page', u_name:"NULL"});
    }
    else
    {
        console.log("Enter orderhistorySale");
        console.log("Profile Control:  UID   ", request.session.userid.uid);

        Blocks.find({'selleruid':request.session.userid.uid}, function(err, res){

            ViewOrderList = res;
            console.log("============block resultList============");
            //console.log(ViewOrderList);

            response.render('orderHistorySale', {title:'View History Page', u_name:request.session.user.username,
                uid:request.session.userid.uid, result:ViewOrderList});
        });

    }

};