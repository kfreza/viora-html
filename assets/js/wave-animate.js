(function () {

  const config = {
    originX: 271,
    originY: 283,

    bundles: [
      {
        selector: '.b1',
        speed: {
          translate: 0.4,
          rotate: 0.5,
          scale: 0.7,
        },
        amplitude: {
          translateX: 8,
          translateY: 6,
          rotate: 6,
          scale: 0.04,
        },
        phase: 0,
      },
      {
        selector: '.b2',
        speed: {
          translate: 0.38,
          rotate: 0.45,
          scale: 0.6,
        },
        amplitude: {
          translateX: 10,
          translateY: 7,
          rotate: 5,
          scale: 0.035,
        },
        phase: 1.2,
      },
      {
        selector: '.b3',
        speed: {
          translate: 0.33,
          rotate: 0.4,
          scale: 0.55,
        },
        amplitude: {
          translateX: 9,
          translateY: 8,
          rotate: 7,
          scale: 0.04,
        },
        phase: 2.4,
      },
    ],
    globalSpeed: 0.030,
  };

  // ===== ANIMATION ENGINE =====

  let t = 0;
  const bundleElements = config.bundles.map(b => ({
    ...b,
    elements: document.querySelectorAll(b.selector),
  }));

  function animate() {
    t += config.globalSpeed;

    bundleElements.forEach(bundle => {
      if (!bundle.elements.length) return;

      const p = bundle.phase;
      const sp = bundle.speed;
      const am = bundle.amplitude;

      const tx = Math.sin(t * sp.translate + p) * am.translateX;
      const ty = Math.cos(t * sp.translate * 0.9 + p) * am.translateY;
      const r = Math.sin(t * sp.rotate + p) * am.rotate;
      const s = 1 + Math.sin(t * sp.scale + p) * am.scale;

      const transform = `translate(${tx.toFixed(3)}px, ${ty.toFixed(3)}px) scale(${s.toFixed(4)}) rotate(${r.toFixed(3)}deg)`;
      const origin = `${config.originX}px ${config.originY}px`;

      bundle.elements.forEach(el => {
        el.style.transform = transform;
        el.style.transformOrigin = origin;
      });
    });

    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }

})();
