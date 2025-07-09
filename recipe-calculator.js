/* --- recipe-calculator.js --- */
;(function(){
  // لجميع الويدجتات في الصفحة
  const widgets = document.querySelectorAll('.recipe-calc');
  widgets.forEach(widget => {
    const original = Number(widget.dataset.original) || 20;
    const title    = widget.dataset.title || 'Recette';
    const items    = JSON.parse(widget.dataset.items || '[]');

    // بناء الودجت
    widget.innerHTML = `
      <div class="rc-header">
        <h3>${title}</h3>
        <label>عدد الشرائح:
          <input type="number" class="rc-input" value="${original}" min="1">
        </label>
      </div>
      <div class="rc-list"></div>
    `;

    const input = widget.querySelector('.rc-input');
    const list  = widget.querySelector('.rc-list');

    function render(n) {
      list.innerHTML = '';
      items.forEach(ing => {
        const q = ing.qty * n / original;
        const qt = Number.isInteger(q) ? q : q.toFixed(2);
        const div = document.createElement('div');
        div.className = 'rc-item';
        div.innerHTML = `
          <img src="${ing.img}" alt="${ing.name}">
          <div class="qty">${qt} ${ing.unit}</div>
          <div class="name">${ing.name}</div>
        `;
        list.appendChild(div);
      });
    }

    render(original);
    input.addEventListener('input', () => render(Number(input.value) || original));
  });
})();
