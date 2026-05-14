function createPausableScheduler() {
  const state = {
    paused: false,
    timers: []
  };

  function startTimer(timer) {
    timer.startedAt = performance.now();
    timer.id = window.setTimeout(() => {
      timer.id = null;
      state.timers = state.timers.filter((item) => item !== timer);
      if (!state.paused) {
        timer.fn();
      }
    }, timer.remaining);
  }

  function schedule(fn, ms) {
    const timer = {
      fn,
      remaining: Math.max(0, ms),
      startedAt: 0,
      id: null
    };
    state.timers.push(timer);
    if (!state.paused) {
      startTimer(timer);
    }
    return timer;
  }

  function clearAll() {
    state.timers.forEach((timer) => {
      if (timer.id !== null) {
        window.clearTimeout(timer.id);
      }
    });
    state.timers = [];
  }

  function pause() {
    if (state.paused) {
      return;
    }
    state.paused = true;
    const now = performance.now();
    state.timers.forEach((timer) => {
      if (timer.id !== null) {
        window.clearTimeout(timer.id);
        timer.id = null;
        timer.remaining = Math.max(0, timer.remaining - (now - timer.startedAt));
      }
    });
  }

  function resume() {
    if (!state.paused) {
      return;
    }
    state.paused = false;
    [...state.timers].forEach((timer) => {
      if (timer.id === null) {
        startTimer(timer);
      }
    });
  }

  return {
    clearAll,
    isPaused: () => state.paused,
    pause,
    resume,
    schedule
  };
}

function ratioBarAnimationMarkup(animation) {
  return `
    <article class="ratio-hint-card" aria-label="Proportion ratio animated hint">
      <header class="ratio-hint-head">
        <p>Proportion hint</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="ratio-hint-stage">
        <div class="ratio-bar-labels"></div>
        <div class="ratio-bar"></div>
        <div class="ratio-bar-values"></div>
      </div>
      <div class="ratio-hint-readout" aria-live="polite">
        <div class="ratio-hint-step ratio-hint-step1"></div>
        <div class="ratio-hint-step ratio-hint-step2"></div>
        <strong class="ratio-hint-answer"></strong>
      </div>
      <div class="ratio-hint-progress"><div class="ratio-hint-progress-fill"></div></div>
      <div class="ratio-hint-controls">
        <button class="ratio-hint-pause" type="button">pause</button>
        <button class="ratio-hint-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createRatioBarAnimation(host, animation) {
  const stage = host.querySelector(".ratio-hint-stage");
  const labelsRow = host.querySelector(".ratio-bar-labels");
  const barEl = host.querySelector(".ratio-bar");
  const valuesRow = host.querySelector(".ratio-bar-values");
  const step1 = host.querySelector(".ratio-hint-step1");
  const step2 = host.querySelector(".ratio-hint-step2");
  const answerEl = host.querySelector(".ratio-hint-answer");
  const progress = host.querySelector(".ratio-hint-progress-fill");
  const pauseBtn = host.querySelector(".ratio-hint-pause");
  const restartBtn = host.querySelector(".ratio-hint-restart");

  const parts = animation.parts || [];
  const totalValue = Number(animation.totalValue) || 0;
  const unit = animation.unit || "";
  const highlight = Number(animation.highlight) || 0;

  const totalParts = parts.reduce((sum, p) => sum + (Number(p.count) || 0), 0);
  const perPart = totalParts > 0 ? totalValue / totalParts : 0;
  const target = parts[highlight] || parts[0];
  const targetValue = target ? (Number(target.count) || 0) * perPart : 0;

  const scheduler = createPausableScheduler();
  const clearAll = scheduler.clearAll;
  const schedule = scheduler.schedule;

  function buildBar() {
    labelsRow.innerHTML = "";
    barEl.innerHTML = "";
    valuesRow.innerHTML = "";

    parts.forEach((part, groupIdx) => {
      const count = Number(part.count) || 0;
      const tone = part.tone || "pink";
      const isHighlight = groupIdx === highlight;

      const label = document.createElement("div");
      label.className = `ratio-bar-label tone-${tone}${isHighlight ? " is-highlight" : ""}`;
      label.style.flexGrow = String(count);
      label.innerHTML = `<span>${part.label}</span><em>${count} part${count === 1 ? "" : "s"}</em>`;
      labelsRow.append(label);

      for (let i = 0; i < count; i += 1) {
        const cell = document.createElement("div");
        cell.className = `ratio-bar-cell tone-${tone}${isHighlight ? " is-highlight" : ""}`;
        cell.style.setProperty("--cell-delay", `${(groupIdx * 140) + (i * 60)}ms`);
        barEl.append(cell);
      }

      const valueGroup = document.createElement("div");
      valueGroup.className = `ratio-bar-value tone-${tone}${isHighlight ? " is-highlight" : ""}`;
      valueGroup.style.flexGrow = String(count);
      valueGroup.textContent = "";
      valuesRow.append(valueGroup);
    });
  }

  function resetUI() {
    [step1, step2, answerEl].forEach((el) => {
      if (el) {
        el.classList.remove("show");
        el.innerHTML = "";
      }
    });
    valuesRow.querySelectorAll(".ratio-bar-value").forEach((el) => (el.textContent = ""));
    barEl.querySelectorAll(".ratio-bar-cell").forEach((el) => el.classList.remove("revealed", "pulse"));
    labelsRow.querySelectorAll(".ratio-bar-label").forEach((el) => el.classList.remove("revealed", "pulse"));
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
  }

  function run() {
    clearAll();
    resetUI();
    buildBar();

    const cells = Array.from(barEl.querySelectorAll(".ratio-bar-cell"));
    const labels = Array.from(labelsRow.querySelectorAll(".ratio-bar-label"));
    const values = Array.from(valuesRow.querySelectorAll(".ratio-bar-value"));

    // Phase 1: Cells appear left to right
    schedule(() => {
      cells.forEach((cell) => cell.classList.add("revealed"));
    }, 200);

    // Phase 2: Labels appear above
    schedule(() => {
      labels.forEach((lbl, idx) => {
        schedule(() => lbl.classList.add("revealed"), idx * 140);
      });
    }, 1700);

    // Phase 3: Step 1 — total ÷ parts = per-part
    schedule(() => {
      if (step1) {
        step1.innerHTML = `Total <strong>${totalValue}${unit}</strong> &divide; <strong>${totalParts}</strong> parts = <strong>${formatNumber(perPart)}${unit}</strong> per part`;
        step1.classList.add("show");
      }
      values.forEach((el, idx) => {
        const count = Number(parts[idx]?.count) || 0;
        schedule(() => {
          el.textContent = count > 0 ? `${formatNumber(perPart)}${unit} each` : "";
        }, idx * 140);
      });
    }, 4000);

    // Phase 4: Step 2 — answer group calc
    schedule(() => {
      if (target && step2) {
        step2.innerHTML = `<strong>${target.label}</strong>: ${target.count} &times; ${formatNumber(perPart)} = <strong>${formatNumber(targetValue)}${unit}</strong>`;
        step2.classList.add("show");
      }
      // Highlight the answer cells & label
      labels.forEach((lbl, idx) => {
        if (idx === highlight) lbl.classList.add("pulse");
      });
      cells.forEach((cell) => {
        if (cell.classList.contains("is-highlight")) cell.classList.add("pulse");
      });
    }, 6400);

    // Phase 5: Answer reveal
    schedule(() => {
      if (answerEl) {
        answerEl.innerHTML = `${target?.label || ""} = ${formatNumber(targetValue)}${unit}`;
        answerEl.classList.add("show");
      }
      if (progress) {
        progress.style.transition = "width 5000ms linear";
        progress.style.width = "100%";
      }
    }, 8500);

    // Loop
    schedule(run, 13800);
  }

  function togglePause() {
    if (scheduler.isPaused()) {
      scheduler.resume();
      if (pauseBtn) pauseBtn.textContent = "pause";
    } else {
      scheduler.pause();
      if (pauseBtn) pauseBtn.textContent = "play";
    }
  }

  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  if (restartBtn) restartBtn.addEventListener("click", () => {
    scheduler.clearAll();
    scheduler.resume();
    if (pauseBtn) pauseBtn.textContent = "pause";
    run();
  });

  run();

  return { destroy: clearAll };
}

function ratioScaleAnimationMarkup(animation) {
  return `
    <article class="ratio-hint-card" aria-label="Ratio scale animated hint">
      <header class="ratio-hint-head">
        <p>Proportion hint</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="ratio-scale-stage">
        <div class="ratio-scale-side ratio-scale-from">
          <div class="ratio-scale-caption"></div>
          <div class="ratio-scale-pair">
            <div class="ratio-scale-bar tone-a"><span></span></div>
            <div class="ratio-scale-bar tone-b"><span></span></div>
          </div>
          <div class="ratio-scale-pair-label"></div>
        </div>
        <div class="ratio-scale-arrow">
          <span class="ratio-scale-arrow-text"></span>
        </div>
        <div class="ratio-scale-side ratio-scale-to">
          <div class="ratio-scale-caption"></div>
          <div class="ratio-scale-pair">
            <div class="ratio-scale-bar tone-a"><span></span></div>
            <div class="ratio-scale-bar tone-b"><span></span></div>
          </div>
          <div class="ratio-scale-pair-label"></div>
        </div>
      </div>
      <div class="ratio-hint-readout" aria-live="polite">
        <div class="ratio-hint-step ratio-hint-step1"></div>
        <strong class="ratio-hint-answer"></strong>
      </div>
      <div class="ratio-hint-progress"><div class="ratio-hint-progress-fill"></div></div>
      <div class="ratio-hint-controls">
        <button class="ratio-hint-pause" type="button">pause</button>
        <button class="ratio-hint-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createRatioScaleAnimation(host, animation) {
  const fromSide = host.querySelector(".ratio-scale-from");
  const toSide = host.querySelector(".ratio-scale-to");
  const arrowText = host.querySelector(".ratio-scale-arrow-text");
  const step1 = host.querySelector(".ratio-hint-step1");
  const answerEl = host.querySelector(".ratio-hint-answer");
  const progress = host.querySelector(".ratio-hint-progress-fill");
  const pauseBtn = host.querySelector(".ratio-hint-pause");
  const restartBtn = host.querySelector(".ratio-hint-restart");

  const from = animation.from || [1, 1];
  const to = animation.to || [1, 1];
  const factor = animation.factor != null ? Number(animation.factor) : (from[0] ? to[0] / from[0] : 1);
  const labels = animation.labels || ["A", "B"];
  const fromCaption = animation.fromCaption || `${formatNumber(from[0])} : ${formatNumber(from[1])}`;
  const toCaption = animation.toCaption || `${formatNumber(to[0])} : ${formatNumber(to[1])}`;
  const answerText = animation.answer || `${labels[1]} = ${formatNumber(to[1])}`;

  const maxValue = Math.max(...from, ...to, 1);

  const scheduler = createPausableScheduler();
  const clearAll = scheduler.clearAll;
  const schedule = scheduler.schedule;

  function barHeight(val) {
    if (!(val > 0)) return 0;
    return Math.max(8, (val / maxValue) * 100);
  }

  function setBar(side, aVal, bVal) {
    const bars = side.querySelectorAll(".ratio-scale-bar");
    const spans = side.querySelectorAll(".ratio-scale-bar span");
    if (bars[0]) bars[0].style.height = `${barHeight(aVal)}%`;
    if (bars[1]) bars[1].style.height = `${barHeight(bVal)}%`;
    if (spans[0]) spans[0].textContent = formatNumber(aVal);
    if (spans[1]) spans[1].textContent = formatNumber(bVal);
  }

  function resetUI() {
    [step1, answerEl].forEach((el) => {
      if (el) {
        el.classList.remove("show");
        el.innerHTML = "";
      }
    });
    if (arrowText) arrowText.textContent = "";
    fromSide.querySelector(".ratio-scale-caption").textContent = "";
    fromSide.querySelector(".ratio-scale-pair-label").textContent = "";
    toSide.querySelector(".ratio-scale-caption").textContent = "";
    toSide.querySelector(".ratio-scale-pair-label").textContent = "";
    setBar(fromSide, 0, 0);
    setBar(toSide, 0, 0);
    fromSide.classList.remove("revealed", "pulse");
    toSide.classList.remove("revealed", "pulse");
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
  }

  function run() {
    clearAll();
    resetUI();

    // Phase 1: From side appears with bars
    schedule(() => {
      fromSide.querySelector(".ratio-scale-caption").textContent = `${labels[0]} : ${labels[1]}`;
      fromSide.querySelector(".ratio-scale-pair-label").textContent = fromCaption;
      setBar(fromSide, from[0], from[1]);
      fromSide.classList.add("revealed");
    }, 650);

    // Phase 2: Arrow with factor (or a custom label like "+ 20 L water")
    schedule(() => {
      if (arrowText) {
        if (animation.arrowText) {
          arrowText.innerHTML = animation.arrowText;
        } else {
          const verb = factor >= 1 ? "&times;" : "&divide;";
          const shown = factor >= 1 ? factor : (1 / factor);
          arrowText.innerHTML = `${verb} ${formatNumber(shown)}`;
        }
      }
    }, 2800);

    // Phase 3: To side appears
    schedule(() => {
      toSide.querySelector(".ratio-scale-caption").textContent = `${labels[0]} : ${labels[1]}`;
      toSide.querySelector(".ratio-scale-pair-label").textContent = toCaption;
      setBar(toSide, to[0], to[1]);
      toSide.classList.add("revealed");
    }, 4600);

    // Phase 4: Step 1 text
    schedule(() => {
      if (step1) {
        if (animation.stepText) {
          step1.innerHTML = animation.stepText;
        } else {
          const verb = factor >= 1 ? "Multiply" : "Divide";
          const f = factor >= 1 ? formatNumber(factor) : formatNumber(1 / factor);
          step1.innerHTML = `${verb} both terms by <strong>${f}</strong> to keep the ratio equivalent.`;
        }
        step1.classList.add("show");
      }
    }, 6700);

    // Phase 5: Answer pulse
    schedule(() => {
      if (answerEl) {
        answerEl.innerHTML = answerText;
        answerEl.classList.add("show");
      }
      toSide.classList.add("pulse");
      if (progress) {
        progress.style.transition = "width 4800ms linear";
        progress.style.width = "100%";
      }
    }, 8500);

    schedule(run, 13400);
  }

  function togglePause() {
    if (scheduler.isPaused()) {
      scheduler.resume();
      if (pauseBtn) pauseBtn.textContent = "pause";
    } else {
      scheduler.pause();
      if (pauseBtn) pauseBtn.textContent = "play";
    }
  }

  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  if (restartBtn) restartBtn.addEventListener("click", () => {
    scheduler.clearAll();
    scheduler.resume();
    if (pauseBtn) pauseBtn.textContent = "pause";
    run();
  });

  run();

  return { destroy: clearAll };
}

function ratioCompareAnimationMarkup(animation) {
  return `
    <article class="ratio-hint-card" aria-label="Ratio comparison animated hint">
      <header class="ratio-hint-head">
        <p>Proportion hint</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="ratio-compare-stage"></div>
      <div class="ratio-hint-readout" aria-live="polite">
        <div class="ratio-hint-step ratio-hint-step1"></div>
        <div class="ratio-hint-step ratio-hint-step2"></div>
        <strong class="ratio-hint-answer"></strong>
      </div>
      <div class="ratio-hint-progress"><div class="ratio-hint-progress-fill"></div></div>
      <div class="ratio-hint-controls">
        <button class="ratio-hint-pause" type="button">pause</button>
        <button class="ratio-hint-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createRatioCompareAnimation(host, animation) {
  const stage = host.querySelector(".ratio-compare-stage");
  const step1 = host.querySelector(".ratio-hint-step1");
  const step2 = host.querySelector(".ratio-hint-step2");
  const answerEl = host.querySelector(".ratio-hint-answer");
  const progress = host.querySelector(".ratio-hint-progress-fill");
  const pauseBtn = host.querySelector(".ratio-hint-pause");
  const restartBtn = host.querySelector(".ratio-hint-restart");

  const units = animation.units || [];
  const compare = Array.isArray(animation.compare) ? animation.compare : [0, 1];
  const unitLabel = animation.unitLabel || (units[0] ? units[0].label : "unit");
  const answerText = animation.answer || "";
  const intro = animation.intro || `One ${unitLabel} = 1 unit. Compare the heights.`;
  const maxCount = Math.max(...units.map((u) => Number(u.count) || 0), 1);

  const scheduler = createPausableScheduler();
  const clearAll = scheduler.clearAll;
  const schedule = scheduler.schedule;

  function buildStage() {
    stage.innerHTML = "";
    units.forEach((unit, idx) => {
      const col = document.createElement("div");
      col.className = `ratio-compare-col tone-${unit.tone || "pink"}`;
      col.dataset.idx = String(idx);

      const bar = document.createElement("div");
      bar.className = "ratio-compare-bar";
      bar.style.setProperty("--max-count", String(maxCount));

      const count = Number(unit.count) || 0;
      for (let i = 0; i < count; i += 1) {
        const cell = document.createElement("div");
        cell.className = "ratio-compare-cell";
        cell.style.setProperty("--cell-delay", `${(idx * 220) + (i * 140)}ms`);
        bar.append(cell);
      }

      const label = document.createElement("div");
      label.className = "ratio-compare-label";
      label.innerHTML = `<strong>${unit.label}</strong><em>${count} unit${count === 1 ? "" : "s"}</em>`;

      col.append(bar, label);
      stage.append(col);
    });
  }

  function resetUI() {
    [step1, step2, answerEl].forEach((el) => {
      if (el) {
        el.classList.remove("show");
        el.innerHTML = "";
      }
    });
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
  }

  function run() {
    clearAll();
    resetUI();
    buildStage();

    const cols = Array.from(stage.querySelectorAll(".ratio-compare-col"));
    const cells = Array.from(stage.querySelectorAll(".ratio-compare-cell"));

    schedule(() => {
      cells.forEach((cell) => cell.classList.add("revealed"));
      cols.forEach((col) => col.classList.add("revealed"));
    }, 200);

    schedule(() => {
      if (step1) {
        step1.innerHTML = intro;
        step1.classList.add("show");
      }
    }, 2800);

    schedule(() => {
      cols.forEach((col, idx) => {
        col.classList.toggle("is-highlight", compare.includes(idx));
        col.classList.toggle("is-muted", !compare.includes(idx) && compare.length > 0);
      });
      if (step2) {
        const left = units[compare[0]];
        const right = units[compare[1]];
        if (left && right) {
          step2.innerHTML = `Compare <strong>${left.label}</strong> and <strong>${right.label}</strong>: <strong>${left.count} : ${right.count}</strong>.`;
          step2.classList.add("show");
        }
      }
    }, 5500);

    schedule(() => {
      if (answerEl) {
        answerEl.innerHTML = answerText;
        answerEl.classList.add("show");
      }
      if (progress) {
        progress.style.transition = "width 4800ms linear";
        progress.style.width = "100%";
      }
    }, 7800);

    schedule(run, 12800);
  }

  function togglePause() {
    if (scheduler.isPaused()) {
      scheduler.resume();
      if (pauseBtn) pauseBtn.textContent = "pause";
    } else {
      scheduler.pause();
      if (pauseBtn) pauseBtn.textContent = "play";
    }
  }

  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  if (restartBtn) restartBtn.addEventListener("click", () => {
    scheduler.clearAll();
    scheduler.resume();
    if (pauseBtn) pauseBtn.textContent = "pause";
    run();
  });

  run();

  return { destroy: clearAll };
}

function ratioChainAnimationMarkup(animation) {
  return `
    <article class="ratio-hint-card" aria-label="Ratio chain animated hint">
      <header class="ratio-hint-head">
        <p>Proportion hint</p>
        <h4>${animation.title}</h4>
      </header>
      <div class="ratio-chain-stage">
        <div class="ratio-chain-banner"></div>
        <div class="ratio-chain-bars"></div>
      </div>
      <div class="ratio-hint-readout" aria-live="polite">
        <div class="ratio-hint-step ratio-hint-step1"></div>
        <strong class="ratio-hint-answer"></strong>
      </div>
      <div class="ratio-hint-progress"><div class="ratio-hint-progress-fill"></div></div>
      <div class="ratio-hint-controls">
        <button class="ratio-hint-pause" type="button">pause</button>
        <button class="ratio-hint-restart" type="button">restart</button>
      </div>
    </article>
  `;
}

function createRatioChainAnimation(host, animation) {
  const banner = host.querySelector(".ratio-chain-banner");
  const barsRow = host.querySelector(".ratio-chain-bars");
  const step1 = host.querySelector(".ratio-hint-step1");
  const answerEl = host.querySelector(".ratio-hint-answer");
  const progress = host.querySelector(".ratio-hint-progress-fill");
  const pauseBtn = host.querySelector(".ratio-hint-pause");
  const restartBtn = host.querySelector(".ratio-hint-restart");

  const parts = animation.parts || [];
  const phases = animation.phases || [];
  const finalPhase = animation.finalPhase || phases[phases.length - 1] || null;
  const answerText = animation.answer || "";
  const maxValue = Math.max(...parts.map((p) => Number(p.value) || 0), 1);

  const scheduler = createPausableScheduler();
  const clearAll = scheduler.clearAll;
  const schedule = scheduler.schedule;

  function buildStage() {
    barsRow.innerHTML = "";
    parts.forEach((part, idx) => {
      const col = document.createElement("div");
      col.className = `ratio-chain-col tone-${part.tone || "pink"}`;
      col.dataset.idx = String(idx);
      const heightPct = Math.max(10, (Number(part.value) / maxValue) * 100);
      col.innerHTML = `
        <div class="ratio-chain-value">${formatNumber(part.value)}</div>
        <div class="ratio-chain-bar" style="height:${heightPct}%"></div>
        <div class="ratio-chain-label">${part.label}</div>
      `;
      barsRow.append(col);
    });
  }

  function resetUI() {
    [step1, answerEl].forEach((el) => {
      if (el) {
        el.classList.remove("show");
        el.innerHTML = "";
      }
    });
    if (banner) {
      banner.classList.remove("show");
      banner.innerHTML = "";
    }
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
    }
  }

  function applyPhase(phase) {
    if (!phase) return;
    const highlight = phase.highlight || [];
    Array.from(barsRow.querySelectorAll(".ratio-chain-col")).forEach((col) => {
      const idx = Number(col.dataset.idx);
      col.classList.toggle("is-highlight", highlight.includes(idx));
      col.classList.toggle("is-muted", highlight.length > 0 && !highlight.includes(idx));
    });
    if (banner) {
      banner.innerHTML = phase.label || "";
      banner.classList.toggle("show", Boolean(phase.label));
    }
  }

  function run() {
    clearAll();
    resetUI();
    buildStage();

    schedule(() => {
      Array.from(barsRow.querySelectorAll(".ratio-chain-col")).forEach((col) => col.classList.add("revealed"));
    }, 200);

    const phaseStart = 2500;
    const phaseLen = 3200;

    phases.forEach((phase, idx) => {
      schedule(() => applyPhase(phase), phaseStart + idx * phaseLen);
    });

    const finalAt = phaseStart + phases.length * phaseLen;

    schedule(() => {
      applyPhase(finalPhase);
      if (step1 && finalPhase?.note) {
        step1.innerHTML = finalPhase.note;
        step1.classList.add("show");
      }
      if (answerEl) {
        answerEl.innerHTML = answerText;
        answerEl.classList.add("show");
      }
      if (progress) {
        progress.style.transition = "width 5000ms linear";
        progress.style.width = "100%";
      }
    }, finalAt);

    schedule(run, finalAt + 5800);
  }

  function togglePause() {
    if (scheduler.isPaused()) {
      scheduler.resume();
      if (pauseBtn) pauseBtn.textContent = "pause";
    } else {
      scheduler.pause();
      if (pauseBtn) pauseBtn.textContent = "play";
    }
  }

  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  if (restartBtn) restartBtn.addEventListener("click", () => {
    scheduler.clearAll();
    scheduler.resume();
    if (pauseBtn) pauseBtn.textContent = "pause";
    run();
  });

  run();

  return { destroy: clearAll };
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return String(n);
  if (Math.round(n) === n) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, "");
}

((root) => {
  root.sketches = root.sketches || {};
  Object.assign(root.sketches, {
    ratioBarAnimationMarkup,
    createRatioBarAnimation,
    ratioScaleAnimationMarkup,
    createRatioScaleAnimation,
    ratioCompareAnimationMarkup,
    createRatioCompareAnimation,
    ratioChainAnimationMarkup,
    createRatioChainAnimation
  });
})(window.CT8 = window.CT8 || {});
