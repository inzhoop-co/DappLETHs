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
		console.log("setup");
		
		for (var i = 0; i < dappContract.abi.length; i++) {
            if(dappContract.abi[i].type=="function"){
	            if (dappContract.abi[i].constant==true) {
					console.log(dappContract.abi[i].name + " [read]");
	            }
	            if (dappContract.abi[i].constant==false) {
					console.log(dappContract.abi[i].name + " [write]");
	            }
            }

        }

		/*
		btnLeft.html(' Run');
		btnLeft.attr('class','button button-smal button-icon icon ion-play');
		btnLeft.attr('onclick','dappleth.run()');

		btnCenter.html(' Update');
		btnCenter.attr('class','button button-smal button-icon icon ion-play');
		btnCenter.attr('onclick','dappleth.update()');

		btnRight.html(' Run');
		btnRight.attr('class','button button-smal button-icon icon ion-play');
		btnRight.attr('onclick','dappleth.run()');
		*/

	}

	function update(){
		console.log("update");
		apiUI.loadFade("loading...",500);
		

		angular.element(document.querySelector('#totSupply')).html(dappContract.totalSupply().toNumber());
		angular.element(document.querySelector('#totDebt')).html(dappContract.totalDebt().toNumber());
		angular.element(document.querySelector('#balance')).html(dappContract.balanceOf(apiApp.account()).toNumber());
		angular.element(document.querySelector('#numDebtors')).html(dappContract.numDebtors().toNumber());

		console.log(dappContract.debtors(apiApp.account()));
		console.log(dappContract.accounts);

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


	return {
	    update: update,
	    destroy: destroy,
	    run: run
	};

})();
