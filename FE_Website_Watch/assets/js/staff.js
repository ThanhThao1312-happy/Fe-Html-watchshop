
// staff click van chuyen -> giao hang thanh cong
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}   
function ready(){
    var btn_next = document.getElementsByClassName('btn_next');
    for(var i = 0; i < btn_next.length; i++){
        btn_next[i].addEventListener('click', next);   
    }
}
function next(){
    if (two.className === "progress two active" && three.className !== "progress three active"){
        three.classList.add("active");
    }else{
        four.classList.add("active");
    }
}