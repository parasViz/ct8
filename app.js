const ct8 = window.CT8 || {};
const modules = ct8.modules || [];
const sketches = ct8.sketches || {};
const createQuestionAnimation = sketches.createQuestionAnimation || (() => ({ destroy() {} }));
const getQuestionFigureMarkup = sketches.getQuestionFigureMarkup || (() => "");
const createActivityVisual = sketches.createActivityVisual || (() => ({ destroy() {} }));

const moduleIds = new Set(modules.map((module) => module.id));
const STORAGE_KEY = "ct8-completed-modules";
const moduleNav = document.querySelector("#module-nav");
const moduleGrid = document.querySelector("#module-grid");
const completedCount = document.querySelector("#completed-count");
const moduleTotal = document.querySelector("#module-total");
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menuToggle");

let currentModuleIndex = 0;
let quizIndex = 0;
let quizScore = 0;
let answered = false;
let selectedAnswers = new Set();
let completedModules = readCompleted();
let activeHintAnimation = null;
let activeActivityVisual = null;
let hintRenderToken = 0;


function destroyActivityVisual() {
  if (activeActivityVisual) {
    activeActivityVisual.destroy();
    activeActivityVisual = null;
  }
}

function destroyPatternVisual() {
  hintRenderToken += 1;

  if (activeHintAnimation) {
    activeHintAnimation.destroy();
    activeHintAnimation = null;
  }

  const host = document.querySelector("#pattern-visual");
  if (host) {
    host.innerHTML = "";
    host.hidden = true;
  }
}

function appendFormattedMathText(parent, value) {
  const text = String(value || "");
  const exponentPattern = /([A-Za-z0-9]|\))\^(\d+)/g;
  let cursor = 0;
  let match;

  function appendPlain(plain) {
    if (!plain) {
      return;
    }
    parent.append(document.createTextNode(plain.replace(/\s+x\s+/gi, " × ")));
  }

  while ((match = exponentPattern.exec(text)) !== null) {
    appendPlain(text.slice(cursor, match.index));
    parent.append(document.createTextNode(match[1]));

    const sup = document.createElement("sup");
    sup.textContent = match[2];
    parent.append(sup);
    cursor = exponentPattern.lastIndex;
  }

  appendPlain(text.slice(cursor));
}

function setQuestionClueContent(clue, content, mode = "") {
  if (!clue) {
    return;
  }

  clue.innerHTML = "";
  clue.classList.remove("stepped-hint", "hint-with-image");

  if (mode) {
    clue.dataset.mode = mode;
  } else {
    delete clue.dataset.mode;
  }

  const hasRichHint = content && typeof content === "object" && !Array.isArray(content);
  const steps = Array.isArray(content) ? content : hasRichHint ? content.steps : null;

  if (!steps && !hasRichHint) {
    appendFormattedMathText(clue, content);
    return;
  }

  clue.classList.add("stepped-hint");
  if (hasRichHint && content.image) {
    clue.classList.add("hint-with-image");
    const figure = document.createElement("figure");
    figure.className = "hint-image-frame";

    const image = document.createElement("img");
    image.src = content.image;
    image.alt = content.alt || "Hint image";
    image.loading = "lazy";

    figure.append(image);
    clue.append(figure);
  }

  if (!steps) {
    return;
  }

  steps.forEach((step, index) => {
    const row = document.createElement("span");
    row.className = "hint-step";

    const badge = document.createElement("span");
    badge.className = "hint-step-badge";
    badge.textContent = step.label || `Step ${index + 1}`;

    const text = document.createElement("span");
    text.className = "hint-step-text";
    appendFormattedMathText(text, step.text || step);

    row.append(badge, text);
    clue.append(row);
  });
}

function preparePatternHint(question) {
  destroyPatternVisual();

  const button = document.querySelector("#pattern-hint-button");
  if (!button) {
    return;
  }

  const hasTextHint = Boolean(question.hint);
  const hasAnimatedHint = Boolean(question.animation);
  const hasHint = hasTextHint || hasAnimatedHint;
  button.hidden = !hasHint;
  button.textContent = "Show hint";
  button.setAttribute("aria-expanded", "false");
  button.onclick = null;

  if (!hasHint) {
    return;
  }

  button.onclick = () => {
    const clue = document.querySelector("#question-clue");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      if (clue && clue.dataset.mode === "hint") {
        clue.classList.remove("show");
        setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.");
      }
      destroyPatternVisual();
      button.textContent = "Show hint";
      button.setAttribute("aria-expanded", "false");
      return;
    }

    if (hasTextHint && clue) {
      setQuestionClueContent(clue, question.hint, "hint");
      clue.classList.add("show");
    }
    if (hasAnimatedHint) {
      renderQuestionAnimation(question);
    }
    button.textContent = "Hide hint";
    button.setAttribute("aria-expanded", "true");
  };
}

async function renderQuestionAnimation(question) {
  const host = document.querySelector("#pattern-visual");
  if (!host || !question.animation) {
    return;
  }

  destroyPatternVisual();
  const token = hintRenderToken;
  host.hidden = false;
  let animation;

  try {
    animation = await createQuestionAnimation(host, question.animation, () => {
      return hintRenderToken === token && !host.hidden;
    });
  } catch (error) {
    if (hintRenderToken === token) {
      host.hidden = true;
      host.innerHTML = "";
    }
    console.error("Unable to load question animation.", error);
    return;
  }

  if (hintRenderToken !== token || host.hidden) {
    animation.destroy();
    return;
  }

  activeHintAnimation = animation;
}

function readCompleted() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? new Set(JSON.parse(value).filter((id) => moduleIds.has(id))) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedModules]));
}

function showSection(sectionId) {
  if (sectionId !== "section-quiz") {
    destroyPatternVisual();
  }

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveNav(target) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    const isActive = button.dataset.navTarget === target;
    button.classList.toggle("active", isActive);
  });
}

function closeSidebarOnMobile() {
  if (window.matchMedia("(max-width: 760px)").matches) {
    sidebar.classList.remove("open");
  }
}

function renderNav() {
  moduleNav.innerHTML = "";

  const welcomeButton = document.createElement("button");
  welcomeButton.className = "nav-item active";
  welcomeButton.type = "button";
  welcomeButton.dataset.navTarget = "welcome";
  welcomeButton.textContent = "Introduction";
  welcomeButton.addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
    closeSidebarOnMobile();
  });
  moduleNav.appendChild(welcomeButton);

  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "nav-item";
    button.type = "button";
    button.dataset.navTarget = String(index);
    button.textContent = `${index + 1} - ${module.shortTitle}`;
    button.addEventListener("click", () => {
      openModule(index);
      closeSidebarOnMobile();
    });
    moduleNav.appendChild(button);
  });

  updateCompletedView();
}

function renderModuleGrid() {
  moduleGrid.innerHTML = "";
  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-card";
    button.type = "button";
    button.dataset.theme = module.theme;
    button.innerHTML = `
      <p class="eyebrow">Module ${index + 1}</p>
      <h3>${module.title}</h3>
      <p>${module.intro}</p>
      <div class="module-meta">
        <span>${module.skill}</span>
        <span>${module.quiz.length} questions</span>
      </div>
    `;
    button.addEventListener("click", () => openModule(index));
    moduleGrid.appendChild(button);
  });
}

function updateCompletedView() {
  completedCount.textContent = completedModules.size;
  if (moduleTotal) {
    moduleTotal.textContent = modules.length;
  }
  document.querySelectorAll(".nav-item[data-nav-target]").forEach((button) => {
    const module = modules[Number(button.dataset.navTarget)];
    if (module) {
      button.classList.toggle("completed", completedModules.has(module.id));
    }
  });
}

function openModule(index) {
  currentModuleIndex = index;
  renderModule(index);
  showSection("section-module");
  setActiveNav(String(index));
}

function renderModule(index) {
  destroyActivityVisual();
  const module = modules[index];
  const hasActivityVisual = !module.activity.hideVisual;
  const hasActivityCard = !module.activity.hideCard;
  const activityFacts = module.activity.facts || [];
  const hasActivityFacts = activityFacts.length > 0;
  const activityContent = hasActivityFacts
    ? `
        <div class="activity-facts">
          ${activityFacts
            .map(
              (item) => `
              <article class="activity-fact">
                <h4>${item.title}</h4>
                <p>${item.text}</p>
              </article>
            `
            )
            .join("")}
        </div>
      `
    : `
        <div class="activity-chips">
          ${(module.activity.chips || [])
            .map((item, chipIndex) => `<button class="activity-chip" type="button" data-chip="${chipIndex}">${item.title}</button>`)
            .join("")}
        </div>
        <div id="activity-detail" class="activity-detail"></div>
      `;
  document.querySelector("#module-kicker").textContent = `Module ${index + 1} - ${module.skill}`;
  document.querySelector("#module-title").textContent = module.title;

  const body = document.querySelector("#module-body");
  body.innerHTML = `
    <div class="story-card">
      <div class="story-text">
        <p class="story-highlight">Learn</p>
        <p>${module.intro}</p>
      </div>
    </div>

    ${
      module.video
        ? `
        <div class="story-card video-card">
          <div class="story-text">
            <p class="story-highlight">Video</p>
            <h3>${module.video.title}</h3>
          </div>
          <div class="video-frame">
            <iframe
              width="1177"
              height="662"
              src="${module.video.embed}"
              title="Number Systerm  | AAW"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <a class="video-link" href="${module.video.url}" target="_blank" rel="noopener noreferrer">Open video on YouTube</a>
        </div>
      `
        : ""
    }

    <div class="lesson-grid">
      ${module.lessons
        .map(
          (item, lessonIndex) => `
          <article class="lesson-card">
            <span class="lesson-badge">Idea ${lessonIndex + 1}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
        )
        .join("")}
    </div>

    <div class="story-card activity-lab${hasActivityVisual ? "" : " activity-lab-no-visual"}${hasActivityCard ? "" : " activity-lab-no-card"}">
      ${hasActivityVisual ? `<div class="activity-visual visual-${module.visual}" aria-hidden="true"></div>` : ""}
      ${hasActivityCard ? `
      <div class="activity-card">
        <p class="story-highlight">${module.activity.label || (hasActivityFacts ? "Quick facts" : "Try this")}</p>
        <h3>${module.activity.title}</h3>
        <p>${module.activity.prompt}</p>
        ${module.activity.tip ? `<aside class="activity-tip"><span class="activity-tip-label">Visualize it</span><p>${module.activity.tip}</p></aside>` : ""}
        ${activityContent}
      </div>` : ""}
    </div>

    <div class="story-card">
      <div class="story-text">
        <p class="story-highlight">Remember</p>
      </div>
      <div class="mini-checks">
        ${module.checks
          .map(
            (item) => `
            <div class="mini-check">
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;

  bindActivityChips(module);
  if (hasActivityVisual) {
    activeActivityVisual = createActivityVisual(body.querySelector(".activity-visual"), module);
  }

  const previousButton = document.querySelector("#previous-module");
  const nextButton = document.querySelector("#next-module");
  previousButton.disabled = index === 0;
  nextButton.disabled = index === modules.length - 1;
}

function bindActivityChips(module) {
  const chips = document.querySelectorAll(".activity-chip");
  const detail = document.querySelector("#activity-detail");
  const activityChips = module.activity.chips || [];

  if (!chips.length || !detail || !activityChips.length) {
    return;
  }

  function activate(chipIndex) {
    const item = activityChips[chipIndex];
    detail.textContent = item.text;
    chips.forEach((chipButton) => {
      chipButton.classList.toggle("active", Number(chipButton.dataset.chip) === chipIndex);
    });
  }

  chips.forEach((chipButton) => {
    chipButton.addEventListener("click", () => activate(Number(chipButton.dataset.chip)));
  });

  activate(0);
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  answered = false;
  selectedAnswers = new Set();
  renderQuestion();
  showSection("section-quiz");
  setActiveNav(String(currentModuleIndex));
}

function renderQuestion() {
  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  const isMultiAnswer = Array.isArray(question.answer);
  answered = false;
  selectedAnswers = new Set();

  document.querySelector("#quiz-module-kicker").textContent = `Module ${currentModuleIndex + 1}`;
  document.querySelector("#quiz-title").textContent = module.title;
  document.querySelector("#quiz-score").textContent = quizScore;
  document.querySelector("#question-count").textContent = `Question ${quizIndex + 1} of ${module.quiz.length}`;
  renderQuestionText(question);
  document.querySelector("#feedback").textContent = "";
  document.querySelector("#feedback").className = "feedback";
  const nextQuestion = document.querySelector("#next-question");
  nextQuestion.disabled = true;
  nextQuestion.textContent = isMultiAnswer ? "Check" : "Next";

  const clue = document.querySelector("#question-clue");
  setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.");
  clue.classList.remove("show");
  preparePatternHint(question);
  renderQuestionFigure(question);

  const progress = ((quizIndex + 1) / module.quiz.length) * 100;
  document.querySelector("#progress-bar").style.width = `${progress}%`;

  const answerOptions = document.querySelector("#answer-options");
  answerOptions.innerHTML = "";
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";

    const optionLetter = document.createElement("span");
    optionLetter.className = "option-letter";
    optionLetter.textContent = String.fromCharCode(65 + optionIndex);

    const optionText = document.createElement("span");
    optionText.className = "option-text";
    appendFormattedMathText(optionText, option);

    button.append(optionLetter, optionText);
    if (isMultiAnswer) {
      button.setAttribute("aria-pressed", "false");
    }
    button.addEventListener("click", () => chooseAnswer(optionIndex));
    answerOptions.appendChild(button);
  });
}

function renderQuestionText(question) {
  const questionText = document.querySelector("#question-text");
  questionText.innerHTML = "";
  questionText.className = question.format
    ? `formatted-question ${question.format.type ? `${question.format.type}-question` : ""}`.trim()
    : "";

  if (!question.format) {
    appendFormattedMathText(questionText, question.text);
    return;
  }

  if (question.format.type === "gridChallenge") {
    renderGridChallengeQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "cubeCompletion") {
    renderCubeCompletionQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "gaussSum") {
    renderGaussSumQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "columnRules") {
    renderColumnRulesQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "digitClues") {
    renderDigitCluesQuestion(questionText, question.format);
    return;
  }

  if (question.format.type === "committeeRules") {
    renderCommitteeRulesQuestion(questionText, question.format);
    return;
  }

  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = question.format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = question.format.intro;

  const hasEquations = Array.isArray(question.format.equations) && question.format.equations.length > 0;
  const mathBlock = document.createElement("span");
  mathBlock.className = "question-math-block";
  if (hasEquations) {
    question.format.equations.forEach((equation) => {
      const line = document.createElement("span");
      appendFormattedMathText(line, equation);
      mathBlock.append(line);
    });
  }

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  appendFormattedMathText(ask, question.format.ask);

  questionText.append(title, intro);
  if (hasEquations) {
    questionText.append(mathBlock);
  }
  questionText.append(ask);
}

function renderDigitCluesQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const card = document.createElement("span");
  card.className = "digit-question-card";

  const intro = document.createElement("span");
  intro.className = "digit-meaning";
  const introLabel = document.createElement("strong");
  introLabel.textContent = "What AB means";
  const introText = document.createElement("span");
  appendFormattedMathText(introText, format.intro);
  intro.append(introLabel, introText);

  const rangeRow = document.createElement("span");
  rangeRow.className = "digit-range-row";
  const rangeLabel = document.createElement("span");
  rangeLabel.textContent = format.rangeLabel || "The square of AB is between:";
  const range = document.createElement("strong");
  range.className = "digit-clue-range";
  appendFormattedMathText(range, format.range);
  rangeRow.append(rangeLabel, range);

  const cluesTitle = document.createElement("span");
  cluesTitle.className = "digit-clues-title";
  cluesTitle.textContent = format.cluesTitle || "Use the clues:";

  const clueList = document.createElement("span");
  clueList.className = "digit-clue-list";
  format.clues.forEach((clue) => {
    const clueRow = document.createElement("span");
    clueRow.className = "digit-clue-row";

    const label = document.createElement("strong");
    label.textContent = clue.label;

    const text = document.createElement("span");
    appendFormattedMathText(text, clue.text);

    clueRow.append(label, text);
    clueList.append(clueRow);
  });

  card.append(intro, rangeRow, cluesTitle, clueList);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  appendFormattedMathText(ask, format.ask);

  questionText.append(title, card, ask);
}

function renderCommitteeRulesQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const card = document.createElement("span");
  card.className = "committee-question-card";

  const top = document.createElement("span");
  top.className = "committee-top-row";

  const intro = document.createElement("span");
  intro.className = "committee-intro";
  intro.textContent = format.intro;

  const badge = document.createElement("strong");
  badge.className = "committee-badge";
  badge.textContent = format.badge || "Choose 3";

  top.append(intro, badge);

  const people = document.createElement("span");
  people.className = "committee-people";
  format.people.forEach((name) => {
    const chip = document.createElement("span");
    chip.textContent = name;
    people.append(chip);
  });

  const rulesTitle = document.createElement("span");
  rulesTitle.className = "committee-rules-title";
  rulesTitle.textContent = "Rules";

  const rules = document.createElement("span");
  rules.className = "committee-rules";
  format.rules.forEach((rule, index) => {
    const row = document.createElement("span");
    row.className = "committee-rule-row";

    const number = document.createElement("strong");
    number.textContent = index + 1;

    const text = document.createElement("span");
    text.textContent = rule;

    row.append(number, text);
    rules.append(row);
  });

  card.append(top, people, rulesTitle, rules);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, card, ask);
}

function renderQuestionFigure(question) {
  const host = document.querySelector("#question-figure");

  if (!host) {
    return;
  }

  host.innerHTML = "";
  host.hidden = true;

  if (!question.figure) {
    return;
  }

  const markup = getQuestionFigureMarkup(question.figure);
  if (markup) {
    host.hidden = false;
    host.innerHTML = markup;
  }
}

function renderColumnRulesQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const tableWrap = document.createElement("span");
  tableWrap.className = "column-table-wrap";

  const table = document.createElement("table");
  table.className = "column-rules-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  format.headers.forEach((header) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = header;
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = document.createElement("tbody");
  format.rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      if (cell === "?") {
        td.className = "unknown-cell";
      }
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrap.append(table);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, intro, tableWrap, ask);
}

function renderGaussSumQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const story = document.createElement("span");
  story.className = "gauss-story";
  format.story.forEach((paragraph) => {
    const line = document.createElement("span");
    line.textContent = paragraph;
    story.append(line);
  });

  const work = document.createElement("span");
  work.className = "gauss-work";

  const sumLine = document.createElement("span");
  sumLine.className = "gauss-sum-line";
  sumLine.textContent = format.equation;

  work.append(sumLine);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, story, work, ask);
}

function renderCubeCompletionQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const examples = document.createElement("span");
  examples.className = "cube-example-row";
  format.examples.forEach((example) => {
    const exampleLine = createFactorExpression(example.value, example.factors, "cube-example");
    examples.append(exampleLine);
  });

  const work = document.createElement("span");
  work.className = "cube-work-panel";

  const givenLabel = document.createElement("span");
  givenLabel.className = "cube-work-label";
  givenLabel.textContent = format.given.label;

  const givenLine = createFactorExpression(format.given.value, format.given.factors, "cube-given", {
    markLast: true
  });

  const targetLine = document.createElement("span");
  targetLine.className = "cube-target-equation";
  const [start, multiplier, ...cubeFactors] = format.target;
  addMathToken(targetLine, start);
  addMathOperator(targetLine, "x");
  addMathToken(targetLine, multiplier, "cube-unknown");
  addMathOperator(targetLine, "=");
  cubeFactors.forEach((factor, index) => {
    addMathToken(targetLine, factor);
    if (index < cubeFactors.length - 1) {
      addMathOperator(targetLine, "x");
    }
  });

  work.append(givenLabel, givenLine, targetLine);

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  questionText.append(title, intro, examples, work, ask);
}

function createFactorExpression(value, factors, className, options = {}) {
  const line = document.createElement("span");
  line.className = className;
  addMathToken(line, value, "cube-value");
  addMathOperator(line, "=");
  factors.forEach((factor, index) => {
    addMathToken(line, factor, options.markLast && index === factors.length - 1 ? "cube-loose-factor" : "");
    if (index < factors.length - 1) {
      addMathOperator(line, "x");
    }
  });
  return line;
}

function addMathToken(parent, text, className = "") {
  const token = document.createElement("span");
  token.className = `cube-math-token ${className}`.trim();
  token.textContent = text;
  parent.append(token);
}

function addMathOperator(parent, text) {
  const operator = document.createElement("span");
  operator.className = "cube-math-operator";
  operator.textContent = text;
  parent.append(operator);
}

function renderGridChallengeQuestion(questionText, format) {
  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = format.title;

  const layout = document.createElement("span");
  layout.className = "grid-question-layout";

  const entryPanel = document.createElement("span");
  entryPanel.className = "grid-entry-panel";

  const entryGrid = document.createElement("span");
  entryGrid.className = "grid-entry-grid";
  Array.from({ length: 9 }, (_, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.className = [0, 4, 8].includes(index) ? "diagonal" : "";
    input.setAttribute("aria-label", `Grid cell ${index + 1}`);
    entryGrid.append(input);
  });

  const status = document.createElement("span");
  status.className = "grid-entry-status";
  status.textContent = "Fill the grid.";

  const clearButton = document.createElement("button");
  clearButton.className = "grid-entry-clear";
  clearButton.type = "button";
  clearButton.textContent = "Clear";

  entryPanel.append(entryGrid, status, clearButton);

  const copy = document.createElement("span");
  copy.className = "grid-question-copy";

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = format.intro;

  const rules = document.createElement("span");
  rules.className = "grid-question-rules";
  format.rules.forEach((rule, index) => {
    const rulePill = document.createElement("span");
    const badge = document.createElement("b");
    badge.textContent = index + 1;
    const label = document.createElement("strong");
    label.textContent = rule.label;
    const text = document.createElement("em");
    text.textContent = rule.text;
    rulePill.append(badge, label, text);
    rules.append(rulePill);
  });

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = format.ask;

  copy.append(intro, rules, ask);
  layout.append(entryPanel, copy);
  questionText.append(title, layout);
  setupGridChallenge(entryPanel);
}

function setupGridChallenge(entryPanel) {
  const inputs = [...entryPanel.querySelectorAll(".grid-entry-grid input")];
  const status = entryPanel.querySelector(".grid-entry-status");
  const clearButton = entryPanel.querySelector(".grid-entry-clear");
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  const cols = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  const diagonal = [0, 4, 8];

  const validate = () => {
    const values = inputs.map((input) => input.value);
    const invalid = new Set();
    const filled = values.filter(Boolean).length;

    inputs.forEach((input) => input.classList.remove("right", "wrong", "diagonal-win"));
    status.className = "grid-entry-status";

    const markLineIssues = (line) => {
      const counts = new Map();
      line.forEach((index) => {
        const value = values[index];
        if (value) {
          counts.set(value, (counts.get(value) || 0) + 1);
        }
      });
      line.forEach((index) => {
        const value = values[index];
        if (value && counts.get(value) > 1) {
          invalid.add(index);
        }
      });
    };

    [...rows, ...cols].forEach(markLineIssues);

    if (filled === inputs.length) {
      const diagonalSum = diagonal.reduce((sum, index) => sum + Number(values[index]), 0);
      if (diagonalSum !== 9) {
        diagonal.forEach((index) => invalid.add(index));
      }
    }

    invalid.forEach((index) => inputs[index].classList.add("wrong"));

    if (filled === 0) {
      status.textContent = "Fill the grid.";
      return;
    }

    if (invalid.size) {
      status.textContent = "Check the red boxes.";
      status.classList.add("wrong");
      return;
    }

    if (filled === inputs.length) {
      inputs.forEach((input) => input.classList.add("right"));
      diagonal.forEach((index) => inputs[index].classList.add("diagonal-win"));
      status.textContent = "Correct grid. Diagonal sum = 9.";
      status.classList.add("right");
      return;
    }

    status.textContent = "Looks good so far.";
  };

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^1-3]/g, "").slice(0, 1);
      validate();
      if (input.value && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    });
  });

  clearButton.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
    validate();
    inputs[0].focus();
  });

  validate();
}

function chooseAnswer(optionIndex) {
  if (answered) {
    return;
  }

  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  if (Array.isArray(question.answer)) {
    toggleMultiAnswer(optionIndex);
    return;
  }

  answered = true;
  const buttons = document.querySelectorAll(".answer-option");
  const feedback = document.querySelector("#feedback");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) {
      button.classList.add("correct");
    }
    if (index === optionIndex && optionIndex !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (optionIndex === question.answer) {
    quizScore += 1;
    feedback.textContent = "Correct. Nice reasoning.";
    feedback.classList.add("good");
  } else {
    feedback.textContent = `Not quite. The answer is ${question.options[question.answer]}.`;
    feedback.classList.add("try");
    const clue = document.querySelector("#question-clue");
    setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.", "answer");
    clue.classList.add("show");
  }

  document.querySelector("#quiz-score").textContent = quizScore;
  document.querySelector("#next-question").disabled = false;
}

function toggleMultiAnswer(optionIndex) {
  const buttons = document.querySelectorAll(".answer-option");
  const nextQuestion = document.querySelector("#next-question");

  if (selectedAnswers.has(optionIndex)) {
    selectedAnswers.delete(optionIndex);
  } else {
    selectedAnswers.add(optionIndex);
  }

  buttons[optionIndex].classList.toggle("selected", selectedAnswers.has(optionIndex));
  buttons[optionIndex].setAttribute("aria-pressed", String(selectedAnswers.has(optionIndex)));
  nextQuestion.disabled = selectedAnswers.size === 0;
}

function checkMultiAnswer() {
  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  const correctAnswers = new Set(question.answer);
  const buttons = document.querySelectorAll(".answer-option");
  const feedback = document.querySelector("#feedback");
  const chosenAnswers = new Set(selectedAnswers);
  const isCorrect =
    chosenAnswers.size === correctAnswers.size &&
    [...chosenAnswers].every((answerIndex) => correctAnswers.has(answerIndex));

  answered = true;
  buttons.forEach((button, index) => {
    button.disabled = true;
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", String(chosenAnswers.has(index)));

    if (correctAnswers.has(index)) {
      button.classList.add("correct");
    } else if (chosenAnswers.has(index)) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    quizScore += 1;
    feedback.textContent = "Correct. You found all matching choices.";
    feedback.classList.add("good");
  } else {
    const correctLabels = question.answer
      .map((answerIndex) => question.options[answerIndex])
      .join(" and ");
    feedback.textContent = `Not quite. The answers are ${correctLabels}.`;
    feedback.classList.add("try");
    const clue = document.querySelector("#question-clue");
    setQuestionClueContent(clue, question.clue || "Think about the rule, then test each option.", "answer");
    clue.classList.add("show");
  }

  document.querySelector("#quiz-score").textContent = quizScore;
  const nextQuestion = document.querySelector("#next-question");
  nextQuestion.textContent = "Next";
  nextQuestion.disabled = false;
}

function goToNextQuestion() {
  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];

  if (Array.isArray(question.answer) && !answered) {
    checkMultiAnswer();
    return;
  }

  if (quizIndex < module.quiz.length - 1) {
    quizIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const module = modules[currentModuleIndex];
  completedModules.add(module.id);
  saveCompleted();
  updateCompletedView();

  document.querySelector("#result-module").textContent = module.title;
  document.querySelector("#final-score").textContent = quizScore;

  const title = document.querySelector("#result-title");
  const message = document.querySelector("#result-message");
  if (quizScore === module.quiz.length) {
    title.textContent = "Perfect score!";
    message.textContent = "You used the ideas carefully and checked the rules like a real CT explorer.";
  } else if (quizScore >= Math.ceil(module.quiz.length * 0.6)) {
    title.textContent = "Module complete";
    message.textContent = "Good work. Review the missed ideas once and your reasoning will get sharper.";
  } else {
    title.textContent = "Keep practicing";
    message.textContent = "The module is marked complete, but try again to strengthen the main ideas.";
  }

  showSection("section-result");
  setActiveNav(String(currentModuleIndex));
}

function bindControls() {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.querySelector("#back-to-home").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });

  document.querySelector("#back-to-module").addEventListener("click", () => {
    openModule(currentModuleIndex);
  });

  document.querySelector("#previous-module").addEventListener("click", () => {
    if (currentModuleIndex > 0) {
      openModule(currentModuleIndex - 1);
    }
  });

  document.querySelector("#next-module").addEventListener("click", () => {
    if (currentModuleIndex < modules.length - 1) {
      openModule(currentModuleIndex + 1);
    }
  });

  document.querySelector("#start-quiz").addEventListener("click", startQuiz);
  document.querySelector("#next-question").addEventListener("click", goToNextQuestion);

  document.querySelector("#choose-another").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });

  document.querySelector("#retry-module").addEventListener("click", startQuiz);

  document.querySelector("#result-choose-another").addEventListener("click", () => {
    showSection("section-welcome");
    setActiveNav("welcome");
  });
}

function createImagePreviewModal() {
  const modal = document.createElement("div");
  modal.className = "image-preview-modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Image preview");

  const backdrop = document.createElement("button");
  backdrop.className = "image-preview-backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Close image preview");

  const panel = document.createElement("div");
  panel.className = "image-preview-panel";

  const closeButton = document.createElement("button");
  closeButton.className = "image-preview-close";
  closeButton.type = "button";
  closeButton.textContent = "Close";

  const previewImage = document.createElement("img");
  previewImage.decoding = "async";

  const caption = document.createElement("p");
  caption.className = "image-preview-caption";

  panel.append(closeButton, previewImage, caption);
  modal.append(backdrop, panel);
  document.body.append(modal);

  let previousFocus = null;

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    previewImage.removeAttribute("src");
    if (previousFocus) {
      previousFocus.focus();
    }
  };

  const open = (sourceImage) => {
    previousFocus = document.activeElement;
    previewImage.src = sourceImage.src;
    previewImage.alt = sourceImage.alt || "Preview image";
    caption.textContent = sourceImage.alt || "";
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  backdrop.addEventListener("click", close);
  closeButton.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") {
      close();
    }
  });

  return { open };
}

function bindThinkingImagePreview() {
  const previewModal = createImagePreviewModal();

  document.querySelectorAll(".thinking-picture img").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Open ${image.alt || "image"} preview`);

    image.addEventListener("click", () => previewModal.open(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        previewModal.open(image);
      }
    });
  });
}

renderNav();
renderModuleGrid();
bindControls();
bindThinkingImagePreview();
updateCompletedView();
