/* ==========================================================================
   CHEMISTRY REVISION QUIZ - INTERACTIVE ENGINE
   Features: Synthesized Sound, Canvas Particle System, Custom Validation,
             Self-Grading, Detailed Scorecard, Dark/Light Mode.
   ========================================================================== */

// --- QUESTION DATABASE ---
const questionBank = [
    // --- MCQs (1 to 8) ---
    {
        id: 1,
        type: 'mcq',
        question: "What is observed when a metal reacts with oxygen?",
        options: [
            "Formation of a gas",
            "Formation of a salt",
            "Formation of a metal oxide",
            "Formation of a precipitate"
        ],
        answer: 2, // Index 2 (c)
        explanation: "Metals react with oxygen to form metal oxides, which are typically basic or amphoteric. This is an oxidation reaction.",
        originalLabel: "a) Formation of a gas, b) Formation of a salt, c) Formation of a metal oxide, d) Formation of a precipitate"
    },
    {
        id: 2,
        type: 'mcq',
        question: "What is produced when sodium reacts with water?",
        options: [
            "Sodium hydroxide and hydrogen gas",
            "Sodium chloride and hydrogen gas",
            "Sodium oxide and hydrogen gas",
            "Sodium bicarbonate and oxygen"
        ],
        answer: 0, // Index 0 (a)
        explanation: "Sodium reacts vigorously with water to form soluble sodium hydroxide (an alkaline solution) and releases hydrogen gas.",
        originalLabel: "a) Sodium hydroxide and hydrogen gas, b) Sodium chloride and hydrogen gas, c) Sodium oxide and hydrogen gas, d) Sodium bicarbonate and oxygen"
    },
    {
        id: 3,
        type: 'mcq',
        question: "What happens when magnesium reacts with dilute acids?",
        options: [
            "It forms a salt and water",
            "It forms a salt and hydrogen gas",
            "It forms a salt and oxygen",
            "It forms a salt and a precipitate"
        ],
        answer: 1, // Index 1 (b)
        explanation: "Magnesium reacts with dilute acids (like hydrochloric acid) to produce a magnesium salt and release hydrogen gas.",
        originalLabel: "a) It forms a salt and water, b) It forms a salt and hydrogen gas, c) It forms a salt and oxygen, d) It forms a salt and a precipitate"
    },
    {
        id: 4,
        type: 'mcq',
        question: "What is the product when zinc reacts with hydrochloric acid?",
        options: [
            "Zinc chloride and hydrogen gas",
            "Zinc sulfate and hydrogen gas",
            "Zinc oxide and oxygen",
            "Zinc carbonate and carbon dioxide"
        ],
        answer: 0, // Index 0 (a)
        explanation: "Zinc reacts with hydrochloric acid (HCl) to produce zinc chloride (ZnCl2) salt and hydrogen gas (H2).",
        originalLabel: "a) Zinc chloride and hydrogen gas, b) Zinc sulfate and hydrogen gas, c) Zinc oxide and oxygen, d) Zinc carbonate and carbon dioxide"
    },
    {
        id: 5,
        type: 'mcq',
        question: "When magnesium reacts with oxygen, it forms:",
        options: [
            "Magnesium hydroxide",
            "Magnesium oxide",
            "Magnesium chloride",
            "Magnesium sulfate"
        ],
        answer: 1, // Index 1 (B)
        explanation: "Burning magnesium in oxygen is a highly exothermic oxidation reaction that produces a brilliant white light and a white powder: magnesium oxide (MgO).",
        originalLabel: "A) Magnesium hydroxide, B) Magnesium oxide, C) Magnesium chloride, D) Magnesium sulfate"
    },
    {
        id: 6,
        type: 'mcq',
        question: "Which metal reacts vigorously with cold water?",
        options: [
            "Iron",
            "Copper",
            "Sodium",
            "Silver"
        ],
        answer: 2, // Index 2 (C)
        explanation: "Sodium is an alkali metal located high in the reactivity series. It reacts very rapidly and vigorously with cold water, melting into a silver ball that skims across the surface.",
        originalLabel: "A) Iron, B) Copper, C) Sodium, D) Silver"
    },
    {
        id: 7,
        type: 'mcq',
        question: "Sodium + water produces:",
        options: [
            "Hydrogen + sodium oxide",
            "Hydrogen + sodium hydroxide",
            "Oxygen + sodium hydroxide",
            "Sodium chloride"
        ],
        answer: 1, // Index 1 (B)
        explanation: "The word equation for this group 1 metal reaction is: Sodium + Water -> Sodium Hydroxide + Hydrogen.",
        originalLabel: "A) Hydrogen + sodium oxide, B) Hydrogen + sodium hydroxide, C) Oxygen + sodium hydroxide, D) Sodium chloride"
    },
    {
        id: 8,
        type: 'mcq',
        question: "Metals + dilute acids produce:",
        options: [
            "Salt + oxygen",
            "Salt + hydrogen",
            "Salt + carbon dioxide",
            "Water only"
        ],
        answer: 1, // Index 1 (B)
        explanation: "A general acid-metal reaction produces a metal salt (dependent on the acid used) and releases hydrogen gas.",
        originalLabel: "A) Salt + oxygen, B) Salt + hydrogen, C) Salt + carbon dioxide, D) Water only"
    },

    // --- Fill in the Blanks (9 to 16) ---
    {
        id: 9,
        type: 'blank',
        question: "Magnesium reacts with oxygen to form ____________.",
        answers: ["magnesium oxide", "mgo"],
        explanation: "2Mg (s) + O2 (g) -> 2MgO (s). The white powder formed is magnesium oxide.",
        placeholder: "chemical compound name"
    },
    {
        id: 10,
        type: 'blank',
        question: "Sodium reacts with water to form sodium ____________ and hydrogen gas.",
        answers: ["hydroxide", "sodium hydroxide", "naoh"],
        explanation: "Sodium reacts with water to yield an alkaline solution of sodium hydroxide (NaOH) and hydrogen gas.",
        placeholder: "compound type"
    },
    {
        id: 11,
        type: 'blank',
        question: "The reaction of metals with ____________ often produces hydrogen gas.",
        answers: ["acids", "acid", "dilute acids", "dilute acid"],
        explanation: "Metals above hydrogen in the reactivity series react with acids, displacing hydrogen as H2 gas.",
        placeholder: "reactant type"
    },
    {
        id: 12,
        type: 'blank',
        question: "The reaction of metals with dilute acids produces a ____________ and hydrogen gas.",
        answers: ["salt", "metal salt", "salts"],
        explanation: "The metal displaces hydrogen from the acid, resulting in the formation of a soluble ionic salt.",
        placeholder: "substance type"
    },
    {
        id: 13,
        type: 'blank',
        question: "The product of the reaction between copper and oxygen is copper ____________.",
        answers: ["oxide", "copper oxide", "copper(ii) oxide", "cuo"],
        explanation: "When copper is heated strongly in air, it reacts with oxygen to form a black surface layer of copper(II) oxide.",
        placeholder: "compound type"
    },
    {
        id: 14,
        type: 'blank',
        question: "Magnesium reacts with dilute acid to form magnesium ____________.",
        answers: ["chloride", "magnesium chloride", "mgcl2", "salt"],
        explanation: "Magnesium + Hydrochloric acid -> Magnesium chloride + Hydrogen. In a general context, it forms a chloride salt.",
        placeholder: "specific salt name"
    },
    {
        id: 15,
        type: 'blank',
        question: "Magnesium reacts slowly with ____________ water.",
        answers: ["cold"],
        explanation: "Magnesium has a very slow reaction with cold water, but reacts rapidly with steam to form magnesium oxide and hydrogen.",
        placeholder: "temperature state"
    },
    {
        id: 16,
        type: 'blank',
        question: "Reactive metals are found at the ____________ of the reactivity series.",
        answers: ["top"],
        explanation: "The reactivity series ranks metals by ease of oxidation. The most reactive metals (like potassium and sodium) are placed at the top.",
        placeholder: "position (top/bottom/middle)"
    },

    // --- Give Reason (17 to 22) ---
    {
        id: 17,
        type: 'reason',
        question: "Why does magnesium burn with a bright flame when it reacts with oxygen?",
        modelAnswer: "Because it reacts vigorously and produces heat, which causes the magnesium to burn with a bright flame.",
        explanation: "Magnesium burning in oxygen is highly exothermic. The high temperature reaches the point where magnesium oxide emits brilliant white incandescent light.",
        keywords: ["vigorous", "heat", "bright", "flame", "exothermic"]
    },
    {
        id: 18,
        type: 'reason',
        question: "Why does copper react with oxygen to form copper oxide?",
        modelAnswer: "Copper reacts with oxygen because oxygen is reactive and combines with copper during a chemical reaction (oxidation). When copper is heated in oxygen, it gains oxygen atoms and forms copper oxide.",
        explanation: "Oxygen is highly electronegative and oxidizes heated copper to form black copper(II) oxide (CuO), where copper gains oxygen.",
        keywords: ["combines", "oxidation", "gains", "oxygen", "heated"]
    },
    {
        id: 19,
        type: 'reason',
        question: "Why does copper not react with dilute acids?",
        modelAnswer: "Because it is less reactive than hydrogen in the reactivity series.",
        explanation: "Metals below hydrogen in the reactivity series (such as copper, silver, gold) cannot displace hydrogen ions from a solution of an acid.",
        keywords: ["less reactive", "hydrogen", "reactivity series", "displace"]
    },
    {
        id: 20,
        type: 'reason',
        question: "Why is hydrogen gas produced when metals react with acids?",
        modelAnswer: "Because metals displace hydrogen from the acid.",
        explanation: "Active metals act as reducing agents, donating electrons to hydrogen ions (H+) in the acid, reducing them to hydrogen gas (H2).",
        keywords: ["displace", "hydrogen", "acid", "displaces"]
    },
    {
        id: 21,
        type: 'reason',
        question: "Why does iron react with steam but not cold water?",
        modelAnswer: "Because iron is less reactive and needs higher temperature to react.",
        explanation: "Iron has relatively low reactivity compared to group 1/2 metals. The higher thermal energy of steam provides the activation energy required for reaction.",
        keywords: ["less reactive", "temperature", "steam", "activation", "energy"]
    },
    {
        id: 22,
        type: 'reason',
        question: "Why is the reaction of potassium with water dangerous?",
        modelAnswer: "Because it is extremely exothermic and may cause explosion.",
        explanation: "Potassium reacts instantly and violently with water, generating enough heat to melt the metal and immediately ignite the hydrogen gas produced.",
        keywords: ["exothermic", "explosion", "heat", "ignite", "violent"]
    }
];

// --- APP STATE ---
let currentQuizMode = 'all'; // 'all', 'mcq', 'blank', 'reason'
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let maxScorePossible = 0;
let userAnswers = []; // Holds items like: { questionId: 1, userResponse: "...", isCorrect: true/false/partial, scoreAwarded: 2, maxScore: 2 }

let timerInterval = null;
let secondsElapsed = 0;

// --- SOUND SYNTHESIS ENGINE (Web Audio API) ---
const AudioEngine = {
    ctx: null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    playCorrect() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        osc.type = 'sine';
        
        // Two-note arpeggio (success feel)
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    },

    playIncorrect() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        osc.type = 'sawtooth';
        
        // Downward buzz
        osc.frequency.setValueAtTime(220.00, now); // A3
        osc.frequency.linearRampToValueAtTime(146.83, now + 0.25); // D3
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    },

    playComplete() {
        this.init();
        const now = this.ctx.currentTime;
        
        const playNote = (freq, delay, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + delay);
            gain.gain.setValueAtTime(0.15, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + duration);
            osc.start(now + delay);
            osc.stop(now + delay + duration);
        };

        // Arpeggiated Major chord: C4 (261.63), E4 (329.63), G4 (392.00), C5 (523.25)
        playNote(261.63, 0.0, 0.5);
        playNote(329.63, 0.1, 0.5);
        playNote(392.00, 0.2, 0.5);
        playNote(523.25, 0.3, 0.8);
    }
};

// --- BACKGROUND CANVAS PARTICLES ---
const ParticleBackground = {
    canvas: null,
    ctx: null,
    particles: [],
    animationFrameId: null,

    init() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    createParticles() {
        this.particles = [];
        const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 20000));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                color: Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(236, 72, 153, 0.15)'
            });
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render subtle mesh lines
        const isDark = document.body.getAttribute('data-theme') !== 'light';
        const lineDist = 120;

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;

            // Boundaries
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Draw links
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < lineDist) {
                    const alpha = (1 - dist / lineDist) * 0.08;
                    this.ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${alpha})` : `rgba(2, 132, 199, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
};

// --- DOM ELEMENTS ---
const startCard = document.getElementById('startCard');
const quizCard = document.getElementById('quizCard');
const resultsCard = document.getElementById('resultsCard');

const startQuizBtn = document.getElementById('startQuizBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const retryBtn = document.getElementById('retryBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const questionNumLbl = document.getElementById('questionNumLbl');
const scoreTracker = document.getElementById('scoreTracker');
const progressBarFill = document.getElementById('progressBarFill');
const timerVal = document.getElementById('timerVal');

const questionTypeBadge = document.getElementById('questionTypeBadge');
const questionText = document.getElementById('questionText');

const mcqOptionsContainer = document.getElementById('mcqOptionsContainer');
const blankInputContainer = document.getElementById('blankInputContainer');
const blankAnswerInput = document.getElementById('blankAnswerInput');
const submitBlankBtn = document.getElementById('submitBlankBtn');

const reasonContainer = document.getElementById('reasonContainer');
const reasonAnswerInput = document.getElementById('reasonAnswerInput');
const revealReasonBtn = document.getElementById('revealReasonBtn');
const evaluationSection = document.getElementById('evaluationSection');
const modelAnswerText = document.getElementById('modelAnswerText');

const explanationContainer = document.getElementById('explanationContainer');
const explanationTitle = document.getElementById('explanationTitle');
const explanationText = document.getElementById('explanationText');

const finalScorePct = document.getElementById('finalScorePct');
const finalScoreFraction = document.getElementById('finalScoreFraction');
const resultBadge = document.getElementById('resultBadge');
const resultFeedback = document.getElementById('resultFeedback');
const timeTakenVal = document.getElementById('timeTakenVal');
const accuracyVal = document.getElementById('accuracyVal');
const solvedCountVal = document.getElementById('solvedCountVal');
const reviewList = document.getElementById('reviewList');
const scoreRingCircle = document.getElementById('scoreRingCircle');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Start background animation
    ParticleBackground.init();

    // Mode Selection Click Handlers
    const modeOptions = document.querySelectorAll('.mode-option');
    modeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            modeOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            currentQuizMode = opt.dataset.mode;
        });
    });

    // Theme Toggle Handler
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', nextTheme);
        themeToggleBtn.innerHTML = nextTheme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Button Click Listeners
    startQuizBtn.addEventListener('click', () => startQuiz());
    submitBlankBtn.addEventListener('click', () => submitBlankAnswer());
    revealReasonBtn.addEventListener('click', () => revealReasonEvaluation());
    nextQuestionBtn.addEventListener('click', () => loadNextQuestion());
    retryBtn.addEventListener('click', () => resetToStart());

    // Enter Key Listener for fill-in-the-blank input
    blankAnswerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBlankAnswer();
        }
    });

    // Self-Grading Button Listeners
    const gradeBtns = document.querySelectorAll('.grade-btn');
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => selectSelfGrade(parseInt(btn.dataset.grade), btn));
    });
});

// --- TIMER FUNCTIONS ---
function startTimer() {
    secondsElapsed = 0;
    updateTimerText();
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerText();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerText() {
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    timerVal.textContent = `${mins}:${secs}`;
}

// --- QUIZ NAVIGATION & PLAY LOGIC ---
function startQuiz() {
    AudioEngine.init();
    
    // Filter questions based on mode
    if (currentQuizMode === 'all') {
        activeQuestions = [...questionBank];
    } else if (currentQuizMode === 'mcq') {
        activeQuestions = questionBank.filter(q => q.type === 'mcq');
    } else if (currentQuizMode === 'blank') {
        activeQuestions = questionBank.filter(q => q.type === 'blank');
    } else if (currentQuizMode === 'reason') {
        activeQuestions = questionBank.filter(q => q.type === 'reason');
    }

    // Shuffle questions within mode for replayability
    activeQuestions.sort(() => Math.random() - 0.5);

    // Initialize State variables
    currentQuestionIndex = 0;
    score = 0;
    maxScorePossible = activeQuestions.reduce((acc, curr) => acc + (curr.type === 'reason' ? 2 : 1), 0);
    userAnswers = [];

    // UI Adjustments
    showCard(quizCard);
    startTimer();
    renderQuestion();
}

function showCard(cardToShow) {
    [startCard, quizCard, resultsCard].forEach(card => {
        card.classList.remove('active-card');
    });
    setTimeout(() => {
        cardToShow.classList.add('active-card');
    }, 50);
}

function renderQuestion() {
    const q = activeQuestions[currentQuestionIndex];
    
    // Update labels & progress bar
    questionNumLbl.textContent = `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`;
    scoreTracker.textContent = `Score: ${score}`;
    
    const pct = (currentQuestionIndex / activeQuestions.length) * 100;
    progressBarFill.style.width = `${pct}%`;

    // Clear previous feedback
    explanationContainer.classList.add('hidden');
    nextQuestionBtn.classList.add('hidden');

    // Display question text
    questionText.textContent = q.question;

    // Display correct badge type
    questionTypeBadge.className = 'question-type-badge';
    if (q.type === 'mcq') {
        questionTypeBadge.textContent = 'Multiple Choice';
        questionTypeBadge.classList.add('badge-mcq');
        
        mcqOptionsContainer.classList.remove('hidden');
        blankInputContainer.classList.add('hidden');
        reasonContainer.classList.add('hidden');
        renderMCQOptions(q);
    } else if (q.type === 'blank') {
        questionTypeBadge.textContent = 'Fill in the Blank';
        questionTypeBadge.classList.add('badge-blank');
        
        mcqOptionsContainer.classList.add('hidden');
        blankInputContainer.classList.remove('hidden');
        reasonContainer.classList.add('hidden');
        
        blankAnswerInput.value = '';
        blankAnswerInput.disabled = false;
        blankAnswerInput.placeholder = q.placeholder || "Type your answer here...";
        submitBlankBtn.classList.remove('hidden');
        blankAnswerInput.focus();
    } else if (q.type === 'reason') {
        questionTypeBadge.textContent = 'Give Reason';
        questionTypeBadge.classList.add('badge-reason');
        
        mcqOptionsContainer.classList.add('hidden');
        blankInputContainer.classList.add('hidden');
        reasonContainer.classList.remove('hidden');
        
        reasonAnswerInput.value = '';
        reasonAnswerInput.disabled = false;
        revealReasonBtn.classList.remove('hidden');
        evaluationSection.classList.add('hidden');
        
        // Reset evaluation buttons styling
        const gradeBtns = document.querySelectorAll('.grade-btn');
        gradeBtns.forEach(btn => {
            btn.classList.remove('selected-grade');
            btn.style.pointerEvents = 'auto';
        });
    }
}

// --- MULTIPLE CHOICE LOGIC ---
function renderMCQOptions(q) {
    mcqOptionsContainer.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.dataset.index = idx;
        
        const letter = String.fromCharCode(97 + idx); // a, b, c, d
        optionCard.innerHTML = `
            <div class="option-letter">${letter}</div>
            <div class="option-text">${opt}</div>
        `;
        
        optionCard.addEventListener('click', () => selectMCQOption(idx, optionCard));
        mcqOptionsContainer.appendChild(optionCard);
    });
}

function selectMCQOption(selectedIdx, selectedCard) {
    const q = activeQuestions[currentQuestionIndex];
    const cards = mcqOptionsContainer.querySelectorAll('.option-card');
    
    // Disable all options clicks
    cards.forEach(c => c.classList.add('disabled'));

    const isCorrect = (selectedIdx === q.answer);
    
    if (isCorrect) {
        selectedCard.classList.add('correct-choice');
        score += 1;
        AudioEngine.playCorrect();
    } else {
        selectedCard.classList.add('incorrect-choice');
        // Show correct choice
        cards[q.answer].classList.add('correct-choice');
        AudioEngine.playIncorrect();
    }

    // Save user answer
    userAnswers.push({
        questionId: q.id,
        userResponse: q.options[selectedIdx],
        isCorrect: isCorrect,
        scoreAwarded: isCorrect ? 1 : 0,
        maxScore: 1
    });

    showExplanation(q.explanation, isCorrect ? "Correct!" : "Incorrect");
    nextQuestionBtn.classList.remove('hidden');
}

// --- FILL IN THE BLANK LOGIC ---
function submitBlankAnswer() {
    const q = activeQuestions[currentQuestionIndex];
    const userVal = blankAnswerInput.value.trim().toLowerCase();
    
    if (!userVal) return; // Prevent empty submits
    
    blankAnswerInput.disabled = true;
    submitBlankBtn.classList.add('hidden');

    // Fuzzy matching against allowed strings
    // We clean punctuation and compare
    const isCorrect = q.answers.some(ans => {
        const cleanAns = ans.trim().toLowerCase();
        return userVal === cleanAns || userVal.includes(cleanAns) && cleanAns.length > 3;
    });

    if (isCorrect) {
        blankAnswerInput.style.borderColor = 'var(--color-success)';
        score += 1;
        AudioEngine.playCorrect();
    } else {
        blankAnswerInput.style.borderColor = 'var(--color-error)';
        AudioEngine.playIncorrect();
    }

    userAnswers.push({
        questionId: q.id,
        userResponse: blankAnswerInput.value.trim(),
        isCorrect: isCorrect,
        scoreAwarded: isCorrect ? 1 : 0,
        maxScore: 1
    });

    const displayCorrect = q.answers[0]; // first primary answer
    showExplanation(
        `Correct Answer: <strong>${displayCorrect}</strong>.<br><br>${q.explanation}`, 
        isCorrect ? "Correct!" : "Incorrect"
    );
    nextQuestionBtn.classList.remove('hidden');
}

// --- GIVE REASON LOGIC ---
function revealReasonEvaluation() {
    const q = activeQuestions[currentQuestionIndex];
    const userText = reasonAnswerInput.value.trim();
    
    if (!userText) return;
    
    reasonAnswerInput.disabled = true;
    revealReasonBtn.classList.add('hidden');

    // Populate model answer
    modelAnswerText.textContent = q.modelAnswer;
    evaluationSection.classList.remove('hidden');
}

function selectSelfGrade(gradeValue, clickedBtn) {
    const q = activeQuestions[currentQuestionIndex];
    const gradeBtns = document.querySelectorAll('.grade-btn');
    
    // Assign selected styles
    gradeBtns.forEach(btn => {
        btn.classList.remove('selected-grade');
        btn.style.pointerEvents = 'none'; // disable clicks
    });
    clickedBtn.classList.add('selected-grade');

    score += gradeValue;
    
    const isCorrect = (gradeValue === 2);
    const isPartial = (gradeValue === 1);
    
    if (isCorrect) {
        AudioEngine.playCorrect();
    } else if (isPartial) {
        AudioEngine.playCorrect(); // lighter chirp
    } else {
        AudioEngine.playIncorrect();
    }

    userAnswers.push({
        questionId: q.id,
        userResponse: reasonAnswerInput.value.trim(),
        isCorrect: isCorrect ? true : (isPartial ? 'partial' : false),
        scoreAwarded: gradeValue,
        maxScore: 2
    });

    showExplanation(q.explanation, gradeValue === 2 ? "Fully Correct" : (gradeValue === 1 ? "Partially Correct" : "Incorrect"));
    nextQuestionBtn.classList.remove('hidden');
}

// --- SHOW FEEDBACK ---
function showExplanation(text, status) {
    explanationText.innerHTML = text;
    explanationTitle.textContent = status;
    explanationContainer.classList.remove('hidden');
    
    const icon = document.getElementById('explanationIcon');
    icon.className = 'fa-solid';
    
    if (status.includes("Correct") && !status.includes("Partial")) {
        icon.classList.add('fa-circle-check', 'text-green');
    } else if (status.includes("Partial")) {
        icon.classList.add('fa-circle-half-stroke', 'text-gold');
    } else {
        icon.classList.add('fa-triangle-exclamation', 'text-magenta');
    }
}

// --- LOAD NEXT / FINISH ---
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuestions.length) {
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    stopTimer();
    AudioEngine.playComplete();
    
    // Fill progress bar fully
    progressBarFill.style.width = '100%';

    // Calculate details
    const percentage = Math.round((score / maxScorePossible) * 100);
    finalScorePct.textContent = `${percentage}%`;
    finalScoreFraction.textContent = `${score}/${maxScorePossible} pts`;

    // Render Badge & Feedback
    let badgeText = "Novice Chemist";
    let feedbackText = "Take some more time to study the revision marking scheme guidelines.";
    let badgeClass = "wrong";

    if (percentage >= 90) {
        badgeText = "Chemistry Master";
        feedbackText = "Exceptional! You have fully mastered the reactions, equations, and reactivity series principles!";
        badgeClass = "correct";
    } else if (percentage >= 75) {
        badgeText = "Lab Researcher";
        feedbackText = "Great job! A few minor errors, but you demonstrate solid understanding of Term 3 syllabus.";
        badgeClass = "partial";
    } else if (percentage >= 50) {
        badgeText = "Lab Assistant";
        feedbackText = "Fair understanding. Recommend revisiting reactions of copper and group 1 metals with water.";
        badgeClass = "warning";
    }

    resultBadge.textContent = badgeText;
    resultBadge.className = 'card-badge'; // reset
    
    if (percentage >= 75) {
        resultBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        resultBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        resultBadge.style.color = 'var(--color-success)';
    } else if (percentage >= 50) {
        resultBadge.style.background = 'rgba(234, 179, 8, 0.15)';
        resultBadge.style.borderColor = 'rgba(234, 179, 8, 0.3)';
        resultBadge.style.color = 'var(--accent-glow)';
    } else {
        resultBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        resultBadge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        resultBadge.style.color = 'var(--color-error)';
    }

    resultFeedback.textContent = feedbackText;

    // Time Taken String
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    timeTakenVal.textContent = `${mins}:${secs}`;

    // Accuracy
    accuracyVal.textContent = `${percentage}%`;

    // Total Solved Count
    solvedCountVal.textContent = activeQuestions.length;

    // SVG Circular Ring Animation
    const strokeOffset = 440 - (440 * percentage) / 100;
    scoreRingCircle.style.strokeDashoffset = strokeOffset;

    // Populate Detailed Review List
    renderReviewList();

    // Trigger canvas confetti spray
    triggerConfetti(percentage >= 75);

    showCard(resultsCard);
}

function renderReviewList() {
    reviewList.innerHTML = '';
    
    userAnswers.forEach((ans, idx) => {
        const q = questionBank.find(item => item.id === ans.questionId);
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        let statusClass = 'wrong-item';
        let statusLabel = `<i class="fa-solid fa-circle-xmark text-red"></i> Incorrect`;
        let userAnsClass = 'text-red';
        
        if (ans.isCorrect === true) {
            statusClass = 'correct-item';
            statusLabel = `<i class="fa-solid fa-circle-check text-green"></i> Correct`;
            userAnsClass = 'text-green';
        } else if (ans.isCorrect === 'partial') {
            statusClass = 'partial-item';
            statusLabel = `<i class="fa-solid fa-circle-half-stroke text-gold"></i> Partially Correct`;
            userAnsClass = 'text-warning';
        }

        // Generate response summary display
        let correctDisplay = '';
        if (q.type === 'mcq') {
            correctDisplay = q.options[q.answer];
        } else if (q.type === 'blank') {
            correctDisplay = q.answers.join(' or ');
        } else if (q.type === 'reason') {
            correctDisplay = q.modelAnswer;
        }

        reviewItem.classList.add(statusClass);
        reviewItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="review-q-num">Question ${idx + 1} (${q.type.toUpperCase()})</span>
                <span class="review-status">${statusLabel} (${ans.scoreAwarded}/${ans.maxScore} pts)</span>
            </div>
            <div class="review-question">${q.question}</div>
            <div class="review-answers">
                <div class="user-ans-row ${userAnsClass}"><strong>Your Answer:</strong> ${ans.userResponse || '<i>No Answer</i>'}</div>
                <div class="correct-ans-row"><strong>Marking Scheme Answer:</strong> ${correctDisplay}</div>
            </div>
            <div class="review-exp"><strong>Syllabus Focus:</strong> ${q.explanation}</div>
        `;
        
        reviewList.appendChild(reviewItem);
    });
}

// --- CONFETTI SPRAY ANIMATION ---
function triggerConfetti(shouldSpray) {
    if (!shouldSpray) return;

    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const confettiCount = 100;
    const confettiColors = ['#38bdf8', '#ec4899', '#eab308', '#a855f7', '#10b981'];
    const particles = [];

    // Pause primary background drift temporarily
    cancelAnimationFrame(ParticleBackground.animationFrameId);

    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height + 20,
            radius: Math.random() * 5 + 3,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 15 - 10,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            gravity: 0.35,
            opacity: 1
        });
    }

    let frame = 0;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeConfetti = 0;
        
        particles.forEach(p => {
            if (p.opacity <= 0) return;
            activeConfetti++;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98; // friction
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.008;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
            ctx.restore();
        });

        frame++;
        if (activeConfetti > 0 && frame < 200) {
            requestAnimationFrame(animateConfetti);
        } else {
            // Resume regular background particles
            ParticleBackground.createParticles();
            ParticleBackground.animate();
        }
    }

    animateConfetti();
}

function resetToStart() {
    showCard(startCard);
}
