fetch("/data/poems.csv")
    .then(response => response.text())
    .then(csv => {
        const data = csv
            .split("\n") //줄바꿈 문자로 행별로 분할
            .slice(1) // 0번 행(헤더)는 버림
            .filter(line => line.trim() !== "")
            .map(line => {
                const cols = line.split(",");
                return {
                    year: Number(cols[0]),
                    author: cols[1].trim(), //공백이 섞일 수 있으니 trim()
                    count: Number(cols[2]),
                };
            });
        drawChart(data);
    });

function drawChart(rows) {
    const labels = rows.map(r => r.author); //행 하나에서 label은 author를 가져옴
    const counts = rows.map(r => r.count); //counts는 행 하나에서 count를 가져옴

    const canvas = document.querySelector("#poems-chart");
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ label: "작품 편수", data: counts }],
        },
    });
}