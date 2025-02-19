
const API_STAFF = "http://ichi.io.vn/api/staff";
const API_SERVICE = "http://ichi.io.vn/api/service";
const API_QR = "http://ichi.io.vn/api/feedback/qr";
const API_FEEDBACK="http://ichi.io.vn/api/feedback"

document.addEventListener("DOMContentLoaded", () => {
    loadStaffOptions(API_STAFF, "staff-select", "staff_code", "name", "Lỗi khi tải danh sách nhân viên!");

    loadServiceOptions(API_SERVICE, "service-select", "id", "name", "Lỗi khi tải danh sách dịch vụ!");
    loadAllStaff(API_STAFF)
    loadAllFeedback(API_FEEDBACK)
    loadAllService(API_SERVICE)
});


function loadStaffOptions(apiUrl, selectId, valueKey, textKey, errorMessage) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const select = document.getElementById(selectId);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item[valueKey];
                option.textContent = item[textKey];
                option.setAttribute("data-name", item[textKey]);
                select.appendChild(option);
            });
        })
        .catch(err => {
            console.error(errorMessage, err);
            alert(errorMessage);
        });
}


function loadServiceOptions(apiUrl, selectId, valueKey, textKey, errorMessage) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const select = document.getElementById(selectId);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item[valueKey]; 
                option.textContent = item[textKey]; 
                option.setAttribute("data-name", item[textKey]); 
                select.appendChild(option);
            });
        })
        .catch(err => {
            console.error(errorMessage, err);
            alert(errorMessage);
        });
}

document.getElementById("submit-btn").addEventListener("click", () => {
    const staffOption = document.getElementById("staff-select").selectedOptions[0];
    const serviceOption = document.getElementById("service-select").selectedOptions[0];

    const staff = staffOption.value; 
    const staffName = staffOption.getAttribute("data-name"); 
    const service = serviceOption.value;
    const serviceName = serviceOption.getAttribute("data-name");
    const customer = document.getElementById("customer-name").value.trim();

    console.log("Staff Code:", staff);
    console.log("Staff Name:", staffName);
    console.log("Service ID:", service);
    console.log("Service Name:", serviceName);
    console.log("Customer Name:", customer);

    if (!staff || !service || !customer) {
        alert("Vui lòng chọn nhân viên, dịch vụ và nhập tên khách hàng!");
        return;
    }

    fetch(API_QR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff, service, customer, staffName, serviceName }),
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const qrCodeDiv = document.getElementById("qr-code");
            qrCodeDiv.innerHTML = `<img src="${data.qrCodeUrl}" alt="QR Code">`;
        })
        .catch(err => {
            console.error("Lỗi khi tạo QR Code:", err);
            alert("Lỗi khi tạo QR Code. Vui lòng thử lại!");
        });
});

function loadAllStaff(apiStaff) {
    fetch(apiStaff)
        .then(tmp => tmp.json())
        .then(data =>{
            const tBody = document.getElementById("staff-body");
            data.forEach(row =>{
                const tRow = document.createElement("tr");
                tRow.innerHTML=`
                    <td>${row.id}</td>
                    <td>${row.staff_code}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.phone}</td>
                    <td>${row.position}</td>
                `;
                tBody.appendChild(tRow);
            })
        })
}
function loadAllFeedback(apiFeedback){
    fetch(apiFeedback)
        .then(tmp => tmp.json())
        .then(data =>{
            const tBody2 = document.getElementById("feedback-body");
            data.forEach(row =>{
                const tRow2 = document.createElement("tr");
                tRow2.innerHTML=`
                    <td>${row.service_id}</td>
                    <td>${row.staff_code}</td>
                    <td>${row.customer_name}</td>
                    <td>${row.rating_service}</td>
                    <td>${row.rating_space}</td>
                    <td>${row.comment}</td>
                `;
                tBody2.appendChild(tRow2)
            })
        })
}

function loadAllService(apiFeedback){
    fetch(apiFeedback)
        .then(tmp => tmp.json())
        .then(data =>{
            const tBody2 = document.getElementById("service-body");
            data.forEach(row =>{
                const tRow2 = document.createElement("tr");
                tRow2.innerHTML=`
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.description}</td>
                `;
                tBody2.appendChild(tRow2)
            })
        })
}


//  Motion click
const mainBtn = document.querySelector('.js__main-btn')
const feedbackBtn = document.querySelector('.js__feedback-btn')
const staffBtn = document.querySelector('.js__staff-btn')
const serviceBtn = document.querySelector('.js__service-btn')
const contentMain = document.querySelector('.content__main')
const contentFeedback = document.querySelector('.content__feedback')
const contentStaff = document.querySelector('.content__staff')
const contentService = document.querySelector('.content__service')

function showMain() {
    contentMain.classList.remove('hidden')
    contentFeedback.classList.add('hidden')
    contentStaff.classList.add('hidden')
    contentService.classList.add('hidden')
}
function showFeedback() {
    contentFeedback.classList.remove('hidden')
    contentMain.classList.add('hidden')
    contentStaff.classList.add('hidden')
    contentService.classList.add('hidden')
}
function showStaff() {
    contentStaff.classList.remove('hidden')
    contentMain.classList.add('hidden')
    contentFeedback.classList.add('hidden')
    contentService.classList.add('hidden')
}
function showService() {
    contentService.classList.remove('hidden')
    contentMain.classList.add('hidden')
    contentFeedback.classList.add('hidden')
    contentStaff.classList.add('hidden')
}

mainBtn.addEventListener('click',() =>{
    showMain()
})
feedbackBtn.addEventListener('click',() =>{
    showFeedback()
})
staffBtn.addEventListener('click',() =>{
    showStaff()
})
serviceBtn.addEventListener('click',() =>{
    showService()
})

