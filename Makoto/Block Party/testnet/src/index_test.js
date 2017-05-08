var dappleth = (function(){
	var GUID;
	var dappContract;
	var btnRight;
	var btnLeft;
	var btnCenter;
	var btnReg;
	var btnWithdraw;
	var confAddr;
	var eRegister;
	var eAttend;
	var ePayback;
	var deposit;

	 function init(id,ABI,Address){
		console.log("init " + id);
		GUID=id;
        dappContract = web3.eth.contract(ABI).at(Address);

		confAddr = "0x191f7408bc1232937126bd54486ec4187daeacd6" ;
		deposit = 1000000000000000000;

		btnCenter = angular.element(document.querySelector('#centerButton'));
		btnRight = angular.element(document.querySelector('#rightButton'));
		btnLeft = angular.element(document.querySelector('#leftButton'));
		btnReg = angular.element(document.querySelector('#registerButton'));
	}

	function setup(){
		console.log("setup");

		btnCenter.html(' list');
        btnCenter.attr('class','button button-smal button-icon icon ion-ios-refresh');
		btnCenter.attr('onclick','dappleth.list()');

		btnLeft.html(' check');
        btnLeft.attr('class','button button-smal button-icon icon ion-ios-camera-outline');
        btnLeft.attr('onclick','dappleth.check()');

		btnRight.html(' attend');
        btnRight.attr('class','button button-smal button-icon icon ion-ios-camera-outline');
        btnRight.attr('onclick','dappleth.attend()');
        btnRight.attr('style','visibility:hidden');

		btnReg.attr('onclick','dappleth.register()');
	}

	function update(){
		console.log("update");
		apiUI.loadFade("loading...",500);
		var addr = apiApp.account();
		var isRegistered = dappContract.isRegistered(addr);
		var isAttended = dappContract.isAttended(addr);
		var isPaid = dappContract.isPaid(addr);
		var payout = dappContract.participants(addr)[3].toNumber();
		var name = dappContract.name();
		
		angular.element(document.querySelector('#event')).html(name);

		/*
		1. 'not registered' if isRegistered(address) == false
		2. 'registered' if isRegistered(address) == true && isAttended(address) == false
		3. 'attended' if isAttended(address) == true && participants[address].payout == 0 isPaid(address) == false
		4. 'won' if isAttended(address) == true && participants[address].payout > 0 isPaid(address) == false
		5. 'earned' if isPaid(address) == true
		*/


		var registerDOM = '<div class="item item-input-inset"><label class="item-input-wrapper"><input type="text" placeholder="invitation code" id="handleInvitationCode"></label></div><div class="item item-input-inset"><label class="item-input-wrapper"><input type="text" placeholder="@twitter_handle" id="handleName"></label><button class="button button-small button-balanced" id="registerButton">Register</button></div>';
		var myStatus;
		if(!isRegistered){
			myStatus = "not registered";
			//document.getElementById('handleTwitter').style='';
			angular.element(document.querySelector('#handleTwitter')).html(registerDOM);

		}

		if(isRegistered && !isAttended && payout == 0){
			myStatus="registered";
			//document.getElementById('handleTwitter').style='visibility:hidden';
			angular.element(document.querySelector('#handleTwitter')).html("");
	        btnRight.attr('style','visibility:visible');

		}

		if(isAttended && payout == 0 && !isPaid){
			myStatus="attended";
        	btnRight.attr('style','visibility:hidden');
		}

		if(isAttended && payout > 0 && !isPaid ){
			myStatus="won";
			document.getElementById('handleTwitter').style='visibility:hidden';
		}
		if(isPaid){
			myStatus="earned";
			document.getElementById('handleTwitter').style='visibility:hidden';
		}

		angular.element(document.querySelector('#Status')).html(myStatus);

	}

	function destroy(){
		console.log("destroy");
		dappContract={};
	}

	function listner(){
        //event listner
        eRegister = dappContract.RegisterEvent().watch(function (error, result) {
			if(!error){
				var addr = result.addr;
	            var user = result.participantName;
				sendMessage(addr,'Here I am, registered!');	            
	        }
        });

        eAttend = dappContract.AttendEvent().watch(function (error, result) {
			if(!error){
	            var addr = result.addr;
				sendMessage(addr,'New Attend!');
	        }
        });

        ePayback = dappContract.PaybackEvent().watch(function (error, result) {
			if(!error){            
	            var addr = result.addr;
				sendMessage(addr,'Payback ' + result._payout + '!');	            
	        }
        });
    }

	function run(id,ABI,Address){
        init(id,ABI,Address);
		setup();
		listner();
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

	function list(){
		sendMessage(apiApp.account(),"Who is registered?");

      	var count = dappContract.registered(); //
		sendMessage(dappContract.address,"Total registered <b># " + count + "</b>");

    	for(var i=1;i<=count;i++){
	      	var addr = dappContract.participantsIndex(i); //iterate for list
	      	var u = dappContract.participants(addr);

	      	var profile = "I'm registered as <b>" + u[0] + "</b>";
	      	if(u[2] && u[3]==0 && !u[4])
	      		profile +="<br/>I'm attended";
	      	if(u[2] && u[3]>0 && !u[4])
	      		profile +="<br/>I won";
	      	if(u[4])
	      		profile +="<br/>I earned " + parseFloat(u[3] / 1.0e+18).toFixed(2);

			sendMessage(addr,profile);
    	}

		update();
	}

	function register() {
		var name = angular.element(document.querySelector('#handleName'))[0].value;
		var invitation_code = angular.element(document.querySelector('#handleInvitationCode'))[0].value;
        var fromAddr = apiApp.account();
        var functionName = 'registerWithIntegration';
        var args = JSON.parse('[]');
        var value = deposit;
        var gasPrice = web3.eth.gasPrice; //50000000000;
        var gas = 300000;
        args.push(name, invitation_code, {from: fromAddr, to: confAddr, value: value, gasPrice: gasPrice, gas: gas});
        var callback = function (err, txhash) {
            if(err){
	            console.log('error: ' + err);

            	var mE = {
					from: dappContract.address,
			    	text: "Ops! <b>" + err + "</b>",
			    	date: new Date()
				};

	      		apiChat.sendDappMessage(mE, GUID);
            }

            console.log('txhash: ' + txhash);

            if(txhash!=undefined){
				sendMessage(dappContract.address,"sending tx " + txhash + "...");
            }
        }
        args.push(callback);
        dappContract['register'].apply(this, args);
        return true;
    }

    function check(){		
    	apiUI.scanQR().then(function(res){
    		var code = res.split('#')[0];
			sendMessage(dappContract.address,"looking for :<br/><b>" + code + "</b>");

			var count = dappContract.registered(); //
			var found=false;
	    	for(var i=1;i<=count;i++){
		      	var addr = dappContract.participantsIndex(i); //iterate for list
		      	if(code==addr){
		      		found=true;
			      	var u = dappContract.participants(addr);

			      	var profile = "User found: <b>" + u[0] + "</b>";
			      	if(u[2] && u[3]==0 && !u[4])
			      		profile +="<br/>He'is attended";
			      	if(u[2] && u[3]>0 && !u[4])
			      		profile +="<br/>He won";
			      	if(u[4])
			      		profile +="<br/>He earned " + parseFloat(u[3] / 1.0e+18).toFixed(2);

					sendMessage(dappContract.address,profile);
					return;
				}
	    	}
	    	if(!found)
				sendMessage(dappContract.address,"Sorry, not found!");

		});
    }

	function attend(){
    	apiUI.scanQR().then(function(res){
    		var code = res.split('#')[0];

			sendMessage(dappContract.address,"scanned :<br/><b>" + code + "</b>");
		});
    }

    function clean(){
		apiChat.clearDAPP();
    }

    function withdraw() {
        var fromAddr = apiApp.account();
        var functionName = 'withdraw';
        var args = JSON.parse('[]');
        var gasPrice = web3.eth.gasPrice; //50000000000;
        var gas = 300000;
        args.push({from: fromAddr, gasPrice: gasPrice, gas: gas});
        var callback = function (err, txhash) {
			if(err){
	            console.log('error: ' + err);
				sendMessage(dappContract.address,"Ops! <b>" + err + "</b>");
            }

            console.log('txhash: ' + txhash);

            if(txhash!="undefined"){
				sendMessage(dappContract.address,"sending tx " + txhash + "...");
            }
        }
        args.push(callback);
        dappContract['withdraw'].apply(this, args);
        return true;
    }

	return {
	    update: update,
	    run: run,
	    destroy: destroy,
	    list: list,
	    register: register,
	    attend: attend,
	    check: check,
	    clean: clean
	};

})();
