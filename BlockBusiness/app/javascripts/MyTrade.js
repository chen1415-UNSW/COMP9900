// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import { default as BigNumber} from 'bignumber.js'

// Import out contract artifacts
import mytrade_artifacts from '../../build/contracts/Trade.json'

var MyTrade = contract(mytrade_artifacts)

var account_list
var default_buyer
var default_seller
var buyer_balance
var seller_balance
var instance
var contractAddress
var contractBalance

window.App = {

    start: async function() {
        var self = this
        MyTrade.setProvider(web3.currentProvider)
        instance = await MyTrade.deployed()

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
              alert("There was an error fetching your accounts.")
              return
            }
      
            if (accs.length == 0) {
              alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
              return
            }
            // accs has to be replaced with buyer
            account_list = accs
            default_buyer = account_list[1]
            default_seller = account_list[2]
           
            console.log("Check account")
            console.log(default_buyer)
           
            // set default address
            web3.eth.defaultAccount = default_buyer

            self.refreshBalance(default_buyer)
  
          })
   
        self.getContractAddress()
       
        self.tradeEvent()

    },

    getNewAccount: function() {

    },

    setStatus: function(message) {
        return message
    },

    refreshBalance: async function(account) {
        var balance = await web3.eth.getBalance(account)
        return web3.fromWei(balance ,'ether').toNumber()
    },

    getCurrentIndexFromBlock: async function() {
        var value = await instance.getCurrentTradeIndex()
        console.log("Current Trade Index On Block: " + value)
        return parseInt(value)
    },

    getContractAddress: async function() {
        contractAddress = await instance.getContractAddress()   
        console.log("Show contract address")
        console.log(contractAddress)
    },

    checkBalanceEnough: async function(account, total) {
        var self = this
        if (total < await self.refreshBalance(account)) {
            return false
        }
        else {
            return true
        }
    },

    makeTrade: async function(cart_list, callback) {

        var self = this
        var txHashList = []
        var waiting_for = 0 
        var flag = true

        var cartSize = cart_list.length
        var lastMaxIndex = await self.getCurrentIndexFromBlock()

        function waitingEnd(flag) {
            if (flag === cartSize) {
                callback(1, cart_list)
            }
        }
  
        var total = 0
        for (var i in cart_list){
            total += cart_list[i].number * cart_list[i].price
        }
        // check balance and total
        var thisBuyer = cart_list[0].buyerHash
        if (thisBuyer === undefined) thisBuyer = default_buyer
        if (! await self.checkBalanceEnough(thisBuyer, total)) {
            callback(0, cart_list)
        }
        
        console.log("Prcie check done!")

        contractBalance = web3.eth.getBalance(contractAddress).toNumber()
        console.log("Show contract balance before trade")
        console.log(contractBalance)

        try{
        for (var i in cart_list) {
            ( async function(i){ 
               
                let tradeDetail = cart_list[i]
                if (tradeDetail.buyerHash === undefined) {
                    tradeDetail.buyerHash = default_buyer
                }
                if (tradeDetail.sellerHash === undefined) {
                    tradeDetail.sellerHash = default_seller
                }
                
                console.log("Show trade addresses:")
                console.log(tradeDetail.buyerHash)
                console.log(tradeDetail.sellerHash)
            
                // total price
                let total_ThisItem = tradeDetail.productPrice * tradeDetail.number
                // send transaction to block
                let value = await instance.setTrade(
                    tradeDetail.selleruid, 
                    tradeDetail.uid, 
                    tradeDetail.pid,
                    tradeDetail.number, 
                    web3.toWei(tradeDetail.productPrice, 'ether'),
                    web3.toWei(total_ThisItem, 'ether'),
                    tradeDetail.sellerHash, 
                    {from:tradeDetail.buyerHash, value:web3.toWei(total_ThisItem, 'ether'), gas:3000000})

                console.log("Waiting for transaction:" + i)
                console.log(value.tx)
                let currentIndex = lastMaxIndex + parseInt(i)

                console.log("Trade Index here: " + currentIndex)
               
                cart_list[i].hash = value.tx
                //add index of trade in block
                cart_list[i].blockIndex =  currentIndex
                cart_list[i].buyerHash = tradeDetail.buyerHash
                cart_list[i].sellerHash = tradeDetail.sellerHash

                contractBalance = web3.eth.getBalance(contractAddress).toNumber()
                console.log("Show contract balance after trade")
                console.log(contractBalance)

                waiting_for += 1
                waitingEnd(waiting_for)
                console.log("Trade Complete!")
            })(i)
        } 
        } catch(e) {
            console.log(e)
            console.log("Error making trade, check log")
        }   
    },

    testTrade: async function() {
        var tempAddr = "0x60EC8abbb9d6C807B0F2cd3D1E39c7D103EaF2f1"
        var contractAddress = await instance.getContractAddress()
        contractAddress.then(function(value) {
            var testAddr = value.toString()
            console.log("Contract Address")
            console.log(value)
            console.log(typeof(value))
            var contractBalance = web3.eth.getBalance(testAddr).toNumber()
            console.log("Show contract info before trade")
            console.log(contractBalance)
        
            async function makeBuy(){
                var txHash = await instance.setBuy(
                    {from:tempAddr, value:web3.toWei(2, 'ether')}
                    )
                console.log(txHash)
                var contractBalance = web3.eth.getBalance(testAddr).toNumber()
                console.log("Show contract info before trade")
                console.log(contractBalance)

            }
            makeBuy()
            
        })    
    },

    confirmTransaction: async function(currentIndex, buyerHash) {
        var self = this
        console.log("Confirm transaction: " + currentIndex)
        let payHash = await instance.confirmTrade(currentIndex, {from:buyerHash})
        console.log(payHash)
        let balance = await web3.eth.getBalance(contractAddress)
        console.log("Contract balance after confirmation:")
        console.log(balance.toNumber())
        return payHash
    },

    readTransaction: function(address) {
        return web3.eth.getTransaction(address)
    },

    simpleTransaction: async function(from, to, amount) {
        var tx = await web3.eth.sendTransaction({
            from:from, 
            to:to, 
            value:web3.toWei(amount, 'ether'), 
            gas:3000000
        })
        return tx
    },

    tradeEvent: function() {
        instance.showTrade().watch(function(error, result) {
            console.log(
                "Seller:" + result.args.seller + 
                " Buyer:" + result.args.buyer + 
                " Product:" + result.args.item
            )
        })
        instance.showTradeIndex().watch( async function(error, result){
            let index = result.args.single_index.toNumber()
            console.log("Record trade index: " + index)
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