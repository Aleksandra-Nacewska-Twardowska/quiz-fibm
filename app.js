"use strict";

const questions = [
  {
    section: "Część I • Decyzje przedsiębiorstwa",
    a: "Ocenić opłacalność inwestycji zagranicznej i możliwości jej finansowania.",
    b: "Porównać rynki zagraniczne i wybrać najbardziej perspektywiczny kierunek ekspansji."
  },
  {
    section: "Część I • Decyzje przedsiębiorstwa",
    a: "Przeanalizować wyniki finansowe przedsiębiorstwa i przyczyny odchyleń od budżetu.",
    b: "Przeanalizować pozycję przedsiębiorstwa na rynku i możliwości jego rozwoju."
  },
  {
    section: "Część I • Decyzje przedsiębiorstwa",
    a: "Sprawdzić, jak korporacja międzynarodowa pozyskuje i wykorzystuje kapitał.",
    b: "Zbadać, jak przedsiębiorstwa współpracują w międzynarodowych sieciach biznesowych."
  },
  {
    section: "Część I • Decyzje przedsiębiorstwa",
    a: "Porównać finansowe konsekwencje różnych wariantów inwestycji.",
    b: "Porównać strategie wejścia przedsiębiorstwa na zagraniczne rynki."
  },
  {
    section: "Część II • Ryzyko i analiza",
    a: "Ocenić wpływ zmian kursów walut na wyniki finansowe przedsiębiorstwa.",
    b: "Ocenić wpływ zmian na rynkach zagranicznych na działalność przedsiębiorstwa."
  },
  {
    section: "Część II • Ryzyko i analiza",
    a: "Przygotować budżet przedsięwzięcia i zaplanować kontrolę jego realizacji.",
    b: "Przygotować plan rozwoju przedsiębiorstwa na wybranym rynku."
  },
  {
    section: "Część II • Ryzyko i analiza",
    a: "Ocenić efektywność finansową przedsiębiorstwa na podstawie jego danych.",
    b: "Przeanalizować powiązania między przedsiębiorstwami w globalnej sieci biznesowej."
  },
  {
    section: "Część II • Ryzyko i analiza",
    a: "Przeanalizować ryzyko związane z międzynarodowymi inwestycjami finansowymi.",
    b: "Ocenić ryzyko związane z wyborem partnerów i prowadzeniem działalności za granicą."
  },
  {
    section: "Część III • Kompetencje i przyszłość",
    a: "Poznać mechanizmy podejmowania decyzji finansowych i inwestycyjnych.",
    b: "Poznać mechanizmy powstawania i rozwoju międzynarodowych relacji biznesowych."
  },
  {
    section: "Część III • Kompetencje i przyszłość",
    a: "Nauczyć się planować finansowanie działalności i kontrolować koszty przedsiębiorstwa.",
    b: "Nauczyć się organizować i rozwijać działalność własnego przedsiębiorstwa."
  },
  {
    section: "Część III • Kompetencje i przyszłość",
    a: "Rozwijać umiejętność analizy finansowej i zarządzania wartością przedsiębiorstwa.",
    b: "Rozwijać umiejętność analizy rynków i identyfikowania możliwości biznesowych."
  },
  {
    section: "Część III • Kompetencje i przyszłość",
    a: "Przygotowywać rekomendacje dotyczące decyzji finansowych i inwestycyjnych.",
    b: "Przygotowywać rekomendacje dotyczące ekspansji i współpracy międzynarodowej."
  }
];

const scale = [
  { value: 1, label: "Zdecydowanie A" },
  { value: 2, label: "Raczej A" },
  { value: 3, label: "Oba podobnie" },
  { value: 4, label: "Raczej B" },
  { value: 5, label: "Zdecydowanie B" }
];

let current = 0;
let answers = Array(questions.length).fill(null);

const $ = (selector) => document.querySelector(selector);
const introScreen = $("#intro-screen");
const quizScreen = $("#quiz-screen");
const resultScreen = $("#result-screen");
const answerGrid = $("#answer-grid");
const nextButton = $("#next-button");
const backButton = $("#back-button");

function showScreen(screen) {
  [introScreen, quizScreen, resultScreen].forEach((item) => {
    item.hidden = item !== screen;
    item.classList.toggle("active", item === screen);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  screen.focus?.({ preventScroll: true });
}

function buildScale() {
  answerGrid.innerHTML = scale.map(({ value, label }) => `
    <div class="answer-option">
      <input type="radio" name="preference" id="answer-${value}" value="${value}">
      <label for="answer-${value}"><strong>${value}</strong><span>${label}</span></label>
    </div>
  `).join("");

  answerGrid.addEventListener("change", (event) => {
    if (event.target.name !== "preference") return;
    answers[current] = Number(event.target.value);
    nextButton.disabled = false;
    $("#validation-message").textContent = "";
  });
}

function renderQuestion() {
  const question = questions[current];
  const number = current + 1;
  const percent = Math.round((number / questions.length) * 100);

  $("#section-label").textContent = question.section;
  $("#task-a").textContent = question.a;
  $("#task-b").textContent = question.b;
  $("#progress-text").textContent = `Pytanie ${number} z ${questions.length}`;
  $("#progress-percent").textContent = `${percent}%`;
  $("#progress-bar").style.width = `${percent}%`;
  $(".progress-track").setAttribute("aria-valuenow", String(number));
  backButton.disabled = current === 0;
  nextButton.innerHTML = current === questions.length - 1 ? "Zobacz wynik <span aria-hidden=\"true\">→</span>" : "Dalej <span aria-hidden=\"true\">→</span>";

  document.querySelectorAll('input[name="preference"]').forEach((input) => {
    input.checked = Number(input.value) === answers[current];
  });
  nextButton.disabled = answers[current] === null;
  $("#validation-message").textContent = "";
  $("#question-heading").focus?.({ preventScroll: true });
}

function getInterpretation(average, neutralCount, financeCount, businessCount) {
  const manyNeutral = neutralCount >= 6;
  if (manyNeutral) {
    return {
      title: "Obie perspektywy są Ci podobnie bliskie",
      intro: "W wielu pytaniach oba zadania interesowały Cię w podobnym stopniu. To może oznaczać szerokie zainteresowania albo potrzebę lepszego poznania obu specjalności — sam wynik nie rozstrzyga wyboru."
    };
  }
  if (average < 2.5) {
    return {
      title: "Bliżej Ci do perspektywy finansowej",
      intro: "Częściej wybierał(a)eś zadania związane z analizą finansową, inwestycjami, budżetowaniem i kapitałem. Potraktuj to jako wskazówkę do dalszego poznawania specjalności, nie jako gotową decyzję."
    };
  }
  if (average > 3.5) {
    return {
      title: "Bliżej Ci do perspektywy biznesowej",
      intro: "Częściej wybierał(a)eś zadania związane z rynkami, ekspansją, rozwojem firmy i relacjami biznesowymi. Potraktuj to jako wskazówkę do dalszego poznawania specjalności, nie jako gotową decyzję."
    };
  }
  const polarized = financeCount >= 4 && businessCount >= 4;
  return {
    title: "Masz profil mieszany",
    intro: polarized
      ? "Twoja średnia jest blisko środka, ale wynika z wyraźnych wyborów po obu stronach. Możesz łączyć zainteresowania finansowe i biznesowe — warto przyjrzeć się konkretnym przedmiotom, które były Ci najbliższe."
      : "Twoje odpowiedzi nie wskazują wyraźnej przewagi jednej perspektywy. Możliwe, że obie specjalności zawierają obszary zgodne z Twoimi zainteresowaniami."
  };
}

function renderResults() {
  const sum = answers.reduce((total, value) => total + value, 0);
  const average = sum / answers.length;
  const neutralCount = answers.filter((value) => value === 3).length;
  const financeCount = answers.filter((value) => value < 3).length;
  const businessCount = answers.filter((value) => value > 3).length;
  const interpretation = getInterpretation(average, neutralCount, financeCount, businessCount);

  $("#result-title").textContent = interpretation.title;
  $("#result-intro").textContent = interpretation.intro;
  $("#sum-score").textContent = `${sum} / 60`;
  $("#average-score").textContent = average.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $("#neutral-score").textContent = `${neutralCount} / 12`;

  const axisPosition = ((average - 1) / 4) * 100;
  $("#axis-marker").style.left = `${axisPosition}%`;
  $("#balance-description").textContent = average < 2.5
    ? "Niższa średnia oznacza częstszy wybór zadania A, związanego z perspektywą finansową."
    : average > 3.5
      ? "Wyższa średnia oznacza częstszy wybór zadania B, związanego z perspektywą biznesową."
      : "Średnia znajduje się w umownym obszarze preferencji mieszanych (2,50–3,50).";

  $("#distribution").innerHTML = `
    <div class="distribution-item"><strong>${financeCount}</strong><span>odpowiedzi finansowe (1–2)</span></div>
    <div class="distribution-item"><strong>${neutralCount}</strong><span>odpowiedzi neutralne (3)</span></div>
    <div class="distribution-item"><strong>${businessCount}</strong><span>odpowiedzi biznesowe (4–5)</span></div>
  `;

  showScreen(resultScreen);
  $("#result-title").focus?.({ preventScroll: true });
}

function startQuiz() {
  current = 0;
  showScreen(quizScreen);
  renderQuestion();
}

$("#start-button").addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  if (answers[current] === null) {
    $("#validation-message").textContent = "Wybierz odpowiedź, aby przejść dalej.";
    return;
  }
  if (current === questions.length - 1) {
    renderResults();
    return;
  }
  current += 1;
  renderQuestion();
});
backButton.addEventListener("click", () => {
  if (current === 0) return;
  current -= 1;
  renderQuestion();
});
$("#review-button").addEventListener("click", () => {
  current = questions.length - 1;
  showScreen(quizScreen);
  renderQuestion();
});
$("#restart-button").addEventListener("click", () => {
  answers = Array(questions.length).fill(null);
  current = 0;
  showScreen(introScreen);
  $("#start-button").focus();
});

buildScale();
