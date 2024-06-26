const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});
// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');
if (menuBar){
	menuBar.addEventListener('click', function () {
		sidebar.classList.toggle('hide');
	})
}
// CHUYEN TRANG TRONG MAIN CHINH
window.onload = function() {
	var links = document.querySelectorAll('#sidebar li');
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener('click', function() {
			var current = document.getElementsByClassName('active');
			current[0].classList.remove('active');
			this.classList.add('active');
			var target = this.querySelector('a').getAttribute('href').replace('#', '');
			var pages = document.querySelectorAll('main > div');
			for (var j = 0; j < pages.length; j++) {
				if (pages[j].classList.contains(target)) {
					pages[j].classList.add('active');
				} else {
					pages[j].classList.remove('active');
				}
			}
		});
	}
};


// DETAIL
  // Get the modal
var modal = document.getElementById("detail");
var modal_1 = document.getElementById("detail-ttdh");
  // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close_chitiet")[0];
var bill = document.getElementsByClassName('div_bill')[0];
var btn_next = document.getElementsByClassName("btn_next")[0];
var p_nameStaff = document.getElementsByClassName('nameStaff')[0];
    
function openProgress(row){
	getProgress(row);
	modal_1.style.display = "block";
}
function closeProgress(){
	modal_1.style.display ="none";
	resetProgress();
}
resetDetail();
// openDlOrder
function openDetail(btn){
	var row = btn.parentElement.parentElement;
	getProgress(row);
	modal.style.display = "block";
}
// openDl in admin
function openDetail_ad(){
	modal.style.display = "block";
}
  // When the user clicks on <span> (x), close the modal
function closeDetail() {
	modal.style.display = "none";
	resetDetail();
}
	// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		resetDetail();
	}
	else if(event.target == modal_1) {
		modal_1.style.display = "none";
		resetProgress(); 
	}
}
	
function resetDetail(){
	const liElements  = document.querySelectorAll("#myList li");
		if(liElements){
		liElements.forEach(li => {
			const childElements = li.querySelectorAll('*');
			childElements.forEach(child => {
				if (child.id) {
					if (child.tagName === "SELECT"){
						document.getElementById(child.id).value="0";
					}else if(child.id === "input__fileName"){
						document.getElementById(child.id).innerText="File name:";
						document.getElementsByClassName("preView_img")[0].src ="";
					}else{
						document.getElementById(child.id).value="";
					}
					document.getElementById(child.id).readOnly=false;
			}
		});
		});
		}
}
const tableRows = document.querySelectorAll(".table-data tbody tr");
//DDH
// function getIdDDH(btn){
// 	// btn = document.getElementById("btn__chitiet-ddh");
// 	var row = btn.parentNode.parentNode;
// 	var td = row.getElementsByTagName("td");
// 	document.getElementById("id_ddh").innerHTML=td[0].innerText;
// 	openDetail(btn);
// }

function getIdDDH_progress(btn){
	// btn = document.getElementById("btn__chitiet-ddh");
	var row = btn.parentNode.parentNode;
	var td = row.getElementsByTagName("td");
	document.getElementById("id_ddh_progress").innerHTML=td[0].innerText;	
	openProgress(row);
}

function getDetailInfoAcc(){
	var tableRows = document.querySelectorAll(".table-data tbody tr");
// Duyệt qua các thẻ tr và thiết lập sự kiện click cho nút "Xóa" của mỗi thẻ tr
for (var i = 0; i < tableRows.length; i++) {
  var detail_btn = tableRows[i].querySelector(".btn__chitiet");
  detail_btn.addEventListener("click", function() {
    // Lấy dữ cliệu từ các ô td của thẻ tr được click
    var cells = this.parentNode.parentNode.getElementsByTagName("td");
	// Lấy id của phần tử con của ul
	const liElements  = document.querySelectorAll("#myList li");
	var ids=[];
	liElements.forEach(li => {
		const childElements = li.querySelectorAll('*');
		childElements.forEach(child => {
		  if (child.id) {
			ids.push(child.id);
			}
		});
	  });
	  	if(ids[0] === "input__userID"){
			var length = (cells.length);
			var id_user = cells[length-2].innerText;
			var name_user = cells[1].innerText;
			var phone_user = cells[length-3].innerText;
			document.getElementById("input__userID").value = id_user;
			document.getElementById("input__userName").value = name_user;
			document.getElementById("input__phone").value = phone_user;
			openDetail_ad();
		}
		else if(ids[0] === "input__staffID"){
				var length = (cells.length);
				var id_staff = cells[0].innerText;
				var phone_user = cells[length-3].innerText;
				document.getElementById("input_staffID").value = id_staff;
				document.getElementById("input__phone").value = phone_user;
				openDetail_ad();
		}else{
			var id_hdh_ldh=cells[0].innerText;
			var namem_hdh_ldh = cells[1].innerText;
			document.getElementById("").value = id_hdh_ldh;
			document.getElementById("").value = namem_hdh_ldh;
			openDetail_ad();
		}

	});
}
}

function getDetailInfo(){
	for (var i = 0; i < tableRows.length; i++) {
	  var change_btn = tableRows[i].querySelector(".btn__chitiet");
	  change_btn.addEventListener("click", function() {
		// Lấy dữ cliệu từ các ô td của thẻ tr được click
		var cells = this.parentNode.parentNode.getElementsByTagName("td");
		// Lấy id của phần tử con của ul
		const liElements  = document.querySelectorAll("#myList li");
		var count = 0;
		liElements.forEach(li => {
			const childElements = li.querySelectorAll('*');
			childElements.forEach(child => {
			  if (child.id) {
				
				if(child.id !== "input__img"){
					var tmp = cells[count].innerText;
					document.getElementById(child.id).value=tmp;
				}else if(child.id === "input__img"){
					var imgProduct = document.getElementsByClassName('img_product')[0];
					var getSrcImg = imgProduct.src;
					document.getElementsByClassName('preView_img')[0].src = getSrcImg;
					var fileName = getSrcImg.substring(getSrcImg.lastIndexOf('/') + 1);
					var spanFileName = document.getElementsByClassName('span_fileName')[0];
					spanFileName.textContent  = 'File name: ' + fileName;
				}
				console.log(child.id);
				console.log(tmp)
				count++;
			  }
			});
		  });
		  openDetail_ad();
		});
	}
	}
	// Xu li input type = 'file'
	var input_imgProduct = document.getElementById('input__img');
	if (input_imgProduct){
		input_imgProduct.addEventListener('change', function(){
			var preView_img = document.getElementsByClassName('preView_img')[0];
			var input_value = input_imgProduct.value;
			var spanFileName = document.getElementsByClassName('span_fileName')[0];
			var fileName = input_value.substring(input_value.lastIndexOf('\\') + 1);
			spanFileName.textContent  = 'File name: ' + fileName;
			preView_img.src = 'assets/img/' + fileName;
			console.log(preView_img.src)
		})
	}
	// SHOW TINH TRANG STAFF
	const table_Staff = document.querySelectorAll('#tbl-staff tbody tr');
	for ( var i = 0; i < table_Staff.length; i++){
		var td = table_Staff[i].getElementsByTagName('td')[7];
		var input = td.getElementsByTagName('input')[0].value;
		// input === 0 -> staff đang hoạt động
		if(input === '0'){
			td.style.color = 'rgb(127, 248, 79)';
			var icon_status = document.createElement('i');
			var icon_statusContent = `<i class='bx bxs-circle' ></i>`;
			icon_status.innerHTML = icon_statusContent;
			td.append(icon_status);
		}else{// input === 1 -> staff ngưng hoạt động
			td.style.color = 'rgb(209, 63, 63)';
			var icon_status = document.createElement('i');
			var icon_statusContent = `<i class='bx bxs-circle' ></i>`;
			icon_status.innerHTML = icon_statusContent;
			td.append(icon_status);
		}
	}
// LAY ID USER CHO DIALOG

// const deleteButtons = document.querySelectorAll(".btn__xoa");
const confirmDialog_ = document.getElementById('confirmDialog_');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
for (let i = 0; i < tableRows.length; i++) {
  let row = tableRows[i];
  let delBtn = row.querySelector(".btn__xoa");
  if(delBtn){
	delBtn.addEventListener("click", function() {
		let cells = row.getElementsByTagName("td");
		let id = cells[0].innerText;
		document.getElementById("id_").innerHTML = id;
		if(confirmDialog_){
		confirmDialog_.style.display = 'block';
		confirmBtn.addEventListener('click', () => {
		  row.remove();
		  confirmDialog_.style.display = 'none';
		});
		cancelBtn.addEventListener('click', () => {
		  confirmDialog_.style.display = 'none';
		});
	}
	  });
  }
}

function selectBtn(btn) {
	var btnID = btn.id;
	var row = btn.parentNode.parentNode.parentNode;
	var ttddh = row.getElementsByClassName("ttddh")[0];
	var ttddh_value = ttddh.value;
	if (btnID === "toggle-green"){
	// Lấy dòng chứa nút được click
	// var row = btn.parentNode.parentNode.parentNode;
	// Thay đổi màu của dòng
	
	row.style.backgroundColor = "var(--green-btnxh)";

	// Thay đổi nút thành thẻ p có nội dung "Đã chọn"
	var edit = btn.parentNode;
	var p = document.createElement("p");
	p.innerHTML = "Đã xác nhận";
	btn.parentNode.parentNode.replaceChild(p, edit);
	ttddh_value = 2;
	console.log(ttddh_value)
	}
	else{
		row.style.backgroundColor = "var(--red-btnh)";

	// Thay đổi nút thành thẻ p có nội dung "Đã chọn"
	var edit = btn.parentNode;
	var p = document.createElement("p");
	p.innerHTML = "Đã hủy";
	btn.parentNode.parentNode.replaceChild(p, edit);
	ttddh_value = 5 ;
	}
	getProgress(row);
}

function selectStatus(row) {
		var ttddh = row.getElementsByClassName("ttddh")[0];
		var ttddh_value = ttddh.value;
		var edit = ttddh.parentNode.querySelector(".btns");
		var p = document.createElement("p");
		if ( ttddh_value == 2){
			row.style.backgroundColor = "var(--green-btnxh)";	
			p.innerHTML = "Đã xác nhận";
			ttddh.parentNode.replaceChild(p, edit);
		}
		else if(ttddh_value == 5){
			row.style.backgroundColor = "var(--red-btnh)";
			p.innerHTML = "Đã hủy";
			ttddh.parentNode.replaceChild(p, edit);
		}else if(ttddh_value == 3){
			row.style.backgroundColor = "var(--orange-btnvc)";
			p.innerHTML = "Vận chuyển";
			ttddh.parentNode.replaceChild(p, edit);
		}
		else if(ttddh_value == 4){
			row.style.backgroundColor = "var(--yellow-btndg)";
			p.innerHTML = "Đã giao";
			ttddh.parentNode.replaceChild(p, edit);
		}
		getProgress(row);
}

const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const li_huy = document.querySelectorAll("#step li.li");
const li_five = document.querySelector(".li_five");

function resetProgress() {
	one.classList.add("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
	five.classList.remove("active");
	li_five.classList.remove("huy");
	li_huy.forEach(element => {
        element.classList.remove("huy");
    	});
	
	var linkReview = document.getElementsByClassName('col_review');
	var btn_next = document.getElementsByClassName('btn_next')[0];
	var btn_huydon = document.getElementsByClassName('btn_huydon')[0];
	var btn = document.getElementsByClassName('btn_viewBill')[0];
	var btn_next_huy = document.getElementsByClassName('gh-tb')[0];
	if(btn){
		btn.style.display="none";
		btn_huydon.style.display="block";
		for(var i = 0; i < linkReview.length; i++){
			linkReview[i].style.display="none";
		}
		bill.style.display="none";
	}
		else if (btn_next){
		btn_next.style.display = "none";
		btn_next.classList.add('btn_staff');
		btn_next.style.color = "black";
		btn_next.innerText = "Đang vận chuyển";
		p_nameStaff.innerText = '';
		btn_next_huy.style.display = "none";
		btn_next_huy.classList.add('btn_staff');
		btn_next_huy.innerText = "Giao hàng thất bại";
        btn_next_huy.style.color = "black";
	}	
}

function getProgress(row){
	var linkNhanDon = document.getElementsByClassName('btn_nhandon')[0];
	var linkReview = document.getElementsByClassName('col_review');
	var btn_next = document.getElementsByClassName('btn_next')[0];
	var btn_huydon = document.getElementsByClassName('btn_huydon')[0];
	var btn = document.getElementsByClassName('btn_viewBill')[0];
	var btn_next_huy = document.getElementsByClassName('gh-tb')[0];
	resetProgress();
	if(row.style.backgroundColor === "var(--green-btnxh)"){
			one.classList.add("active");
    		two.classList.add("active");
    		three.classList.remove("active");
   	 		four.classList.remove("active");
			li_five.classList.add("huy");
			if(btn){
				btn.style.display="none";
				btn_huydon.style.display="none";
				for(var i = 0; i < linkReview.length; i++){
					linkReview[i].style.display="none";
				}
			}
			if(linkNhanDon){
				linkNhanDon.style.display="block";

			}
	}else if(row.style.backgroundColor === "var(--red-btnh)"){
		one.classList.add("active"); 
    	five.classList.add("active");
    	li_huy.forEach(element => {
        element.classList.add("huy");
    	});
		li_five.classList.remove("huy");
		if(btn){
			btn.style.display="none";
			btn_huydon.style.display="none";
			for(var i = 0; i < linkReview.length; i++){
				linkReview[i].style.display="none";
			}
		}
		if(linkNhanDon){
			linkNhanDon.style.display="none";
			btn_next_huy.style.display="block";
			btn_next_huy.classList.remove('btn_staff');
        	btn_next_huy.innerText = "Đã hủy";
        	btn_next_huy.style.color = "red";
		}
	}else if(row.style.backgroundColor === "var(--orange-btnvc)"){
		one.classList.add("active");
		two.classList.add("active");
		three.classList.add("active");
   	 	four.classList.remove("active");
		five.classList.remove("active");
		li_five.classList.add("huy");
		if(btn){
			btn.style.display="none";
			btn_huydon.style.display="none";
			for(var i = 0; i < linkReview.length; i++){
				linkReview[i].style.display="none";
			}
		}
		if(linkNhanDon){
			linkNhanDon.style.display="none";
			btn_next.innerText ="Giao hàng thành công";
			btn_next.style.display = "block";
			btn_next_huy.style.display = "block";
		}
	}else if(row.style.backgroundColor === "var(--yellow-btndg)"){
		one.classList.add("active");
		two.classList.add("active");
		three.classList.add("active");
   	 	four.classList.add("active");
		five.classList.remove("active");
		li_five.classList.add("huy");
		if(btn){
			btn.style.display="block";
			btn_huydon.style.display="none";
			for(var i = 0; i < linkReview.length; i++){
				linkReview[i].style.display="block";
			}
		}
		if(linkNhanDon){
			linkNhanDon.style.display="none";
			btn_next.classList.remove('btn_staff');
        	btn_next.innerText = "Đã giao hàng";
        	btn_next.style.color = "red";
			btn_next.style.display = "block";
		}
	}
}

	
// showReview();
// show dialog xac nhan, huy ddh
const tableDDH = document.querySelectorAll('#ddh-data tbody tr');
const confirmDialog_xn = document.getElementById('confirmDialog_xn');
const confirmDialog_huy = document.getElementById('confirmDialog_huy');
const confirmBtn1 = document.getElementById('confirmBtn1');
const cancelBtn1 = document.getElementById('cancelBtn1');
const form = document.getElementById("submit-status"); 
	for (let i = 0; i < tableDDH.length; i++) {
	  	let row = tableDDH[i];
		selectStatus(row);
		resetProgress();
	  	let xnBtn = row.querySelector("#toggle-green");
		let huyBtn = row.querySelector("#toggle-red");
		if(xnBtn && huyBtn){
	  	xnBtn.addEventListener("click", function() {
		let cells = row.getElementsByTagName("td");
		let id = cells[0].innerText;
		document.getElementById("id_").value = id;
		confirmDialog_xn.style.display = 'block';
		confirmBtn.addEventListener('click', () => {
			confirmDialog_xn.style.display = 'none';
			selectBtn(xnBtn);
		  	// const now = new Date();
			// const datetime = now.toLocaleString();
			// document.getElementById("dateNow").innerHTML=datetime;
		  	getProgress(row);
		});
		cancelBtn.addEventListener('click', () => {
		  confirmDialog_xn.style.display = 'none';
		});
	  });
	  huyBtn.addEventListener("click", function() {
		let cells = row.getElementsByTagName("td");
		let id = cells[0].innerText;
		document.getElementById("id_1").value = id;
		confirmDialog_huy.style.display = 'block';
		confirmBtn1.addEventListener('click', () => {
			confirmDialog_huy.style.display = 'none';
		  	selectBtn(huyBtn);
			getProgress(row);
		  	const now = new Date();
  			const datetime = now.toLocaleString();
		  	document.getElementById("dateNow").innerHTML=datetime;
		});
		cancelBtn1.addEventListener('click', () => {
		  confirmDialog_huy.style.display = 'none';
		});
	  });
	}
}
