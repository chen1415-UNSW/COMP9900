# Block Business

Yihan Xiao:   z5099956@ad.unsw.edu.au  
Li Yu:        z3492782@ad.unsw.edu.au  
Chenwei Qian: z5107753@ad.unsw.edu.au  
Hao Chen:     z5102446@ad.unsw.edu.au

Final Demo accomplished. Well done!
![front page](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/FrontPage.png?raw=true){:height="50%" width="50%"}

## Initialization:
The project is based on Node.js, which requires NPM environment to install all needed package. Start terminal at the root directory.   
Run:

``` command
npm install
```

	
This will install all packages the project needs according to the package.json file in root path.

Install Webpack, which is used to pack all files related to block-chain.
You may need to run the following commands:  
Run:

``` command
npm install -g webpack
npm install -g webpack-cli
```

Install TestRPC(Ganache). Download and install following the link:  
http://truffleframework.com/ganache  

Start Ganache and you will see the interface:

![interface of Ganache](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/interface%20of%20Ganache.png?raw=true)

Click on the configure icon at the top-right, next to the search bar. Then fill in all information of **SERVER** page as below. The Port Number is extremely important, and make sure it is set to **8545** otherwise the webpage will fail to connect.

![Ganache config](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/Ganache%20config.png?raw=true)

Click on **ACCOUNT&KEYS** next to **SERVER** and you shall see a page as below. Copy the keys from **address_keys.txt** in the root path or below and paste in the keys field here. The addresses generated by Ganache are different on different PC and this will cause problem that the address assigned to user may conflict with each other. We use the identical key to ensure the consistency of address pool. Set the total number of address to **50**.  
**Keys:**

``` txt
snack aim path industry cabbage knife ball select meadow oppose wrist vote
```

![keys](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/Ganache%20Key.png?raw=true)

Finally, click **RESTART** at top-right to restart Ganache.

## Buildup Smart Contract

You can now begin to build the project. Start the terminal from root and run:

``` command 
truffle develop
```

You should be able to see the following message:  

![truffle](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/truffle.png?raw=true)

Next Run: 

``` truffle
compile --reset
```
![compile contract](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/compile%20Solidity.png?raw=true)

This will make truffle to compile all Solidity code in Contract directory. When it is done, a new directory named **build/contracts** will be generated in root path. All compiled contracts will be placed here in **.json** format.

Next Run: 

``` truffle
migrate --network development --reset
```
![migrate](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/migrate.png?raw=true)  

This will migrate the smart contract defined in Solidity onto Ganache. 
You shall see the details showing the deployment of smart contract on Ganache from the interface of Ganache in the Transaction page:

![deploy](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/Deploy.png?raw=true)

At last, run:

``` truffle
.exit
```

You will exit from truffle command-line and back to the root path.

## Package files with Webpack

After all steps above, the smart contract is ready to use and we need to include them into a Javascript module for webpage to use.
Run:

``` command
npm run build
```
![webpack](https://github.com/Yikhan/ImageHost/blob/master/Block%20Business/webpack_.png?raw=true)

## Start Website

Run:

``` command
npm start
```

 Go to **http://localhost:3000** with browser and you shall see the front page of the project.
