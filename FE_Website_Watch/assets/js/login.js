// ------LOGIN--------
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");
const btn__signUp = document.getElementById("btn__signUp");
registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// --------CHECK INPUT ---------- //
const txt_Error = document.getElementsByClassName("txt_error");

function validateUsername() {
  var username = document.getElementById("input__userName").value;
  var regex = /^[a-zA-Z0-9]{6,}$/;
  if (username == "") {
    btn__signUp.style.pointerEvents="none";
    return true;
  } else {
    if (!regex.test(username)) {
      if(username.length <= 5){
        txt_Error[0].innerHTML = "<i class='bx bx-error-circle'></i> Username phải có ít nhất 6 kí tự. <br> <i class='bx bx-error-circle'></i> Username không chứa kí tự đặc biệt.";
      }else{
        txt_Error[0].innerHTML = "<i class='bx bx-check-circle'></i> Username phải có ít nhất 6 kí tự. <br> <i class='bx bx-error-circle'></i> Username không chứa kí tự đặc biệt.";
      }
      btn__signUp.style.pointerEvents="none";
    }else if(username.length <= 5){
      if(regex.test(username)){
        txt_Error[0].innerHTML = "<i class='bx bx-error-circle'></i> Username phải có ít nhất 6 kí tự. <br> <i class='bx bx-check-circle'></i> Username không chứa kí tự đặc biệt.";
      }else{
        txt_Error[0].innerHTML = "<i class='bx bx-error-circle'></i> Username phải có ít nhất 6 kí tự. <br> <i class='bx bx-error-circle'></i> Username không chứa kí tự đặc biệt.";
      }
      btn__signUp.style.pointerEvents="none";
    }else{
      txt_Error[0].innerHTML ="<i class='bx bx-check-circle'></i>Tên đăng nhập hợp lệ";
    }
  }
}
function validatePass(){
  var password = document.getElementById("input__pass").value;
  // Biểu thức chính quy để kiểm tra độ dài và kí tự đặc biệt
  var regex = /^[a-zA-Z0-9_]{6,}$/;
  // Kiểm tra tên tài khoản
  if (regex.test(password)){
    txt_Error[1].innerHTML ="<i class='bx bx-check-circle'></i>Mật khẩu đăng nhập hợp lệ";
  }else if(password == ""){
    txt_Error[1].innerHTML ="";
    txt_Error[2].innerHTML ="";
    btn__signUp.style.pointerEvents="none";
  }
  else{
    txt_Error[1].innerHTML ="<i class='bx bx-error-circle'></i>Mật khẩu không hợp lệ";
    btn__signUp.style.pointerEvents="none";
  }
}
function validateRePass(){
  var rePassword = document.getElementById("input__rePass").value;
  var password = document.getElementById("input__pass").value;
  var regex = /^[a-zA-Z0-9_]{6,}$/;
  if(password !== rePassword){
    txt_Error[2].innerHTML ="<i class='bx bx-error-circle'></i>Xác nhận mật khẩu không đúng";
    btn__signUp.style.pointerEvents="none";
  }else{
    txt_Error[2].innerHTML ="<i class='bx bx-check-circle'></i>Xác nhận mật khẩu đúng";
    btn__signUp.style.pointerEvents="all";
  }
}
 // OTP
 var btn = document.getElementById('btn__signUp');
 btn.addEventListener('click',function(){
    document.getElementById("register-form").style.display = "none";
 })

