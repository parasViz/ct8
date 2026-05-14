function patternPowerAnimationMarkup(animation) {
  return `
    <article class="power-hint-card" aria-label="Pattern Power animated hint">
      <header class="power-hint-head">
        <p>Module 1 - Pattern Power</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="power-hint-scene">
        <div class="power-step-label">loading...</div>
        <div class="power-eq-bar">
          <span class="power-eq-left"></span>
          <span class="power-eq-minus">-</span>
          <span class="power-eq-right"></span>
          <span class="power-eq-equals">=</span>
          <span class="power-eq-result"></span>
        </div>
        <div class="power-annotation"></div>
        <div class="power-grid-wrap">
          <div class="power-grid-container"></div>
        </div>
      </div>
      <div class="power-progress-track"><div class="power-progress-fill"></div></div>
      <div class="power-dots" aria-label="Animation steps"></div>
      <div class="power-controls">
        <button class="power-pause" type="button">pause</button>
        <button class="power-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createPatternPowerAnimation(host) {
  const steps = [{ n: 2 }, { n: 3 }, { n: 4 }];
  const timings = {
    buildStagger: 60,
    waitAfterBuild: 2000,
    fadeInner: 800,
    glowDelay: 300,
    badgeDelay: 400,
    holdResult: 2500
  };
  const state = {
    paused: false,
    timers: [],
    stepIndex: 0
  };
  const find = (selector) => host.querySelector(selector);

  function setPowerText(element, base, exponent) {
    element.innerHTML = "";
    element.append(document.createTextNode(String(base)));
    const sup = document.createElement("sup");
    sup.textContent = exponent;
    element.append(sup);
  }

  function schedule(fn, ms) {
    const id = window.setTimeout(() => {
      if (!state.paused) {
        fn();
      }
    }, ms);
    state.timers.push(id);
  }

  function clearAll() {
    state.timers.forEach((id) => window.clearTimeout(id));
    state.timers = [];
  }

  function renderDots(active, final = false) {
    const dots = find(".power-dots");
    if (!dots) {
      return;
    }
    dots.innerHTML = "";
    steps.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `power-dot${!final && index === active ? " active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to example ${index + 1}`);
      dot.addEventListener("click", () => jumpTo(index));
      dots.append(dot);
    });
    if (final) {
      const dot = document.createElement("span");
      dot.className = "power-dot active";
      dots.append(dot);
    }
  }

  function resetUI() {
    const minus = find(".power-eq-minus");
    const right = find(".power-eq-right");
    const equals = find(".power-eq-equals");
    const result = find(".power-eq-result");
    const left = find(".power-eq-left");
    const annotation = find(".power-annotation");
    const progress = find(".power-progress-fill");
    const gridWrap = find(".power-grid-wrap");

    [minus, right, equals, result].forEach((item) => {
      if (item) {
        item.style.opacity = "0";
      }
    });
    if (result) {
      result.style.transform = "scale(0.8)";
      result.style.color = "#16a34a";
    }
    if (left) {
      left.style.color = "#3b6fe0";
    }
    if (annotation) {
      annotation.style.opacity = "0";
    }
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
    if (gridWrap) {
      gridWrap.style.display = "flex";
    }
  }

  function runStep(stepNumber) {
    state.stepIndex = stepNumber;
    clearAll();
    if (stepNumber >= steps.length) {
      showFinal();
      return;
    }

    const { n } = steps[stepNumber];
    const result = 2 * n - 1;
    resetUI();
    renderDots(stepNumber);

    find(".power-step-label").textContent = `Example ${stepNumber + 1} of ${steps.length}`;
    setPowerText(find(".power-eq-left"), n, 2);
    setPowerText(find(".power-eq-right"), n - 1, 2);
    find(".power-eq-result").textContent = result;

    const cellSize = n <= 3 ? 42 : 36;
    const gap = n <= 3 ? 5 : 4;
    const grid = find(".power-grid-container");
    grid.innerHTML = "";
    grid.style.setProperty("--gap", `${gap}px`);
    grid.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;

    const cells = [];
    for (let row = 0; row < n; row += 1) {
      for (let col = 0; col < n; col += 1) {
        const cell = document.createElement("div");
        cell.className = "power-cell";
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.animation = `powerCellPop .4s ease-out ${(row * n + col) * timings.buildStagger}ms forwards`;
        grid.append(cell);
        cells.push({ el: cell, row, col });
      }
    }

    const buildDone = n * n * timings.buildStagger + 400;
    schedule(() => {
      find(".power-eq-minus").style.opacity = "1";
      find(".power-eq-right").style.opacity = "1";
    }, buildDone + timings.waitAfterBuild - 200);

    schedule(() => {
      cells.forEach(({ el, row, col }) => {
        if (row < n - 1 && col < n - 1) {
          el.style.transition = `opacity ${timings.fadeInner}ms ease, transform ${timings.fadeInner}ms ease, background ${timings.fadeInner}ms ease`;
          el.style.opacity = "0.07";
          el.style.transform = "scale(0.82)";
          el.style.background = "#e2e8f0";
        }
      });
    }, buildDone + timings.waitAfterBuild);

    schedule(() => {
      cells.forEach(({ el, row, col }) => {
        if (!(row < n - 1 && col < n - 1)) {
          el.style.animation = "none";
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
          el.style.background = "#16a34a";
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              el.style.animation = "powerLGlow 1.4s ease-in-out infinite";
            });
          });
        }
      });

      find(".power-eq-left").style.color = "#16a34a";
      find(".power-eq-equals").style.opacity = "1";
      const eqResult = find(".power-eq-result");
      eqResult.style.opacity = "1";
      eqResult.style.transform = "scale(1)";
    }, buildDone + timings.waitAfterBuild + timings.fadeInner + timings.glowDelay);

    const resultAt = buildDone + timings.waitAfterBuild + timings.fadeInner + timings.glowDelay + timings.badgeDelay + 300;

    schedule(() => {
      const progress = find(".power-progress-fill");
      progress.style.transition = `width ${timings.holdResult}ms linear`;
      progress.style.width = "100%";
    }, resultAt);

    schedule(() => runStep(stepNumber + 1), resultAt + timings.holdResult);
  }

  function showFinal() {
    clearAll();
    resetUI();
    renderDots(steps.length, true);
    find(".power-step-label").textContent = "Your turn";
    find(".power-grid-container").innerHTML = "";
    find(".power-grid-wrap").style.display = "none";
    setPowerText(find(".power-eq-left"), 50, 2);
    setPowerText(find(".power-eq-right"), 49, 2);
    const result = find(".power-eq-result");
    result.textContent = "?";
    result.style.color = "#ea580c";

    schedule(() => {
      find(".power-eq-minus").style.opacity = "1";
      find(".power-eq-right").style.opacity = "1";
    }, 400);

    schedule(() => {
      find(".power-eq-equals").style.opacity = "1";
      result.style.opacity = "1";
      result.style.transform = "scale(1)";
    }, 1000);

    schedule(() => {
      const progress = find(".power-progress-fill");
      progress.style.transition = "width 5s linear";
      progress.style.width = "100%";
    }, 1800);

    schedule(restart, 6800);
  }

  function togglePause() {
    state.paused = !state.paused;
    find(".power-pause").textContent = state.paused ? "play" : "pause";
    if (!state.paused) {
      runStep(state.stepIndex);
    }
  }

  function restart() {
    clearAll();
    state.paused = false;
    find(".power-pause").textContent = "pause";
    runStep(0);
  }

  function jumpTo(index) {
    clearAll();
    state.paused = false;
    find(".power-pause").textContent = "pause";
    runStep(index);
  }

  find(".power-pause").addEventListener("click", togglePause);
  find(".power-restart").addEventListener("click", restart);
  restart();

  return {
    destroy: clearAll
  };
}

function powerSquareCompareAnimationMarkup(animation) {
  return `
    <article class="square-compare-card" aria-label="Power comparison animated hint">
      <header class="square-compare-head">
        <p>Square trick</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="square-compare-p5"></div>
      <div class="square-compare-readout" aria-live="polite">
        <span class="square-compare-status">Split each power into side x side.</span>
        <strong class="square-compare-result">Compare the side lengths</strong>
      </div>
    </article>
  `;
}

function createPowerSquareCompareAnimation(host, animation) {
  const fallbackItems = [
    { label: "A", power: "5^4", split: "5^2 x 5^2", square: "25 x 25", side: 25 },
    { label: "B", power: "2^8", split: "2^4 x 2^4", square: "16 x 16", side: 16 },
    { label: "C", power: "3^6", split: "3^3 x 3^3", square: "27 x 27", side: 27 },
    { label: "D", power: "4^4", split: "4^2 x 4^2", square: "16 x 16", side: 16 }
  ];
  const items = Array.isArray(animation.items) && animation.items.length ? animation.items : fallbackItems;
  const canvasHost = host.querySelector(".square-compare-p5");
  const status = host.querySelector(".square-compare-status");
  const result = host.querySelector(".square-compare-result");
  const maxSide = Math.max(...items.map((item) => Number(item.side) || 0));
  const winnerIndex = items.findIndex((item) => Number(item.side) === maxSide);
  const winner = items[winnerIndex] || items[0];
  const superscripts = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹"
  };
  const formatExpression = (value) => String(value || "")
    .replace(/\^(\d+)/g, (_, exponent) => [...exponent].map((digit) => superscripts[digit] || digit).join(""))
    .replace(/\s+x\s+/gi, " × ");

  if (!canvasHost || !window.p5) {
    if (canvasHost) {
      canvasHost.innerHTML = `<div class="activity-p5-fallback">${formatExpression(winner.power)} makes ${formatExpression(winner.square)}, so it has the biggest side.</div>`;
    }
    if (status) {
      status.textContent = "Compare the square side lengths.";
    }
    if (result) {
      result.textContent = `${winner.label}. ${formatExpression(winner.power)}`;
    }
    return { destroy() {} };
  }

  const state = {
    canvasWidth: 640,
    canvasHeight: 340,
    lastReadout: ""
  };

  const sketch = new window.p5((p) => {
    const stepMs = 1800;
    const finalHoldMs = 3000;
    let startTime = 0;

    function fitCanvas() {
      const parentWidth = canvasHost.clientWidth || 760;
      state.canvasWidth = Math.max(300, Math.min(parentWidth, 780));
      state.canvasHeight = state.canvasWidth < 520 ? 430 : 380;
      p.resizeCanvas(state.canvasWidth, state.canvasHeight);
    }

    function easeOut(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    function optionLayout() {
      const compact = state.canvasWidth < 520;
      const cols = compact ? 2 : 4;
      const rows = Math.ceil(items.length / cols);
      const margin = compact ? 14 : 16;
      const gap = compact ? 12 : 14;
      const top = compact ? 18 : 20;
      const cardW = (state.canvasWidth - margin * 2 - gap * (cols - 1)) / cols;
      const cardH = (state.canvasHeight - top - 52 - gap * (rows - 1)) / rows;

      return { compact, cols, margin, gap, top, cardW, cardH };
    }

    function drawGridSquare(squareX, squareY, squareSize, side, active, winnerActive, pulse) {
      const half = squareSize / 2;
      const gridLines = Math.max(2, Math.min(27, side));
      const lineGap = squareSize / gridLines;
      const baseColor = winnerActive ? "#6366f1" : active ? "#fb923c" : "#60a5fa";
      const gridColor = winnerActive ? "#3730a3" : active ? "#c2410c" : "#1d4ed8";

      p.push();
      p.translate(squareX, squareY);
      p.scale(pulse);
      p.noStroke();
      p.fill(baseColor);
      p.rect(-half, -half, squareSize, squareSize, 8);

      p.fill(255, 255, 255, 62);
      p.rect(-half + 5, -half + 5, squareSize * 0.38, squareSize * 0.38, 5);

      p.stroke(255, 255, 255, 125);
      p.strokeWeight(squareSize < 58 ? 0.65 : 0.85);
      for (let i = 1; i < gridLines; i += 1) {
        const pos = -half + i * lineGap;
        p.line(pos, -half, pos, half);
        p.line(-half, pos, half, pos);
      }

      p.noFill();
      p.stroke(gridColor);
      p.strokeWeight(2);
      p.rect(-half, -half, squareSize, squareSize, 8);
      p.pop();
    }

    function drawCard(item, index, layout, activeIndex, progress, finalMode) {
      const col = index % layout.cols;
      const row = Math.floor(index / layout.cols);
      const x = layout.margin + col * (layout.cardW + layout.gap);
      const y = layout.top + row * (layout.cardH + layout.gap);
      const side = Number(item.side) || 0;
      const isActive = index === activeIndex && !finalMode;
      const isPast = finalMode || index < activeIndex;
      const isWinner = index === winnerIndex;
      const reveal = finalMode || isPast ? 1 : isActive ? easeOut(progress) : 0;
      const sideRatio = maxSide ? side / maxSide : 1;
      const maxSquareSize = Math.min(layout.cardW * 0.58, layout.cardH * 0.42);
      const targetSquareSize = maxSquareSize * (0.56 + sideRatio * 0.44);
      const squareSize = 16 + (targetSquareSize - 16) * reveal;
      const pulse = finalMode && isWinner ? 1 + Math.sin(p.frameCount * 0.12) * 0.03 : 1;
      const borderColor = isWinner && finalMode ? "#6366f1" : isActive ? "#f97316" : "#dbe5f1";

      p.push();
      p.noStroke();
      p.fill(isWinner && finalMode ? "#eef2ff" : isActive ? "#fff7ed" : "#ffffff");
      p.rect(x, y, layout.cardW, layout.cardH, 12);
      p.noFill();
      p.stroke(borderColor);
      p.strokeWeight(isWinner && finalMode ? 3 : isActive ? 2.5 : 1.5);
      p.rect(x, y, layout.cardW, layout.cardH, 12);

      p.noStroke();
      p.fill(isWinner && finalMode ? "#4338ca" : "#172033");
      p.textAlign(p.LEFT, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(layout.compact ? 13 : 14);
      p.text(`${item.label}. ${formatExpression(item.power)}`, x + 12, y + 18);

      p.fill("#64748b");
      p.textStyle(p.NORMAL);
      p.textSize(layout.compact ? 10 : 11);
      p.text(formatExpression(item.split), x + 12, y + 39);

      const squareX = x + layout.cardW / 2;
      const squareY = y + layout.cardH * 0.63;
      drawGridSquare(squareX, squareY, squareSize, side, isActive, isWinner && finalMode, pulse);

      if (reveal > 0.25) {
        p.noStroke();
        p.fill(isWinner && finalMode ? "#4338ca" : "#334155");
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(layout.compact ? 11 : 12);
        p.text(formatExpression(item.square), squareX, y + layout.cardH - 22);

        const lineY = squareY - squareSize / 2 - 9;
        p.stroke(isWinner && finalMode ? "#4338ca" : "#64748b");
        p.strokeWeight(1.5);
        p.line(squareX - squareSize / 2, lineY, squareX + squareSize / 2, lineY);
        p.line(squareX - squareSize / 2, lineY - 4, squareX - squareSize / 2, lineY + 4);
        p.line(squareX + squareSize / 2, lineY - 4, squareX + squareSize / 2, lineY + 4);
        p.noStroke();
        p.fill(isWinner && finalMode ? "#4338ca" : "#475569");
        p.textSize(10);
        p.text(`side ${side}`, squareX, lineY - 10);
      }

      if (finalMode && isWinner) {
        p.noStroke();
        p.fill("#4338ca");
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(11);
        p.text("largest side", squareX, y + 58);
      }

      p.pop();
    }

    function updateReadout(activeIndex, finalMode) {
      const active = items[activeIndex] || winner;
      const key = `${activeIndex}:${finalMode}`;

      if (state.lastReadout === key) {
        return;
      }
      state.lastReadout = key;

      if (finalMode) {
        status.textContent = `The biggest square side is ${winner.side}, so ${formatExpression(winner.power)} is greatest.`;
        result.textContent = `${winner.label}. ${formatExpression(winner.power)}`;
        return;
      }

      status.textContent = `${formatExpression(active.power)} becomes ${formatExpression(active.split)}, so compare ${formatExpression(active.square)}.`;
      result.textContent = `side ${active.side}`;
    }

    p.setup = () => {
      const canvas = p.createCanvas(10, 10);
      canvas.parent(canvasHost);
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(45);
      p.textFont("system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif");
      startTime = p.millis();
      fitCanvas();
    };

    p.windowResized = fitCanvas;

    p.draw = () => {
      const cycleMs = items.length * stepMs + finalHoldMs;
      const elapsed = (p.millis() - startTime) % cycleMs;
      const finalMode = elapsed >= items.length * stepMs;
      const activeIndex = finalMode ? winnerIndex : Math.min(items.length - 1, Math.floor(elapsed / stepMs));
      const stepProgress = finalMode ? 1 : (elapsed - activeIndex * stepMs) / stepMs;
      const layout = optionLayout();

      p.background("#f8fbff");
      p.noStroke();
      p.fill("#eef7ff");
      p.rect(8, 8, state.canvasWidth - 16, state.canvasHeight - 16, 16);

      items.forEach((item, index) => {
        drawCard(item, index, layout, activeIndex, stepProgress, finalMode);
      });

      p.noStroke();
      p.fill("#334155");
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(layout.compact ? 12 : 13);
      p.text("Same square idea: bigger side makes bigger square", state.canvasWidth / 2, state.canvasHeight - 24);

      updateReadout(activeIndex, finalMode);
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function owlTreePairsAnimationMarkup(animation) {
  const owls = animation.owls || 4;
  const trees = animation.trees || 6;

  return `
    <article class="pair-hint-card" aria-label="Owl and tree pairs animated hint">
      <header class="pair-hint-head">
        <p>Pairing hint</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="pair-p5-canvas"></div>
      <div class="pair-readout" aria-live="polite">
        <span class="pair-status">Build ${owls} rows of ${trees} choices.</span>
        <strong class="pair-equation">${owls} x ${trees} = ${owls * trees}</strong>
      </div>
    </article>
  `;
}

function createOwlTreePairsAnimation(host, animation) {
  const canvasHost = host.querySelector(".pair-p5-canvas");
  const status = host.querySelector(".pair-status");
  const equation = host.querySelector(".pair-equation");
  const owls = Math.max(1, Number(animation.owls) || 4);
  const trees = Math.max(1, Number(animation.trees) || 6);
  const total = owls * trees;

  if (!canvasHost || !window.p5) {
    if (canvasHost) {
      canvasHost.innerHTML = `<div class="activity-p5-fallback">${owls} owls x ${trees} trees = ${total} pairs.</div>`;
    }
    if (status) {
      status.textContent = `Make ${owls} rows with ${trees} pairs in each row.`;
    }
    if (equation) {
      equation.textContent = `${owls} x ${trees} = ${total}`;
    }
    return { destroy() {} };
  }

  const state = {
    canvasWidth: 520,
    canvasHeight: 320,
    lastReadout: ""
  };

  const sketch = new window.p5((p) => {
    const stepMs = 520;
    const holdMs = 2200;
    let startTime = 0;

    function fitCanvas() {
      const parentWidth = canvasHost.clientWidth || 520;
      state.canvasWidth = Math.max(300, Math.min(parentWidth, 560));
      state.canvasHeight = state.canvasWidth < 380 ? 286 : 318;
      p.resizeCanvas(state.canvasWidth, state.canvasHeight);
    }

    function getLayout() {
      const compact = state.canvasWidth < 380;
      const left = compact ? 62 : 76;
      const right = state.canvasWidth - (compact ? 22 : 30);
      const top = compact ? 82 : 88;
      const bottom = state.canvasHeight - 48;
      const colGap = trees > 1 ? (right - left) / (trees - 1) : 0;
      const rowGap = owls > 1 ? (bottom - top) / (owls - 1) : 0;

      return { compact, left, right, top, bottom, colGap, rowGap };
    }

    function pairPoint(layout, row, col) {
      return {
        x: layout.left + col * layout.colGap,
        y: layout.top + row * layout.rowGap
      };
    }

    function drawOwl(x, y, label, active) {
      const scale = state.canvasWidth < 380 ? 0.82 : 0.92;
      p.push();
      p.translate(x, y);
      p.scale(scale);
      p.noStroke();
      p.fill(active ? "#f97316" : "#7c3aed");
      p.ellipse(0, 2, 34, 42);
      p.fill(active ? "#fed7aa" : "#c4b5fd");
      p.ellipse(-9, 0, 15, 25);
      p.ellipse(9, 0, 15, 25);
      p.fill("#ffffff");
      p.ellipse(-7, -10, 11, 11);
      p.ellipse(7, -10, 11, 11);
      p.fill("#1f2937");
      p.circle(-7, -10, 4);
      p.circle(7, -10, 4);
      p.fill("#facc15");
      p.triangle(-4, -3, 4, -3, 0, 5);
      p.fill("#334155");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      p.textStyle(p.BOLD);
      p.text(label, 0, 32);
      p.pop();
    }

    function drawTree(x, y, label, active) {
      const scale = state.canvasWidth < 380 ? 0.8 : 0.9;
      p.push();
      p.translate(x, y);
      p.scale(scale);
      p.noStroke();
      p.fill("#8b5e34");
      p.rect(-4, 10, 8, 22, 3);
      p.fill(active ? "#16a34a" : "#0f766e");
      p.triangle(0, -22, -20, 15, 20, 15);
      p.fill(active ? "#86efac" : "#5eead4");
      p.triangle(0, -34, -15, -4, 15, -4);
      p.fill("#334155");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      p.textStyle(p.BOLD);
      p.text(label, 0, 43);
      p.pop();
    }

    function drawPairCell(x, y, index, complete, active, count) {
      const size = state.canvasWidth < 380 ? 24 : 28;
      p.strokeWeight(2);
      p.stroke(active ? "#f97316" : complete ? "#16a34a" : "#d7e0ea");
      p.fill(complete ? "#dcfce7" : "#ffffff");
      p.rect(x - size / 2, y - size / 2, size, size, 8);

      if (complete) {
        p.noStroke();
        p.fill(active ? "#f97316" : "#15803d");
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(state.canvasWidth < 380 ? 10 : 11);
        p.textStyle(p.BOLD);
        p.text(count, x, y + 0.5);
      }

      if (active) {
        const pulse = 4 + Math.sin(p.frameCount * 0.16) * 2;
        p.noFill();
        p.stroke("#fb923c");
        p.strokeWeight(2);
        p.rect(x - size / 2 - pulse, y - size / 2 - pulse, size + pulse * 2, size + pulse * 2, 11);
      }
    }

    function updateReadout(activeIndex, shownCount, isHolding) {
      const owlIndex = Math.floor(activeIndex / trees);
      const treeIndex = activeIndex % trees;
      const key = `${activeIndex}:${shownCount}:${isHolding}`;

      if (state.lastReadout === key) {
        return;
      }
      state.lastReadout = key;

      if (isHolding) {
        status.textContent = `All ${owls} owl rows are full. Count ${total} pairs.`;
      } else {
        status.textContent = `Pair ${shownCount} of ${total}: owl ${owlIndex + 1} with tree ${treeIndex + 1}.`;
      }
      equation.textContent = `${owls} x ${trees} = ${total}`;
    }

    p.setup = () => {
      const canvas = p.createCanvas(10, 10);
      canvas.parent(canvasHost);
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(45);
      p.textFont("system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif");
      startTime = p.millis();
      fitCanvas();
    };

    p.windowResized = fitCanvas;

    p.draw = () => {
      const layout = getLayout();
      const cycleMs = total * stepMs + holdMs;
      const elapsed = (p.millis() - startTime) % cycleMs;
      const isHolding = elapsed >= total * stepMs;
      const rawIndex = Math.floor(elapsed / stepMs);
      const activeIndex = Math.min(total - 1, rawIndex);
      const shownCount = isHolding ? total : activeIndex + 1;
      const activeRow = Math.floor(activeIndex / trees);
      const activeCol = activeIndex % trees;
      const activePoint = pairPoint(layout, activeRow, activeCol);

      p.background("#f8fbff");
      p.noStroke();
      p.fill("#eaf2ff");
      p.rect(8, 8, state.canvasWidth - 16, state.canvasHeight - 16, 14);

      p.stroke("#dbe5f1");
      p.strokeWeight(1.5);
      for (let row = 0; row < owls; row += 1) {
        const y = layout.top + row * layout.rowGap;
        p.line(layout.left, y, layout.right, y);
      }
      for (let col = 0; col < trees; col += 1) {
        const x = layout.left + col * layout.colGap;
        p.line(x, layout.top, x, layout.bottom);
      }

      if (!isHolding) {
        p.stroke("#fb923c");
        p.strokeWeight(3);
        p.line(36, activePoint.y, activePoint.x, activePoint.y);
        p.line(activePoint.x, 42, activePoint.x, activePoint.y);
      }

      for (let col = 0; col < trees; col += 1) {
        const x = layout.left + col * layout.colGap;
        drawTree(x, 38, `T${col + 1}`, col === activeCol && !isHolding);
      }

      for (let row = 0; row < owls; row += 1) {
        const y = layout.top + row * layout.rowGap;
        drawOwl(34, y, `O${row + 1}`, row === activeRow && !isHolding);
      }

      for (let row = 0; row < owls; row += 1) {
        for (let col = 0; col < trees; col += 1) {
          const index = row * trees + col;
          const point = pairPoint(layout, row, col);
          const complete = index < shownCount;
          const active = index === activeIndex && !isHolding;
          drawPairCell(point.x, point.y, index, complete, active, index + 1);
        }
      }

      p.noStroke();
      p.fill("#334155");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(layout.compact ? 12 : 13);
      p.textStyle(p.BOLD);
      p.text(`${shownCount} / ${total} pairs`, state.canvasWidth / 2, state.canvasHeight - 22);

      updateReadout(activeIndex, shownCount, isHolding);
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function createSquaresCubesActivityVisual(host) {
  const SQUARE_MIN = 2;
  const SQUARE_MAX = 6;
  const CUBE_MIN = 2;
  const CUBE_MAX = 5;

  host.innerHTML = `
    <div class="activity-p5-canvas"></div>
    <div class="activity-p5-controls">
      <div class="p5-control p5-control-square">
        <button class="p5-step" data-action="square-down" type="button" aria-label="Smaller square">&minus;</button>
        <div class="p5-readout">
          <strong data-square-readout>4 &times; 4</strong>
          <span>square = <em data-square-result>16</em></span>
        </div>
        <button class="p5-step" data-action="square-up" type="button" aria-label="Larger square">+</button>
      </div>
      <div class="p5-control p5-control-cube">
        <button class="p5-step" data-action="cube-down" type="button" aria-label="Smaller cube">&minus;</button>
        <div class="p5-readout">
          <strong data-cube-readout>3 &times; 3 &times; 3</strong>
          <span>cube = <em data-cube-result>27</em></span>
        </div>
        <button class="p5-step" data-action="cube-up" type="button" aria-label="Larger cube">+</button>
      </div>
    </div>
    <p class="activity-p5-hint">Drag the cube to spin &bull; tap a tile to mark it</p>
  `;

  const canvasHost = host.querySelector(".activity-p5-canvas");

  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="activity-p5-fallback">
        <div class="fallback-square" aria-hidden="true">${Array.from({ length: 16 }, () => "<span></span>").join("")}</div>
        <strong>4 x 4 square</strong>
        <span>3 x 3 x 3 cube</span>
      </div>
    `;
    return { destroy() {} };
  }

  const state = {
    squareN: 4,
    cubeN: 3,
    selectedCells: new Set(),
    hoverCell: null,
    dragging: false,
    rotY: 0.7,
    rotX: -0.56,
    velY: 0,
    velX: 0,
    squareBounds: { x: 0, y: 0, cell: 0 }
  };

  const squareReadout = host.querySelector("[data-square-readout]");
  const squareResult = host.querySelector("[data-square-result]");
  const cubeReadout = host.querySelector("[data-cube-readout]");
  const cubeResult = host.querySelector("[data-cube-result]");

  function syncReadouts() {
    squareReadout.innerHTML = `${state.squareN} &times; ${state.squareN}`;
    squareResult.textContent = state.squareN * state.squareN;
    cubeReadout.innerHTML = `${state.cubeN} &times; ${state.cubeN} &times; ${state.cubeN}`;
    cubeResult.textContent = state.cubeN * state.cubeN * state.cubeN;

    host.querySelectorAll(".p5-step").forEach((btn) => {
      const action = btn.dataset.action;
      btn.disabled =
        (action === "square-up" && state.squareN >= SQUARE_MAX) ||
        (action === "square-down" && state.squareN <= SQUARE_MIN) ||
        (action === "cube-up" && state.cubeN >= CUBE_MAX) ||
        (action === "cube-down" && state.cubeN <= CUBE_MIN);
    });
  }

  function handleStep(action) {
    if (action === "square-up" && state.squareN < SQUARE_MAX) {
      state.squareN += 1;
      state.selectedCells.clear();
    } else if (action === "square-down" && state.squareN > SQUARE_MIN) {
      state.squareN -= 1;
      state.selectedCells.clear();
    } else if (action === "cube-up" && state.cubeN < CUBE_MAX) {
      state.cubeN += 1;
    } else if (action === "cube-down" && state.cubeN > CUBE_MIN) {
      state.cubeN -= 1;
    }
    syncReadouts();
  }

  host.querySelectorAll(".p5-step").forEach((btn) => {
    btn.addEventListener("click", () => handleStep(btn.dataset.action));
  });

  syncReadouts();

  const sketch = new window.p5((p) => {
    let canvasWidth = 0;
    let canvasHeight = 0;
    let canvasEl = null;

    function fitCanvas() {
      canvasWidth = Math.max(320, Math.floor(canvasHost.clientWidth || host.clientWidth || 560));
      canvasHeight = Math.max(330, Math.min(400, Math.round(canvasWidth * 0.6)));
      p.resizeCanvas(canvasWidth, canvasHeight);
    }

    function isEventOnCanvas(event) {
      if (!event || !event.target) {
        return false;
      }
      return event.target === canvasEl;
    }

    function squareHoverCell() {
      const { x, y, cell } = state.squareBounds;
      if (!cell) {
        return null;
      }
      const n = state.squareN;
      const mx = p.mouseX - canvasWidth / 2;
      const my = p.mouseY - canvasHeight / 2;
      const half = (cell * n) / 2;
      if (mx < x - half || mx > x + half || my < y - half || my > y + half) {
        return null;
      }
      const col = Math.floor((mx - (x - half)) / cell);
      const row = Math.floor((my - (y - half)) / cell);
      if (col < 0 || col >= n || row < 0 || row >= n) {
        return null;
      }
      return { row, col };
    }

    function isMouseOnCubeSide() {
      return p.mouseX > canvasWidth * 0.5;
    }

    function drawSoftShadow(x, y, w, h, alpha) {
      p.push();
      p.translate(x, y, -12);
      p.noStroke();
      p.fill(0, 0, 0, alpha);
      p.ellipse(0, 0, w, h);
      p.pop();
    }

    function drawSquareGrid(x, y) {
      const n = state.squareN;
      const maxCell = canvasWidth < 430 ? 38 : 46;
      const cell = Math.max(20, Math.min(maxCell, (canvasWidth * 0.34) / n));
      const total = cell * n;
      state.squareBounds = { x, y, cell };

      const pulse = 0.5 + 0.5 * Math.sin(p.millis() / 900);
      const hover = state.hoverCell;

      drawSoftShadow(x, y + total * 0.55, total * 0.94, 24, 76);

      p.push();
      p.translate(x, y, 0);
      p.noStroke();

      // Soft frame backdrop
      p.fill(255, 241, 243, 248);
      p.plane(total + 26, total + 26);
      // Brand pink halo
      p.fill(249, 88, 119, 36 + pulse * 22);
      p.plane(total + 18, total + 18);

      for (let row = 0; row < n; row += 1) {
        for (let col = 0; col < n; col += 1) {
          const cx = -total / 2 + cell / 2 + col * cell;
          const cy = -total / 2 + cell / 2 + row * cell;
          const key = `${row},${col}`;
          const isHover = hover && hover.row === row && hover.col === col;
          const isSelected = state.selectedCells.has(key);

          // Rose -> deep-rose gradient (brand family, stays clearly pink everywhere)
          const t = (row + col) / Math.max(1, (n - 1) * 2);
          const baseR = p.lerp(251, 190, t);
          const baseG = p.lerp(113, 18, t);
          const baseB = p.lerp(133, 60, t);

          p.push();
          p.translate(cx, cy, 1);
          p.noStroke();

          if (isSelected) {
            p.fill(99, 102, 241, 250);
          } else if (isHover) {
            p.fill(255, 209, 102, 250);
          } else {
            p.fill(baseR, baseG, baseB, 248);
          }
          p.plane(cell - 3, cell - 3);

          // Subtle inner gloss (kept very light so cells don't read as white)
          p.fill(255, 255, 255, isSelected ? 60 : 32);
          p.translate(-cell * 0.18, -cell * 0.18, 0.5);
          p.plane(cell * 0.34, cell * 0.34);
          p.pop();
        }
      }

      // Subtle interior grid lines
      p.stroke(255, 255, 255, 215);
      p.strokeWeight(1.4);
      for (let i = 1; i < n; i += 1) {
        const line = -total / 2 + i * cell;
        p.line(line, -total / 2, 2, line, total / 2, 2);
        p.line(-total / 2, line, 2, total / 2, line, 2);
      }

      // Outer border in deep rose
      p.noFill();
      p.stroke(190, 18, 60, 235);
      p.strokeWeight(3);
      p.rectMode(p.CENTER);
      p.rect(0, 0, total + 12, total + 12, 10);
      p.pop();
    }

    function drawCubeStack(x, y) {
      const n = state.cubeN;
      const maxCube = canvasWidth < 430 ? 30 : 38;
      const cubeSize = Math.max(16, Math.min(maxCube, (canvasWidth * 0.3) / n));
      const spacing = cubeSize + 2;
      const lift = Math.sin(p.millis() / 1300) * 3;

      if (!state.dragging) {
        state.rotY += 0.004 + state.velY;
        state.rotX += state.velX;
        state.velY *= 0.93;
        state.velX *= 0.93;
        state.rotX = Math.max(-1.2, Math.min(0.4, state.rotX));
      }

      drawSoftShadow(x, y + spacing * n * 0.65, spacing * n * 1.2, 30, 84);

      p.push();
      p.translate(x, y + lift, 0);
      p.rotateX(state.rotX);
      p.rotateY(state.rotY);
      p.rotateZ(0.04);

      for (let z = 0; z < n; z += 1) {
        for (let yIdx = 0; yIdx < n; yIdx += 1) {
          for (let xIdx = 0; xIdx < n; xIdx += 1) {
            const tx = (xIdx - (n - 1) / 2) * spacing;
            const ty = (yIdx - (n - 1) / 2) * spacing;
            const tz = (z - (n - 1) / 2) * spacing;
            const heat = (xIdx + yIdx + z) / Math.max(1, (n - 1) * 3);

            p.push();
            p.translate(tx, ty, tz);
            p.stroke(255, 224, 230, 220);
            p.strokeWeight(1);
            // Coral -> ruby gradient (deeper brand family)
            p.fill(
              p.lerp(251, 159, heat),
              p.lerp(113, 18, heat),
              p.lerp(133, 57, heat)
            );
            p.box(cubeSize, cubeSize, cubeSize);
            p.pop();
          }
        }
      }

      p.pop();
    }

    p.setup = () => {
      fitCanvas();
      const canvas = p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
      canvas.parent(canvasHost);
      canvasEl = canvas.elt;
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(45);
    };

    p.windowResized = fitCanvas;

    p.mousePressed = (event) => {
      if (!isEventOnCanvas(event)) {
        return;
      }
      const hover = squareHoverCell();
      if (hover) {
        const key = `${hover.row},${hover.col}`;
        if (state.selectedCells.has(key)) {
          state.selectedCells.delete(key);
        } else {
          state.selectedCells.add(key);
        }
        return;
      }
      if (isMouseOnCubeSide()) {
        state.dragging = true;
        state.velX = 0;
        state.velY = 0;
      }
    };

    p.mouseDragged = (event) => {
      if (!state.dragging) {
        return;
      }
      const dy = (p.mouseX - p.pmouseX) * 0.012;
      const dx = (p.mouseY - p.pmouseY) * 0.012;
      state.rotY += dy;
      state.rotX += dx;
      state.rotX = Math.max(-1.2, Math.min(0.4, state.rotX));
      state.velY = dy * 0.5;
      state.velX = dx * 0.5;
      if (event && event.preventDefault) {
        event.preventDefault();
      }
    };

    p.mouseReleased = () => {
      state.dragging = false;
    };

    p.draw = () => {
      const squareX = canvasWidth < 430 ? -canvasWidth * 0.24 : -canvasWidth * 0.27;
      const cubeX = canvasWidth < 430 ? canvasWidth * 0.24 : canvasWidth * 0.27;
      const centerY = -canvasHeight * 0.06;

      state.hoverCell = squareHoverCell();

      p.clear();
      p.ambientLight(126, 122, 128);
      p.directionalLight(255, 248, 244, -0.5, -0.6, -1);
      p.directionalLight(255, 180, 170, 0.55, 0.2, -0.4);
      p.directionalLight(255, 220, 215, -0.2, 0.4, -0.5);

      drawSquareGrid(squareX, centerY);
      drawCubeStack(cubeX, centerY - 2);

      if (state.hoverCell) {
        canvasHost.style.cursor = "pointer";
      } else if (state.dragging) {
        canvasHost.style.cursor = "grabbing";
      } else if (isMouseOnCubeSide() && p.mouseX >= 0 && p.mouseX <= canvasWidth && p.mouseY >= 0 && p.mouseY <= canvasHeight) {
        canvasHost.style.cursor = "grab";
      } else {
        canvasHost.style.cursor = "default";
      }
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function createPowerPlayActivityVisual(host) {
  host.classList.add("powers-teaser-host");
  host.innerHTML = `
    <header class="powers-teaser-head">
      <p class="powers-teaser-eyebrow">Power Play</p>
      <h3 class="powers-teaser-title">From a line to a 4D shape</h3>
    </header>
    <div class="powers-teaser-stage">
      <div class="activity-p5-canvas powers-teaser-canvas"></div>
      <button class="powers-teaser-mystery" type="button" data-step="3" aria-label="2 to the fourth: tap to reveal">
        <span class="powers-teaser-mystery-mark">?</span>
        <span class="powers-teaser-mystery-tag">4D</span>
      </button>
    </div>
    <div class="powers-teaser-readout" aria-live="polite">
      <strong class="powers-teaser-expr">2<sup>1</sup> = 2</strong>
      <span class="powers-teaser-shape">A short line &mdash; 2 cells stretched along 1 dimension.</span>
    </div>
    <nav class="powers-teaser-chips" role="tablist" aria-label="Choose a power">
      <button class="powers-teaser-chip active" type="button" data-step="0" role="tab" aria-selected="true" data-tone="teal">2<sup>1</sup> = 2</button>
      <button class="powers-teaser-chip" type="button" data-step="1" role="tab" aria-selected="false" data-tone="pink">2<sup>2</sup> = 4</button>
      <button class="powers-teaser-chip" type="button" data-step="2" role="tab" aria-selected="false" data-tone="orange">2<sup>3</sup> = 8</button>
      <button class="powers-teaser-chip" type="button" data-step="3" role="tab" aria-selected="false" data-tone="indigo">2<sup>4</sup> = 16</button>
    </nav>
  `;

  const canvasHost = host.querySelector(".powers-teaser-canvas");
  const exprEl = host.querySelector(".powers-teaser-expr");
  const shapeEl = host.querySelector(".powers-teaser-shape");
  const chips = Array.from(host.querySelectorAll(".powers-teaser-chip"));
  const mystery = host.querySelector(".powers-teaser-mystery");

  const MYSTERY_INDEX = 3;
  const steps = [
    {
      expr: "2<sup>1</sup> = 2",
      shape: "A short line &mdash; 2 cells stretched along 1 dimension.",
      tone: "teal"
    },
    {
      expr: "2<sup>2</sup> = 2 &times; 2 = 4",
      shape: "A flat square &mdash; 4 cells across 2 dimensions.",
      tone: "pink"
    },
    {
      expr: "2<sup>3</sup> = 2 &times; 2 &times; 2 = 8",
      shape: "A solid cube &mdash; 8 little cubes stacked in 3 dimensions.",
      tone: "orange"
    },
    {
      expr: "2<sup>4</sup> = 2 &times; 2 &times; 2 &times; 2 = 16",
      shape: "We can&rsquo;t draw 4D on a flat screen. Picture <strong>two 2<sup>3</sup> cubes</strong> joined edge to edge (8 + 8 = 16), or a <strong>tesseract</strong> &mdash; the 4D cousin of a cube.",
      tone: "indigo"
    }
  ];

  const state = {
    active: 0,
    target: 0,
    focus: 0,
    autoStart: 0,
    userTouched: false,
    revealed: false
  };

  function applyStep(index) {
    state.active = index;
    state.target = index;
    if (exprEl) exprEl.innerHTML = steps[index].expr;
    if (shapeEl) shapeEl.innerHTML = steps[index].shape;
    chips.forEach((chip, idx) => {
      const isActive = idx === index;
      chip.classList.toggle("active", isActive);
      chip.setAttribute("aria-selected", String(isActive));
    });
    if (mystery) {
      mystery.classList.toggle("active", index === MYSTERY_INDEX);
    }
    host.dataset.tone = steps[index].tone;
  }

  function setRevealed(revealed) {
    state.revealed = revealed;
    if (mystery) {
      mystery.classList.toggle("revealed", revealed);
      mystery.setAttribute(
        "aria-label",
        revealed
          ? "Tesseract shown &mdash; tap to hide and show the question mark again"
          : "2 to the fourth: tap to reveal the tesseract"
      );
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const idx = Number(chip.dataset.step) || 0;
      state.userTouched = true;
      applyStep(idx);
    });
  });

  if (mystery) {
    mystery.addEventListener("click", () => {
      state.userTouched = true;
      applyStep(MYSTERY_INDEX);
      setRevealed(!state.revealed);
    });
  }

  state.autoStart = performance.now();
  applyStep(0);

  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="activity-p5-fallback">
        <strong>2&sup2; = 4 &middot; 2&sup3; = 8 &middot; 2&#8308; = 16</strong>
        <span>Square, cube, tesseract.</span>
      </div>
    `;
    return { destroy() {} };
  }

  const sketch = new window.p5((p) => {
    let canvasWidth = 0;
    let canvasHeight = 0;
    const tesseractEdges = (() => {
      const edges = [];
      for (let i = 0; i < 16; i += 1) {
        for (let bit = 0; bit < 4; bit += 1) {
          const j = i ^ (1 << bit);
          if (j > i) {
            edges.push([i, j, bit]);
          }
        }
      }
      return edges;
    })();

    function fitCanvas() {
      const parentWidth = Math.floor(canvasHost.clientWidth || host.clientWidth || 720);
      canvasWidth = Math.max(360, Math.min(parentWidth, 840));
      canvasHeight = canvasWidth < 520 ? 260 : 300;
      p.resizeCanvas(canvasWidth, canvasHeight);
    }

    function drawLinePanel(cx, cy, size, focus, pulse) {
      const dim = 0.55 + focus * 0.45;
      const alpha = Math.floor(190 + focus * 65);
      const lineLen = size * 0.86;
      const dotR = 3 + focus * 1.5;
      const strokeW = 2.5 + focus * 1.5;

      p.push();
      p.translate(cx, cy, 0);
      p.scale(0.9 + focus * 0.14 + pulse);

      p.stroke(4 * dim, 150 * dim, 105 * dim, alpha);
      p.strokeWeight(strokeW);
      p.line(-lineLen / 2, 0, lineLen / 2, 0);

      p.noStroke();
      p.fill(4 * dim, 120 * dim, 87 * dim, alpha);
      p.ellipse(-lineLen / 2, 0, dotR * 2, dotR * 2);
      p.ellipse(lineLen / 2, 0, dotR * 2, dotR * 2);

      p.pop();
    }

    function drawSquarePanel(cx, cy, size, focus, pulse) {
      const cell = size / 2;
      const dim = 0.4 + focus * 0.6;
      const alpha = Math.floor(150 + focus * 105);
      p.push();
      p.translate(cx, cy, 0);
      p.scale(0.86 + focus * 0.18 + pulse);
      p.noStroke();

      if (focus > 0.05) {
        p.fill(249, 88, 119, 32 + focus * 40);
        p.plane(size + 24, size + 24);
      }

      for (let r = 0; r < 2; r += 1) {
        for (let c = 0; c < 2; c += 1) {
          const x = -cell / 2 + c * cell;
          const y = -cell / 2 + r * cell;
          const t = (r + c) / 2;
          p.push();
          p.translate(x, y, 1);
          p.fill(
            p.lerp(251, 190, t) * dim,
            p.lerp(113, 18, t) * dim,
            p.lerp(133, 60, t) * dim,
            alpha
          );
          p.plane(cell - 5, cell - 5);
          p.fill(255, 255, 255, focus * 80);
          p.translate(-cell * 0.18, -cell * 0.18, 0.5);
          p.plane(cell * 0.34, cell * 0.34);
          p.pop();
        }
      }

      p.noFill();
      p.stroke(190, 18, 60, 140 + focus * 115);
      p.strokeWeight(1.5 + focus * 1.5);
      p.rectMode(p.CENTER);
      p.rect(0, 0, size + 6, size + 6, 8);
      p.pop();
    }

    function drawCubePanel(cx, cy, size, focus, pulse, rotY, rotX) {
      const cubeSize = size / 2.4;
      const spacing = cubeSize + 2;
      const dim = 0.45 + focus * 0.55;
      const alpha = Math.floor(160 + focus * 95);

      p.push();
      p.translate(cx, cy, 0);
      p.scale(0.86 + focus * 0.18 + pulse);
      p.rotateX(rotX);
      p.rotateY(rotY);
      p.rotateZ(0.04);

      for (let z = 0; z < 2; z += 1) {
        for (let yIdx = 0; yIdx < 2; yIdx += 1) {
          for (let xIdx = 0; xIdx < 2; xIdx += 1) {
            const tx = (xIdx - 0.5) * spacing;
            const ty = (yIdx - 0.5) * spacing;
            const tz = (z - 0.5) * spacing;
            const heat = (xIdx + yIdx + z) / 3;
            p.push();
            p.translate(tx, ty, tz);
            p.stroke(255, 230, 200, 130 + focus * 110);
            p.strokeWeight(1);
            p.fill(
              p.lerp(253, 194, heat) * dim,
              p.lerp(186, 65, heat) * dim,
              p.lerp(116, 12, heat) * dim,
              alpha
            );
            p.box(cubeSize);
            p.pop();
          }
        }
      }
      p.pop();
    }

    function drawTesseractPanel(cx, cy, size, focus, pulse, angle, rotY, rotX) {
      const focal = 3;
      const scale3d = size / 3.2;
      const cw = Math.cos(angle);
      const sw = Math.sin(angle);
      const dim = 0.55 + focus * 0.45;
      const edgeAlpha = 150 + focus * 105;

      const projected = new Array(16);
      for (let i = 0; i < 16; i += 1) {
        const vx = (i & 1) ? 1 : -1;
        const vy = (i & 2) ? 1 : -1;
        const vz = (i & 4) ? 1 : -1;
        const vw = (i & 8) ? 1 : -1;
        const rx = vx * cw - vw * sw;
        const rw = vx * sw + vw * cw;
        const k = focal / (focal - rw);
        projected[i] = [rx * k * scale3d, vy * k * scale3d, vz * k * scale3d, rw];
      }

      p.push();
      p.translate(cx, cy, 0);
      p.scale(0.86 + focus * 0.16 + pulse);
      p.rotateX(rotX);
      p.rotateY(rotY);

      tesseractEdges.forEach(([i, j, bit]) => {
        const a = projected[i];
        const b = projected[j];
        if (bit === 3) {
          p.stroke(99 * dim, 102 * dim, 241 * dim, edgeAlpha);
          p.strokeWeight(1.3);
        } else {
          p.stroke(190 * dim, 18 * dim, 60 * dim, edgeAlpha + 20);
          p.strokeWeight(1.8);
        }
        p.line(a[0], a[1], a[2], b[0], b[1], b[2]);
      });

      p.noStroke();
      for (let i = 0; i < 16; i += 1) {
        const v = projected[i];
        const isOuter = v[3] < 0;
        p.push();
        p.translate(v[0], v[1], v[2]);
        if (isOuter) {
          p.fill(249 * dim, 88 * dim, 119 * dim, 235);
        } else {
          p.fill(99 * dim, 102 * dim, 241 * dim, 235);
        }
        p.sphere(2.2 + focus * 0.5);
        p.pop();
      }
      p.pop();
    }

    let canvasEl = null;

    function isEventOnCanvas(event) {
      return Boolean(event && event.target && event.target === canvasEl);
    }

    function slotAtPointer() {
      if (p.mouseX < 0 || p.mouseX > canvasWidth || p.mouseY < 0 || p.mouseY > canvasHeight) {
        return -1;
      }
      const idx = Math.floor((p.mouseX / canvasWidth) * 4);
      return Math.max(0, Math.min(3, idx));
    }

    p.setup = () => {
      fitCanvas();
      const canvas = p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
      canvas.parent(canvasHost);
      canvasEl = canvas.elt;
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(45);
    };

    p.windowResized = fitCanvas;

    p.mousePressed = (event) => {
      if (!isEventOnCanvas(event)) return;
      const slot = slotAtPointer();
      if (slot < 0 || slot >= MYSTERY_INDEX) return;
      state.userTouched = true;
      applyStep(slot);
    };

    p.mouseMoved = () => {
      if (!canvasEl) return;
      const slot = slotAtPointer();
      canvasEl.style.cursor = (slot >= 0 && slot < MYSTERY_INDEX) ? "pointer" : "default";
    };

    p.draw = () => {
      const now = performance.now();
      if (!state.userTouched) {
        const dwell = 3200;
        const idx = Math.floor((now - state.autoStart) / dwell) % steps.length;
        if (idx !== state.target) {
          applyStep(idx);
        }
      }

      const lerpRate = 0.08;
      state.focus += (state.target - state.focus) * lerpRate;
      const mysterySealed = state.target === MYSTERY_INDEX && !state.revealed;

      p.clear();
      p.ambientLight(140, 134, 140);
      p.directionalLight(255, 248, 244, -0.5, -0.6, -1);
      p.directionalLight(255, 200, 195, 0.55, 0.2, -0.4);

      const slot = canvasWidth / 4;
      const baseSize = Math.min(slot * 0.82, canvasHeight * 0.6);
      const t = now / 1000;

      const focusFor = (i) => {
        if (mysterySealed) return 0;
        if (i === MYSTERY_INDEX && !state.revealed) return 0;
        const d = Math.abs(state.focus - i);
        return Math.max(0, 1 - d);
      };
      const pulseFor = (i) => {
        const f = focusFor(i);
        return f > 0.5 ? Math.sin(t * 2.4) * 0.025 * f : 0;
      };

      drawLinePanel(-slot * 1.5, 0, baseSize, focusFor(0), pulseFor(0));
      drawSquarePanel(-slot * 0.5, 0, baseSize, focusFor(1), pulseFor(1));
      drawCubePanel(
        slot * 0.5,
        0,
        baseSize * 1.05,
        focusFor(2),
        pulseFor(2),
        t * 0.5,
        Math.sin(t * 0.4) * 0.25 - 0.32
      );
      if (state.revealed) {
        drawTesseractPanel(
          slot * 1.5,
          0,
          baseSize * 1.05,
          focusFor(MYSTERY_INDEX),
          pulseFor(MYSTERY_INDEX),
          t * 0.55,
          t * 0.22,
          Math.sin(t * 0.5) * 0.18 - 0.18
        );
      }
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

((root) => {
  root.sketches = root.sketches || {};
  Object.assign(root.sketches, {
    patternPowerAnimationMarkup,
    createPatternPowerAnimation,
    powerSquareCompareAnimationMarkup,
    createPowerSquareCompareAnimation,
    owlTreePairsAnimationMarkup,
    createOwlTreePairsAnimation,
    createSquaresCubesActivityVisual,
    createPowerPlayActivityVisual
  });
})(window.CT8 = window.CT8 || {});
