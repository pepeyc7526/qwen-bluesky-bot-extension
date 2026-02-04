document.addEventListener('DOMContentLoaded', () => {
  const workflowId = 'bluesky-bot.yml';
  const runBtn = document.getElementById('run');
  const statusEl = document.getElementById('status');

  chrome.storage.sync.get(['githubToken', 'githubRepo'], async (data) => {
    let { githubToken: token, githubRepo: repo } = data;

    // Запрашиваем репозиторий, если не задан
    if (!repo) {
      repo = prompt('Enter your GitHub bot repo (e.g. username/repo):', 'yourname/qwen-bluesky-bot');
      if (!repo || !repo.includes('/')) {
        alert('Invalid repo format. Please use "username/repo".');
        return;
      }
      chrome.storage.sync.set({ githubRepo: repo });
    }

    // Запрашиваем токен, если не задан
    if (!token) {
      token = prompt('Enter your GitHub PAT (classic, with "repo" scope):');
      if (!token) return;
      chrome.storage.sync.set({ githubToken: token });
      location.reload();
    }

    // === Проверка статуса последнего запуска ===
    const checkRunStatus = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repo}/actions/runs?branch=main&event=workflow_dispatch`,
          { headers: { 'Authorization': `token ${token}` } }
        );
        const json = await res.json();
        const latest = json.workflow_runs?.[0];
        if (latest) {
          const now = new Date();
          const runTime = new Date(latest.created_at);
          const diffMin = Math.floor((now - runTime) / 60000);
          if (diffMin < 15) {
            statusEl.className = latest.status === 'completed' ? 'success' : 'running';
            statusEl.innerText = `Last run: ${latest.status} (${diffMin}m ago)`;
          }
        }
      } catch (e) {
        console.error("Failed to check run status:", e);
      }
    };

    // === Запуск workflow ===
    runBtn.onclick = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repo}/actions/workflows/${workflowId}/dispatches`,
          {
            method: 'POST',
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ref: 'main' })
          }
        );

        if (res.ok) {
          statusEl.className = 'success';
          statusEl.innerText = '✅ Triggered!\nCheck GitHub Actions.';
          setTimeout(checkRunStatus, 3000);
        } else {
          const err = await res.text();
          statusEl.className = 'error';
          statusEl.innerText = '❌ Failed to trigger\n' + (err || '');
        }
      } catch (e) {
        statusEl.className = 'error';
        statusEl.innerText = '❌ Network error';
        console.error(e);
      }
    };

    checkRunStatus();
  });
});
