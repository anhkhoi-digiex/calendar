var date = new Date().getDate();
var day = new Date().getDay();
var month = new Date().getMonth().toLocaleString("vi-VN");
var year = new Date().getFullYear();

var dayTable = document.querySelector(".calendar_part");

var isSelectedIndex = day


var listDay = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
]


// month_year_section
function updateMonth() {
    var month_section = document.querySelector(".month_year_section .month")
    if (month > 10) {

    }
    month_section.textContent = Number(month) + 1
}

function updateYear() {
    var year_section = document.querySelector(".month_year_section .year")
    year_section.textContent = year
}


// date_section

function updateDate() {
    var date_section_number = document.querySelector(".date_section .date_number")
    date_section_number.textContent = isSelectedIndex.toLocaleString("vi-VN")
    var date_section_text = document.querySelector(".date_section .date_text")
    date_section_text.textContent = listDay[new Date(year, month, isSelectedIndex).getDay()]
}



var select_section_day = document.querySelector(".select_day_section");
var select_section_month = document.querySelector(".select_day_month")
var select_section_year = document.querySelector(".select_day_year")
var submit = document.querySelector(".submit")
submit.addEventListener("click", (e) => {
    e.preventDefault()
    search_date()
})


function search_date() {
    isSelectedIndex = select_section_day.value
    month = select_section_month.value - 1
    year = select_section_year.value

    renderCalendar()
}

// direct to previous month
var previousTwoMonth = document.querySelector(".fa-angles-left")
previousTwoMonth.addEventListener("click", () => {
    directToTwoPreviousMonth()
})

var previousMonth = document.querySelector(".fa-angle-left")
previousMonth.addEventListener("click", () => {
    directToPreviousMonth();
})



// direct to next month
var nextTwoMonth = document.querySelector(".fa-angles-right")
nextTwoMonth.addEventListener("click", () => {
    directToTwoNextMonth()
})

var nextMonth = document.querySelector(".fa-angle-right")
nextMonth.addEventListener("click", () => {
    directToNextMonth();
})


// adding title for table

function renderCalendar() {
    // last day of previous month
    var lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

    // last day of this month
    var lastDayOfThisMonth = new Date(year, month + 1, 0).getDate();
    // first day
    var dayone = new Date(year, month, 1).getDay()


    let dayData = []
    let result = ``

    dayData.unshift(`<tr class="calendar_part--month">
        <th>CN</th>
        <th>T2</th>
        <th>T3</th>
        <th>T4</th>
        <th>T5</th>
        <th>T6</th>
        <th>T7</th>
                </tr>
                <tr class="calendar_part--day" style="text-align: center;">`)


    // get the date of previous month
    for (let index = dayone; index > 0; index--) {
        let day = lastDayOfPreviousMonth - index + 1
        dayData.push(`<td class="inactive day-${day}">${day}</td>`)
    }

    // get all date this month
    for (let index = 1; index < lastDayOfThisMonth + 1; index++) {
        // if (index == date) {
        //     dayData.push(`<td onclick="handleChooseDate(${index})" class="today day-${index}">${index}</td>`)
        // } else {

        // }
        dayData.push(`<td class="day-${index} ${isSelectedIndex == index ? "active" : "not-active"}" onclick="handleChooseDate(${index})">${index}</td>`)
    };

    //adding row when the cell reach at index (7 + 1) 
    for (let index = 0; index < 50; index++) {
        if (index % 8 == 0 && index != 0) {
            dayData.splice(index, 0, `</tr><tr class="calendar_part--day" style="text-align: center;">`)
        }
    }

    dayData.forEach((item) => {
        result += item
    })

    updateDate()
    updateMonth()
    updateYear()
    dayTable.innerHTML = result

}

function handleChooseDate(index) {
    const isActive = document.querySelector(".active");
    if (isActive != null) {
        isActive.classList.remove("active")
    }

    const chosenDate = document.querySelector(`.day-${index}`);
    if (chosenDate != null) {
        isSelectedIndex = index
        chosenDate.classList.add("active")
        updateDate()
    }
}

// renderSelectDay
function renderSelectDay() {
    var lastDayOfThisMonth = new Date(year, month + 1, 0).getDate();

    let selectHTML = "";
    for (let index = 1; index < lastDayOfThisMonth; index++) {
        selectHTML += `<option value="${index}">${index}</option>`
    };

    select_section_day.innerHTML = selectHTML
}

function renderSelectMonth() {
    let selectHTML = "";
    for (let index = 1; index < 12 + 1; index++) {
        selectHTML += `<option value="${index}">${index}</option>`
    };

    select_section_month.innerHTML = selectHTML
}


function directToPreviousMonth() {
    if (month <= 0) {
        month = 11
    } else {
        month = Number(month) - 1
    }

    renderCalendar()

}

function directToTwoPreviousMonth() {
    if (month == 0) {
        month = 10
    } else if (month == 1) {
        month = 11
    }
    else {
        month = Number(month) - 2

    }

    renderCalendar()
}



function directToNextMonth() {
    if (month > 11 || month == 11) {
        month = 0
    } else {
        month = Number(month) + 1
    }

    renderCalendar()
}

function directToTwoNextMonth() {
    if (month == 10) {
        month = 0
    } else if (month == 11) {
        month = 1
    }

    else {
        month = Number(month) + 2
    }

    renderCalendar()
}

renderCalendar()
renderSelectDay()
renderSelectMonth()
