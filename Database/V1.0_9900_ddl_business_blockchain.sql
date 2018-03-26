
-- Table structure for table 'user'
--
DROP TABLE IF EXISTS 'user';
CREATE TABLE 'user' (
  'uid' int(11) NOT NULL AUTO_INCREMENT,
  'userName' varchar(45) NOT Null,
  'passWord' varchar(45) NOT Null,
  'email'    varchar(45) NOT Null,
  'balance'  decimal(10,12) NOT Null check (balance>=0),
  'photoUrl' varchar(128),
  'seller' Boolean,
  PRIMARY KEY ('uid')
);

DROP TABLE IF EXISTS 'shop';
CREATE TABLE 'seller' (
  'shopId' int(11) NOT NULL AUTO_INCREMENT,
  'uid' int(11) NOT NULL,
  'productNum' int(11) NOT NULL unsigned Default '0',
  'sellBalance' decimal(10,12) NOT Null check (sellBalance>=0),
  PRIMARY KEY ('shopId'),
  FOREIGN KEY ('uid') references 'user'('uid')
);


-- Table structure for table 'product'
-- 
DROP TABLE IF EXISTS 'product';
CREATE TABLE 'product' (
  'pid' int(11) NOT NULL AUTO_INCREMENT,
  'uid' int(11) NOT NULL,
  'shopId' int(11) NOT NULL,
  'productName' varchar(45) NOT Null,
  'productInfo' varchar(256) NOT Null,
  'price'    decimal(10,12) NOT Null check (price>0),
  'store_count' int(11) unsigned Default '10',
  'sold_count' int(11) unsigned Default '0',
  'imageUrl' varchar(128), unsigned Default 'https://www.poansw.com.au/wp-content/uploads/2016/05/square-250-250.gif',
  PRIMARY KEY ('pid'),
  FOREIGN KEY ('shopId') references 'shop'(shopId),
  FOREIGN KEY ('uid') references 'user'('uid')
);

-- Table structure for table `cart`
--
DROP TABLE IF EXISTS 'cart';
CREATE TABLE 'cart' (
  'cartId' int(11） NOT NULL AUTO_INCREMENT,
  'uid' int(11) NOT NULL, 
  'pid' int(11) NOT NULL AUTO_INCREMENT,
  'count' int(11) DEFAULT NULL,
  'added' timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  'removed' timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY ('cartId'),
  FOREIGN KEY ('uid') references 'user'('uid'),
  FOREIGN KEY ('pid') references 'product'('pid'),
);