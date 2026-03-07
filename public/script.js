(function showWelcomeMessage() {
  // show popup once per tab
  if (sessionStorage.getItem('vw-welcome-seen')) {
    return;
  }

  alert('Welcome to Volcano Watch.');
  const visitorName = prompt('Your name (optional):');
  if (visitorName && visitorName.trim()) {
    alert(`Hi ${visitorName.trim()}! Open Dashboard to start.`);
  }

  const wantsSafetyTips = confirm('Open Safety Tips page now?');

  if (wantsSafetyTips && window.location.pathname !== '/safety') {
    window.location.href = '/safety';
  }

  sessionStorage.setItem('vw-welcome-seen', 'true');
})();
