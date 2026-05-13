const ct8 = window.CT8 || {};
const modules = ct8.modules || [];
const sketches = ct8.sketches || {};
const createQuestionAnimation = sketches.createQuestionAnimation || (() => ({ destroy() {} }));
const getQuestionFigureMarkup = sketches.getQuestionFigureMarkup || (() => "");

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
let completedModules = readCompleted();
let activeHintAnimation = null;
let hintRenderToken = 0;


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
    clue.textContent = content;
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
    text.textContent = step.text || step;

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
  const module = modules[index];
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

    <div class="story-card activity-lab">
      <div class="activity-visual visual-${module.visual}" aria-hidden="true"></div>
      <div class="activity-card">
        <p class="story-highlight">Try this</p>
        <h3>${module.activity.title}</h3>
        <p>${module.activity.prompt}</p>
        <div class="activity-chips">
          ${module.activity.chips
            .map((item, chipIndex) => `<button class="activity-chip" type="button" data-chip="${chipIndex}">${item.title}</button>`)
            .join("")}
        </div>
        <div id="activity-detail" class="activity-detail"></div>
      </div>
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

  const previousButton = document.querySelector("#previous-module");
  const nextButton = document.querySelector("#next-module");
  previousButton.disabled = index === 0;
  nextButton.disabled = index === modules.length - 1;
}

function bindActivityChips(module) {
  const chips = document.querySelectorAll(".activity-chip");
  const detail = document.querySelector("#activity-detail");

  function activate(chipIndex) {
    const item = module.activity.chips[chipIndex];
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
  renderQuestion();
  showSection("section-quiz");
  setActiveNav(String(currentModuleIndex));
}

function renderQuestion() {
  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
  answered = false;

  document.querySelector("#quiz-module-kicker").textContent = `Module ${currentModuleIndex + 1}`;
  document.querySelector("#quiz-title").textContent = module.title;
  document.querySelector("#quiz-score").textContent = quizScore;
  document.querySelector("#question-count").textContent = `Question ${quizIndex + 1} of ${module.quiz.length}`;
  renderQuestionText(question);
  document.querySelector("#feedback").textContent = "";
  document.querySelector("#feedback").className = "feedback";
  document.querySelector("#next-question").disabled = true;

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
    optionText.textContent = option;

    button.append(optionLetter, optionText);
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
    questionText.textContent = question.text;
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

  const title = document.createElement("span");
  title.className = "question-title-line";
  title.textContent = question.format.title;

  const intro = document.createElement("span");
  intro.className = "question-intro-line";
  intro.textContent = question.format.intro;

  const mathBlock = document.createElement("span");
  mathBlock.className = "question-math-block";
  question.format.equations.forEach((equation) => {
    const line = document.createElement("span");
    line.textContent = equation;
    mathBlock.append(line);
  });

  const ask = document.createElement("span");
  ask.className = "question-ask-line";
  ask.textContent = question.format.ask;

  questionText.append(title, intro, mathBlock, ask);
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
  answered = true;

  const module = modules[currentModuleIndex];
  const question = module.quiz[quizIndex];
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

function goToNextQuestion() {
  const module = modules[currentModuleIndex];
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

renderNav();
renderModuleGrid();
bindControls();
updateCompletedView();
