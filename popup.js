chrome.storage.sync.get(['githubToken'], async (data) => {
  const token = data.githubToken;
  const repo = 'pepeyc7526/qwen-bluesky-bot';
  const workflowId = 'bluesky-bot.yml';

  if (!token) {
    const newToken = prompt('Enter your GitHub PAT (repo scope):');
    if (newToken) {
      chrome.storage.sync.set({ githubToken: newToken });
      location.reload();
    }
    return;
  }

  document.getElementById('run').onclick = async () => {
    // Запускаем workflow
    const res = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({ ref: 'main' })
    });

    const statusEl = document.getElementById('status');
    if (res.ok) {
      statusEl.className = 'success';
      statusEl.innerText = '✅ Bot started!\nCheck GitHub Actions.';
    } else {
      statusEl.className = 'error';
      statusEl.innerText = '❌ Failed to start';
    }
  };
});
