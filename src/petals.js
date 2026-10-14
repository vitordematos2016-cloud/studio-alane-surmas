/*
 * Pétalas interativas em todo o site: qualquer imagem de pétala pode ser arrastada
 * (mouse ou toque) e fica onde for solta. Nada é salvo, então ao recarregar a página
 * elas voltam ao lugar original. Todas caem em loop, do topo à base da própria seção.
 *
 * O deslocamento do arraste usa margens (ou left/top em elementos não posicionados),
 * para não brigar com as animações das pétalas, que usam transform/translate/rotate.
 */

const PETAL_SELECTOR = 'img[src*="/petala"]';

function isPetal(node) {
  return node instanceof HTMLImageElement && node.matches(PETAL_SELECTOR);
}

// Distância vertical do elemento até o topo da seção (sem contar transforms/animações)
function offsetWithin(el, ancestor) {
  let y = 0;
  let node = el;
  while (node && node !== ancestor) {
    y += node.offsetTop;
    node = node.offsetParent;
    if (node && !ancestor.contains(node)) return null;
  }
  return node === ancestor ? y : null;
}

// Gerador fixo por índice: cada pétala tem sempre o mesmo ritmo de queda
function pseudo(i, k) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/*
 * Queda contínua: cada pétala nasce acima da própria seção, cai balançando e girando
 * até sumir embaixo e recomeça no topo. Durações e atrasos diferentes por pétala
 * mantêm a chuva constante, sem todas caírem juntas.
 */
function setupFall(reduceMotion) {
  document.querySelectorAll(PETAL_SELECTOR).forEach((petal, index) => {
    petal.draggable = false;
    if (reduceMotion) return;
    const section = petal.closest('section, footer');
    if (!section) return;
    const top = offsetWithin(petal, section);
    if (top === null) return;
    const h = petal.offsetHeight || 60;
    petal.style.setProperty('--fall-start', `${-(top + h + 60)}px`);
    petal.style.setProperty('--fall-end', `${section.offsetHeight - top + 60}px`);
    if (!petal.dataset.petalReady) {
      petal.dataset.petalReady = '1';
      const dur = 10 + pseudo(index, 1) * 9;
      petal.style.setProperty('--fall-dur', `${dur.toFixed(1)}s`);
      petal.style.setProperty('--fall-delay', `${(-pseudo(index, 2) * dur).toFixed(1)}s`);
      petal.style.setProperty('--fall-sway', `${Math.round(25 + pseudo(index, 3) * 45)}px`);
      petal.style.setProperty('--fall-spin', `${Math.round((pseudo(index, 4) > .5 ? 1 : -1) * (160 + pseudo(index, 5) * 220))}deg`);
      petal.classList.add('petal-falling');
    }
  });
}

function applyOffset(petal, dx, dy) {
  const { position } = getComputedStyle(petal);
  if (position === 'absolute' || position === 'fixed') {
    // Funciona tanto para pétalas ancoradas por left/top quanto por right/bottom
    petal.style.marginLeft = `${dx}px`;
    petal.style.marginRight = `${-dx}px`;
    petal.style.marginTop = `${dy}px`;
    petal.style.marginBottom = `${-dy}px`;
  } else {
    if (position === 'static') petal.style.position = 'relative';
    petal.style.left = `${dx}px`;
    petal.style.top = `${dy}px`;
  }
}

export function setupInteractivePetals() {
  let drag = null;
  let hoverPetal = null;

  // Acha a pétala sob o ponteiro mesmo que outra camada do cenário (fita, imagem,
  // canvas 3D, vidro) esteja por cima dela. Botões, links e campos continuam com prioridade.
  const findPetal = (event) => {
    if (isPetal(event.target)) return event.target;
    if (event.target.closest?.('a, button, input, textarea, select, iframe, [role="button"]')) return null;
    return document.elementsFromPoint(event.clientX, event.clientY).find(isPetal) || null;
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const petal = findPetal(event);
    if (!petal) return;
    event.preventDefault();
    event.stopPropagation();
    drag = {
      petal,
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: Number(petal.dataset.petalX || 0),
      baseY: Number(petal.dataset.petalY || 0),
    };
    petal.setPointerCapture?.(event.pointerId);
    petal.classList.add('petal-dragging');
    document.documentElement.classList.add('petal-grabbing');
  };

  const onPointerMove = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    event.preventDefault();
    const dx = drag.baseX + event.clientX - drag.startX;
    const dy = drag.baseY + event.clientY - drag.startY;
    drag.petal.dataset.petalX = String(dx);
    drag.petal.dataset.petalY = String(dy);
    applyOffset(drag.petal, dx, dy);
  };

  const onPointerUp = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    drag.petal.classList.remove('petal-dragging');
    document.documentElement.classList.remove('petal-grabbing', 'petal-hover');
    hoverPetal = null;
    drag.petal.releasePointerCapture?.(event.pointerId);
    drag = null;
  };

  const onDragStart = (event) => {
    if (isPetal(event.target) || drag) event.preventDefault();
  };

  // Cursor de "pegar" sempre que houver uma pétala sob o mouse, mesmo coberta
  const onHover = (event) => {
    if (drag || event.pointerType !== 'mouse') return;
    const petal = findPetal(event);
    if (petal === hoverPetal) return;
    document.documentElement.classList.toggle('petal-hover', Boolean(petal));
    hoverPetal = petal;
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let queued = 0;
  const refresh = () => {
    cancelAnimationFrame(queued);
    queued = requestAnimationFrame(() => setupFall(reduceMotion));
  };
  refresh();
  // Seções carregadas depois (lazy) e mudanças de tamanho recalculam a altura da queda
  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('resize', refresh);
  window.addEventListener('load', refresh);

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointermove', onPointerMove, { passive: false });
  document.addEventListener('pointermove', onHover, { passive: true });
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);
  document.addEventListener('dragstart', onDragStart);

  return () => {
    cancelAnimationFrame(queued);
    observer.disconnect();
    window.removeEventListener('resize', refresh);
    window.removeEventListener('load', refresh);
    document.removeEventListener('pointerdown', onPointerDown, true);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointermove', onHover);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);
    document.removeEventListener('dragstart', onDragStart);
  };
}
