const input = document.getElementById('filtro-nome');
//fazendo o uso do spread/rest para array
const trs = [...document.querySelectorAll('#lista tbody tr')];

input.addEventListener('input', () => {
  const search = input.value.toLowerCase();
  trs.forEach(el => {
    const matches = el.textContent.toLowerCase().includes(search);
    el.style.display = matches ? 'table-row' : 'none';
  });
});