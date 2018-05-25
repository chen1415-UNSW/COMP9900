var Blocks=require('../models/block');


module.exports = function (request, response, next) {

    console.log("View Order History session: ", request.session.user);

    //功能待添加

    if(request.session.user == undefined || request.session.user == "NULL")
    {
        // console.log("Sign Up No username Yet!");
        response.render('signup', {title:'Log In Page', u_name:"NULL"});
    }
    else
    {
        console.log("可以进入orderhistory页面");
        console.log("Profile Control:  UID   ", request.session.userid.uid);

        Blocks.find({'uid':request.session.userid.uid}, function(err, res){

            ViewOrderList = res;
            console.log("============block resultList start============");
            //console.log(ViewOrderList);
            console.log("============block resultList end============");
            response.render('orderHistory', {title:'View History Page', u_name:request.session.user.username,
                uid:request.session.userid.uid, result:ViewOrderList});
        });

    }

};
