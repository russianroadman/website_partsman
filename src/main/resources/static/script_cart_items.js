var cart = [];
updateCounter();
updateVisibleCart();
document.getElementById("cart-send-request").disabled = true;
document.getElementById("modal-request-button-ok").disabled = true;

function addItemToCart(serial, price, name, qtty){
	for (var i = 0; i<cart.length; i++){
		if (cart[i][0] == serial){
			cart[i][3] = parseInt(cart[i][3]) + parseInt(qtty);
			writeCartToCookie();
			return;
		}
	}
	var x = [serial, price, name, qtty];
	cart.push(x);
	writeCartToCookie();
}
function removeItemFromCart(serial){
	cart.slice(cart.indexOf(serial), 1);
}

function writeCartToCookie(){
	deleteAllCookies();
	for (var i = 0; i < cart.length; i++){
		document.cookie = "serial" + i + "=" + cart[i][0] + "; " + "max-age=" + 60*60*24*7;
		document.cookie = "price" + i + "=" + cart[i][1] + "; " + "max-age=" + 60*60*24*7;
		document.cookie = "name" + i + "=" + cart[i][2] + "; " + "max-age=" + 60*60*24*7;
		document.cookie = "qtty" + i + "=" + cart[i][3] + "; " + "max-age=" + 60*60*24*7;
	}
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function readCartFromCookie(){
	if (getCookie("serial0") != ""){
		cart = [];
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length/4; i++){
			var serial = cookies[i*4].split("=")[1];
			var price = cookies[i*4+1].split("=")[1];
			var name = cookies[i*4+2].split("=")[1];
			var qtty = cookies[i*4+3].split("=")[1];
			addItemToCart(serial, price, name, qtty);
		}
	}	
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function updateVisibleCart(){
	readCartFromCookie();
	var newHTML = "";
	for (i = 0; i < cart.length; i++){
		newHTML += '<div class="cart-item" id="'+ cart[i][0] +'"><input type="text" name="serial" style="visibility:hidden;position:absolute;" value="'+cart[i][0]+'"><input name="price" type="text" style="visibility:hidden;position:absolute;" value="'+cart[i][1]+'"><input name="name" type="text" style="visibility:hidden;position:absolute;" value="'+cart[i][2]+'"><input name="qtty" type="text" style="visibility:hidden;position:absolute;" value="'+cart[i][3]+'"><div class="cart-item-content"><img class="cart-item-content-picture" src="https://carnovato.ru/wp-content/uploads/2014/06/kolenval-kolenchatyj-val-dvigatel-ustrojstvo-1.jpg"/><div class="cart-item-content-info"><div class="cart-item-content-info-upper"><p>'+ cart[i][0] +' - '+ cart[i][2] +'</p></div><div class="cart-item-content-info-lower"><div class="cart-item-content-info-lower-text">' + cart[i][1] +'</div></div></div></div><div class="cart-item-button-wrapper"><div class="cart-item-picture-button-block"><button class="item-picture-button-block-minus" onclick="cartMinus('+ "'" + cart[i][0] + "'" +')"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" icon="minus"><path d="M9 4v1H0V4z"></path></svg></button><input class="item-picture-button-block-input" value="'+ cart[i][3] +'"><button class="item-picture-button-block-plus" onclick="cartPlus('+ "'" + cart[i][0] + "'" +')"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" icon="plus"><path d="M9 4H5V0H4v4H0v1h4v4h1V5h4z"></path></svg></button></div></div></div>';
	}
	document.getElementsByClassName("cart-content-left-column")[0].innerHTML = newHTML;
	setZeroesRed();
	changePriceTotal();
	setListenerToAllCartInputs();
}

function setZeroesRed(){
	var elements = document.getElementsByClassName("cart-item");
	for (var i = 0; i < elements.length; i++){
		if (elements[i].getElementsByClassName("item-picture-button-block-input")[0].value == "0"){
			elements[i].getElementsByClassName("cart-item-content")[0].style = "opacity: 0.3;";
			elements[i].style = "background: rgba(255,255,255,0.3); border: 1px solid rgba(0,0,0,0.3);";	
		}else{
			elements[i].style = "background: white;";
		}
	}
}

function calculateSum(){
	var sum = 0;
	var elements = document.getElementsByClassName("cart-item");
	for (var i = 0; i < elements.length; i++){
		var price = elements[i].getElementsByClassName("cart-item-content-info-lower-text")[0].innerHTML;
		var qtty = elements[i].getElementsByClassName("item-picture-button-block-input")[0].value;
		var res = parseInt(price.replace(/\D/g, ""))*parseInt(qtty);
		sum += parseInt(res);
	}
	return sum;
}

/********************************************************************/
/******************************** INDEX *****************************/
/********************************************************************/

function setListenerToAllInputs(){
	var items = document.getElementsByClassName("item");
	for (i = 0; i < items.length; i++){
		input = items[i].getElementsByClassName("item-picture-button-block-input")[0];
		input.addEventListener('change', updateCartCounterValueFromListener);
	}
}
setListenerToAllInputs();

function itemPreviewCloseButton(){ 
	document.getElementById("item-preview").style.visibility = "hidden";
	document.getElementsByClassName("item-preview-addtocart")[0].style.visibility = "hidden";
	document.getElementById("preview-input").value = 0;
}

function itemPictureView(item_id){
	var preview = document.getElementById("item-preview");
	var item = document.getElementById(item_id);
	var name = item.getElementsByClassName("item-info-upper-title")[0].innerHTML;
	var qtty = item.getElementsByClassName("item-info-lower-qtty")[0].innerHTML;
	var price = item.getElementsByClassName("item-info-upper-price")[0].innerHTML;
	var description = item.getElementsByClassName("item-description")[0].innerHTML;
	var html = '<button onclick="itemPreviewCloseButton()" id="item-preview-close">X</button><div class="item-preview-upper"><div class="item-preview-upper-picture"><div class="item-preview-upper-info-right-4"><div class="item-preview-addtocart">Добавить в корзину<button id="item-preview-addtocart" class="invisible-link-button" onclick="addToCartPreview(' + item_id + ')"></button></div><div class="item-preview-button-block"><button class="item-picture-button-block-minus" id="preview-button-minus" onclick="previewMinus()"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" icon="minus"><path d="M9 4v1H0V4z"></path></svg></button><input class="item-preview-button-block-input" value="0" id="preview-input"><button class="item-picture-button-block-plus" id="preview-button-plus" onclick="previewPlus()"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" icon="plus"><path d="M9 4H5V0H4v4H0v1h4v4h1V5h4z"></path></svg></button></div></div><img class="item-image" src="https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"></div><div class="item-preview-upper-info"><div class="item-preview-upper-info-wrapper"><div class="item-preview-upper-info-left-1">Серийный номер</div><div class="item-preview-upper-info-right-1">' + item_id + '</div></div><div class="item-preview-upper-info-wrapper"><div class="item-preview-upper-info-left-2">Наименование</div><div class="item-preview-upper-info-right-2">' + name + '</div></div><div class="item-preview-upper-info-wrapper"><div class="item-preview-upper-info-left-3">На складе</div><div class="item-preview-upper-info-right-3">' + qtty + '</div></div><div class="item-preview-upper-info-left-4">' + price + '</div></div></div><div class="item-preview-lower">' + description + '</div>';
	preview.innerHTML = html;
	preview.style.visibility = "visible";
	document.getElementById("preview-input").addEventListener('change', updateCartCounterValuePreview);
}

//                                   item

function updateCartCounterValueFromListener(){
	item_id = this.parentNode.parentNode.parentNode.id;
	updateCartCounterValue(item_id);
}

function updateCartCounterValue(item_id){
	var item = document.getElementById(item_id);
	var input = item.getElementsByClassName("item-picture-button-block-input")[0];
	if (parseInt(input.value) == 0){
		item.getElementsByClassName("item-picture-addtocart")[0].style.visibility = "hidden";
	} else if (parseInt(input.value) < 0){
		input.value = "0";
	} else {
		item.getElementsByClassName("item-picture-addtocart")[0].style.visibility = "visible";
	}
}
function addToCart(item_id){
	addItemFromGridToCart(item_id);
	var item = document.getElementById(item_id);
	var input = item.getElementsByClassName("item-picture-button-block-input")[0];
	input.value = "0";
	item.getElementsByClassName("item-picture-addtocart")[0].style.visibility = "hidden";
	updateCounter();
}
function updateCounter(){
	try{
		var count = Math.floor( ((document.cookie.split(";")).length) / 4 );
		var cart = document.getElementsByClassName("cart-counter")[0];
		cart.innerHTML = count;
	} catch(e){}	
}
function itemPlus(item_id){
	var item = document.getElementById(item_id);
	var input = item.getElementsByClassName("item-picture-button-block-input")[0];
	input.value = parseInt(input.value) + 1;
	updateCartCounterValue(item_id);
}
function itemMinus(item_id){
	var item = document.getElementById(item_id);
	var input = item.getElementsByClassName("item-picture-button-block-input")[0];
	input.value = parseInt(input.value) - 1;
	updateCartCounterValue(item_id);
}

function addItemFromGridToCart(item_id){
	var item = document.getElementById(item_id);
	var serial = item.getElementsByClassName("item-info-lower-id")[0].innerHTML;
	var price = item.getElementsByClassName("item-info-upper-price")[0].innerHTML;
	var name = item.getElementsByClassName("item-info-upper-title")[0].innerHTML;
	var qtty = item.getElementsByClassName("item-picture-button-block-input")[0].value;
	readCartFromCookie();
	addItemToCart(serial, price, name, qtty);
}

//                                   preview

function updateCartCounterValuePreview(){
	var input = document.getElementById("preview-input");
	if (parseInt(input.value) == 0){
		document.getElementsByClassName("item-preview-addtocart")[0].style.visibility = "hidden";
	} else if (parseInt(input.value) < 0){
		input.value = "0";
	} else {
		document.getElementsByClassName("item-preview-addtocart")[0].style.visibility = "visible";
	}
}
function addToCartPreview(){
	var input = document.getElementById("preview-input");
	updateCartCounterValuePreview();
	document.getElementsByClassName("item-preview-addtocart")[0].style.visibility = "hidden";
	var preview = document.getElementById("item-preview");
	var serial = preview.getElementsByClassName("item-preview-upper-info-right-1")[0].innerHTML;
	var price = preview.getElementsByClassName("item-preview-upper-info-left-4")[0].innerHTML;
	var name = preview.getElementsByClassName("item-preview-upper-info-right-2")[0].innerHTML;
	var qtty = preview.getElementsByClassName("item-preview-button-block-input")[0].value;
	readCartFromCookie();
	addItemToCart(serial, price, name, qtty);
	updateCounter();
	input.value = "0";
}
function previewPlus(){
	var input = document.getElementById("preview-input");
	input.value = parseInt(input.value) + 1;
	updateCartCounterValuePreview();
}
function previewMinus(){
	var input = document.getElementById("preview-input");
	input.value = parseInt(input.value) - 1;
	updateCartCounterValuePreview();
}

/********************************************************************/
/******************************* CART *******************************/
/********************************************************************/

function changePriceTotal(){
	document.getElementsByClassName("top")[0].innerHTML = "₽"+calculateSum();
}

function cartPlus(item_id){
	addItemToCart(item_id, "", "", 1);
	updateVisibleCart();
	setButtonColor();
}

function cartMinus(item_id){
	var item = document.getElementById(item_id);
	var input = item.getElementsByClassName("item-picture-button-block-input")[0];
	if (parseInt(input.value) > 0){
		addItemToCart(item_id, "", "", -1);
		updateVisibleCart();
	} 	
	setButtonColor();
}

function setListenerToAllCartInputs(){
	var items = document.getElementsByClassName("cart-item");
	for (i = 0; i < items.length; i++){
		input = items[i].getElementsByClassName("item-picture-button-block-input")[0];
		input.addEventListener('change', cartInputChanged);
	}
}
window.onload = function() {
  setListenerToAllCartInputs();
};

function cartInputChanged(){
	changePriceTotal();
	setZeroesRed();
	var id = this.parentNode.parentNode.parentNode.id;
	for (var i = 0; i < cart.length; i++){
		if (cart[i][0] == id){
			var value = parseInt(this.value) - parseInt(cart[i][3]);
			addItemToCart(id, "", "", value);
			return;
		}
	}
	setButtonColor();
}

/******************************************** */
/******************************************** */
/******************************************** */

function initCartRequest(){
    submitPage();
    return false;
}

function submitPage(){
    document.getElementById("modal-request").style.visibility = "hidden";
    document.getElementById("page-form").submit();
    return false;
}

function addListenerToSubmitInputs(){
	var inputs = document.getElementsByClassName("middle-upper-field-input");
	for (var i=0;i<inputs.length;i++){
		inputs[i].addEventListener('change', function(event){
			setButtonColor();
		});
	}
	document.getElementsByClassName("middle-lower-delivery-option")[0].addEventListener('change', function(event){
		setButtonColor();
	});
	document.getElementsByClassName("middle-lower-delivery-option")[1].addEventListener('change', function(event){
		setButtonColor();
	});
	document.getElementsByClassName("middle-lower-agreement-option")[0].addEventListener('change', function(event){
		setButtonColor();
	});
}
try{
	addListenerToSubmitInputs();
} catch (e){

}


function setButtonColor(){
	if (
		!(document.getElementById("cart-input-lastname").value.length < 1 ||
		document.getElementById("cart-input-firstname").value.length < 1 ||
		document.getElementById("cart-input-middlename").value.length < 1 ||
		document.getElementById("cart-input-phone").value.length < 6 ||
		(
			document.getElementById("delivery").checked == false &&
		    document.getElementById("pickup").checked == false
		) || 
		document.getElementById("agreement").checked == false || 
		!checkCartNotEmpty())
	){
		document.getElementsByClassName("bottom")[0].style = "background:#82DB8A";
		document.getElementById("cart-send-request").disabled = false;
		document.getElementById("modal-request-button-ok").disabled = false;
	} else {
		document.getElementsByClassName("bottom")[0].style = "background:grey";
		document.getElementById("cart-send-request").disabled = true;
		document.getElementById("modal-request-button-ok").disabled = true;
	}
}

function checkForm(){
	if (
		document.getElementById("cart-input-lastname").value.length < 1 ||
		document.getElementById("cart-input-firstname").value.length < 1 ||
		document.getElementById("cart-input-middlename").value.length < 1 ||
		document.getElementById("cart-input-phone").value.length < 6 ||
		(
			document.getElementById("delivery").checked == false &&
		    document.getElementById("pickup").checked == false
		) || 
		document.getElementById("agreement").checked == false
	){
		return false;
	}
	return true;
}

function checkCartNotEmpty(){
	var inputs = document.getElementsByClassName("item-picture-button-block-input");
	if (inputs.length == 0){
		return false;
	}
	var sum = 0;
	for (var i=0;i<inputs.length;i++){
		sum += inputs[i].value;
	}
	if (sum == 0){
		return false;
	}
	return true;
}

function cartSendRequest(){
	if (checkForm() && checkCartNotEmpty()){
		document.getElementById("modal-request").style.visibility = "visible";
	}	
}

function closeCartRequest(){
	document.getElementById("modal-request").style.visibility = "hidden";
}