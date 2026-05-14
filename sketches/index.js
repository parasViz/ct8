((root) => {
  const sketches = (root.sketches = root.sketches || {});
  const EMPTY_CONTROLLER = Object.freeze({ destroy() {} });

  const animationRenderers = {
    basePlaceValue: {
      markup: sketches.basePlaceValueAnimationMarkup,
      create: sketches.createBasePlaceValueAnimation
    },
    binaryPlaceValue: {
      markup: sketches.binaryPlaceValueAnimationMarkup,
      create: sketches.createBinaryPlaceValueAnimation
    },
    decimalPipes: {
      markup: sketches.decimalPipesAnimationMarkup,
      create: sketches.createDecimalPipesAnimation
    },
    patternPower: {
      markup: sketches.patternPowerAnimationMarkup,
      create: sketches.createPatternPowerAnimation
    },
    powerSquareCompare: {
      markup: sketches.powerSquareCompareAnimationMarkup,
      create: sketches.createPowerSquareCompareAnimation
    },
    owlTreePairs: {
      markup: sketches.owlTreePairsAnimationMarkup,
      create: sketches.createOwlTreePairsAnimation
    },
    quadrilateralCounter: {
      markup: sketches.quadrilateralCounterAnimationMarkup,
      create: sketches.createQuadrilateralCounterAnimation
    },
    quadrilateralTessellation: {
      markup: sketches.quadrilateralTessellationAnimationMarkup,
      create: sketches.createQuadrilateralTessellationAnimation
    },
    ratioBar: {
      markup: sketches.ratioBarAnimationMarkup,
      create: sketches.createRatioBarAnimation
    },
    ratioScale: {
      markup: sketches.ratioScaleAnimationMarkup,
      create: sketches.createRatioScaleAnimation
    },
    ratioCompare: {
      markup: sketches.ratioCompareAnimationMarkup,
      create: sketches.createRatioCompareAnimation
    },
    ratioChain: {
      markup: sketches.ratioChainAnimationMarkup,
      create: sketches.createRatioChainAnimation
    }
  };

  const activityRenderers = {
    "squares-cubes": sketches.createSquaresCubesActivityVisual,
    "power-play": sketches.createPowerPlayActivityVisual,
    "quadrilaterals": sketches.createQuadrilateralsActivityVisual
  };

  sketches.createActivityVisual = function createActivityVisual(host, module) {
    if (!host || !module?.id) {
      return EMPTY_CONTROLLER;
    }

    const renderer = activityRenderers[module.id];
    if (!renderer) {
      return EMPTY_CONTROLLER;
    }

    host.classList.add("activity-sketch-host");
    host.removeAttribute("aria-hidden");
    host.setAttribute("role", "img");
    const ariaLabels = {
      "squares-cubes": "Interactive square and cube — change sizes and rotate the cube",
      "power-play": "2 squared as a 2 by 2 grid, 2 cubed as a 2 by 2 by 2 cube, and 2 to the fourth as a rotating tesseract",
      "quadrilaterals": "Animated quadrilateral morphing through square, rectangle, parallelogram, rhombus, trapezium, and kite"
    };
    host.setAttribute("aria-label", ariaLabels[module.id] || `Activity visual for ${module.title || module.id}`);
    return renderer(host, module) || EMPTY_CONTROLLER;
  };

  sketches.createQuestionAnimation = function createQuestionAnimation(host, animation) {
    if (!host || !animation?.type) {
      return EMPTY_CONTROLLER;
    }

    const renderer = animationRenderers[animation.type];
    if (!renderer?.markup || !renderer?.create) {
      host.innerHTML = "";
      return EMPTY_CONTROLLER;
    }

    host.innerHTML = renderer.markup(animation);
    return renderer.create(host, animation) || EMPTY_CONTROLLER;
  };

  sketches.getQuestionFigureMarkup = function getQuestionFigureMarkup(figure) {
    if (figure?.type === "quadrilateralGrid" && sketches.quadrilateralGridFigureMarkup) {
      return sketches.quadrilateralGridFigureMarkup();
    }

    if (figure?.type === "image" && sketches.questionImageFigureMarkup) {
      return sketches.questionImageFigureMarkup(figure);
    }

    return "";
  };
})(window.CT8 = window.CT8 || {});
