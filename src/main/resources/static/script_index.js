updateContentBlockMargin();
updateItemHeight();

window.addEventListener('resize', function(event){
  updateContentBlockMargin();
  updateItemHeight();
});
function updateContentBlockMargin(){
  document.getElementById("content-block").style.marginTop = 
  document.getElementById("static-block").offsetHeight+"px";
}
function updateItemHeight(){
  var x = document.getElementsByClassName("item");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.height = x[i].offsetWidth+"px";
  }
}

function setListenerToSelect(){
	select = document.getElementById("type");
	select.addEventListener('change', selectTypeChanged);	
}
setListenerToSelect();
selectTypeChanged();

function selectTypeChanged(){
	var value = document.getElementById("type").value;
	var selectCategory = document.getElementById("category");
	var addition = '<option value="choose">Выберите...</option><option value="all">Все товары</option>';
	var html;
	if (value == "Запчасти"){
		html = addition + document.getElementById("select-parts-options").innerHTML;
	} else if (value == "Комплекты"){
		html = addition + document.getElementById("select-sets-options").innerHTML;
	} else if (value == "Жидкости"){
		html = addition + document.getElementById("select-liquids-options").innerHTML;
	} else {
		html = addition + document.getElementById("select-tools-options").innerHTML;
	}
	selectCategory.innerHTML = html;
}


/* **************** */


