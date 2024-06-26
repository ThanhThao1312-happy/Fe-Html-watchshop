//ZOOM
let zoom = document.querySelector('.img-container');
let imgZoom = document.getElementById('imgZoom');
if(zoom){
    zoom.addEventListener('mousemove', (event)=>{
        imgZoom.style.opacity = 1;
        let positionPx = event.x - zoom.getBoundingClientRect().left;
        let positionX = (positionPx/zoom.offsetWidth) * 100;
    
        let positionPy = event.y - zoom.getBoundingClientRect().top;
        let positionY = (positionPy/zoom.offsetHeight) * 100;
    
        imgZoom.style.setProperty('--zoom-x', positionX + '%');
        imgZoom.style.setProperty('--zoom-y', positionY + '%');
    
        let transformX = -(positionX -50);
        let transformY = -(positionY -50);
        imgZoom.style.transform = `scale(1.5) translateX(${transformX}%) translateY(${transformY})%`;
    })
    zoom.addEventListener('mouseout', ()=>{
        imgZoom.style.opacity = 0;
    })
}
//

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}   
function ready(){
    var btn_remove = document.getElementsByClassName("cart__amount-trash");
    for (var i = 0; i < btn_remove.length; i++){
        var btn = btn_remove[i];
        btn.addEventListener("click", removeCartcard);
    }
    var quantityInput = document.getElementsByClassName('cart__amount-number');
    for (var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener("change", quantityChange);
    }   
    //
    var btnPlus = document.getElementsByClassName('plus');
    for (var i = 0; i < btnPlus.length; i++){
        var btn = btnPlus[i];
        btn.addEventListener("click", plusQuantity);
    } 
     
    var btnMinus = document.getElementsByClassName('minus');
    for (var i = 0; i < btnMinus.length; i++){
        var btn = btnMinus[i];
        btn.addEventListener("click", minusQuantity);
    }   
    //

    var check = document.getElementsByClassName('checkbox');
    for(var i = 0; i < check.length; i++){
        var checkbox = check[i];
        checkbox.addEventListener("click", quantityChange);
    }
    var btn_remove = document.getElementsByClassName("btn__xoa");
    for (var i = 0; i < btn_remove.length; i++){
        var btn = btn_remove[i];
        btn.addEventListener("click", removeAddress);
    }

    var radioClick = document.getElementsByClassName("radio");
    for (var i = 0; i < radioClick.length; i++){
        var btn = radioClick[i];
        btn.addEventListener("click", updateAddress);
    }
    // Add to cart in products
    var btnAddCart = document.getElementsByClassName('products__button');
    for(var i = 0; i < btnAddCart.length; i++){
        var btn = btnAddCart[i];
        btn.addEventListener('click', addCartClicked);
    }
    // Add to cart in dl
    var btnAddCart_dl = document.getElementsByClassName('add-cart-btn');
    for(var i = 0; i < btnAddCart_dl.length; i++){
        var btn = btnAddCart_dl[i];
        btn.addEventListener('click', addCartClicked_dl);
    }
    var ckb = document.getElementsByClassName('ckb_fillter');
    for(var i = 0; i < ckb.length; i++){
        var btn = ckb[i];
        btn.addEventListener('click', check_clicked);
    }
    // Change pass for user
    var btns_changepass = document.getElementsByClassName('btn__changePass');
    for (var i = 0; i < btns_changepass.length; i++){
        var btnClicked = btns_changepass[0];
        btnClicked.addEventListener('click', showFormChangePass);
    }
    // Staff delivery
    var btn_next = document.getElementsByClassName('btn_next');
    for(var i = 0; i < btn_next.length; i++){
        btn_next[i].addEventListener('click', next);   
    }

    var linkNhanDon = document.getElementsByClassName('btn_nhandon');
    for(var i = 0; i < linkNhanDon.length; i++){
        linkNhanDon[i].addEventListener('click', NhanDon);   
    }

    var btn_huy = document.getElementsByClassName('gh-tb');
    for(var i = 0; i < btn_huy.length; i++){
        btn_huy[i].addEventListener('click',  staff_HD);   
    }
   
    //REVIEW
    var link_review = document.querySelectorAll(".linkReview");
        for (var i = 0; i < link_review.length; i++){
            link_review[i].addEventListener('click',showReview);
    }
}
function removeCartcard(event){
    var btnClick = event.target;
    btnClick.parentElement.remove();
    updateTotal();
}

function updateTotal(){
        var cartContent = document.getElementsByClassName('cart__container')[0];
        var cartCard = cartContent.getElementsByClassName('cart__card');
        var totalItem = 0;
        var countCheck = 0;
        var countItems = 0;
        for (var i = 0; i < cartCard.length; i++){
            var cartBox = cartCard[i];
            var checkbox = cartBox.getElementsByClassName('checkbox')[0];
            if (checkbox.checked){
                var priceElement = cartBox.getElementsByClassName('cart__price')[0];
                var quantityElement = cartBox.getElementsByClassName('cart__amount-number')[0];
                var price = parseFloat(priceElement.innerText.replace("$", ""));
                var quantity = quantityElement.value;
                // var countItems = ;
                countItems = countItems + parseInt(quantity); 
                totalItem = totalItem + quantity * price;
                countCheck = countCheck + 1;
                document.getElementsByClassName('cart__prices-total')[0].innerText = '$' + totalItem;
                document.getElementsByClassName('cart__prices-item')[0].innerText = countItems +' items';
            }
        }
        if (countCheck == 0){
            totalItem = 0;
            countItems = 0;
            document.getElementsByClassName('cart__prices-total')[0].innerText = '$' + totalItem;
            document.getElementsByClassName('cart__prices-item')[0].innerText = countItems +' items';
        }
}

function quantityChange(input){
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;    
    }
    updateTotal();
}
//
function plusQuantity(event) {
    var btn = event.target;
    var input = btn.parentElement.parentElement.getElementsByClassName('cart__amount-number')[0];
    var input_value = input.value;
    input.value = parseInt(input_value) + 1;
    quantityChange(input);
}
function minusQuantity(event) {
    var btn = event.target;
    var input = btn.parentElement.parentElement.getElementsByClassName('cart__amount-number')[0];
    var input_value = input.value;
    input.value = parseInt(input_value) - 1;
    quantityChange(input);
}
//
function addCartClicked(event){
    var button = event.target;
    var product = button.parentElement.parentElement;
    var title = product.getElementsByClassName('products__title')[0].innerText;
    var price = product.getElementsByClassName('products__price')[0].innerText;
    var img = product.getElementsByClassName('products__img')[0].src;
    addCardtoCart(title,price,img);
    updateTotal();
}
function choiceSize(event){
    var button = event.target;
    var size = button.innerText;
    return size;
}
function addCartClicked_dl(event){
    var button = event.target;
    var dl = button.parentElement.parentElement.parentElement.parentElement;
    var title = dl.getElementsByClassName('product-name')[0].innerText;
    var price = dl.getElementsByClassName('product-price')[0].innerText.toLocaleString();
    var img = dl.getElementsByClassName('product-img')[0].src;
    var quantity = dl.getElementsByClassName('quantity_value')[0].value;
    addCardtoCart(title, price, img, quantity);
}

function addCardtoCart(title, price, img, quantity){
    var cartShopBox = document.createElement("article");
    cartShopBox.classList.add("cart__card");
    var cartItems = document.getElementsByClassName('cart__container')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart__title');
    if (isNaN(quantity)){
        quantity = 1;
    }
    var cartBoxContent = `<input type="checkbox" class="checkbox" name="band" value="sp1"/>
    <div class="cart__box">
        
        <img src="${img}" alt="" class="cart__img">
    </div>

    <div class="cart__details">
        <h3 class="cart__title">${title}</h3>
        <span class="cart__price">${price}</span>

        <div class="cart__amount">
            <div class="cart__amount-content">
                <span class="cart__amount-box minus">
                    <i class='bx bx-minus ' ></i>
                </span>

                <input class="cart__amount-number" value="${quantity}"/>

                <span class="cart__amount-box plus">
                    <i class='bx bx-plus ' ></i>
                </span>
            </div>
        </div>
    </div>
    <i class='bx bx-trash-alt cart__amount-trash' ></i>`;
    for(var i = 0; i < cartItemsNames.length; i++){
        if (title === cartItemsNames[i].innerHTML){
            createToast('info_cart');
            var item = cartItemsNames[i].parentElement.parentElement;
            var quantity_cart = parseInt(item.getElementsByClassName('cart__amount-number')[0].value);
            item.getElementsByClassName('cart__amount-number')[0].value = quantity_cart + parseInt(quantity);
            return ;
        }
    }
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart__amount-trash')[0].addEventListener('click', removeCartcard);
    cartShopBox.getElementsByClassName('minus')[0].addEventListener('click', minusQuantity);
    cartShopBox.getElementsByClassName('checkbox')[0].addEventListener('click', quantityChange);
    cartShopBox.getElementsByClassName('plus')[0].addEventListener('click', plusQuantity);
}   
// XU LY DETAIL ADDRESS
const listAddress= document.getElementById("select");
const add__form = document.getElementById("add");
const btn_add = document.getElementById("btn-add");
const list = document.getElementById('list-info');


function openFomr(){
        listAddress.style.display="none";
        add__form.style.display="block";
    }
function removeAddress(event){
    var btnClick = event.target;
    btnClick.parentElement.remove();    
    checkNone();
}
function updateAddress(event){
    var radioClicked = event.target;
    if (radioClicked.checked){
        var item = radioClicked.parentElement;
        var id = radioClicked.value;
        var name = item. getElementsByClassName('name')[0].innerText;
        var phone = item.getElementsByClassName('phone')[0].innerText;
        var address = item.getElementsByClassName('address')[0].innerText;
        console.log(id,name, phone, address);
        choiceAddress(id,name, phone, address);
    }
}

function choiceAddress(name, phone, addder){
    var name_value = document.getElementsByClassName('name-tt')[0];
    var phone_value = document.getElementsByClassName('phone-tt')[0];
    var address_value = document.getElementsByClassName('address-tt')[0];
    var btn_xn = document.getElementById('btn-acp');
    btn_xn.addEventListener('click', function(){
        name_value.innerText = name;
        phone_value.innerText= phone,
        address_value.innerText = addder;
        closeDlAddress();
    })
}
function addAddress(){
    var name = document.getElementById('input__name').value;
    var phone = document.getElementById('input__phone').value;
    var address = document.getElementById('input__address').value;
    var addressDetail = document.getElementById('input__addresDetail').value;
    listAddress.style.display="block";
    add__form.style.display="none";
    var newAdd = document.createElement('article');
    newAdd.classList.add('item');
    
    var newAddContent = `<input type="radio" name="choice" class = "radio" value = "">
                        <div>
                            <h4 class="name">${name}</h4>
                            <p class="phone">${phone}</p>
                            <p class="address">${addressDetail}, ${address}</p>
                        </div>
                        <i class='bx bxs-trash btn__xoa'></i>`
    newAdd.innerHTML = newAddContent;
    list.append(newAdd);
    newAdd.getElementsByClassName('btn__xoa')[0].addEventListener('click', removeAddress);
    newAdd.getElementsByClassName('radio')[0].addEventListener('click', updateAddress);
    checkNone();
}
//  OPEN DETAIL ADDRESS
var div_dl = document.getElementById("detail");
function checkNone(){
    var countCheck = listAddress.getElementsByClassName('item').length;
    console.log(countCheck)
    if(countCheck == 0){
        document.getElementsByClassName("noneItem")[0].style.display="block";
    }else{
        document.getElementsByClassName("noneItem")[0].style.display="none";
    }
}
function openDlAddress() {
        div_dl.style.display = "block";
        checkNone();
}

  // When the user clicks on <span> (x), close the modal
function closeDlAddress() {
    div_dl.style.display = "none";
}
function back(){
    add__form.style.display = "none";
    listAddress.style.display = "block";
}

// REVIEW 
function showDlReview(){
    var div_dlReview = document.getElementsByClassName('dl')[0];
    var icon = document.getElementsByClassName('iconReview')[0];
    
    if(div_dlReview.style.display === "block"){
        div_dlReview.style.display="none";
        div_dlReview.style.transition= "display 0.4s;";
        icon.classList.add('bx-chevron-down.down');
        icon.classList.remove('bx-chevron-up');
    }else{
        div_dlReview.style.display="block"
        div_dlReview.style.transition= "display 0.4s;";
        icon.classList.remove('bx-chevron-down.down');
        icon.classList.add('bx-chevron-up');
    }
}
// Get start review user
    var user_Review = document.getElementsByClassName('user-review');
    var sum = 0;
    var countReview = 0;
    for(var i = 0; i < user_Review.length; i++){
        var div = user_Review[i];
        var userStart = div.getElementsByClassName('user-start')[0];
        var start = div.getElementsByClassName('starts')[0].value;
        for( var j = 0; j < start; j++){
            var newSpan = document.createElement('span');
            newSpan.classList.add('active');
            var spanContent = `<i type="solid" class ="bx bxs-star"></i>`
            newSpan.innerHTML=spanContent;
            userStart.append(newSpan);
        }
        for( var j = 0; j < (5-start); j++){
            var newSpan = document.createElement('span');
            newSpan.classList.add('active');
            var spanContent = `<i type="solid" class ="bx bx-star"></i>`
            newSpan.innerHTML=spanContent;
            userStart.append(newSpan);
        }
        sum += parseInt(start);
        parseInt(countReview++);

    }
    var totalReviews = document.getElementsByClassName('totalReviews')[0];
    if (totalReviews){
        totalReviews.innerHTML = '[ ' + countReview + ' ]';
    }
   
    // Tính trung bình sao đánh giá
    var average = document.getElementsByClassName('average-rating')[0];
    if(average && sum !== 0){
        average.innerText = parseFloat((sum/countReview).toFixed(1));
    }
    ///--show Bill khi đơn hàng đã giao-----///
   
    var btn_viewBill = document.getElementsByClassName('btn_viewBill')[0];
    if (btn_viewBill){
        
        btn_viewBill.addEventListener('click', function(){
            var bill = document.getElementsByClassName('div_bill')[0];
            if(bill.style.display === "block"){
                btn_viewBill.innerText = "Xem hóa đơn"
                bill.style.display="none";
                bill.style.transition= "display 0.4s;";
            }else{
                btn_viewBill.innerText = "Thoát"
                bill.style.display="block"
                bill.style.transition= "display 0.4s;";
            }
        });
    }
    ///--Click đánh giá bằng sao-----///

    const oneStart = document.getElementsByClassName('oneStart')[0];
    const twoStart = document.getElementsByClassName('twoStart')[0];
    const threeStart =document.getElementsByClassName('threeStart')[0];
    const fourStart = document.getElementsByClassName('fourStart')[0];
    const fiveStart = document.getElementsByClassName('fiveStart')[0];
    const input_stars = document.getElementsByClassName('startsUserReview')[0];
    const txtArea =  document.getElementsByClassName('txtContent')[0];
    if (oneStart){
        oneStart.addEventListener('click', function(){
            oneStart.classList.remove("bx-star");
            oneStart.classList.add("bxs-star");
    
            twoStart.classList.remove("bxs-star");
            twoStart.classList.add("bx-star");
    
            threeStart.classList.remove("bxs-star");
            threeStart.classList.add("bx-star");
    
            fourStart.classList.remove("bxs-star");
            fourStart.classList.add("bx-star");
    
            fiveStart.classList.remove("bxs-star");
            fiveStart.classList.add("bx-star");
            input_stars.value = 1;
        })
        twoStart.addEventListener('click', function(){
            oneStart.classList.remove("bx-star");
            oneStart.classList.add("bxs-star");
    
            twoStart.classList.remove("bx-star");
            twoStart.classList.add("bxs-star");
    
            threeStart.classList.remove("bxs-star");
            threeStart.classList.add("bx-star");
    
            fourStart.classList.remove("bxs-star");
            fourStart.classList.add("bx-star");
    
            fiveStart.classList.remove("bxs-star");
            fiveStart.classList.add("bx-star");
            
            input_stars.value = 2;
        })
        threeStart.addEventListener('click', function(){
            oneStart.classList.remove("bx-star");
            oneStart.classList.add("bxs-star");
    
            twoStart.classList.remove("bx-star");
            twoStart.classList.add("bxs-star");
    
            threeStart.classList.remove("bx-star");
            threeStart.classList.add("bxs-star");
    
            fourStart.classList.remove("bxs-star");
            fourStart.classList.add("bx-star");
    
            fiveStart.classList.remove("bxs-star");
            fiveStart.classList.add("bx-star");
    
            input_stars.value = 3;
        })
        fourStart.addEventListener('click', function(){
            oneStart.classList.remove("bx-star");
            oneStart.classList.add("bxs-star");
    
            twoStart.classList.remove("bx-star");
            twoStart.classList.add("bxs-star");
    
            threeStart.classList.remove("bx-star");
            threeStart.classList.add("bxs-star");
    
            fourStart.classList.remove("bx-star");
            fourStart.classList.add("bxs-star");
    
            fiveStart.classList.remove("bxs-star");
            fiveStart.classList.add("bx-star");
    
            input_stars.value = 4;
        })
        fiveStart.addEventListener('click', function(){
            oneStart.classList.remove("bx-star");
            oneStart.classList.add("bxs-star");
    
            twoStart.classList.remove("bx-star");
            twoStart.classList.add("bxs-star");
    
            threeStart.classList.remove("bx-star");
            threeStart.classList.add("bxs-star");
    
            fourStart.classList.remove("bx-star");
            fourStart.classList.add("bxs-star");
    
            fiveStart.classList.remove("bx-star");
            fiveStart.classList.add("bxs-star");
    
            input_stars.value = 5;
        })
    }
        ///--Reset giá trị sau khi đánh giá----///
        function resetStart(){
            oneStart.classList.add("bxs-star");
            oneStart.classList.remove("bx-star");
    
            twoStart.classList.remove("bx-star");
            twoStart.classList.add("bxs-star");
    
            threeStart.classList.remove("bx-star");
            threeStart.classList.add("bxs-star");
    
            fourStart.classList.remove("bx-star");
            fourStart.classList.add("bxs-star");
    
            fiveStart.classList.remove("bx-star");
            fiveStart.classList.add("bxs-star"); 
    
            input_stars.value = 5;
            txtArea.value =''
        }
        ///--Show div đánh giá---///
        const divReview = document.getElementsByClassName('div_review')[0];
        function showReview(event){
            var link = event.target;
            var idProduct = document.getElementsByClassName('idProduct')[0];  
                var tr = event.target.parentElement;
                var id = tr.getElementsByClassName("nameProduct")[0].innerText;
                idProduct.value = id;
                divReview.style.display="block";
            // Xóa link khi đã gửi đánh giá xong
            document.getElementsByClassName("btn__submit")[0].addEventListener('click', function(){
                link.parentNode.removeChild(link); 
                divReview.style.display="none";
                resetStart();
            })
        }
    
        function closeReview(){
            divReview.style.display="none";
            resetStart();
        }
// ========STAFF=========//

function NhanDon(event){
    var Clicked = event.target;
    Clicked.style.display="none";
    var p_nameStaff = document.getElementsByClassName('nameStaff')[0];  
    p_nameStaff.innerText = ' Trịnh Thanh Sơn';
    btn_next.style.display="block";
}   
function next(event){
    var btn = event.target;
    var btn_ghtb = document.getElementsByClassName('gh-tb')[0]; 
    if (two.className === "progress two active" && three.className !== "progress three active" && btn_next.innerText ==="Đang vận chuyển")
    {
        three.classList.add("active");
        btn.innerText = "Giao hàng thành công";
        btn_ghtb.style.display="block";
        btn_ghtb.innerText ="Giao hàng thất bại";
    }else if (three.className === "progress three active" && four.className !== "progress four active" && five.className !== "progress four active"){
        four.classList.add("active");
        btn.classList.remove('btn_staff');
        btn.innerText = "Đã giao hàng";
        btn.style.color = "red";
        btn_ghtb.style.display="none";
    }
}
function staff_HD(event){
    var btn = event.target;
    btn.style.display="block";
    if (three.className === "progress three active" && five.className !== "progress five active")
    {   
        one.classList.add("active"); 
        li_five.classList.remove("huy");    
    	five.classList.add("active");
    	li_huy.forEach(element => {
        element.classList.add("huy");
    	});
        
        btn.classList.remove('btn_staff');
        btn.innerText = "Đã hủy";
        btn.style.color = "red";
        var btn_next = document.getElementsByClassName('gh-tc')[0]; 
        btn_next.style.display="none";
    }
}
// ===========DISCOUNT============= //
    //products
const card = document.getElementsByClassName('products__card');
for (var i = 0; i < card.length; i++){
    var priceDiscount = card[i].getElementsByClassName("dicount-price")[0];
    if(priceDiscount && priceDiscount.innerText === ''){
        var priceNoneDiscount = card[i].getElementsByClassName("none-dicount")[0];
        priceNoneDiscount.classList.remove("none-dicount");
        priceDiscount.style.display="none";
    }
} 
    //products-detail
const card_dl = document.getElementsByClassName('product-div-right');
for (var i = 0; i < card_dl.length; i++){
    var precent_dl = card_dl[i].getElementsByClassName('precentDiscountDl')[0];
    if (precent_dl.innerText !== ''){
        precent_dl.innerText = '-' + precent_dl.innerText;
        var price_noneDiscount_dl = card_dl[i].getElementsByClassName('noneDiscount')[0];
        var price_Discount_dl = card_dl[i].getElementsByClassName('discount')[0];
        var price_none = price_noneDiscount_dl.innerText;
        var price_dicount = price_Discount_dl.innerText;
        price_noneDiscount_dl.innerText = price_dicount;
        price_Discount_dl.innerText = price_none;
    }
}
// ===========HÀNG TỒN============= //
var status_product = document.getElementsByClassName('status-product')[0];
var btn_groups = document.getElementsByClassName('btn-groups')[0];
if (status_product){
    if (status_product.innerText === "Hết hàng"){
        btn_groups.getElementsByTagName('a')[0].style.display = 'none';
        btn_groups.getElementsByTagName('a')[1].style.display = 'none';
    }
}   

// checkBox
    function check_clicked(event){
        var checkBox = event.target;
        var list = checkBox.parentElement.parentElement.parentElement.id;
        var checkboxes = document.querySelectorAll('#' + list + ' input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
              if (this.checked) {
                // Hủy chọn tất cả các checkbox khác
                checkboxes.forEach(function(otherCheckbox) {
                  if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                  }
                });
              }
            });
          });
    }
    function showFormChangePass(event) {
        var clicked = event.target;
        var form = document.getElementsByClassName('form-changePass')[0];
        if (form.style.display === "block"){
            form.style.display = "none";
        }else{
            form.style.display = "block";
        }
        
    }
   


var avatarInput = document.getElementById("avatarInput");

  // Lấy đối tượng avatar hiện tại
  var currentAvatar = document.getElementById("avt-user");

  // Gắn sự kiện click cho avatar hiện tại
  currentAvatar.addEventListener("click", function() {
    // Kích hoạt sự kiện click cho input file ẩn
    avatarInput.click();
  });

  // Gắn sự kiện change cho input file
  avatarInput.addEventListener("change", function(event) {
    // Kiểm tra xem người dùng đã chọn file hay chưa
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // Đọc nội dung của file được chọn
      reader.onload = function(e) {
        // Cập nhật hình ảnh của avatar hiện tại bằng hình ảnh được chọn
        currentAvatar.src = e.target.result;
      };

      // Đọc file
      reader.readAsDataURL(event.target.files[0]);
    }
  });