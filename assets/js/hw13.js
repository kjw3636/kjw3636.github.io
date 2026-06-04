// [숙제13] 텍스트 분석 도구 구현
// 2020-13009 김정웅

// ---함수 정의들 (21강 코드 재사용) ---
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“"()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}
function countWords(words) { // words: 단어들의 배열
    const counts = {}; //빈 객체 초기화
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    } // || 0은 없는 단어가 들어올 경우를 대비해 넣은 것.
    return counts;
}
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}
function topN(counts, n) { //counts: 객체
    return Object.entries(counts) //객체 0-> 배열로 변환
    .sort((a, b) => b[1] - a[1]) // 빈도가 높은 순서대로 정렬
    .slice(0, n); // 상위 n개
}
function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: top.map(item => item[0]), //x축은 0번 인덱스인 단어
            datasets: [{
                label: "빈도", data: top.map(item => item[1]), //y축은 1번 인덱스인 빈도수
                backgroundColor: color,
            }],
        },
        options: {
            indexAxis: "y", // 가로로 긴 막대
            maintainAspectRatio: false, // 비율 보존 안 함 --> 아래로 긴 그림
            scales: {
                x: { beginAtZero: true }, // 막대 그래프 옵션: 0부터 시작
                y: { ticks: { autoSkip: false } }, //skip 막음 

            },
        },
    });
}

function analyze(text, stopwords) {
    const body = extractBody(text);
    const words = getWords(body);
    const cleaned = removeStopwords(words, stopwords);
    const counts = countWords(cleaned);
    return topN(counts, 30);
}

// --- 메인: 세 파일을 동시에 fetch ---
Promise.all([
    fetch("/data/frankenstein.txt").then(r => r.text()),
    fetch("/data/dracula.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
]).then(([frankText, dracText, stopText]) => {
    const stopwords = stopText.split(/\s+/)
                                      .filter(w => w.length >0);
    const frankTop = analyze(frankText, stopwords);
    const dracTop = analyze(dracText, stopwords);
    drawChart("#chart-frankenstein", frankTop,
              "rgba(40, 167, 69, 0.6)");
    drawChart("#chart-dracula", dracTop,
              "rgba(220, 53, 69, 0.6)")
});