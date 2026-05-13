function basePlaceValueAnimationMarkup(animation) {
  const label = animation.base === 2 ? "Binary place value" : `Base-${animation.base} place value`;
  return `
    <article class="base-place-card" aria-label="${label} interactive hint">
      <header class="base-place-head">
        <p>${label}</p>
        <h4>Build ${animation.target}</h4>
      </header>
      <div class="base-place-canvas"></div>
      <p class="base-place-note">Click each digit tile to cycle its value. The sum updates below.</p>
    </article>
  `;
}

function createBasePlaceValueAnimation(host, animation) {
  const canvasHost = host.querySelector(".base-place-canvas");
  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="base-place-fallback">
        <strong>${animation.answerDigits.join("")}</strong>
        <span>${animation.target}</span>
      </div>
    `;
    return { destroy() {} };
  }

  const places = animation.places;
  const answerDigits = animation.answerDigits;
  const base = animation.base;
  const target = animation.target;
  const digits = places.map(() => 0);
  const sketch = new window.p5((p) => {
    let width = 0;
    let boxes = [];

    function fitCanvas() {
      width = Math.max(360, canvasHost.clientWidth || 620);
      p.resizeCanvas(width, 330);
    }

    p.setup = () => {
      width = Math.max(360, canvasHost.clientWidth || 620);
      const canvas = p.createCanvas(width, 330);
      canvas.parent(canvasHost);
      p.textFont("Arial");
      p.frameRate(30);
    };

    p.windowResized = fitCanvas;

    p.mousePressed = () => {
      const hit = boxes.find((box) => p.mouseX >= box.x && p.mouseX <= box.x + box.w && p.mouseY >= box.y && p.mouseY <= box.y + box.h);
      if (hit) {
        digits[hit.index] = (digits[hit.index] + 1) % base;
        return false;
      }
      return true;
    };

    p.draw = () => {
      const pulse = 0.5 + 0.5 * Math.sin(p.millis() / 260);
      const total = places.reduce((sum, place, index) => sum + place * digits[index], 0);
      const representation = digits.join("");
      const correctDigits = digits.every((digit, index) => digit === answerDigits[index]);
      const isDone = total === target && correctDigits;
      const maxBoxW = places.length > 4 ? 74 : 86;
      const boxW = Math.min(maxBoxW, (width - 56) / places.length);
      const gap = (width - boxW * places.length) / (places.length + 1);
      const y = 104;
      const tileH = 68;
      const hover = boxes.some((box) => p.mouseX >= box.x && p.mouseX <= box.x + box.w && p.mouseY >= box.y && p.mouseY <= box.y + box.h);
      boxes = [];

      p.background(251, 253, 255);
      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(18);
      p.text(animation.source ? `Set the bits to ${animation.source}` : `Build ${target} in base ${base}`, width / 2, 25);

      p.fill(83, 96, 120);
      p.textSize(12);
      p.text(`Digits allowed: 0 to ${base - 1}`, width / 2, 49);

      places.forEach((place, index) => {
        const x = gap + index * (boxW + gap);
        const centerX = x + boxW / 2;
        const digit = digits[index];
        const isCorrectDigit = digit === answerDigits[index];

        boxes.push({ x, y, w: boxW, h: tileH, index });

        p.noStroke();
        p.fill(49, 93, 219);
        p.textSize(13);
        p.textStyle(p.BOLD);
        p.text(place, centerX, y - 36);

        p.fill(83, 96, 120);
        p.textSize(11);
        p.text("place", centerX, y - 18);

        p.stroke(digit ? p.color(76, 124, 255) : p.color(215, 226, 242));
        p.strokeWeight(digit ? 3 : 1.5);
        p.fill(digit ? p.color(238, 244, 255) : p.color(255, 255, 255));
        p.rect(x, y, boxW, tileH, 10);

        p.noStroke();
        p.fill(digit ? p.color(49, 93, 219) : p.color(100, 112, 134));
        p.textSize(34);
        p.textStyle(p.BOLD);
        p.text(digit, centerX, y + 31);

        p.fill(83, 96, 120);
        p.textSize(11);
        p.text(`${digit} x ${place}`, centerX, y + tileH + 20);

        if (isCorrectDigit && digit) {
          p.noFill();
          p.stroke(6, 214, 160, 120 + pulse * 80);
          p.strokeWeight(3);
          p.rect(x - 3, y - 3, boxW + 6, tileH + 6, 12);
        }
      });

      p.cursor(hover ? p.HAND : p.ARROW);

      const parts = places
        .map((place, index) => (digits[index] ? `${digits[index]}x${place}` : ""))
        .filter(Boolean)
        .join(" + ");
      p.noStroke();
      p.fill(23, 32, 52);
      p.textSize(17);
      p.textStyle(p.BOLD);
      p.text(`Sum: ${parts || "0"} = ${total}`, width / 2, 238);

      p.fill(isDone ? p.color(6, 151, 112) : p.color(49, 93, 219));
      p.textSize(28);
      p.text(`Answer: ${representation}`, width / 2, 274);

      p.fill(isDone ? p.color(6, 151, 112) : total > target ? p.color(249, 88, 119) : p.color(83, 96, 120));
      p.textSize(13);
      const message = isDone
        ? `${representation} is correct`
        : total === target
          ? "Total is right. Check the digit pattern."
          : total < target
            ? `Need ${target - total} more`
            : `Too high by ${total - target}`;
      p.text(message, width / 2, 305);
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function decimalPipesAnimationMarkup(animation) {
  return `
    <article class="decimal-pipes-card" aria-label="Decimal pipes interactive hint">
      <header class="decimal-pipes-head">
        <p>Decimal pipes</p>
        <h4>Build height ${animation.target}</h4>
      </header>
      <div class="decimal-pipes-canvas"></div>
      <p class="decimal-pipes-note">Use 10-pipes and 1-pipes. Count how many pipes you used.</p>
    </article>
  `;
}

function createDecimalPipesAnimation(host, animation) {
  const canvasHost = host.querySelector(".decimal-pipes-canvas");
  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="decimal-pipes-fallback">
        <strong>66 = 6 tens + 6 ones</strong>
        <span>6 + 6 = 12 pipes</span>
      </div>
    `;
    return { destroy() {} };
  }

  const target = animation.target;
  const sketch = new window.p5((p) => {
    let width = 0;
    let tens = 0;
    let ones = 0;
    let buttons = [];

    function fitCanvas() {
      width = Math.max(620, canvasHost.clientWidth || 760);
      p.resizeCanvas(width, 430);
    }

    function total() {
      return tens * 10 + ones;
    }

    p.setup = () => {
      width = Math.max(620, canvasHost.clientWidth || 760);
      const canvas = p.createCanvas(width, 430);
      canvas.parent(canvasHost);
      p.textFont("Arial");
      p.frameRate(30);
    };

    p.windowResized = fitCanvas;

    p.mousePressed = () => {
      const hit = buttons.find((button) => p.mouseX >= button.x && p.mouseX <= button.x + button.w && p.mouseY >= button.y && p.mouseY <= button.y + button.h);
      if (!hit) {
        return true;
      }
      if (hit.action === "ten" && total() + 10 <= 80) {
        tens += 1;
      }
      if (hit.action === "one" && total() + 1 <= 80) {
        ones += 1;
      }
      if (hit.action === "reset") {
        tens = 0;
        ones = 0;
      }
      return false;
    };

    function drawButton(x, y, w, h, label, action, color) {
      const hovering = p.mouseX >= x && p.mouseX <= x + w && p.mouseY >= y && p.mouseY <= y + h;
      buttons.push({ x, y, w, h, action });
      p.stroke(color);
      p.strokeWeight(hovering ? 2.5 : 1.5);
      p.fill(hovering ? p.color(255, 255, 255) : p.color(248, 250, 252));
      p.rect(x, y, w, h, 8);
      p.noStroke();
      p.fill(color);
      p.textSize(13);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(label, x + w / 2, y + h / 2);
      return hovering;
    }

    p.draw = () => {
      const current = total();
      const isDone = current === target;
      const isHigh = current > target;
      const pulse = 0.5 + 0.5 * Math.sin(p.millis() / 260);
      const rulerX = 72;
      const baseY = 326;
      const scale = 3.45;
      const robotX = 118;
      const robotW = 60;
      const stackX = 254;
      const stackW = 80;
      const panelX = Math.min(width - 292, stackX + stackW + 120);
      const panelY = 104;
      const panelW = Math.max(250, width - panelX - 30);
      const panelH = 184;
      const targetY = baseY - target * scale;
      buttons = [];

      p.background(251, 253, 255);
      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(18);
      p.textFont("Arial");
      p.text(`Build height ${target}`, width / 2, 30);

      p.fill(83, 96, 120);
      p.textSize(12);
      p.text("Click pipes to build the height", width / 2, 55);

      p.stroke(209, 219, 233);
      p.strokeWeight(2);
      p.line(rulerX, baseY, rulerX, baseY - 250);
      for (let value = 0; value <= 70; value += 10) {
        const y = baseY - value * scale;
        p.line(rulerX - 8, y, rulerX + 8, y);
        p.noStroke();
        p.fill(100, 112, 134);
        p.textSize(11);
        p.text(value, rulerX - 28, y);
        p.stroke(230, 236, 245);
        p.line(rulerX + 15, y, stackX + stackW + 32, y);
        p.stroke(209, 219, 233);
      }

      const robotTop = targetY;
      const headY = robotTop + 22;
      const bodyY = robotTop + 86;
      const bodyH = 98;
      const legTop = bodyY + bodyH;
      const robotCenter = robotX + robotW / 2;

      p.stroke(76, 124, 255);
      p.strokeWeight(2);
      p.line(robotCenter - 11, headY - 2, robotCenter - 11, robotTop + 5);
      p.line(robotCenter + 11, headY - 2, robotCenter + 11, robotTop + 5);
      p.noStroke();
      p.fill(76, 124, 255);
      p.circle(robotCenter - 11, robotTop + 5, 6);
      p.circle(robotCenter + 11, robotTop + 5, 6);
      p.fill(238, 244, 255);
      p.stroke(76, 124, 255);
      p.strokeWeight(1.5);
      p.rect(robotX, headY, robotW, 50, 10);
      p.noStroke();
      p.fill(246, 250, 255, 180);
      p.rect(robotX + 9, headY + 7, 13, 36, 7);
      p.fill(23, 32, 52);
      p.circle(robotCenter - 11, headY + 24, 5);
      p.circle(robotCenter + 11, headY + 24, 5);
      p.fill(6, 151, 112);
      p.rect(robotCenter - 10, headY + 35, 20, 4, 4);
      p.fill(207, 224, 255);
      p.stroke(76, 124, 255);
      p.strokeWeight(1.5);
      p.rect(robotX + 6, bodyY, robotW - 12, bodyH, 12);
      p.noStroke();
      p.fill(49, 93, 219);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(13);
      p.text("66", robotCenter, bodyY + bodyH / 2);
      p.stroke(76, 124, 255);
      p.strokeWeight(2);
      p.line(robotX + 8, bodyY + 34, robotX - 20, bodyY + 70);
      p.line(robotX + robotW - 8, bodyY + 34, robotX + robotW + 20, bodyY + 70);
      p.line(robotCenter - 11, legTop, robotCenter - 19, baseY);
      p.line(robotCenter + 11, legTop, robotCenter + 19, baseY);
      p.line(robotCenter - 27, baseY, robotCenter - 11, baseY);
      p.line(robotCenter + 11, baseY, robotCenter + 27, baseY);

      p.stroke(249, 88, 119);
      p.strokeWeight(2);
      p.line(rulerX - 12, targetY, stackX + stackW + 38, targetY);
      p.noStroke();
      p.fill(249, 88, 119);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text("robot height 66", stackX + stackW + 48, targetY - 11);

      let y = baseY;
      for (let i = 0; i < tens; i += 1) {
        y -= 10 * scale;
        const tubeH = 10 * scale;
        p.stroke(76, 124, 255);
        p.strokeWeight(1.5);
        p.fill(223, 235, 255);
        p.rect(stackX, y, stackW, tubeH, 12);
        p.noStroke();
        p.fill(246, 250, 255, 170);
        p.rect(stackX + 9, y + 3, 13, tubeH - 6, 8);
        p.stroke(76, 124, 255);
        p.strokeWeight(1.5);
        p.fill(238, 244, 255);
        p.ellipse(stackX + stackW / 2, y + 2, stackW - 8, 12);
        p.fill(207, 224, 255);
        p.ellipse(stackX + stackW / 2, y + tubeH - 2, stackW - 8, 12);
        p.noStroke();
        p.fill(49, 93, 219);
        p.textSize(12);
        p.text("10", stackX + stackW / 2, y + tubeH / 2);
      }
      for (let i = 0; i < ones; i += 1) {
        const oneH = Math.max(3, 1 * scale);
        const oneW = stackW - 24;
        y -= oneH;
        p.stroke(183, 127, 8);
        p.strokeWeight(1);
        p.fill(255, 224, 138);
        p.rect(stackX + 12, y, oneW, oneH, 6);
        p.noStroke();
        p.fill(255, 245, 204, 160);
        p.rect(stackX + 19, y + 1, 9, Math.max(1, oneH - 2), 4);
        p.stroke(183, 127, 8);
        p.strokeWeight(1);
        p.fill(255, 238, 170);
        p.ellipse(stackX + 12 + oneW / 2, y + 1, oneW - 8, Math.min(5, oneH + 1));
      }

      if (isDone) {
        p.noFill();
        p.stroke(6, 214, 160, 120 + pulse * 80);
        p.strokeWeight(4);
        p.rect(stackX - 6, y - 6, stackW + 12, baseY - y + 12, 8);
      }

      p.stroke(216, 228, 245);
      p.strokeWeight(1.5);
      p.fill(255, 255, 255);
      p.rect(panelX, panelY, panelW, panelH, 8);

      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(13);
      p.textStyle(p.BOLD);
      p.text("Current build", panelX + 16, panelY + 20);

      p.fill(isDone ? p.color(6, 151, 112) : isHigh ? p.color(249, 88, 119) : p.color(49, 93, 219));
      p.textSize(28);
      p.text(`Height ${current}`, panelX + 16, panelY + 56);

      p.fill(83, 96, 120);
      p.textSize(14);
      p.text(`10-pipes: ${tens}`, panelX + 16, panelY + 90);
      p.text(`1-pipes: ${ones}`, panelX + 16, panelY + 116);
      p.text(`Total pipes: ${tens + ones}`, panelX + 16, panelY + 142);

      p.fill(isDone ? p.color(6, 151, 112) : isHigh ? p.color(249, 88, 119) : p.color(83, 96, 120));
      p.textStyle(p.BOLD);
      p.textSize(13);
      const message = isDone
        ? "Correct: 6 tens + 6 ones = 12 pipes"
        : current < target
          ? `Need ${target - current} more height`
          : `Too high by ${current - target}`;
      p.text(message, panelX + 16, panelY + panelH - 18);

      const buttonY = 360;
      const startX = Math.max(16, width / 2 - 178);
      const hoverTen = drawButton(startX, buttonY, 104, 38, "+ 10-pipe", "ten", p.color(76, 124, 255));
      const hoverOne = drawButton(startX + 116, buttonY, 96, 38, "+ 1-pipe", "one", p.color(6, 151, 112));
      const hoverReset = drawButton(startX + 224, buttonY, 104, 38, "Reset", "reset", p.color(249, 88, 119));
      p.cursor(hoverTen || hoverOne || hoverReset ? p.HAND : p.ARROW);
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function binaryPlaceValueAnimationMarkup(animation) {
  return `
    <article class="binary-hint-card" aria-label="Binary place value animated hint">
      <header class="binary-hint-head">
        <p>Binary hint</p>
        <h4>${animation.decimal} in binary</h4>
      </header>
      <div class="binary-p5-canvas"></div>
      <p class="binary-hint-note">Click each 0/1 tile. 1 means ON, so that place value is added to the sum.</p>
    </article>
  `;
}

function createBinaryPlaceValueAnimation(host, animation) {
  const canvasHost = host.querySelector(".binary-p5-canvas");
  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="binary-fallback">
        <strong>8 4 2 1</strong>
        <span>1 0 1 0</span>
      </div>
    `;
    return { destroy() {} };
  }

  const places = animation.places;
  const target = animation.decimal;
  const sketch = new window.p5((p) => {
    let width = 0;
    let boxes = [];
    const selected = places.map(() => false);

    function fitCanvas() {
      width = Math.max(320, canvasHost.clientWidth || 520);
      p.resizeCanvas(width, 320);
    }

    p.setup = () => {
      width = Math.max(320, canvasHost.clientWidth || 520);
      const canvas = p.createCanvas(width, 320);
      canvas.parent(canvasHost);
      p.textFont("Arial");
      p.frameRate(30);
    };

    p.windowResized = fitCanvas;

    p.mousePressed = () => {
      const hit = boxes.find((box) => p.mouseX >= box.x && p.mouseX <= box.x + box.w && p.mouseY >= box.y && p.mouseY <= box.y + box.h);
      if (hit) {
        selected[hit.index] = !selected[hit.index];
        return false;
      }
      return true;
    };

    p.draw = () => {
      const pulse = 0.5 + 0.5 * Math.sin(p.millis() / 260);
      const boxW = Math.min(86, (width - 48) / 4);
      const gap = (width - boxW * 4) / 5;
      const tileH = 66;
      const topY = 74;
      const total = places.reduce((sum, place, index) => sum + (selected[index] ? place : 0), 0);
      const binary = selected.map((isOn) => (isOn ? "1" : "0")).join("");
      const equation = places
        .filter((_, index) => selected[index])
        .join(" + ");
      const isDone = total === target;
      const hover = boxes.some((box) => p.mouseX >= box.x && p.mouseX <= box.x + box.w && p.mouseY >= box.y && p.mouseY <= box.y + box.h);
      boxes = [];

      p.background(251, 253, 255);
      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`Turn places ON to make ${target}`, width / 2, 25);

      p.fill(83, 96, 120);
      p.textSize(12);
      p.text("Power above, bit in the middle, value below", width / 2, 49);

      places.forEach((place, index) => {
        const x = gap + index * (boxW + gap);
        const y = topY + 34;
        const centerX = x + boxW / 2;
        const isOn = selected[index];
        const exponent = Math.log2(place);
        const borderColor = isOn ? p.color(76, 124, 255) : p.color(215, 226, 242);

        boxes.push({ x, y, w: boxW, h: tileH, index });

        p.noStroke();
        p.fill(49, 93, 219);
        p.textSize(14);
        p.textStyle(p.BOLD);
        p.text(`2^${exponent}`, centerX, topY + 8);

        p.stroke(borderColor);
        p.strokeWeight(isOn ? 3 : 1.5);
        p.fill(isOn ? p.color(238, 244, 255) : p.color(255, 255, 255));
        p.rect(x, y, boxW, tileH, 10);

        p.noStroke();
        p.fill(isOn ? p.color(49, 93, 219) : p.color(100, 112, 134));
        p.textSize(34);
        p.textStyle(p.BOLD);
        p.text(isOn ? "1" : "0", centerX, y + 31);

        p.fill(isOn ? p.color(6, 151, 112) : p.color(100, 112, 134));
        p.textSize(12);
        p.text(isOn ? "ON" : "OFF", centerX, y + 54);

        p.fill(83, 96, 120);
        p.textSize(13);
        p.text(`value ${place}`, centerX, y + tileH + 22);

        if (isOn) {
          p.noFill();
          p.stroke(6, 214, 160, 120 + pulse * 80);
          p.strokeWeight(3);
          p.rect(x - 3, y - 3, boxW + 6, tileH + 6, 12);
        }
      });

      p.cursor(hover ? p.HAND : p.ARROW);

      p.noStroke();
      p.fill(23, 32, 52);
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`Sum: ${equation || "0"} = ${total}`, width / 2, 224);

      p.fill(isDone ? p.color(6, 151, 112) : p.color(49, 93, 219));
      p.textSize(28);
      p.text(`Binary: ${binary}`, width / 2, 261);

      p.fill(isDone ? p.color(6, 151, 112) : p.color(83, 96, 120));
      p.textSize(14);
      const message = isDone
        ? `${binary} is correct because 8 + 2 = 10`
        : total < target
          ? `Need ${target - total} more`
          : `Too high by ${total - target}`;
      p.text(message, width / 2, 296);
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
    basePlaceValueAnimationMarkup,
    createBasePlaceValueAnimation,
    decimalPipesAnimationMarkup,
    createDecimalPipesAnimation,
    binaryPlaceValueAnimationMarkup,
    createBinaryPlaceValueAnimation
  });
})(window.CT8 = window.CT8 || {});
