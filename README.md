
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![Brave Browser](https://img.shields.io/badge/Brave-Browser-FB542B?logo=brave&logoColor=white)](https://brave.com)
[![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-2088FF?logo=github&logoColor=white)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  
*“Because clicking buttons is more fun than waiting for cron”* 😎

# 🤖 Bluesky Bot Controller

A browser extension that gives you **one-click control** over your [Qwen-Bluesky-Bot](https://github.com/pepeyc7526/qwen-bluesky-bot).  
No more waiting for hourly schedules — just click and go!

---

## 🎯 Why This Exists

GitHub Actions has a hard limit: **scheduled workflows can run only once every 20 minutes**.  
But what if you want to trigger your bot **right now**?

This extension solves it by:
- Using `workflow_dispatch` (manual trigger)
- Bypassing cron limits entirely
- Giving you instant control from your browser toolbar

---

## 🛠️ How to Use

### 1. Install the Extension
- Download this repo as ZIP
- Go to `chrome://extensions` (or `brave://extensions`)
- Enable **Developer mode**
- Click **"Load unpacked"** → select the folder with this repo

> ✅ You’ll see the bot icon in your toolbar!

### 2. Configure Your Token
On first click, a popup will ask for your **GitHub Personal Access Token (PAT)**.

#### How to get a PAT:
1. Go to [GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token" → "classic"**
3. Give it a name (e.g. `bluesky-bot-extension`)
4. Check the **`repo`** scope ✅
5. Click **"Generate token"**
6. **Copy the token** (you won’t see it again!)

> 🔒 This token is stored **only in your browser** — never sent anywhere.

### 3. Run Your Bot!
Click the extension icon → **"Run Bluesky Bot"**  
✅ Done! Check your **Actions tab** for progress.

---

## 🔄 What If I Don’t Want the Extension?

No problem! You have two alternatives:

### Option A: Manual Run via GitHub UI
1. Go to your repo → **Actions**
2. Click **"Bluesky AI Bot"** in the left sidebar
3. Click **"Run workflow"** → **"Run workflow"**

### Option B: Enable Automatic Hourly Runs
If you prefer automatic runs (once per hour):
1. Open `.github/workflows/bluesky-bot.yml` in your bot repo
2. Find these lines and remove the `#` comments:

schedule:
  -- cron: '0 * * * *'

 💡 This replaces the commented version:
schedule:
  - cron: '0 * * * *'

3. Save the file and commit the change

⚠️ **Note**: Even with cron enabled, you can still use the extension for **instant runs** between scheduled intervals — no conflict!

---

## 🔐 Security Notes
- Your PAT is stored in **extension-local storage** (like a password manager)
- It’s **never transmitted** outside GitHub API calls
- You can **revoke it anytime** in GitHub Settings

---

## 📜 License

MIT License — because freedom is cool 🕶️  
You can use, modify, and share this however you like.

---

Made with ❤️ for Bluesky power users who hate waiting.
