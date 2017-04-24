var dappleth = (function(){ 
	var GUID;
	var dappContract;
	var btnLeft;
	var btnRight;
	var btnCenter;
	var keystore;
	var redeemAddr;

	 function init(id,ABI,Address){
		console.log("init " + id);
		GUID=id;    
		dappContract=Address;    
		btnRight = angular.element(document.querySelector('#rightButton'));
		btnLeft = angular.element(document.querySelector('#leftButton'));
		btnCenter = angular.element(document.querySelector('#centerButton'));
	}

	function setup(){
		console.log("setup");
		btnRight.html(' Redeem');
		btnRight.attr('class','button button-smal button-icon icon ion-play');
		btnRight.attr('onclick','dappleth.redeem()');

		btnLeft.html(' Create');
		btnLeft.attr('class','button button-smal button-icon');
		btnLeft.attr('onclick','dappleth.create()');

	}

	function update(){
		console.log("update");
		apiUI.loadFade("loading...",500);
	}

	function destroy(){
		console.log("destroy");
		dappContract={};
	}

	function run(id,ABI,Address){
        init(id,ABI,Address);
		setup();
		update();
	}

	window.passwordProvider = function (callback) {
	    var pw = "password";
	    callback(null, pw);
	};

	function create(){
		var seed = angular.element(document.querySelector('#mnemonic'))[0].value;

		console.log("create");
		if(!lightwallet.keystore.isSeedValid(seed)){
			console.log("invalid seed");

			var m1 = {
				from: dappContract.address,
		    	text: "Invalid seed!",
		    	date: new Date()
			};

    	  	apiChat.sendDappMessage(m1, GUID); 
	    }else{

			var opts={
			  password: "password",
	          seedPhrase: seed,
	          hdPathString: hdPath2
	        }

		    lightwallet.keystore.createVault(opts, function (err, ks) {
    		    ks.keyFromPassword("password", function (err, pwDerivedKey) {
	          		if (err) throw err;
	          		ks.generateNewAddress(pwDerivedKey, 1);

					ks.passwordProvider = passwordProvider;

	    	      	keystore = ks;
	    	      	
	    	      	redeemAddr = keystore.getAddresses()[0];
	    	      	redeemBal = web3.eth.getBalance(redeemAddr);

					var m2 = {
						from: redeemAddr,
					    text: "my balance is " + parseFloat(web3.fromWei(redeemBal)).toFixed(6) + " eth ",
					    date: new Date()
					};

			      	apiChat.sendDappMessage(m2, GUID);  
			      	update();
      			});
	  		});
		}
	}

	function redeem(){
		console.log("redeem");
		fee=1060020000000000;
		var from = redeemAddr;
		var to = apiApp.account();
		var gas = web3.eth.estimateGas({}); //to fix server side for totalAmount
      	var price = web3.eth.gasPrice;
		var amount = redeemBal - (gas*price) - fee;
		apiApp.setWeb3Provider(keystore);
        apiApp.transferEth(from, to, amount, fee).then(
          function (result) {
          	if(!result[0]){ //to remove after a fix server side
	          	var mres = {
					from: apiApp.account(),
				    text: "Thanks for charging eth " +  parseFloat(web3.fromWei(redeemBal)).toFixed(6),
				    date: new Date()
				};

		      	apiChat.sendDappMessage(mres, GUID); 
				apiApp.setWeb3Provider(global_keystore);
		      	update();          		
          	}else{
	          	var merr = {
					from: apiApp.account(),
				    text: "Error: " +  result[0],
				    date: new Date()
				};

		      	apiChat.sendDappMessage(merr, GUID); 
				apiApp.setWeb3Provider(global_keystore);
		      	update(); 

          	}
		  },
          function (err) {
          	var merr = {
				from: apiApp.account(),
			    text: "Error: " +  err,
			    date: new Date()
			};

	      	apiChat.sendDappMessage(merr, GUID); 
			apiApp.setWeb3Provider(global_keystore);
	      	update(); 
        });

		var m1 = {
			from: apiApp.account(),
		    text: "Recharging from " +  redeemAddr + "...",
		    date: new Date()
		};

      	apiChat.sendDappMessage(m1, GUID);  

		update();
	}

	return {
	    update: update,
	    run: run,
	    destroy: destroy,
	    redeem: redeem,
	    create: create

	};

})();
