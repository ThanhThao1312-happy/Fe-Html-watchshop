const notifications = document.querySelector(".notifications");
//Muốn show toast thì thêm cái này vào html nhớ nó là thẻ đầu tiên trong content nha : // <ul class="notifications"></ul> 
// Object containing details for different types of toasts
// Này là nd với icon: muốn hiện nd gì thì thêm dô cái text cùng là thành công nhưng 2 nd khác nhau thì cũng thêm 2 cái khác nhau luôn
// cú pháp tạo toast trong js : createToast('tên biến'); -> tên biến là mấy cái khai báo trong toastDetails;
// Nhớ cái nào html nào muốn hiện toast thì cũng phải import cái css, js của nó vào nha
const toastDetails = {
    timer: 2000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success: This is a success toast.',
    }, 
    error: {
        icon: 'fa-circle-xmark',
        text: 'Error: This is an error toast.',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning: This is a warning toast.',
    },
    info_cart: {
        icon: 'fa-circle-info',
        text: 'Sản phẩm này đã tồn tại trong giỏ hàng.',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}
