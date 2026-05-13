function quadrilateralCounterAnimationMarkup(animation) {
  return `
    <article class="quad-counter-card" aria-label="Quadrilateral counting interactive hint">
      <header class="quad-counter-head">
        <p>Geometry challenge</p>
        <h4>Find ${animation.target} quadrilaterals</h4>
      </header>
      <div class="quad-counter-canvas"></div>
      <p class="quad-counter-note">Click a region. Green means it has 4 sides. Red means try another region.</p>
    </article>
  `;
}

function createQuadrilateralCounterAnimation(host, animation) {
  const canvasHost = host.querySelector(".quad-counter-canvas");
  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="quad-counter-fallback">
        <strong>${animation.target}</strong>
        <span>quadrilaterals</span>
      </div>
    `;
    return { destroy() {} };
  }

  const sketch = new window.p5((p) => {
    let width = 0;
    let shapes = [];
    let lastWrong = null;

    const baseQuads = [
      { id: "whole", label: "13", pts: [[120, 90], [380, 90], [380, 350], [120, 350]] },
      { id: "left-half", label: "5", pts: [[120, 90], [250, 90], [250, 350], [120, 350]] },
      { id: "right-half", label: "6", pts: [[250, 90], [380, 90], [380, 350], [250, 350]] },
      { id: "top-half", label: "7", pts: [[120, 90], [380, 90], [380, 220], [120, 220]] },
      { id: "bottom-half", label: "8", pts: [[120, 220], [380, 220], [380, 350], [120, 350]] },
      { id: "diag-upper-left", label: "9", pts: [[120, 90], [380, 90], [380, 220], [250, 220]] },
      { id: "diag-left-lower", label: "10", pts: [[120, 90], [250, 220], [250, 350], [120, 350]] },
      { id: "diag-right-upper", label: "11", pts: [[250, 90], [380, 90], [380, 350], [250, 220]] },
      { id: "diag-lower-right", label: "12", pts: [[120, 220], [250, 220], [380, 350], [120, 350]] },
      { id: "small-tl", label: "1", pts: [[120, 90], [250, 90], [250, 220], [120, 220]] },
      { id: "small-tr", label: "2", pts: [[250, 90], [380, 90], [380, 220], [250, 220]] },
      { id: "small-bl", label: "3", pts: [[120, 220], [250, 220], [250, 350], [120, 350]] },
      { id: "small-br", label: "4", pts: [[250, 220], [380, 220], [380, 350], [250, 350]] }
    ];

    const baseDecoys = [
      { id: "tri-top-left", pts: [[120, 90], [250, 90], [250, 220]] },
      { id: "tri-bottom-right", pts: [[250, 220], [380, 220], [380, 350]] },
      { id: "top-row", pts: [[120, 90], [380, 90], [380, 220], [250, 220], [120, 90]] }
    ];

    const labelPositions = {
      "small-tl": [186, 154],
      "small-tr": [316, 154],
      "small-bl": [186, 286],
      "small-br": [316, 286],
      "left-half": [142, 220],
      "right-half": [358, 220],
      "top-half": [250, 118],
      "bottom-half": [250, 322],
      "diag-upper-left": [338, 178],
      "diag-left-lower": [158, 312],
      "diag-right-upper": [344, 304],
      "diag-lower-right": [172, 248],
      "whole": [250, 220]
    };

    function fitCanvas() {
      width = Math.max(360, canvasHost.clientWidth || 620);
      p.resizeCanvas(width, 500);
    }

    function mapPoint(point) {
      const scale = Math.min((width - 48) / 500, 1);
      const offsetX = (width - 500 * scale) / 2;
      return [offsetX + point[0] * scale, 44 + point[1] * scale];
    }

    function mappedShape(shape, type) {
      return {
        ...shape,
        type,
        pts: shape.pts.map(mapPoint),
        selected: false,
        wrongUntil: 0
      };
    }

    function rebuildShapes() {
      shapes = [
        ...baseQuads.map((shape) => mappedShape(shape, "quad")),
        ...baseDecoys.map((shape) => mappedShape(shape, "decoy"))
      ];
    }

    function pointInPoly(x, y, pts) {
      let inside = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i, i += 1) {
        const xi = pts[i][0];
        const yi = pts[i][1];
        const xj = pts[j][0];
        const yj = pts[j][1];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) {
          inside = !inside;
        }
      }
      return inside;
    }

    function shapeCenter(shape) {
      if (labelPositions[shape.id]) {
        return mapPoint(labelPositions[shape.id]);
      }
      const total = shape.pts.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0]);
      return [total[0] / shape.pts.length, total[1] / shape.pts.length];
    }

    p.setup = () => {
      width = Math.max(360, canvasHost.clientWidth || 620);
      const canvas = p.createCanvas(width, 500);
      canvas.parent(canvasHost);
      p.textFont("Arial");
      p.frameRate(30);
      rebuildShapes();
    };

    p.windowResized = () => {
      fitCanvas();
      const selected = new Set(shapes.filter((shape) => shape.selected).map((shape) => shape.id));
      rebuildShapes();
      shapes.forEach((shape) => {
        shape.selected = selected.has(shape.id);
      });
    };

    p.mousePressed = () => {
      const labelHit = [...shapes]
        .filter((shape) => shape.type === "quad")
        .reverse()
        .find((shape) => {
          const [x, y] = shapeCenter(shape);
          return p.dist(p.mouseX, p.mouseY, x, y) <= 15;
        });
      if (labelHit) {
        labelHit.selected = !labelHit.selected;
        return false;
      }

      const hit = [...shapes].reverse().find((shape) => pointInPoly(p.mouseX, p.mouseY, shape.pts));
      if (!hit) {
        return true;
      }
      if (hit.type === "quad") {
        hit.selected = !hit.selected;
      } else {
        hit.wrongUntil = p.millis() + 900;
        lastWrong = hit.id;
      }
      return false;
    };

    p.draw = () => {
      const count = shapes.filter((shape) => shape.type === "quad" && shape.selected).length;
      const hover = shapes.some((shape) => pointInPoly(p.mouseX, p.mouseY, shape.pts));
      p.background(251, 253, 255);

      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(18);
      p.text("Click the four-sided regions", width / 2, 24);

      shapes.forEach((shape) => {
        const isWrong = p.millis() < shape.wrongUntil;
        p.stroke(isWrong ? p.color(249, 88, 119) : shape.selected ? p.color(6, 151, 112) : p.color(23, 32, 52));
        p.strokeWeight(shape.selected || isWrong ? 3 : 1.7);
        if (shape.selected) {
          p.fill(232, 255, 248);
        } else if (isWrong) {
          p.fill(255, 240, 244);
        } else {
          p.fill(255, 255, 255);
        }
        p.beginShape();
        shape.pts.forEach(([x, y]) => p.vertex(x, y));
        p.endShape(p.CLOSE);
      });

      shapes
        .filter((shape) => shape.type === "quad")
        .forEach((shape) => {
          const [x, y] = shapeCenter(shape);
          p.noStroke();
          p.fill(shape.selected ? p.color(6, 151, 112) : p.color(238, 244, 255));
          p.circle(x, y, 24);
          p.fill(shape.selected ? p.color(255, 255, 255) : p.color(49, 93, 219));
          p.textSize(12);
          p.textStyle(p.BOLD);
          p.text(shape.label, x, y);
        });

      const gridPts = [
        [120, 90],
        [380, 90],
        [380, 350],
        [120, 350]
      ].map(mapPoint);
      const [topLeft, topRight, bottomRight, bottomLeft] = gridPts;
      const middleTop = mapPoint([250, 90]);
      const middleBottom = mapPoint([250, 350]);
      const leftMiddle = mapPoint([120, 220]);
      const rightMiddle = mapPoint([380, 220]);
      p.stroke(23, 32, 52);
      p.strokeWeight(2.4);
      p.noFill();
      p.line(topLeft[0], topLeft[1], topRight[0], topRight[1]);
      p.line(topRight[0], topRight[1], bottomRight[0], bottomRight[1]);
      p.line(bottomRight[0], bottomRight[1], bottomLeft[0], bottomLeft[1]);
      p.line(bottomLeft[0], bottomLeft[1], topLeft[0], topLeft[1]);
      p.line(middleTop[0], middleTop[1], middleBottom[0], middleBottom[1]);
      p.line(leftMiddle[0], leftMiddle[1], rightMiddle[0], rightMiddle[1]);
      p.line(topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]);

      p.noStroke();
      p.fill(count === animation.target ? p.color(6, 151, 112) : p.color(49, 93, 219));
      p.textSize(24);
      p.textStyle(p.BOLD);
      p.text(`Count: ${count}`, width / 2, 444);

      p.fill(83, 96, 120);
      p.textSize(12);
      const message = count === animation.target
        ? "Great. You found all 13 quadrilaterals."
        : lastWrong && p.millis() < (shapes.find((shape) => shape.id === lastWrong)?.wrongUntil || 0)
          ? "That region is not a quadrilateral."
          : "Click the numbered badges or four-sided regions.";
      p.text(message, width / 2, 468);
      p.cursor(hover ? p.HAND : p.ARROW);
    };
  }, canvasHost);

  return {
    destroy() {
      sketch.remove();
    }
  };
}

function quadrilateralTessellationAnimationMarkup() {
  return `
    <article class="quad-tess-card" aria-label="Scalene quadrilateral tessellation animated hint">
      <header class="quad-tess-head">
        <p>Tessellation hint</p>
        <h4>Same shape, no gaps</h4>
      </header>
      <div class="quad-tess-canvas"></div>
      <p class="quad-tess-note">Watch the copies rotate and fill the floor. Click the sketch to replay.</p>
    </article>
  `;
}

function createQuadrilateralTessellationAnimation(host) {
  const canvasHost = host.querySelector(".quad-tess-canvas");
  if (!canvasHost) {
    return { destroy() {} };
  }

  if (!window.p5) {
    canvasHost.innerHTML = `
      <div class="quad-tess-fallback">
        <strong>Yes, it can tessellate.</strong>
        <span>The four angles of any quadrilateral add to 360 degrees.</span>
      </div>
    `;
    return { destroy() {} };
  }

  const sketch = new window.p5((p) => {
    const baseShape = [
      [0, 0],
      [70, 0],
      [90, 50],
      [-20, 30]
    ];
    const sideSum = [70, 0];
    const tileStepA = [0, 80];
    const tileStepB = [-90, 30];
    const tileColors = [
      [255, 190, 92],
      [76, 124, 255],
      [6, 214, 160],
      [249, 88, 119]
    ];
    const angleSlices = [
      { label: "A", size: 78, color: [255, 190, 92] },
      { label: "B", size: 112, color: [76, 124, 255] },
      { label: "C", size: 64, color: [6, 214, 160] },
      { label: "D", size: 106, color: [249, 88, 119] }
    ];
    const modelTiles = [];
    let width = 0;
    let startedAt = 0;

    function tilePoints(row, col, flipped) {
      return baseShape.map(([x, y]) => {
        const px = flipped ? sideSum[0] - x : x;
        const py = flipped ? sideSum[1] - y : y;
        return [
          px + row * tileStepA[0] + col * tileStepB[0],
          py + row * tileStepA[1] + col * tileStepB[1]
        ];
      });
    }

    for (let row = 0; row <= 2; row += 1) {
      for (let col = -1; col <= 2; col += 1) {
        [false, true].forEach((flipped) => {
          const distance = Math.abs(row - 1) + Math.abs(col) + (flipped ? 0.45 : 0);
          modelTiles.push({
            points: tilePoints(row, col, flipped),
            flipped,
            delay: 110 + distance * 170,
            color: tileColors[(row + col + (flipped ? 1 : 0) + tileColors.length) % tileColors.length]
          });
        });
      }
    }

    function fitCanvas() {
      width = Math.max(360, canvasHost.clientWidth || 700);
      p.resizeCanvas(width, 430);
    }

    function sceneLayout() {
      if (width < 680) {
        return {
          narrow: true,
          floor: { x: 22, y: 82, w: width - 44, h: 185 },
          angle: { x: Math.max(22, width / 2 - 112), y: 282, w: Math.min(224, width - 44), h: 112 },
          statusY: 408
        };
      }

      return {
        narrow: false,
        floor: { x: 26, y: 82, w: width - 310, h: 262 },
        angle: { x: width - 260, y: 116, w: 224, h: 220 },
        statusY: 390
      };
    }

    function layoutForTiles(scene) {
      const allPoints = modelTiles.flatMap((tile) => tile.points);
      const xs = allPoints.map(([x]) => x);
      const ys = allPoints.map(([, y]) => y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const floor = scene.floor;
      const scale = Math.min((floor.w - 42) / (maxX - minX), (floor.h - 44) / (maxY - minY), 0.92);
      return {
        scale,
        offsetX: floor.x + (floor.w - (maxX - minX) * scale) / 2 - minX * scale,
        offsetY: floor.y + (floor.h - (maxY - minY) * scale) / 2 - minY * scale
      };
    }

    function mapPoint([x, y], layout) {
      return [layout.offsetX + x * layout.scale, layout.offsetY + y * layout.scale];
    }

    function easeOut(value) {
      const t = p.constrain(value, 0, 1);
      return 1 - Math.pow(1 - t, 3);
    }

    function transformedPoints(points, amount, flipped) {
      const center = points.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0]).map((value) => value / points.length);
      const rotation = flipped ? (1 - amount) * Math.PI : 0;
      const shrink = 0.68 + amount * 0.32;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      return points.map(([x, y]) => {
        const dx = (x - center[0]) * shrink;
        const dy = (y - center[1]) * shrink;
        return [
          center[0] + dx * cos - dy * sin,
          center[1] + dx * sin + dy * cos
        ];
      });
    }

    function drawTile(points, color, amount, flipped) {
      if (amount <= 0) {
        return;
      }
      const alpha = 42 + amount * 155;
      const visiblePoints = transformedPoints(points, amount, flipped);
      p.stroke(23, 32, 52, 70 + amount * 95);
      p.strokeWeight(1.4);
      p.fill(color[0], color[1], color[2], alpha);
      p.beginShape();
      visiblePoints.forEach(([x, y]) => p.vertex(x, y));
      p.endShape(p.CLOSE);
    }

    function drawAngleWheel(x, y, radius, elapsed) {
      let start = -90;
      const reveal = p.constrain((elapsed - 2050) / 900, 0, 1);
      angleSlices.forEach((slice) => {
        const end = start + slice.size * reveal;
        p.fill(slice.color[0], slice.color[1], slice.color[2], 155);
        p.stroke(255);
        p.strokeWeight(2);
        p.arc(x, y, radius * 2, radius * 2, p.radians(start), p.radians(end), p.PIE);
        const mid = p.radians((start + end) / 2);
        p.noStroke();
        if (reveal > 0.12) {
          p.fill(23, 32, 52);
          p.textSize(12);
          p.textStyle(p.BOLD);
          p.text(slice.label, x + Math.cos(mid) * radius * 0.58, y + Math.sin(mid) * radius * 0.58);
        }
        start += slice.size;
      });
      p.noFill();
      p.stroke(23, 32, 52, 110);
      p.strokeWeight(2);
      p.circle(x, y, radius * 2);
      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(width < 520 ? 13 : 14);
      p.text("A + B + C + D", x, y + radius + 22);
      p.fill(6, 151, 112);
      p.text("360 degrees", x, y + radius + 42);
    }

    function drawAnglePanel(panel, elapsed) {
      const centerX = panel.x + panel.w / 2;
      const radius = panel.h < 150 ? 31 : 54;
      const centerY = panel.h < 150 ? panel.y + 40 : panel.y + 92;

      p.fill(255, 255, 255, 235);
      p.stroke(223, 232, 245);
      p.strokeWeight(1.4);
      p.rect(panel.x, panel.y, panel.w, panel.h, 8);

      p.noStroke();
      p.fill(83, 96, 120);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(11);
      p.text("ANGLE RULE", centerX, panel.y + 18);

      drawAngleWheel(centerX, centerY, radius, elapsed);
    }

    function drawFloorPanel(panel) {
      p.fill(255, 255, 255, 185);
      p.stroke(223, 232, 245);
      p.strokeWeight(1.4);
      p.rect(panel.x, panel.y, panel.w, panel.h, 8);

      p.stroke(226, 236, 249);
      p.strokeWeight(1);
      for (let y = panel.y + 38; y <= panel.y + panel.h - 18; y += 32) {
        p.line(panel.x + 18, y, panel.x + panel.w - 18, y);
      }

      p.noStroke();
      p.fill(83, 96, 120);
      p.textAlign(p.LEFT, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(11);
      p.text("FLOOR TILES", panel.x + 18, panel.y + 18);
    }

    p.setup = () => {
      width = Math.max(360, canvasHost.clientWidth || 700);
      const canvas = p.createCanvas(width, 430);
      canvas.parent(canvasHost);
      p.textFont("Arial");
      p.frameRate(30);
      startedAt = p.millis();
    };

    p.windowResized = fitCanvas;

    p.mousePressed = () => {
      startedAt = p.millis();
      return false;
    };

    p.draw = () => {
      const elapsed = p.millis() - startedAt;
      const scene = sceneLayout();
      const layout = layoutForTiles(scene);
      const allPlaced = elapsed > 2450;

      p.background(251, 253, 255);
      p.noStroke();
      p.fill(23, 32, 52);
      p.textAlign(p.LEFT, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(18);
      p.text(width < 520 ? "Scalene quadrilaterals tessellate" : "Identical scalene quadrilaterals can tessellate", 28, 28);

      p.fill(83, 96, 120);
      p.textSize(12);
      p.textStyle(p.BOLD);
      p.text(width < 520 ? "Rotated copies match sides." : "Each copy is the same shape. Some are rotated to match sides.", 28, 51);

      drawFloorPanel(scene.floor);

      modelTiles.forEach((tile) => {
        const targetPoints = tile.points.map((point) => mapPoint(point, layout));
        const amount = easeOut((elapsed - tile.delay) / 520);
        drawTile(targetPoints, tile.color, amount, tile.flipped);
      });

      drawAnglePanel(scene.angle, elapsed);

      const statusX = 26;
      const statusW = width - 52;
      p.stroke(allPlaced ? p.color(190, 243, 224) : p.color(213, 225, 246));
      p.strokeWeight(1.4);
      p.fill(allPlaced ? p.color(235, 255, 248) : p.color(246, 249, 255));
      p.rect(statusX, scene.statusY - 18, statusW, 36, 8);
      p.noStroke();
      p.fill(allPlaced ? p.color(6, 151, 112) : p.color(49, 93, 219));
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(15);
      const message = allPlaced
        ? "No gaps and no overlaps."
        : "Copies are rotating into place.";
      p.text(message, statusX + statusW / 2, scene.statusY);
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
    quadrilateralCounterAnimationMarkup,
    createQuadrilateralCounterAnimation,
    quadrilateralTessellationAnimationMarkup,
    createQuadrilateralTessellationAnimation
  });
})(window.CT8 = window.CT8 || {});
