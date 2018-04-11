pragma solidity ^0.4.2;

contract Trade {
    
   string seller;
   string buyer;
   
   string item;
   uint price;
   
   string seller_hash;
   string buyer_hash;
   string item_hash;
   
   function setTrade(string _seller, string _buyer, string _item, uint _price) public {
       seller = _seller;
       buyer = _buyer;
       item = _item;
       price = _price;
   }
   
   function getTrade() public constant returns (string, string, string, uint) {
       return (seller, buyer, item, price);
   }
    
   function setHash(string _seller_hash, string _buyer_hash, string _item_hash ) public {
       seller_hash = _seller_hash;
       buyer_hash = _buyer_hash;
       item_hash = _item_hash;
   }
    
   function getHash() public constant returns (string, string, string) {
       return (seller_hash, buyer_hash, item_hash);
   }    
}