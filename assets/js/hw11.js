// [숙제11] 동적 웹 페이지 구현
// 2020-13009 김정웅

//Q1
const themeBtn = document.querySelector("#theme-btn");
const q1Bx = document.querySelector("#q1-box");
themeBtn.addEventListener("click", () => {
    q1Bx.classList.toggle("dark");

    if (themeBtn.textContent === "라이트모드") {
    themeBtn.textContent = "다크모드"
    } else {
    themeBtn.textContent = "라이트모드"
    }
});






//Q2
const input = document.querySelector("#q2-input");
const count = document.querySelector("#q2-count");
const warn = document.querySelector("#q2-warn");

input.addEventListener("input", (e) => {
    count.textContent = e.target.value.length;

    if (count.textContent >= 100) {
        warn.textContent = "100자를 넘었습니다."
        warn.style.color = "crimson"
    } else {warn.textContent = ""
    }

});