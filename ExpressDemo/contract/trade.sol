pragma solidity ^0.4.2;

contract Trade {
    
   string seller;
   string buyer;
   
   string item;
   uint price;
   
   event showTrade(
       string seller,
       string buyer,
       string item,
       uint price
       
   );

   function setTrade(string _seller, string _buyer, string _item, uint _price) public {
       seller = _seller;
       buyer = _buyer;
       item = _item;
       price = _price;
       showTrade(_seller, _buyer, _item, _price);
   }
   
   function getTrade() public constant returns (string, string, string, uint) {
       return (seller, buyer, item, price);
   }
    
  
}