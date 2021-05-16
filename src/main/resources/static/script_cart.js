function updateContentBlockMargin(){
  document.getElementById("cart-content").style.marginTop = 
  document.getElementById("static-block").offsetHeight+"px";
}
updateContentBlockMargin();

window.addEventListener('resize', function(event){
  updateContentBlockMargin();
});

