// A page-local Video Mode preview: pick where the video sits and play a small
// Minesweeper board around it. Nothing here is saved or sent anywhere.
(() => {
  const preview = document.querySelector('[data-vm]');
  if (!preview) return;
  const get = name => document.getElementById('vm-' + name);
  const phone = preview.querySelector('.vm-phone');
  const board = get('board');
  const zones = preview.querySelectorAll('[data-zone]');
  const modes = preview.querySelectorAll('[data-mode]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const SIZE = 9;
  const MINES = 10;
  let cells = [];
  let placed = false;
  let over = false;
  let mode = 'reveal';
  let started = 0;
  let ticker = null;

  const around = index => {
    const row = Math.floor(index / SIZE), column = index % SIZE, list = [];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = column - 1; c <= column + 1; c++) {
        if (r >= 0 && r < SIZE && c >= 0 && c < SIZE && (r !== row || c !== column)) list.push(r * SIZE + c);
      }
    }
    return list;
  };
  const flags = () => cells.filter(cell => cell.flag).length;

  function describe(cell, index) {
    const place = 'Row ' + (Math.floor(index / SIZE) + 1) + ', column ' + (index % SIZE + 1) + ', ';
    if (cell.mineShown) return place + 'mine';
    if (cell.flag) return place + 'flagged';
    if (!cell.open) return place + 'hidden';
    return place + (cell.count ? cell.count + (cell.count === 1 ? ' mine nearby' : ' mines nearby') : 'empty');
  }

  function render() {
    cells.forEach((cell, index) => {
      const button = cell.button;
      button.className = cell.open ? 'open' : cell.mineShown ? 'mine' : cell.flag ? 'flag' : '';
      button.textContent = cell.mineShown ? '✹' : cell.flag ? '⚑' : cell.open && cell.count ? cell.count : '';
      if (cell.open && cell.count) button.dataset.n = cell.count; else delete button.dataset.n;
      button.setAttribute('aria-label', describe(cell, index));
    });
    get('flags').textContent = String(Math.max(0, MINES - flags())).padStart(3, '0');
  }

  function tick() {
    const seconds = started ? Math.floor((Date.now() - started) / 1000) : 0;
    get('clock').textContent = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
  }

  // The first reveal and its neighbors are always safe.
  function placeMines(first) {
    const safe = new Set([first, ...around(first)]);
    const open = cells.map((_, index) => index).filter(index => !safe.has(index));
    for (let count = 0; count < MINES; count++) {
      const pick = Math.floor(Math.random() * open.length);
      cells[open.splice(pick, 1)[0]].mine = true;
    }
    cells.forEach((cell, index) => { cell.count = around(index).filter(near => cells[near].mine).length; });
    placed = true;
    started = Date.now();
    ticker = setInterval(tick, 250);
  }

  function finish(won) {
    over = true;
    clearInterval(ticker);
    tick();
    if (!won) cells.forEach(cell => { if (cell.mine && !cell.flag) cell.mineShown = true; });
    get('result').textContent = won ? 'You won!' : 'Bad luck';
    get('banner').hidden = false;
    get('status').textContent = won ? 'Board cleared in ' + get('clock').textContent + '.' : 'You hit a mine. Try a new board.';
    render();
    get('again').focus();
  }

  function reveal(index) {
    const cell = cells[index];
    if (over || cell.open || cell.flag) return;
    if (!placed) placeMines(index);
    if (cell.mine) return finish(false);
    const queue = [index];
    while (queue.length) {
      const next = queue.pop(), current = cells[next];
      if (current.open || current.flag) continue;
      current.open = true;
      if (!current.count) queue.push(...around(next));
    }
    if (cells.every(item => item.open || item.mine)) return finish(true);
    render();
  }

  function toggleFlag(index) {
    const cell = cells[index];
    if (over || cell.open) return;
    cell.flag = !cell.flag;
    render();
  }

  function focusCell(index) {
    cells.forEach((cell, position) => { cell.button.tabIndex = position === index ? 0 : -1; });
    cells[index].button.focus();
  }

  function reset() {
    clearInterval(ticker);
    placed = false;
    over = false;
    started = 0;
    cells.forEach(cell => Object.assign(cell, { mine: false, open: false, flag: false, mineShown: false, count: 0 }));
    get('banner').hidden = true;
    get('status').textContent = '';
    tick();
    render();
  }

  for (let row = 0; row < SIZE; row++) {
    const line = document.createElement('div');
    line.setAttribute('role', 'row');
    for (let column = 0; column < SIZE; column++) {
      const index = row * SIZE + column;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'gridcell');
      button.tabIndex = index ? -1 : 0;
      button.addEventListener('click', () => (mode === 'flag' ? toggleFlag(index) : reveal(index)));
      button.addEventListener('contextmenu', event => { event.preventDefault(); toggleFlag(index); });
      button.addEventListener('keydown', event => {
        const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -SIZE, ArrowDown: SIZE }[event.key];
        if (event.key === 'f' || event.key === 'F') return toggleFlag(index);
        if (!step) return;
        event.preventDefault();
        const target = index + step;
        const wraps = Math.abs(step) === 1 && Math.floor(target / SIZE) !== row;
        if (target >= 0 && target < SIZE * SIZE && !wraps) focusCell(target);
      });
      cells.push({ button });
      line.append(button);
    }
    board.append(line);
  }

  function place(button) {
    const apply = () => {
      phone.dataset.position = button.dataset.zone;
      zones.forEach(zone => zone.setAttribute('aria-pressed', String(zone === button)));
      get('surface').textContent = 'Video location: ' + button.dataset.label;
    };
    if (document.startViewTransition && !reduce.matches) document.startViewTransition(apply); else apply();
  }
  zones.forEach(button => button.addEventListener('click', () => place(button)));
  modes.forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    modes.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
  get('restart').addEventListener('click', reset);
  get('again').addEventListener('click', () => { reset(); focusCell(0); });

  reset();
  preview.hidden = false;
  document.querySelectorAll('[data-vm-fallback]').forEach(item => { item.hidden = true; });
})();
