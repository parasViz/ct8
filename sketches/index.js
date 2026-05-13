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
    quadrilateralCounter: {
      markup: sketches.quadrilateralCounterAnimationMarkup,
      create: sketches.createQuadrilateralCounterAnimation
    },
    quadrilateralTessellation: {
      markup: sketches.quadrilateralTessellationAnimationMarkup,
      create: sketches.createQuadrilateralTessellationAnimation
    }
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

    return "";
  };
})(window.CT8 = window.CT8 || {});
