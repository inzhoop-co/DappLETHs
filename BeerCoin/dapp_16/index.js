var dappleth = (function(){ 
	var GUID;
	var dappContract;
	var btnLeft;
	var btnRight;
	var btnCenter;


	 function init(id,ABI,Address){
		console.log("init " + id);
		GUID=id;    
		dappContract=web3.eth.contract(ABI).at(Address);;    

		btnRight = angular.element(document.querySelector('#rightButton'));
		btnLeft = angular.element(document.querySelector('#leftButton'));
		btnCenter = angular.element(document.querySelector('#centerButton'));
		
	}

	function setup(){
		btnLeft.html(' Check');
		btnLeft.attr('class','button button-smal button-icon icon ion-ios-camera');
		btnLeft.attr('onclick','dappleth.check()');

		btnCenter.html(' Debtors');
        btnCenter.attr('class','button button-smal button-icon icon ion-ios-people');
		btnCenter.attr('onclick','dappleth.listDebtors()');
		
		btnRight.html(' Owe');
        btnRight.attr('class','button button-smal button-icon icon ion-ios-play');
		btnRight.attr('onclick','dappleth.owe()');

	}

	function update(){
		apiUI.loadFade("loading...",500);
		
		angular.element(document.querySelector('#totSupply')).html(dappContract.totalSupply().toNumber());
		angular.element(document.querySelector('#totDebt')).html(dappContract.totalDebt().toNumber());
		angular.element(document.querySelector('#balance')).html(dappContract.balanceOf(apiApp.account()).toNumber());
		angular.element(document.querySelector('#numDebtors')).html(dappContract.numDebtors(apiApp.account()).toNumber());

	}

 	function listener(){
        //event listner
        eTransfer = dappContract.Transfer().watch(function (error, result) {
            var from = result.args.from;
            var to = result.args.to;
            var val = result.args.value;
         	constant.log(result);
        });

		eApproval = dappContract.Approval().watch(function (error, result) {
            var owner = result.args.owner;
            var spender = result.args.spender;
            var val = result.args.value;
         	constant.log(result);
        });

    }

	function destroy(){
		console.log("destroy");
		eTransfer.stopWatching();
		eApproval.stopWatching();
		dappContract={};
	}

	function run(id,ABI,Address){
        init(id,ABI,Address);
		setup();
		listener();
		update();
	}

	function sendError(fromAddr, msg){
		var mres = {
			from: fromAddr,
		    text: msg + "!",
		    date: new Date()
		};

	  	apiChat.sendDappMessage(mres, GUID); 
	  	update();
	}

	function sendMessage(fromAddr, msg){
		var mres = {
			from: fromAddr,
		    text: msg ,
		    date: new Date()
		};

	  	apiChat.sendDappMessage(mres, GUID); 
	  	update();
	}

	function check(){
		apiUI.scanQR().then(function(res){
			if(res){
				var addr = res.split('#')[0];
				var bal = dappContract.balanceOf(addr).toNumber();
				sendMessage(dappContract.address,"Address scanned <b>" + addr + "</b>");
				sendMessage(addr,"My balance is " + bal);
			}

		});   
	}

	function listDebtors(){
		var debtors = dappContract.debtors(apiApp.account());
		if(debtors.length)
			sendMessage(dappContract.address,debtors.length + " friends owe you a beer, right?");
		else
			sendMessage(dappContract.address,"No beer for you!");

		angular.forEach(debtors, function(value, key) {
            sendMessage(value,"I owe you a beer!");
        });
	}

	function transferCoin(contract, nameSend, from, to, amount){
        var fromAddr = from;
        var toAddr = to;
        var functionName = nameSend;
        var args = JSON.parse('[]');
        var gasPrice = web3.eth.gasPrice;
        var estimateGas = web3.eth.estimateGas({from: fromAddr, gasPrice: gasPrice, gas: gas});
        var gas = 3000000; 
        try {
          args.push(toAddr,amount,{from: fromAddr, gasPrice: gasPrice, gas: gas});
          var callback = function (err, hash) {
			if(!err)
				sendMessage(apiApp.account(), "I owe you a beer!");
          }
          args.push(callback);
          contract[functionName].apply(this, args);
        } catch (e) {
            sendError(dappContract.address,e);
        }
	}

	function owe() {
		apiUI.scanQR().then(function(res){
			if(res){
				var OweTo = res.split('#')[0];
				transferCoin(dappContract, "transfer", apiApp.account(), OweTo, 1);
			}
		});
    }

	return {
	    update: update,
	    destroy: destroy,
	    run: run,
	    check: check,
	    owe: owe,
	    listDebtors: listDebtors
	};

})();
