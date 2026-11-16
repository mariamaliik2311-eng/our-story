const vCss = document.createElement('style');
vCss.textContent = `
  .vault-wrap { max-width: 620px; margin: 0 auto 70px; padding: 0 20px; text-align: center; }
  .vault-box { border-radius: 18px; padding: 32px 24px; }
  .v-title { margin: 8px 0 14px; font-size: 2.1rem; }
  .v-hint { font-size: 0.85rem; color: var(--muted); margin-bottom: 18px; }
  .v-form { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
  #vInp { padding: 9px 16px; border: 1px solid var(--bd); border-radius: 30px; font-family: inherit; font-size: 0.9rem; text-align: center; outline: none; width: 180px; }
  #vInp:focus { border-color: var(--rose); }
  .v-err { color: var(--rose); font-size: 0.8rem; margin-top: 10px; min-height: 18px; }
  .v-open { display: none; animation: pop 0.5s ease forwards; }
  .v-badge { display: inline-block; background: var(--soft); color: var(--rose); font-size: 0.72rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 14px; }
  .v-msg { font-family: 'Cormorant Garamond', serif; font-size: 1.38rem; line-height: 1.55; color: var(--ink); }
`;
document.head.appendChild(vCss);

const vault = document.createElement('div');
vault.className = 'vault-wrap';
vault.innerHTML = `
  <div class="card vault-box">
    <div class="tag">Secret Access • 06.12.2026</div>
    <h2 class="v-title">Секретный архив</h2>
    <div id="vLock">
      <p class="v-hint">Подсказка: дата нашего первого поцелуя</p>
      <div class="v-form">
        <input type="text" id="vInp" placeholder="пиши тута" maxlength="10">
        <button class="btn" id="vBtn">Открыть</button>
      </div>
      <div id="vErr" class="v-err"></div>
    </div>
    <div id="vOpen" class="v-open">
      <div class="v-badge">Доступ разрешён</div>
      <p class="v-msg">С нашими шестью месяцами! Чтобы твоё любимое рабочее место всегда сияло так же, как мои глаза рядом с тобой, я подготовила кое-что полезное. Загляни в мой рюкзак</p>
    </div>
  </div>
`;
document.body.insertBefore(vault, document.querySelector('footer'));

document.getElementById('vBtn').onclick = () => {
  const val = document.getElementById('vInp').value.replace(/\./g, '').trim();
  if (val === '160626') {
    document.getElementById('vLock').style.display = 'none';
    document.getElementById('vOpen').style.display = 'block';
  } else {
    document.getElementById('vErr').textContent = 'Неверный код, попробуй вспомнить ту самую дату!';
  }
};
