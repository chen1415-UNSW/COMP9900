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
// 合约实例化
var instance
// 合约默认部署地址
var contractAddress
// 合约余额
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
            // 以后需要替换为用户的实际账户
            account_list = accs
            default_buyer = account_list[1]
            default_seller = account_list[2]
           
            console.log("Check account")
            console.log(default_buyer)
           
            // 设置初始合约默认地址，否则会报错invalid address
            web3.eth.defaultAccount = default_buyer

            self.refreshBalance(default_buyer)
  
          })
        // 得到Trade合约地址
        self.getContractAddress()
       
        // 注册事件
        self.tradeEvent()

    },

    // 返回新的地址给注册的新用户
    getNewAccount: function() {

    },

    setStatus: function(message) {
        return message
    },

    refreshBalance: async function(account) {
        
        // web3.eth.getBalance(account, function(err, result){
        //     console.log("Refresh Balance")
        //     if (!err) {
        //          var balance = web3.fromWei(result ,'ether').toString()
        //          console.log("MyTrade:" + balance)
        //          return balance
        //     }
        //     else {
        //         console.log(err)
        //         return -1
        //     }
        // })
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
        var waiting_for = 0 //异步等待标志
        var flag = true

        var cartSize = cart_list.length
        var lastMaxIndex = await self.getCurrentIndexFromBlock()

        function waitingEnd(flag) {
            if (flag === cartSize) {
                callback(1, cart_list)
            }
        }
        //统计购物车总价是否超过用户余额
        var total = 0
        for (var i in cart_list){
            total += cart_list[i].number * cart_list[i].price
        }
        //添加价格确认
        var thisBuyer = cart_list[0].buyerAddress
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
                // 如果买卖双方地址没有被赋值，使用默认地址交易
                let tradeDetail = cart_list[i]
                if (tradeDetail.buyerAddress === undefined) {
                    tradeDetail.buyerAddress = default_buyer
                }
                if (tradeDetail.sellerAddress === undefined) {
                    tradeDetail.sellerAddress = default_seller
                }
                
                console.log("Show trade addresses:")
                console.log(tradeDetail.buyerAddress)
                console.log(tradeDetail.sellerAddress)
            
                // 该商品的总价
                let total_ThisItem = tradeDetail.productPrice * tradeDetail.number
                // 向区块发送
                let value = await instance.setTrade(
                    tradeDetail.selleruid, 
                    tradeDetail.uid, 
                    tradeDetail.pid,
                    tradeDetail.number, 
                    web3.toWei(tradeDetail.productPrice, 'ether'),
                    web3.toWei(total_ThisItem, 'ether'),
                    tradeDetail.sellerAddress, 
                    {from:tradeDetail.buyerAddress, value:web3.toWei(total_ThisItem, 'ether'), gas:3000000})

                console.log("Waiting for transaction:" + i)
                console.log(value.tx)
                let currentIndex = lastMaxIndex + parseInt(i)

                console.log("Trade Index here: " + currentIndex)
                //在输入的购物车里面添加交易成功的Hash
                cart_list[i].hash = value.tx

                contractBalance = web3.eth.getBalance(contractAddress).toNumber()
                console.log("Show contract balance after trade")
                console.log(contractBalance)

                //再把钱付给卖家
                var payHash = await instance.confirmTrade(currentIndex, {from:tradeDetail.buyerAddress})
                // var payHash = await instance.confirmTradeByAddress(
                // "0x60EC8abbb9d6C807B0F2cd3D1E39c7D103EaF2f1", 
                // {from:tradeDetail.buyerAddress})

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

    readTransaction: function(address) {
        return web3.eth.getTransaction(address)
    },

    tradeEvent: function() {
        instance.showTrade().watch(function(error, result) {
            console.log("Seller:" + result.args.seller + " Buyer:" + result.args.buyer + 
            " Product:" + result.args.item)
        })
        instance.showTradeIndex().watch( async function(error, result){
            let index = result.args.single_index.toNumber()
            console.log("Record trade index: " + index)
            // let value = await instance.getSellerAddress(index)
            // console.log(value)
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