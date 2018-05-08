pragma solidity ^0.4.2;

import "./SafeMath.sol";

contract Trade is SafeMath {
    
    string seller;
    string buyer;
    string item;
    uint number;
    uint price;
    uint total;

    event showTrade(
        string seller,
        string buyer,
        string item,
        uint number,
        uint price,
        uint total
       
    );

    function setTrade(string _seller, string _buyer, string _item, uint _number, uint _price) public {
        seller = _seller;
        buyer = _buyer;
        item = _item;
        number = _number;
        price = _price;
        total = safeMul(number, price);
        emit showTrade(seller, buyer, item, number, price, total);
    }

    function getTrade() public view returns (string, string, string, uint, uint, uint) {
        return (seller, buyer, item, number, price, total);
    }


}