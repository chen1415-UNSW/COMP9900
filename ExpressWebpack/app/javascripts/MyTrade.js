// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import { default as BigNumber} from 'bignumber.js'

// Import out contract artifacts
import mytrade_artifacts from '../../build/contracts/Trade.json'

var MyTrade = contract(mytrade_artifacts)

var account_list
var account

window.App = {

    start: function() {
        var self = this
        MyTrade.setProvider(web3.currentProvider)

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
              alert("There was an error fetching your accounts.")
              return
            }
      
            if (accs.length == 0) {
              alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
              return
            }
            // 以后需要替换为用户的实际账户
            account_list = accs
            account = account_list[0]
            var address_element = document.getElementById("YourAddress")
            console.log("Check account")
            address_element.innerHTML = account.valueOf()
            // 设置初始合约默认地址，否则会报错invalid address
            web3.eth.defaultAccount = account

            self.refreshBalance()

            //注册event
            self.tradeEvent()
          })
    
    },

    setStatus: function(message) {
        var status = document.getElementById("status")
        status.innerHTML = message
    },

    refreshBalance: function() {
        var unit = new BigNumber('10e17')
        web3.eth.getBalance(account, function(err, result){
            if (!err) {
                var balance_element = document.getElementById("balance")
                balance_element.innerHTML = result.dividedBy(unit).toFixed(5).toString()
            }
            else {
                console.log(err)
            }
        })
        console.log("Refresh Balance")
    },

    makeTrade: function() {
        var self = this
        var example = {
            seller: "Harvey",
            buyer: "Tom",
            item: "#1",
            price: 100
        }
        MyTrade.deployed().then(function(instance) {
            instance.setTrade(example.seller, example.buyer, example.item, example.price, {from:account, gas:3000000})
        }).then(function() {
            self.setStatus("Trade Complete!")
            self.refreshBalance()
            
        }).catch(function(e) {
            console.log(e)
            self.setStatus("Error making trade, check log")
        })
    },

    tradeEvent: function() {
        MyTrade.deployed().then(function(instance) {
            instance.showTrade().watch(function(error, result) {
                $("#contract").html(result.args.seller + " " + result.args.buyer + " " + result.args.item + " cost: " + result.args.price)
                var number = web3.eth.blockNumber
                var info =  web3.eth.getBlock(number)
                console.log("Block Num:" + number + " Block Hash:" + info.hash)
            })
        })
    }

}
        
window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. ")
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider)
    } else {
      console.warn("No web3 detected. Falling back to http://127.0.0.1:8545.")
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
    }
  
    App.start()
})