function updateContentBlockMargin(){
  document.getElementById("content").style.marginTop = 
  document.getElementById("static-block").offsetHeight+"px";
}

updateContentBlockMargin();

window.addEventListener('resize', function(event){
  updateContentBlockMargin();
});