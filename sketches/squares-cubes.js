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

((root) => {
  root.sketches = root.sketches || {};
  Object.assign(root.sketches, {
    patternPowerAnimationMarkup,
    createPatternPowerAnimation
  });
})(window.CT8 = window.CT8 || {});
