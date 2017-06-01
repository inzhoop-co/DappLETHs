var dappleth = (function(){ 
	var GUID;
	var dappContract;
	var btnLeft;
	var btnRight;
	var btnCenter;

	 function init(id,ABI,Address){
		console.log("init " + id);
		GUID=id;    
		dappContract=apiENS.address;    

		btnRight = angular.element(document.querySelector('#rightButton'));
		btnLeft = angular.element(document.querySelector('#leftButton'));
		btnCenter = angular.element(document.querySelector('#centerButton'));

	}

	function setup(){
		console.log("setup");

		if(apiENS.suffix=="test"){
			btnLeft.html(' Register');
			btnLeft.attr('class','button button-smal button-icon icon ion-ios-compose');
			btnLeft.attr('onclick','dappleth.testRegistrar()');			
		}

		btnCenter.html(' Owner');
		btnCenter.attr('class','button button-smal button-icon icon ion-ios-refresh');
		btnCenter.attr('onclick','dappleth.getOwner()');

		btnRight.html(' Address');
		btnRight.attr('class','button button-smal button-icon icon ion-ios-refresh');
		btnRight.attr('onclick','dappleth.getAddr()');

	  	angular.element(document.querySelector('#address')).html(apiApp.account()) ;
	  	angular.element(document.querySelector('#suffix')).html(apiENS.suffix) ;

	  	sendMessage(dappContract,"hi there &#x1F44B; enjoy the ENS!");

	}

	function update(){
		console.log("update");
		apiUI.loadFade("loading...",100);
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

	function sendError(fromAddr, msg){
		var mres = {
			from: fromAddr,
		    text: " &#x1F6D1; " + msg,
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

	function testRegistrar() {
	  	var name = angular.element(document.querySelector('#domain'))[0].value ;
	  	var domain = name +  "." + apiENS.suffix;
		apiUI.popupConfirm("Register name","Are you sure you want to register <br/><b>" + domain +"</b>?").then(function(res){
			apiENS.registrarTest(name, apiApp.account()).then(function(res){
				apiENS.setResolver(domain).then(function(res){
					apiENS.setAddress(domain,apiApp.account()).then(function(res){
						sendMessage(apiENS.address, "Registration " + domain +  " in progress... &#x2705;");
					}, function(err){console.log(err)});
				}, function(err){console.log(err)});
			}, function(err){console.log(err)});					
		});
	}

	function getAddr() {
	  var name = angular.element(document.querySelector('#domain'))[0].value + "." + apiENS.suffix;
	  var result = apiENS.getAddress(name);
	  if(result=="not found") sendError(apiENS.address, "Not found &#x1F644;" )
	  else sendMessage(apiENS.address, "That's the address </br>" + "<b>" + result + "</b>");
	}

	function getOwner() {
	  var name = angular.element(document.querySelector('#domain'))[0].value + "." + apiENS.suffix;
	  var owner = apiENS.getOwner(name);
	  if(owner == "Not found")
	      sendError(apiENS.address, "Not found &#x1F644;");
	  else
      	  sendMessage(owner, name + " is mine &#x2705;");

	}

	return {
	    update: update,
	    run: run,
	    destroy: destroy,
	    getAddr: getAddr,
	    testRegistrar: testRegistrar,
	    getOwner: getOwner
	};

})();
