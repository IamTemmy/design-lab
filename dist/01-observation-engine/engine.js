(function () {
  'use strict';

  var stage = document.getElementById('stage');
  var scanPlane = document.getElementById('scanPlane');
  var resetButton = document.getElementById('resetButton');
  var detectionCount = document.getElementById('detectionCount');
  var scanValue = document.getElementById('scanValue');
  var modeValue = document.getElementById('modeValue');
  var fieldValue = document.getElementById('fieldValue');
  var eventLog = document.getElementById('eventLog');
  var systemState = document.getElementById('systemState');
  var stateWrap = document.querySelector('.system-state');
  var modeButtons = Array.prototype.slice.call(document.querySelectorAll('.modes button[data-mode]'));
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-object]'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var startTime = performance.now();
  var targetX = 0.12;
  var currentX = targetX;
  var active = false;
  var pointerDown = false;
  var raf = 0;

  targets.forEach(function (element) {
    var box = document.createElement('div');
    box.className = 'detection-box';
    box.dataset.class = element.dataset.class;
    box.innerHTML = '<span class="detection-label"><b>' + element.dataset.label + '</b><span>0.00</span></span>';
    stage.appendChild(box);
    element._observation = { box: box, hits: 0, confidence: 0, detected: false };
  });

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function elapsed() {
    var seconds = (performance.now() - startTime) / 1000;
    return seconds.toFixed(1).padStart(4, '0');
  }

  function setSystemState(label, isActive) {
    systemState.textContent = label;
    stateWrap.classList.toggle('active', isActive);
  }

  function setScanFromClientX(clientX) {
    var rect = stage.getBoundingClientRect();
    targetX = clamp((clientX - rect.left) / rect.width, 0, 1);
    active = true;
    setSystemState('Scanning field', true);
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function syncBoxes() {
    var stageRect = stage.getBoundingClientRect();
    targets.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      var observation = element._observation;
      observation.box.style.left = (rect.left - stageRect.left) + 'px';
      observation.box.style.top = (rect.top - stageRect.top) + 'px';
      observation.box.style.width = rect.width + 'px';
      observation.box.style.height = rect.height + 'px';
    });
    fieldValue.textContent = Math.round(stageRect.width) + ' × ' + Math.round(stageRect.height);
  }

  function addLog(element) {
    var empty = eventLog.querySelector('.empty');
    if (empty) empty.remove();
    var item = document.createElement('li');
    item.dataset.target = element.dataset.label;
    item.innerHTML = '<time>+' + elapsed() + '</time><strong>' + element.dataset.label.replace(/_/g, ' ') + '</strong><span class="confidence"></span>';
    eventLog.prepend(item);
    while (eventLog.children.length > 4) eventLog.lastElementChild.remove();
  }

  function updateLog(element) {
    var item = eventLog.querySelector('[data-target="' + element.dataset.label + '"] .confidence');
    if (item) item.textContent = element._observation.confidence.toFixed(2);
  }

  function probe() {
    var stageRect = stage.getBoundingClientRect();
    var scannerX = stageRect.left + stageRect.width * currentX;
    var detected = 0;

    targets.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      var observation = element._observation;
      var intersects = scannerX >= rect.left && scannerX <= rect.right;

      if (intersects && active) {
        var center = rect.left + rect.width / 2;
        var proximity = 1 - Math.abs(scannerX - center) / (rect.width / 2);
        observation.hits += 0.006 + Math.max(0, proximity) * 0.018;
        var base = Number(element.dataset.base);
        observation.confidence = clamp(base + observation.hits, base, 0.99);

        if (!observation.detected) {
          observation.detected = true;
          observation.box.classList.add('visible');
          addLog(element);
        }
        observation.box.querySelector('.detection-label span').textContent = observation.confidence.toFixed(2);
        updateLog(element);
      }

      if (observation.detected) detected += 1;
    });

    detectionCount.textContent = String(detected);
    if (detected === targets.length) setSystemState('Field classified', true);
  }

  function frame() {
    currentX = reduceMotion ? targetX : currentX + (targetX - currentX) * 0.14;
    scanPlane.style.left = (currentX * 100).toFixed(3) + '%';
    scanValue.textContent = (currentX * 100).toFixed(1) + '%';
    probe();

    if (Math.abs(targetX - currentX) > 0.0005 || pointerDown) {
      raf = requestAnimationFrame(frame);
    } else {
      currentX = targetX;
      raf = 0;
      if (active) setSystemState('Scan position held', true);
    }
  }

  stage.addEventListener('pointerdown', function (event) {
    pointerDown = true;
    stage.setPointerCapture(event.pointerId);
    setScanFromClientX(event.clientX);
  });

  stage.addEventListener('pointermove', function (event) {
    if (event.pointerType === 'mouse' || pointerDown) setScanFromClientX(event.clientX);
  });

  stage.addEventListener('pointerup', function (event) {
    pointerDown = false;
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  });

  stage.addEventListener('pointerleave', function () {
    if (!pointerDown && active) setSystemState('Scan position held', true);
  });

  stage.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    if (event.key === 'Home') targetX = 0;
    else if (event.key === 'End') targetX = 1;
    else targetX = clamp(targetX + (event.key === 'ArrowRight' ? 0.035 : -0.035), 0, 1);
    active = true;
    setSystemState('Keyboard scan', true);
    if (!raf) raf = requestAnimationFrame(frame);
  });

  modeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var mode = button.dataset.mode;
      document.body.dataset.mode = mode;
      modeValue.textContent = mode.toUpperCase();
      modeButtons.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === button));
      });
      setSystemState(mode.toUpperCase() + ' representation', true);
    });
  });

  resetButton.addEventListener('click', function () {
    targets.forEach(function (element) {
      var observation = element._observation;
      observation.hits = 0;
      observation.confidence = 0;
      observation.detected = false;
      observation.box.classList.remove('visible');
      observation.box.querySelector('.detection-label span').textContent = '0.00';
    });
    eventLog.innerHTML = '<li class="empty">No objects classified.</li>';
    detectionCount.textContent = '0';
    targetX = 0.12;
    active = false;
    startTime = performance.now();
    setSystemState('Awaiting input', false);
    if (!raf) raf = requestAnimationFrame(frame);
  });

  var observer = new ResizeObserver(function () {
    syncBoxes();
    probe();
  });
  observer.observe(stage);
  window.addEventListener('load', syncBoxes);
  window.addEventListener('resize', syncBoxes);
  syncBoxes();
  frame();
})();
