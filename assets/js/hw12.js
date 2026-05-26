// [숙제12] 인문학 데이터 시각화
// 2020-13009 김정웅

// Q1
fetch("/data/sillok.json")
.then(response => response.json())
.then(records => {
    const lables = records.map(record => record.king)
    const counts = records.map(record => record.volumes)

    const canvas = document.querySelector("#q1-chart")
    new Chart(canvas, {
        type:"bar",
        data: {
            labels: labels,
            datasets: [{ 
                        label:"왕 이름", 
                        data: counts ,
                        backgroundColor: ["rgba(54, 162, 235, 0.6)"]
                            
        }],
        options: {
            plugins: {
                title: { display: true, text: "조선왕조실록 왕대별 권수"}
            },
            scales: {
                y: { beginAtZero: true }
            }

        }
    }
});

// Q2
fetch("/data/nobel-literature.csv")
.then(response => response.text())
.then(csv => {
...
});