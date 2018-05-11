var Address = require('../models/address')
var Web3 = require("web3")

module.exports = function ()
{   
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

    console.log("---Try to build up table---")
    
    var new_address = new Address(
        "0x0a1e605a7B86e410cfc364d3187af8BcDd19566E",
        true
    )
    new_address.save()
    
}