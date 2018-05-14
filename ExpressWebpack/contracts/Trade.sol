pragma solidity ^0.4.2;

import "./SafeMath.sol";

contract Trade is SafeMath {
    
    
    struct SingleTrade {
        string seller;
        string buyer;
        string item;
        uint number;
        uint price;
        uint total;
        address seller_addr;
        bool finish;
    }

    uint totalTrades;
    mapping(uint => SingleTrade) TradeList;

    event showTrade(
        string seller,
        string buyer,
        string item,
        uint number,
        uint price,
        uint total,
        address seller_addr
    );

    event showTradeIndex(
        // 交易在合约记录中的编号，返回后方便用户确认付款
        uint single_index
    );

    event showBuy(
        address sender,
        bytes data
    );

    function () payable public{
        
    } 

    function setBuy() payable public returns (bool) {
        emit showBuy(msg.sender, msg.data);
        return(true);
    }
    
    function getContractAddress() public view returns (address) {
        return(address(this));
    }

    function confirmTrade(uint tradeIndex) public returns (bool) {
        if (!TradeList[tradeIndex].finish) {
            address(TradeList[tradeIndex].seller_addr).transfer(TradeList[tradeIndex].total);
            TradeList[tradeIndex].finish = true;
            return(true);
        }
        else {
            return(false);
        }
        
    }

    function confirmTradeByAddress(address seller_addr) public returns (bool) {
        address(seller_addr).transfer(1 ether);
        return(true);
    }
    
    function setTrade(
        string _seller, string _buyer, string _item, uint _number, uint _price, uint _total, address _receiver)
        payable public returns (bool){
        
        // seller = _seller;
        // buyer = _buyer;
        // item = _item;
        // number = _number;
        // price = _price;
        // total = safeMul(number, price);
        // seller_addr = _receiver;
        // if (address(msg.sender).balance < total) {
        //     return;
        // } else {
        //   address(_receiver).transfer(total);   
        // }
        // emit showTrade(_seller, _buyer, _item, _number, _price, _total);
        TradeList[totalTrades] = SingleTrade(_seller, _buyer, _item,  _number, _price, _total, _receiver, false);
        emit showTradeIndex(totalTrades);
        
        totalTrades++;

        return(true);
    }

    function getTrade(uint tradeIndex) public view returns (string, string, string, uint, uint, uint) {
        SingleTrade memory s = TradeList[tradeIndex];
        return(s.seller, s.buyer, s.item, s.number, s.price, s.total);
    }

    function getSellerAddress(uint tradeIndex) public view returns (address) {
        SingleTrade memory s = TradeList[tradeIndex];
        return(s.seller_addr);
    }

    function getCurrentTradeIndex() public view returns (uint) {
        return(totalTrades);
    }


}