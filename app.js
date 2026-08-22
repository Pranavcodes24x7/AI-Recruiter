// AI Recruiter - Core Logic Engine
// Fully client-side NLP, weighted matching, voice recognition, and local memory.

// ==========================================
// 1. Curated Databases & Dictionary Definitions
// ==========================================

const NLP_DICT = {
    skill: [
        { name: "AI/ML", regex: /\b(ai\/ml|artificial\s+intelligence|machine\s+learning|ml|ai)\b/i },
        { name: "NLP", regex: /\b(nlp|natural\s+language\s+processing)\b/i },
        { name: "Deep Learning", regex: /\b(deep\s+learning|dl)\b/i },
        { name: "Computer Vision", regex: /\b(computer\s+vision|cv)\b/i },
        { name: "Neural Networks", regex: /\b(neural\s+networks?|ann|cnn|rnn|gan|transformer)\b/i },
        { name: "Data Science", regex: /\b(data\s+science|data\s+analysis)\b/i },
        { name: "Frontend Development", regex: /\b(frontend|front-end|ui\s+development)\b/i },
        { name: "Backend Development", regex: /\b(backend|back-end|server-side)\b/i },
        { name: "Full Stack Development", regex: /\b(full\s*stack|fullstack)\b/i },
        { name: "DevOps", regex: /\b(devops|ci\/cd|continuous\s+integration|continuous\s+deployment)\b/i },
        { name: "Cloud Computing", regex: /\b(cloud\s+computing|cloud\s+infrastructure)\b/i },
        { name: "System Design", regex: /\b(system\s+design|architecture)\b/i },
        { name: "Database Management", regex: /\b(database\s+management|dbms|indexing|sharding)\b/i },
        { name: "Mobile Development", regex: /\b(mobile\s+development|ios\s+dev|android\s+dev)\b/i },
        { name: "UI/UX Design", regex: /\b(ui\/ux|user\s+interface|user\s+experience|wireframing|prototyping)\b/i },
        { name: "Project Management", regex: /\b(project\s+management|agile|scrum|kanban)\b/i },
        { name: "API Design", regex: /\b(api\s+design|restful\s+apis?|graphql\s+apis?)\b/i }
    ],
    technology: [
        { name: "CNN", regex: /\b(cnn|convolutional\s+neural\s+network)\b/i },
        { name: "RNN", regex: /\b(rnn|recurrent\s+neural\s+network|lstm|gru)\b/i },
        { name: "Transformers", regex: /\b(transformers?|bert|gpt|t5|attention\s+mechanism)\b/i },
        { name: "React", regex: /\b(react|react\.js|reactjs)\b/i },
        { name: "Node.js", regex: /\b(node|node\.js|nodejs)\b/i },
        { name: "Express", regex: /\b(express|express\.js|expressjs)\b/i },
        { name: "Django", regex: /\b(django)\b/i },
        { name: "Flask", regex: /\b(flask)\b/i },
        { name: "Docker", regex: /\b(docker|containers?)\b/i },
        { name: "Kubernetes", regex: /\b(kubernetes|k8s)\b/i },
        { name: "AWS", regex: /\b(aws|amazon\s+web\s+services|ec2|s3|rds)\b/i },
        { name: "GCP", regex: /\b(gcp|google\s+cloud|google\s+cloud\s+platform)\b/i },
        { name: "Azure", regex: /\b(azure|microsoft\s+azure)\b/i },
        { name: "TensorFlow", regex: /\b(tensorflow|tf)\b/i },
        { name: "PyTorch", regex: /\b(pytorch|torch)\b/i },
        { name: "Keras", regex: /\b(keras)\b/i },
        { name: "Git", regex: /\b(git|github|gitlab|version\s+control)\b/i },
        { name: "PostgreSQL", regex: /\b(postgresql|postgres)\b/i },
        { name: "MongoDB", regex: /\b(mongodb|mongo)\b/i },
        { name: "Redis", regex: /\b(redis)\b/i },
        { name: "Next.js", regex: /\b(next\.js|nextjs)\b/i },
        { name: "Vue", regex: /\b(vue|vue\.js|vuejs)\b/i },
        { name: "Angular", regex: /\b(angular|angular\.js|angularjs)\b/i },
        { name: "FastAPI", regex: /\b(fastapi)\b/i },
        { name: "Nginx", regex: /\b(nginx)\b/i },
        { name: "GraphQL", regex: /\b(graphql)\b/i },
        { name: "Apache Kafka", regex: /\b(kafka|apache\s+kafka)\b/i },
        { name: "Firebase", regex: /\b(firebase)\b/i },
        { name: "Vercel", regex: /\b(vercel)\b/i },
        { name: "TailwindCSS", regex: /\b(tailwindcss|tailwind)\b/i },
        { name: "Pandas", regex: /\b(pandas)\b/i },
        { name: "NumPy", regex: /\b(numpy)\b/i },
        { name: "Scikit-Learn", regex: /\b(scikit-learn|sklearn)\b/i }
    ],
    language: [
        { name: "Python", regex: /\b(python|py)\b/i },
        { name: "JavaScript", regex: /\b(javascript|js|es6)\b/i },
        { name: "TypeScript", regex: /\b(typescript|ts)\b/i },
        { name: "Java", regex: /\b(java)\b/i },
        { name: "C++", regex: /\b(c\+\+)\b/i },
        { name: "C#", regex: /\b(c#|c-sharp)\b/i },
        { name: "Go", regex: /\b(golang|go\s+programming)\b/i },
        { name: "Rust", regex: /\b(rust)\b/i },
        { name: "Ruby", regex: /\b(ruby|rails)\b/i },
        { name: "PHP", regex: /\b(php)\b/i },
        { name: "HTML", regex: /\b(html|html5)\b/i },
        { name: "CSS", regex: /\b(css|css3)\b/i },
        { name: "SQL", regex: /\b(sql|mysql|sqlite|t-sql)\b/i },
        { name: "R", regex: /\b(r-lang|r\s+programming)\b/i },
        { name: "Swift", regex: /\b(swift)\b/i },
        { name: "Kotlin", regex: /\b(kotlin)\b/i },
        { name: "Scala", regex: /\b(scala)\b/i },
        { name: "Bash", regex: /\b(bash|shell|shell\s+scripting)\b/i }
    ]
};

// Pre-loaded Job Descriptions
const JOB_PROFILES = [
    {
        id: "job-ai-eng",
        role: "AI/ML Engineer",
        department: "AI & Innovation Labs",
        description: "We are seeking an AI/ML Engineer to build next-generation language models and computer vision pipelines. You will design CNNs, deploy transformers, and manage model orchestration on cloud systems. Deep knowledge of NLP, PyTorch, and Python is highly desired.",
        requirements: {
            skill: ["AI/ML", "NLP", "Deep Learning", "Computer Vision", "Neural Networks"],
            technology: ["CNN", "Transformers", "PyTorch", "TensorFlow", "Docker", "AWS"],
            language: ["Python", "SQL", "Bash"]
        }
    },
    {
        id: "job-fullstack",
        role: "Senior Full Stack Developer",
        department: "Engineering - Platform",
        description: "Join our platform team to build scalable microservices and gorgeous user interfaces. You will develop backend logic in Node.js/Express, connect to PostgreSQL/Redis databases, and implement frontend designs using React, Next.js, and TailwindCSS. AWS deployment knowledge is a plus.",
        requirements: {
            skill: ["Frontend Development", "Backend Development", "Full Stack Development", "API Design", "Database Management"],
            technology: ["React", "Node.js", "Express", "Next.js", "TailwindCSS", "PostgreSQL", "Redis", "Docker", "AWS"],
            language: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS"]
        }
    },
    {
        id: "job-datascientist",
        role: "Data Scientist",
        department: "Analytics & Business Intelligence",
        description: "We are looking for a Data Scientist to analyze massive datasets, design predictive models, and build analytical reports. The role requires experience in Scikit-Learn, data visualization using Pandas and NumPy, SQL queries, and project management in an agile layout.",
        requirements: {
            skill: ["Data Science", "Data Analysis", "Project Management"],
            technology: ["Pandas", "NumPy", "Scikit-Learn", "PostgreSQL"],
            language: ["Python", "R", "SQL"]
        }
    },
    {
        id: "job-devops",
        role: "DevOps Engineer",
        department: "Operations & Infrastructure",
        description: "Seeking a DevOps specialist to maintain our high-availability cloud architecture. You will design CI/CD pipelines, automate deployments using Git, Docker, and Kubernetes, and orchestrate environments across GCP and AWS. Strong scripting skills are required.",
        requirements: {
            skill: ["DevOps", "Cloud Computing", "System Design"],
            technology: ["Docker", "Kubernetes", "Git", "AWS", "GCP", "Nginx"],
            language: ["Bash", "Python", "Go"]
        }
    },
    {
        id: "job-designer",
        role: "UI/UX Designer",
        department: "Product Design",
        description: "Our design team is growing! We need a UI/UX Designer who is passionate about creating clean, glassmorphic web dashboards, prototyping interactive features, and conducting user interviews. Familiarity with HTML/CSS is highly positive.",
        requirements: {
            skill: ["UI/UX Design", "Frontend Development"],
            technology: ["TailwindCSS"],
            language: ["HTML", "CSS", "JavaScript"]
        }
    }
];

// Pre-loaded Candidate Resumes for Demonstration
const CANDIDATE_RESUMES = [
    {
        name: "Jane Doe",
        fileText: "Jane Doe - AI/ML Engineer Candidate. Experienced in training Convolutional Neural Networks (CNN) and building NLP models using PyTorch. Worked extensively in the AI/ML Department at TechCorp. Proficient in Python, SQL, and Shell scripting. Managed production model orchestration via Docker containers on AWS EC2 servers."
    },
    {
        name: "John Smith",
        fileText: "John Smith - Frontend Specialist. 4+ years of web application development experience. Mastery of JavaScript, TypeScript, HTML, and CSS. Experienced in building glassmorphic dashboards using React, Next.js, and TailwindCSS. Proficient with Git workflows, Vercel deployments, and restful API integrations with Node.js."
    },
    {
        name: "Alice Johnson",
        fileText: "Alice Johnson - Product Designer & Developer. UI/UX Specialist with solid experience in user research, wireframing, and interactive prototyping. Developed frontend web components with CSS, HTML5, and vanilla JavaScript. Passionate about design systems and modern web aesthetic layouts."
    }
];

// Multi-language localization dictionary
const TRANSLATIONS = {
    en: {
        title: "AI Recruiter Workspace",
        desc: "Interactive intelligence tool for candidate skill extraction and automated job matching.",
        tab1: "Skill Extractor",
        tab2: "Resume Matcher",
        tab3: "Voice Assistant",
        tab4: "Match History",
        tab5: "Rubric & Docs",
        extractionHeader: "Part 1 - Conversational Entity Extraction",
        extractionPlaceholder: "Enter candidate experience details here... \nExample: 'I worked in the AI/ML Department and worked with CNN Models using Python'",
        matchingHeader: "Part 2 - Candidate & Job Matching Workspace",
        voiceHeader: "AI Recruiter Voice Interface",
        voiceInst: "Click the glowing orb to start recording. Describe your skills in natural language (e.g., 'I am a frontend developer who code in React and JavaScript'). The recruiter will transcribe and analyze your profile.",
        historyHeader: "Recruitment History logs",
        rubricHeader: "Recruitment Task Evaluation Rubric",
        matchPct: "Match Match Rate",
        missingSkills: "Skill Gaps / Missing",
        matchingSkills: "Matched Competencies",
        feedbHeader: "AI Recruiter Feedback & Recommendation",
        verdictHigh: "Highly Recommended for Interview",
        verdictMed: "Potential Match - Needs Technical Screening",
        verdictLow: "Incompatible Profile - Gaps too Wide"
    },
    es: {
        title: "Espacio de Reclutador IA",
        desc: "Herramienta interactiva para la extracción de habilidades del candidato y emparejamiento automatizado.",
        tab1: "Extractor de Habilidades",
        tab2: "Emparejador de CV",
        tab3: "Asistente de Voz",
        tab4: "Historial de Emparejamientos",
        tab5: "Rúbrica y Docs",
        extractionHeader: "Parte 1 - Extracción de Entidades Conversacionales",
        extractionPlaceholder: "Ingrese los detalles de la experiencia del candidato aquí...",
        matchingHeader: "Parte 2 - Espacio de Emparejamiento de Candidatos y Empleos",
        voiceHeader: "Interfaz de Voz del Reclutador IA",
        voiceInst: "Haga clic en el orbe brillante para comenzar a grabar. Describa sus habilidades en lenguaje natural.",
        historyHeader: "Registros del Historial de Reclutamiento",
        rubricHeader: "Rúbrica de Evaluación de Reclutamiento",
        matchPct: "Tasa de Emparejamiento",
        missingSkills: "Vacíos de Habilidades / Faltantes",
        matchingSkills: "Competencias Coincidentes",
        feedbHeader: "Comentarios y Recomendación del Reclutador IA",
        verdictHigh: "Altamente Recomendado para Entrevista",
        verdictMed: "Coincidencia Potencial - Requiere Evaluación Técnica",
        verdictLow: "Perfil Incompatible - Brechas demasiado grandes"
    },
    fr: {
        title: "Espace de Recruteur IA",
        desc: "Outil d'intelligence interactive pour l'extraction de compétences et l'appariement automatique des candidats.",
        tab1: "Extracteur de Compétences",
        tab2: "Associeur de CV",
        tab3: "Assistant Vocal",
        tab4: "Historique",
        tab5: "Rubrique & Docs",
        extractionHeader: "Partie 1 - Extraction d'entités conversationnelles",
        extractionPlaceholder: "Entrez les détails de l'expérience du candidat ici...",
        matchingHeader: "Partie 2 - Espace de jumelage des candidats et des postes",
        voiceHeader: "Interface vocale du Recruteur IA",
        voiceInst: "Cliquez sur l'orbe lumineux pour commencer l'enregistrement. Décrivez vos compétences en langage naturel.",
        historyHeader: "Historique des recrutements",
        rubricHeader: "Grille d'évaluation du recrutement",
        matchPct: "Taux de correspondance",
        missingSkills: "Lacunes de compétences / Manquantes",
        matchingSkills: "Compétences correspondantes",
        feedbHeader: "Commentaires et recommandations du Recruteur IA",
        verdictHigh: "Fortement recommandé pour un entretien",
        verdictMed: "Correspondance potentielle - Évaluation technique requise",
        verdictLow: "Profil incompatible - Écarts trop importants"
    },
    de: {
        title: "KI-Recruiter Workspace",
        desc: "Interaktives Intelligenztool zur Extraktion von Kandidatenfähigkeiten und zum automatischen Job-Matching.",
        tab1: "Fähigkeiten-Extraktor",
        tab2: "Lebenslauf-Matcher",
        tab3: "Sprachassistent",
        tab4: "Verlaufsprotokoll",
        tab5: "Rubrik & Dokumente",
        extractionHeader: "Teil 1 - Konversationelle Entitätsextraktion",
        extractionPlaceholder: "Geben Sie hier die Details der Kandidatenerfahrung ein...",
        matchingHeader: "Teil 2 - Arbeitsbereich für Kandidaten- und Job-Matching",
        voiceHeader: "KI-Recruiter Sprachschnittstelle",
        voiceInst: "Klicken Sie auf den leuchtenden Kreis, um die Aufnahme zu starten. Beschreiben Sie Ihre Fähigkeiten in natürlicher Sprache.",
        historyHeader: "Rekrutierungsverlaufsprotokolle",
        rubricHeader: "Bewertungsrubrik für Rekrutierungsaufgaben",
        matchPct: "Übereinstimmungsrate",
        missingSkills: "Fähigkeitslücken / Fehlend",
        matchingSkills: "Übereinstimmende Kompetenzen",
        feedbHeader: "KI-Recruiter Feedback & Empfehlung",
        verdictHigh: "Sehr empfehlenswert für ein Vorstellungsgespräch",
        verdictMed: "Potenzieller Match - Technische Überprüfung erforderlich",
        verdictLow: "Inkompatibles Profil - Lücken zu groß"
    },
    hi: {
        title: "एआई रिक्रूटर वर्कस्पेस",
        desc: "उम्मीदवार कौशल निष्कर्षण और स्वचालित नौकरी मिलान के लिए इंटरैक्टिव टूल।",
        tab1: "कौशल निष्कर्षक",
        tab2: "बायोडाटा मिलान",
        tab3: "आवाज सहायक",
        tab4: "मिलान इतिहास",
        tab5: "रूब्रिक और दस्तावेज़",
        extractionHeader: "भाग 1 - संवादात्मक इकाई निष्कर्षण",
        extractionPlaceholder: "यहाँ उम्मीदवार के अनुभव का विवरण दर्ज करें...",
        matchingHeader: "भाग 2 - उम्मीदवार और नौकरी मिलान कार्यक्षेत्र",
        voiceHeader: "एआई रिक्रूटर वॉयस इंटरफ़ेस",
        voiceInst: "रिकॉर्डिंग शुरू करने के लिए चमकते हुए ग्लोब पर क्लिक करें। प्राकृतिक भाषा में अपने कौशल का वर्णन करें।",
        historyHeader: "भर्ती इतिहास लॉग",
        rubricHeader: "भर्ती कार्य मूल्यांकन रूब्रिक",
        matchPct: "मिलान दर",
        missingSkills: "कौशल अंतराल / लापता",
        matchingSkills: "मिलते-जुलते कौशल",
        feedbHeader: "एआई रिक्रूटर प्रतिक्रिया और सिफारिश",
        verdictHigh: "साक्षात्कार के लिए अत्यधिक अनुशंसित",
        verdictMed: "संभावित मिलान - तकनीकी स्क्रीनिंग की आवश्यकता है",
        verdictLow: "असंगत प्रोफ़ाइल - अंतराल बहुत बड़ा है"
    }
};

let currentLanguage = "en";

// ==========================================
// 2. Extractor Core Logic (Part 1)
// ==========================================

// Extraction algorithm that returns JSON
function extractEntities(text) {
    const results = {
        skill: [],
        technology: [],
        language: []
    };

    if (!text || text.trim() === "") return results;

    // Scan the text for each dictionary category using regular expressions
    for (const category of ["skill", "technology", "language"]) {
        for (const item of NLP_DICT[category]) {
            if (item.regex.test(text)) {
                results[category].push(item.name);
            }
        }
    }

    return results;
}

// Token Highlighter for real-time text parsing
function highlightEntitiesInText(text) {
    if (!text) return "";
    
    // Escape HTML tags to prevent XSS
    let highlightedHTML = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // We compile all terms sorted by length descending so that multi-word matches (e.g. "Deep Learning") 
    // are replaced before sub-words (e.g. "Learning").
    const allMatches = [];

    for (const category of ["skill", "technology", "language"]) {
        for (const item of NLP_DICT[category]) {
            const matches = [...text.matchAll(new RegExp(item.regex.source, 'gi'))];
            for (const m of matches) {
                allMatches.push({
                    start: m.index,
                    end: m.index + m[0].length,
                    text: m[0],
                    category: category,
                    name: item.name
                });
            }
        }
    }

    // Sort matches: first by start index ascending, then by length descending
    allMatches.sort((a, b) => a.start - b.start || b.text.length - a.text.length);

    // Filter overlapping matches (keep the longest first)
    const filteredMatches = [];
    let lastEndIndex = 0;
    for (const match of allMatches) {
        if (match.start >= lastEndIndex) {
            filteredMatches.push(match);
            lastEndIndex = match.end;
        }
    }

    // Reconstruct string with span styling tags
    let resultHTML = "";
    let cursor = 0;
    for (const m of filteredMatches) {
        // Text before the match
        resultHTML += text.substring(cursor, m.start);
        
        // Highlighted span
        const cssClass = `hl-${m.category}`;
        resultHTML += `<span class="${cssClass}">${text.substring(m.start, m.end)}</span>`;
        cursor = m.end;
    }
    
    // Remaining text
    resultHTML += text.substring(cursor);
    return resultHTML;
}

// ==========================================
// 3. Matching Algorithm (Part 2)
// ==========================================

// Calculations based on weighted criteria:
// Weights: Skill = 1.5, Technology = 1.2, Language = 1.0
function calculateMatchScore(candidateProfile, jobProfile) {
    const jobReqs = jobProfile.requirements;
    
    let totalWeight = 0;
    let earnedWeight = 0;
    
    const matched = { skill: [], technology: [], language: [] };
    const missing = { skill: [], technology: [], language: [] };
    
    const weights = { skill: 1.5, technology: 1.2, language: 1.0 };
    
    for (const category of ["skill", "technology", "language"]) {
        const requiredList = jobReqs[category] || [];
        const candidateList = candidateProfile[category] || [];
        
        // Convert candidates list to lower case for comparison
        const candidateListLower = candidateList.map(s => s.toLowerCase());
        
        for (const req of requiredList) {
            const reqWeight = weights[category];
            totalWeight += reqWeight;
            
            // Check matching
            if (candidateListLower.includes(req.toLowerCase())) {
                earnedWeight += reqWeight;
                matched[category].push(req);
            } else {
                missing[category].push(req);
            }
        }
    }
    
    // Calculate final weighted percentage
    let matchScore = 0;
    if (totalWeight > 0) {
        matchScore = Math.round((earnedWeight / totalWeight) * 100);
    } else {
        matchScore = 100; // If job demands nothing, candidate fits perfectly
    }
    
    return {
        score: matchScore,
        matched: matched,
        missing: missing
    };
}

// Generates an structured feedback dialogue
function generateRecruiterFeedback(score, matched, missing, jobRole) {
    if (score >= 80) {
        return `🤖 <b>AI Recruiter Verdict: Excellent Match!</b><br>
        Candidate demonstrates comprehensive competency alignment for the <b>${jobRole}</b> role. 
        Highly skilled in: <i>${[...matched.skill, ...matched.technology].slice(0,4).join(', ')}</i>. 
        <b>Recommendation:</b> Proceed directly to hiring manager interview stage.`;
    } else if (score >= 50) {
        const missingKey = [...missing.skill, ...missing.technology].slice(0,3).join(', ');
        return `🤖 <b>AI Recruiter Verdict: Good Alignment (With Gaps)</b><br>
        Candidate has the foundational skill sets for the <b>${jobRole}</b> position, but lacks some key items like: 
        <span style="color:var(--text-error); font-weight: 600;">${missingKey || 'n/a'}</span>. 
        <b>Recommendation:</b> Schedule technical screening call to evaluate speed of learning and adaptiveness.`;
    } else {
        const missingAll = [...missing.skill, ...missing.technology, ...missing.language].slice(0,4).join(', ');
        return `🤖 <b>AI Recruiter Verdict: Poor Match Profile</b><br>
        Candidate profile is highly incompatible with the requirements for the <b>${jobRole}</b> role. 
        Significant gaps identified in crucial requirements: <i>${missingAll}</i>. 
        <b>Recommendation:</b> File for future junior roles, do not advance.`;
    }
}

// ==========================================
// 4. Voice Assistant Engine (Speech-to-Text)
// ==========================================

let recognition = null;
let isVoiceListening = false;

function setupSpeechRecognition(onResult, onStatusChange) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech recognition is not supported in this browser.");
        return false;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    
    recognition.onstart = () => {
        isVoiceListening = true;
        onStatusChange("listening");
    };
    
    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        onStatusChange("error", event.error);
    };
    
    recognition.onend = () => {
        isVoiceListening = false;
        onStatusChange("stopped");
    };
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        const combinedText = finalTranscript || interimTranscript;
        onResult(combinedText);
    };
    
    return true;
}

function toggleVoiceListening() {
    if (!recognition) return;
    if (isVoiceListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

// Text-to-Speech Vocal Synthesis
function speakMatchingFeedback(score, jobRole) {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any current voice output
    window.speechSynthesis.cancel();
    
    let txt = `The candidate matches the ${jobRole} role with a score of ${score} percent.`;
    if (score >= 80) {
        txt += " This is an excellent profile match, highly recommended.";
    } else if (score >= 50) {
        txt += " This is a good match, but some key skill gaps are present.";
    } else {
        txt += " This profile displays severe gaps and is not recommended.";
    }
    
    const utterance = new SpeechSynthesisUtterance(txt);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// 5. History Storage Manager
// ==========================================

const HISTORY_KEY = "ai_recruiter_runs";

function getMatchHistory() {
    const hist = localStorage.getItem(HISTORY_KEY);
    return hist ? JSON.parse(hist) : [];
}

function saveToMatchHistory(candidateName, roleName, score, details) {
    const history = getMatchHistory();
    const newEntry = {
        id: "run-" + Date.now(),
        name: candidateName,
        role: roleName,
        score: score,
        skillsCount: (details.matched.skill.length + details.matched.technology.length + details.matched.language.length),
        missingCount: (details.missing.skill.length + details.missing.technology.length + details.missing.language.length),
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    history.unshift(newEntry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
}

function clearMatchHistory() {
    localStorage.removeItem(HISTORY_KEY);
}

function deleteHistoryEntry(id) {
    const history = getMatchHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
}

// ==========================================
// 6. UI Integration & DOM Controllers
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Navigation Tabs
    const navLinks = document.querySelectorAll(".nav-link");
    const tabPanels = document.querySelectorAll(".tab-panel");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute("data-tab");
            
            navLinks.forEach(l => l.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));
            
            link.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });
    
    // Language Switcher
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            langBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const lang = btn.getAttribute("data-lang");
            currentLanguage = lang;
            applyTranslations(lang);
        });
    });
    
    // --- Part 1 UI Controllers ---
    const editorTextarea = document.getElementById("editorTextarea");
    const editorHighlights = document.getElementById("editorHighlights");
    const parsedJsonOut = document.getElementById("parsedJsonOut");
    const tagsContainer = document.getElementById("tagsContainer");
    const copyJsonBtn = document.getElementById("copyJsonBtn");
    
    function runExtraction() {
        const text = editorTextarea.value;
        
        // 1. Highlight tokens
        editorHighlights.innerHTML = highlightEntitiesInText(text) + "\n";
        
        // 2. Extract JSON
        const entities = extractEntities(text);
        parsedJsonOut.textContent = JSON.stringify(entities, null, 4);
        
        // 3. Render glowing entity tags
        tagsContainer.innerHTML = "";
        
        let hasEntities = false;
        for (const cat of ["skill", "technology", "language"]) {
            for (const term of entities[cat]) {
                hasEntities = true;
                const tagSpan = document.createElement("span");
                tagSpan.className = `entity-tag entity-tag-${cat}`;
                tagSpan.innerHTML = `${term} <span class="entity-type">${cat}</span>`;
                tagsContainer.appendChild(tagSpan);
            }
        }
        
        if (!hasEntities && text.trim() !== "") {
            tagsContainer.innerHTML = `<span style="color:var(--text-muted); font-size:0.9rem; font-style:italic;">No skills or tech entities matched yet. Type more!</span>`;
        }
    }
    
    // Listen for inputs in Part 1
    editorTextarea.addEventListener("input", runExtraction);
    
    // Scroll synchronisation between textarea and highlights
    editorTextarea.addEventListener("scroll", () => {
        editorHighlights.scrollTop = editorTextarea.scrollTop;
        editorHighlights.scrollLeft = editorTextarea.scrollLeft;
    });
    
    // Copy JSON logic
    copyJsonBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(parsedJsonOut.textContent).then(() => {
            showToast("✓ JSON copied to clipboard!");
        });
    });
    
    // --- Part 2 UI Controllers (Matching) ---
    const jobsListContainer = document.getElementById("jobsListContainer");
    const uploadInput = document.getElementById("uploadInput");
    const uploadZone = document.getElementById("uploadZone");
    const matchingAnalysisResult = document.getElementById("matchingAnalysisResult");
    const candidateNameInput = document.getElementById("candidateNameInput");
    
    let selectedJob = JOB_PROFILES[0];
    let candidateParsedData = null;
    
    // Render job postings
    function renderJobs() {
        jobsListContainer.innerHTML = "";
        JOB_PROFILES.forEach((job, index) => {
            const card = document.createElement("div");
            card.className = `job-card ${job.id === selectedJob.id ? 'selected' : ''}`;
            card.setAttribute("data-id", job.id);
            
            // Collect tags
            const tagsHTML = [
                ...job.requirements.language,
                ...job.requirements.skill,
                ...job.requirements.technology
            ].slice(0, 5).map(t => `<span class="job-tag">${t}</span>`).join('');
            
            card.innerHTML = `
                <div class="job-role">${job.role}</div>
                <div class="job-department"><i class="fas fa-briefcase"></i> ${job.department}</div>
                <div class="job-tags">${tagsHTML}</div>
            `;
            
            card.addEventListener("click", () => {
                document.querySelectorAll(".job-card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                selectedJob = job;
                
                // Re-run match if candidates profile is already parsed
                if (candidateParsedData) {
                    performMatch();
                }
            });
            
            jobsListContainer.appendChild(card);
        });
    }
    
    // Setup file upload and mock parsing
    uploadZone.addEventListener("click", () => uploadInput.click());
    
    uploadZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadZone.classList.add("dragover");
    });
    
    uploadZone.addEventListener("dragleave", () => {
        uploadZone.classList.remove("dragover");
    });
    
    uploadZone.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadZone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleUploadedFile(e.dataTransfer.files[0]);
        }
    });
    
    uploadInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleUploadedFile(e.target.files[0]);
        }
    });
    
    function handleUploadedFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            processResumeText(text, file.name.replace(/\.[^/.]+$/, ""));
        };
        reader.readAsText(file);
    }
    
    function processResumeText(text, defaultCandidateName) {
        // Extract candidate name from text if input field is empty
        if (!candidateNameInput.value) {
            candidateNameInput.value = defaultCandidateName || "Candidate Profile";
        }
        
        // 1. Core extraction
        candidateParsedData = extractEntities(text);
        
        // 2. Perform Match calculation
        performMatch();
        showToast("📄 Resume parsed and analyzed successfully!");
    }
    
    function performMatch() {
        if (!candidateParsedData || !selectedJob) return;
        
        const matchResult = calculateMatchScore(candidateParsedData, selectedJob);
        
        // Calculate circle progress dash offset
        const radius = 65;
        const circumference = 2 * Math.PI * radius;
        const dashOffset = circumference - (matchResult.score / 100) * circumference;
        
        // Get verdict text
        let verdictText = TRANSLATIONS[currentLanguage].verdictMed;
        let scoreColorClass = "med";
        if (matchResult.score >= 80) {
            verdictText = TRANSLATIONS[currentLanguage].verdictHigh;
            scoreColorClass = "high";
        } else if (matchResult.score < 50) {
            verdictText = TRANSLATIONS[currentLanguage].verdictLow;
            scoreColorClass = "low";
        }
        
        // Build skills list HTML
        const matchedBadges = [];
        const missingBadges = [];
        
        for (const cat of ["skill", "technology", "language"]) {
            matchResult.matched[cat].forEach(t => {
                matchedBadges.push(`<span class="skill-match-badge matched"><i class="fas fa-check-circle"></i> ${t}</span>`);
            });
            matchResult.missing[cat].forEach(t => {
                missingBadges.push(`<span class="skill-match-badge missing"><i class="fas fa-times-circle"></i> ${t}</span>`);
            });
        }
        
        // Display matching visualizer content
        matchingAnalysisResult.innerHTML = `
            <div class="glass-card" style="margin-top: 0; animation: scaleIn 0.3s ease-out;">
                <div class="results-container">
                    <div class="score-panel">
                        <div class="radial-progress">
                            <svg>
                                <defs>
                                    <linearGradient id="gradient-cyan-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="var(--color-secondary)"></stop>
                                        <stop offset="100%" stop-color="var(--color-primary)"></stop>
                                    </linearGradient>
                                </defs>
                                <circle class="bg-circle" cx="75" cy="75" r="${radius}"></circle>
                                <circle class="progress-circle" cx="75" cy="75" r="${radius}" 
                                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${dashOffset};">
                                </circle>
                            </svg>
                            <div class="score-text">${matchResult.score}%</div>
                        </div>
                        <div class="score-label">${TRANSLATIONS[currentLanguage].matchPct}</div>
                        <div class="score-verdict badge-score ${scoreColorClass}" style="margin-top: 0.5rem;">${verdictText}</div>
                    </div>
                    
                    <div class="analysis-details">
                        <div>
                            <div class="analysis-section-title"><i class="fas fa-check" style="color:var(--text-success)"></i> ${TRANSLATIONS[currentLanguage].matchingSkills}</div>
                            <div class="skills-breakdown">
                                ${matchedBadges.length > 0 ? matchedBadges.join('') : '<span style="color:var(--text-muted); font-size:0.85rem;">No matching skills.</span>'}
                            </div>
                        </div>
                        <div>
                            <div class="analysis-section-title"><i class="fas fa-exclamation-triangle" style="color:var(--color-accent)"></i> ${TRANSLATIONS[currentLanguage].missingSkills}</div>
                            <div class="skills-breakdown">
                                ${missingBadges.length > 0 ? missingBadges.join('') : '<span style="color:var(--text-success); font-size:0.85rem;">Zero skills missing! Excellent!</span>'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="feedback-box">
                        <div class="feedback-text">${generateRecruiterFeedback(matchResult.score, matchResult.matched, matchResult.missing, selectedJob.role)}</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: flex-end;">
                    <button class="btn btn-secondary" id="speakMatchBtn"><i class="fas fa-volume-up"></i> Speak Match</button>
                    <button class="btn btn-primary" id="saveMatchBtn"><i class="fas fa-save"></i> Save Match</button>
                </div>
            </div>
        `;
        
        // Save and voice synthesiser events
        document.getElementById("speakMatchBtn").addEventListener("click", () => {
            speakMatchingFeedback(matchResult.score, selectedJob.role);
            showToast("🔊 Playing synthesized audio feedback...");
        });
        
        document.getElementById("saveMatchBtn").addEventListener("click", () => {
            const name = candidateNameInput.value.trim() || "Jane Doe";
            saveToMatchHistory(name, selectedJob.role, matchResult.score, matchResult);
            renderHistory();
            showToast("💾 Match profile added to memory history!");
        });
    }
    
    // Quick Demo Load buttons
    const demoCandidatesContainer = document.getElementById("demoCandidatesContainer");
    CANDIDATE_RESUMES.forEach(candidate => {
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary";
        btn.style.padding = "0.5rem 1rem";
        btn.style.fontSize = "0.85rem";
        btn.innerHTML = `<i class="fas fa-user-tie"></i> Demo: ${candidate.name}`;
        btn.addEventListener("click", () => {
            candidateNameInput.value = candidate.name;
            processResumeText(candidate.fileText, candidate.name);
        });
        demoCandidatesContainer.appendChild(btn);
    });
    
    // --- Part 3: Voice Assistant Panel Controllers ---
    const voiceOrbContainer = document.getElementById("voiceOrbContainer");
    const voiceStatusText = document.getElementById("voiceStatusText");
    const voiceTranscriptBox = document.getElementById("voiceTranscriptBox");
    const voiceEntitiesContainer = document.getElementById("voiceEntitiesContainer");
    
    setupSpeechRecognition(
        // Callback on transcript results
        (text) => {
            voiceTranscriptBox.textContent = text || "(listening for voice input...)";
            
            // Extract entities
            const entities = extractEntities(text);
            voiceEntitiesContainer.innerHTML = "";
            let hasEntities = false;
            
            for (const cat of ["skill", "technology", "language"]) {
                for (const term of entities[cat]) {
                    hasEntities = true;
                    const tagSpan = document.createElement("span");
                    tagSpan.className = `entity-tag entity-tag-${cat}`;
                    tagSpan.innerHTML = `${term} <span class="entity-type">${cat}</span>`;
                    voiceEntitiesContainer.appendChild(tagSpan);
                }
            }
            
            if (!hasEntities && text.trim() !== "") {
                voiceEntitiesContainer.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">Processing voice for keywords...</span>`;
            }
        },
        // Callback on status change
        (status, detail) => {
            if (status === "listening") {
                voiceOrbContainer.classList.add("listening");
                voiceStatusText.textContent = "Listening ...";
                voiceStatusText.style.color = "var(--color-secondary)";
            } else if (status === "stopped") {
                voiceOrbContainer.classList.remove("listening");
                voiceStatusText.textContent = "Click to Speak";
                voiceStatusText.style.color = "var(--text-primary)";
            } else if (status === "error") {
                voiceOrbContainer.classList.remove("listening");
                voiceStatusText.textContent = "Speech Support Unavailable";
                voiceStatusText.style.color = "var(--text-error)";
                if (detail === "not-allowed") {
                    showToast("⚠ Microphone permission denied.");
                } else {
                    showToast(`⚠ Speech recognition error: ${detail}`);
                }
            }
        }
    );
    
    voiceOrbContainer.addEventListener("click", () => {
        toggleVoiceListening();
    });
    
    // --- Part 4: History Table Controllers ---
    const historyTableBody = document.getElementById("historyTableBody");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const exportHistoryBtn = document.getElementById("exportHistoryBtn");
    
    function renderHistory() {
        const history = getMatchHistory();
        historyTableBody.innerHTML = "";
        
        if (history.length === 0) {
            historyTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2.5rem 1.25rem;">
                        <i class="fas fa-history" style="font-size:1.5rem; margin-bottom: 0.5rem; display:block;"></i>
                        No candidate match history saved in local memory yet.
                    </td>
                </tr>
            `;
            return;
        }
        
        history.forEach(item => {
            const row = document.createElement("tr");
            
            let scoreClass = "low";
            if (item.score >= 80) scoreClass = "high";
            else if (item.score >= 50) scoreClass = "med";
            
            row.innerHTML = `
                <td style="font-weight:700;">${item.name}</td>
                <td><i class="fas fa-briefcase" style="color:var(--color-primary)"></i> ${item.role}</td>
                <td><span class="badge-score ${scoreClass}">${item.score}%</span></td>
                <td><i class="fas fa-check" style="color:var(--text-success)"></i> ${item.skillsCount} matched</td>
                <td style="color:var(--text-muted); font-size:0.85rem;">${item.timestamp}</td>
                <td>
                    <button class="btn btn-secondary delete-history-item" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 6px;">
                        <i class="fas fa-trash-alt" style="color:var(--text-error)"></i>
                    </button>
                </td>
            `;
            
            // Delete record logic
            row.querySelector(".delete-history-item").addEventListener("click", (e) => {
                const id = e.currentTarget.getAttribute("data-id");
                deleteHistoryEntry(id);
                renderHistory();
                showToast("🗑 Log entry deleted from history.");
            });
            
            historyTableBody.appendChild(row);
        });
    }
    
    clearHistoryBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to wipe all local recruitment logs from memory?")) {
            clearMatchHistory();
            renderHistory();
            showToast("🗑 Recruiter history records cleared.");
        }
    });
    
    exportHistoryBtn.addEventListener("click", () => {
        const history = getMatchHistory();
        if (history.length === 0) {
            showToast("⚠ No records available to export!");
            return;
        }
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 4));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `ai_recruiter_report_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast("📥 Recruiter JSON report downloaded.");
    });
    
    // Apply translations on switch
    function applyTranslations(lang) {
        const data = TRANSLATIONS[lang];
        if (!data) return;
        
        document.getElementById("mainAppTitle").textContent = data.title;
        document.getElementById("mainAppDesc").textContent = data.desc;
        
        // Navigation items
        document.querySelector("[data-tab='panel-extraction'] span").textContent = data.tab1;
        document.querySelector("[data-tab='panel-matching'] span").textContent = data.tab2;
        document.querySelector("[data-tab='panel-voice'] span").textContent = data.tab3;
        document.querySelector("[data-tab='panel-history'] span").textContent = data.tab4;
        document.querySelector("[data-tab='panel-docs'] span").textContent = data.tab5;
        
        // Card Headers
        document.querySelector("#panel-extraction .card-title").innerHTML = `<i class="fas fa-microchip"></i> ${data.extractionHeader}`;
        document.querySelector("#panel-matching .card-title").innerHTML = `<i class="fas fa-sliders-h"></i> ${data.matchingHeader}`;
        document.querySelector("#panel-voice .card-title").innerHTML = `<i class="fas fa-microphone"></i> ${data.voiceHeader}`;
        document.querySelector("#panel-history .card-title").innerHTML = `<i class="fas fa-history"></i> ${data.historyHeader}`;
        document.querySelector("#panel-docs .card-title").innerHTML = `<i class="fas fa-award"></i> ${data.rubricHeader}`;
        
        // Textarea placeholder
        editorTextarea.setAttribute("placeholder", data.extractionPlaceholder);
        
        // Voice Instructions
        document.getElementById("voiceInstructions").textContent = data.voiceInst;
    }
    
    // Toast Notification System
    function showToast(message) {
        const container = document.getElementById("toastContainer");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = "toastIn 0.3s reverse cubic-bezier(0.16, 1, 0.3, 1) forwards";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Initialize Dashboard
    renderJobs();
    applyTranslations("en");
    runExtraction(); // Extract empty/placeholder text on start
    renderHistory();
});
