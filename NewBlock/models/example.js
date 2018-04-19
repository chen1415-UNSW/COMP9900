Client.find(
    {},function(err,res){console.log(res)});


Client.findOne({'username':1234},function(err,res){console.log(res)});

var cliententity=new Client({username:'1234',password:'qwer'});
cliententity.save()

