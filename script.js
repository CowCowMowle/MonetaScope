const view = document.querySelector('#view');
const routes = {
  entrar: 'Entrar', cadastro: 'Criar conta', recuperar: 'Recuperar senha',
  painel: 'Resumo financeiro', aviso: 'Recuperação de senha'
};
const emailField = '<div class="field"><label for="email">E-mail</label><input id="email" type="email" autocomplete="off" required placeholder="voce@exemplo.com"></div>';
const passwordField = '<div class="field"><label for="senha">Senha</label><input id="senha" class="password" type="password" required placeholder="••••••••" autocomplete="off"><button type="button" class="eye" aria-label="Mostrar senha" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.4-7 10-7 10 7 10 7-3.4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></button></div>';
const back = '<p class="footer"><a href="#entrar">Voltar para entrar</a></p>';
function render() {
  const hash = location.hash.slice(1);
  const route = Object.hasOwn(routes, hash) ? hash : 'entrar';
  const title = routes[route];
  document.title = title + ' · MonetaScope';
  let content;
  if (route === 'painel') {
    content = '<p class="description">Prévia com valores de exemplo.</p><div class="summary"><div>Saldo <strong>R$ 2.150,00</strong></div><div>Receitas <strong class="income">R$ 3.000,00</strong></div><div>Despesas <strong class="expense">R$ 850,00</strong></div><div>A vencer <strong class="due">R$ 120,00</strong></div></div>' + back;
  } else if (route === 'aviso') {
    content = '<p class="status">Em uma conta ativa, você receberia um link por e-mail. Nesta demonstração, o envio é simulado.</p>' + back;
  } else {
    const recovery = route === 'recuperar';
    const login = route === 'entrar';
    const intro = login ? '' : '<p class="description">' + (recovery ? 'Informe um e-mail de exemplo para simular a recuperação.' : 'Experimente o cadastro com dados fictícios.') + '</p>';
    content = intro + '<form>' + emailField + (recovery ? '' : passwordField) + (login ? '<p class="recover"><a href="#recuperar">Esqueci minha senha</a></p>' : '') + '<button class="primary">' + (recovery ? 'Simular recuperação' : title) + '</button></form>' + (login ? '<p class="footer">Ainda não tem conta? <a href="#cadastro">Criar conta</a></p>' : back);
  }
  view.innerHTML = '<h1 id="title" tabindex="-1">' + title + '</h1>' + content;
  if (hash) document.querySelector('h1').focus({ preventScroll: true });
  view.querySelector('form')?.addEventListener('submit', event => {
    event.preventDefault();
    location.hash = route === 'recuperar' ? 'aviso' : 'painel';
  });
  view.querySelector('.eye')?.addEventListener('click', event => {
    const button = event.currentTarget;
    const field = view.querySelector('#senha');
    const show = field.type === 'password';
    field.type = show ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(show));
    button.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  });
}
window.addEventListener('hashchange', render);
render();
