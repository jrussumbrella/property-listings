const copyToClipboard = (): void => {
  const url = window.location.href;
  const el = document.createElement('input');
  el.value = url;
  el.id = 'url-input';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
};

export default copyToClipboard;
