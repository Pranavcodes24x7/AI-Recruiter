# AI Recruiter - Intelligent Candidate Analysis Suite

An AI-powered recruitment assistant that extracts skills, technologies, and programming languages from conversational profiles (Part 1), calculates weighted compatibility matching scores against job roles (Part 2), and provides interactive voice controls and match tracking memory logs (Stretch Goals).

link to my live AI-Recruiter website deployed on vercel : https://ai-recruiter-six-theta.vercel.app/

This project runs **fully client-side in the browser** with zero API keys or external servers, adhering strictly to the recruitment constraint of **"No LLM API Key usage"**. It is built as a single-page application (SPA) deployable on **Vercel** with a single click.

---

## 🚀 Key Features

* **Part 1 - Conversational Entity Extraction:** Real-time token highlighting and displacement-style tag extraction separating candidate bios into structured categories: `skill`, `technology`, and `language` in the exact JSON schema requested.
* **Part 2 - Weighted Job Matching:** Calculates a weighted Jaccard similarity score against pre-loaded or custom job descriptions, displaying match rates, gaps/missing skills, and automated recruiter recommendations.
* **Stretch Goal 1 - Voice Interview Assistant:** Integrates browser Web Speech API (Speech-to-Text) allowing candidates to record and transcribe their skills vocally in real-time, accompanied by Speech Synthesis reading back match verdicts.
* **Stretch Goal 2 - Local Memory Logs:** Stored matching runs in local browser memory (`localStorage`) with functionalities to review, filter, and export the entire logs list as a structured JSON Recruiter Report.
* **Stretch Goal 3 - Multilingual Support:** Localization toggle allowing recruiters to switch the entire workspace between English, Spanish, French, German, and Hindi.

---

## 📐 Algorithm & Mathematical Formula

Instead of a generic overlap calculation, candidate matches are computed using a **Weighted Category Overlap Formula**. This prioritizes structural conceptual skills (like AI/ML, DevOps) over individual languages (like HTML, SQL) based on industry recruitment standards.

### 1. Classification Weights
$$\text{Weight}_{\text{Skill}} = 1.5$$
$$\text{Weight}_{\text{Tech}} = 1.2$$
$$\text{Weight}_{\text{Lang}} = 1.0$$

### 2. Matching Formula
$$\text{Match Score (\%)} = \left( \frac{\sum_{c \in \text{Categories}} w_c \cdot |S_{\text{candidate}, c} \cap S_{\text{job}, c}|}{\sum_{c \in \text{Categories}} w_c \cdot |S_{\text{job}, c}|} \right) \times 100$$

Where:
* $S_{\text{candidate}, c}$ is the set of extracted terms for category $c$ in the candidate's profile.
* $S_{\text{job}, c}$ is the set of required terms for category $c$ in the job description.
* $w_c$ is the category weight.

---

## 🛠️ Tech Stack & Directory Structure

* **Structure:** Semantic HTML5 Markup
* **Styling:** CSS3 variables, Glassmorphism design tokens, CSS Grid systems, keyframe animations
* **Logic:** Vanilla ES6 Javascript (micro-regex parsing, Web Speech API, Storage API)
* **Icons:** FontAwesome CDN

### Directory Structure
```
ai-recruiter/
├── index.html     # Application Layout & Views
├── styles.css     # Glassmorphic Styling System
├── app.js         # NLP Extractor, Matcher & Interface Controllers
└── README.md      # Repository & Developer Documentation
```

---

## 💻 How to Run Locally

Since the app has no compilation/build requirements, you can open and run it instantly:

1. **Direct Execution:** Double click `index.html` to open it in any modern browser.
2. **Local Server (VSCode Live Server or Python):**
   Run a local server in the project directory for Speech Recognition APIs to function properly (browsers require a secure context or localhost for microphones):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in Google Chrome or Microsoft Edge.

---

## ☁️ Deploying to Vercel

To deploy this project to Vercel:

1. Create a repository on GitHub (e.g., `ai-recruiter`).
2. Push all the files (`index.html`, `styles.css`, `app.js`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Recruiter Suite"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Log in to [Vercel](https://vercel.com).
4. Click **New Project** and import your GitHub repository.
5. Vercel will automatically detect the static project. Click **Deploy**. Your site is now live!

---

## 📝 Self-Evaluation Rubric Mapping

| Criterion | Weight | How It Was Met in This Submission |
| :--- | :--- | :--- |
| **Understanding & Explanation** | 25% | Structured README.md mapping the weighted formulas, local server specs, and design rationale. |
| **Technical Implementation** | 25% | Regular expressions with boundary checks parsing words dynamically without external API keys. Outputs the exact singular key JSON structure. |
| **Creativity & Innovation** | 20% | Voice recording visualizer (Web Speech), text-to-speech audio feedback, and local storage database exporting JSON logs. |
| **Code Quality** | 15% | Clean modular script division separating styling definitions, curated skill database, and DOM handlers. |
| **Documentation** | 15% | Comprehensive details, code formulas in LaTeX, and deploy/run guidelines. |
