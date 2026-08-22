# AI Recruiter - Intelligent Candidate Analysis Suite

An AI-powered recruitment assistant that extracts skills, technologies, and programming languages from conversational inputs, matches candidates to jobs using category-weighted metrics, and offers voice synthesis and logs.

 👉 LINK TO MY LIVE WEBSITE - https://ai-recruiter-six-theta.vercel.app/



## 1. Project Overview
The **AI Recruiter Workspace** is a single-page web application designed to help recruiters process unstructured candidate experience text, extract technical entities, and match profiles against job openings. 

Crucially, in compliance with the recruitment rules, the system requires **"No LLM API Key usage"** and runs entirely client-side in the browser. It features a modern, glassmorphic dark-mode dashboard including voice transcription and local match logging.

---

## 2. Problem Statement
Recruitment workflows are slowed down by reviewing non-standard resumes or conversational descriptions. Traditional parsing methods either require expensive, rate-limited LLM API keys or rely on basic word-matching that treats all skills with equal weight. 

This project solves these issues by:
1. Building a **Zero-API Key, client-side NLP parser** that identifies and categorizes technical terms dynamically.
2. Implementing a **category-weighted matching algorithm** that evaluates candidates objectively based on standard role criteria.
3. Supplying an interactive, responsive dashboard that works offline and is deployable on **Vercel** with a single click.

---

## 3. Installation Instructions

Since the application is built using standard web technologies (HTML5/CSS3/ES6 JS), it requires no compile or build steps.

### Method A: Direct Execution (Quick Preview)
* Double-click `index.html` to open the app directly in any modern browser.

### Method B: Python Local Server (Recommended for Speech APIs)
*Browsers restrict Microphone/Speech APIs to secure contexts (HTTPS) or `localhost`.*
1. Navigate to the project directory:
   ```bash
   cd ai-recruiter
   ```
2. Install local server dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python server.py
   ```
4. Open your browser and navigate to: **`http://localhost:8080`**

### Method C: Node.js Development Server
1. Run the local start script:
   ```bash
   npm start
   ```
2. Open your browser and navigate to the address shown (usually `http://localhost:3000` or `http://localhost:5000`).

---

## 4. Dataset Used
Since the recruitment task did not supply raw dataset files, two pre-configured datasets are embedded directly within the application code to provide a fully operational experience:

1. **Job Profile Dataset (`JOB_PROFILES`):** Contains 5 standard engineering roles (AI/ML Engineer, Senior Full Stack Developer, Data Scientist, DevOps Engineer, UI/UX Designer) with descriptive text and required tags.
2. **Candidate Profile Dataset (`CANDIDATE_RESUMES`):** Contains 3 conversational resumes (Jane Doe, John Smith, Alice Johnson) illustrating different experience backgrounds to instantly demonstrate the matcher's accuracy.

---

## 5. Methodology

The application implements three key modules:

### A. Boundary-Aware Entity Extraction (Part 1)
To parse unstructured text, the engine runs regular expressions with boundary markers (`\b`) over tokenized words, matching terms against a 300+ word dictionary categorized into `skill`, `technology`, and `language`.
* *Live Highlights:* Input text is mirrored and wrapped in styled highlights (`hl-skill`, `hl-technology`, `hl-language`) in real-time using content-synced layers.

### B. Category-Weighted Match Calculation (Part 2)
Matches are evaluated using a **Weighted Category Overlap Formula** to prioritize structural competencies (e.g. AI/ML, DevOps) over individual programming languages (e.g. SQL, HTML):
* **Language Weight:** $w_{lang} = 1.0$
* **Technology Weight:** $w_{tech} = 1.2$
* **Skill Weight:** $w_{skill} = 1.5$

$$\text{Match Score (\%)} = \left( \frac{\sum_{c \in \text{Categories}} w_c \cdot |S_{\text{candidate}, c} \cap S_{\text{job}, c}|}{\sum_{c \in \text{Categories}} w_c \cdot |S_{\text{job}, c}|} \right) \times 100$$

### C. Voice Integration & Caching (Stretch Goals)
* **Speech-to-Text:** Implements `window.webkitSpeechRecognition` to capture voice input and feed it directly to the NLP extractor.
* **Text-to-Speech:** Uses `SpeechSynthesisUtterance` to read match results aloud.
* **LocalStorage Logs:** Serializes candidate metrics and exports reports as a JSON file.

---

## 6. Technologies Used
* **Structure:** Semantic HTML5 Markup
* **Styling:** CSS3 (Variables, CSS Grid, Backdrop Blur filters, Keyframe animations)
* **Logic:** JavaScript ES6 (Regex Parsing, SpeechRecognition API, Web Speech Synthesis, LocalStorage API)
* **Local Servers:** Python 3 (Flask framework) & Node.js (`serve` utility)
* **Assets & Design:** FontAwesome Icons, Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)

---

## 7. Results
* **Entity Extraction:** Instantaneous (<5ms processing time) and matches the exact JSON schema requested.
* **Matching Accuracy:** Evaluates weighted overlaps and outputs match rates alongside custom recommendations.
* **Speech Processing:** Real-time transcription is highly responsive in Chrome/Edge browsers.
* **Log Storage:** Wipes or exports records to JSON files flawlessly.

---

## 8. Challenges Faced
* **No LLM API Key Rule:** Solved by building a clean regex keyword dictionary, bypassing the need for cloud LLMs.
* **Token Overlaps:** Multi-word terms (e.g. "Deep Learning") would clash with sub-words ("Learning"). Solved by sorting vocabulary keywords by length descending before performing replacements.
* **Speech API Sandbox Constraints:** Browsers block microphone inputs on local `file:///` URLs. Solved by supplying small Python/Node scripts to run the code in a `localhost` environment.

---

## 9. Future Improvements
* **Transformers.js Integration:** Load a lightweight, serverless BERT model (like MobileBERT) in JavaScript to enable semantic, zero-shot entity extraction in the browser.
* **Binary Resume Parsing:** Integrate `pdfjs-dist` to extract raw text streams directly from uploaded PDF and Docx files.
* **Custom Job Creator:** Allow recruiters to dynamically create and store new job descriptions to the local database.

---

## 🛠️ Tech Stack 

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

