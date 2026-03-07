(function showWelcomeMessage() {
  // One-time popup output to satisfy assignment's JS interaction requirement.
  if (sessionStorage.getItem('vw-welcome-seen')) {
    return;
  }

  alert('Welcome to Volcano Watch. Use Dashboard to inspect categories and details.');
  const wantsSafetyTips = confirm('Would you like to check volcano safety tips now?');

  if (wantsSafetyTips && window.location.pathname !== '/safety') {
    window.location.href = '/safety';
  }

  sessionStorage.setItem('vw-welcome-seen', 'true');
})();
