var Address = require('../models/address')
var Web3 = require("web3")

module.exports = 
{   
    InitAllAddress: function () {
        var web3
        
        function web3_start() {
            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            if (typeof web3 !== 'undefined') {
                console.warn("Using web3 detected from external source. ")
                // Use Mist/MetaMask's provider
                web3 = new Web3(web3.currentProvider)
            } else {
                console.warn("No web3 detected. Falling back to http://127.0.0.1:8545.")
                // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
                web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
            }
        }
        // 初始化web3
        web3_start()

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
            console.log(err)
            return
            }
            if (accs.length == 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
            return
            }

            console.log("---Try to build up table---")
            
            for (var i in accs) {
                var new_address = new Address({
                    address: accs[i],
                    mask: true
                })
                new_address.save()

            }
            console.log("---finish building---")
        })
    },

    getAddress: (flag) => {
        return Address.findOne({mask:flag})
    },
        

    getAddressAll: (flag) => {
        return Address.find({mask:flag})      
    },

    // update函数一定要接受回调，或者使用.update()后缀强制执行
    updateAddress: (address, flag) => {
        Address.update({address:address}, {$set:{mask:flag}}, 
        (err)=>{
            if (err) console.log(err)
        })
    }
    
}