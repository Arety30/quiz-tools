# Quiz Tools

Quiz Tools is a small collection of revision aids made by Syed Abrar Ali for his own Year 8 science exams: a terminal quiz runner that reads questions from a JSON file, the extracted text of a Term 3 science exam paper used as source material for writing questions, and a polished browser-based chemistry revision app with 22 questions in three formats (multiple choice, fill-in-the-blank, "give a reason" with self-marking against the marking scheme). The problem it solves is turning a static past paper and marking scheme into something that can be practised repeatedly with instant feedback.

## Where it is used

These are personal study tools. `chemistry_quiz/` is opened in a browser before chemistry tests; `run_quiz.py` is a quick command-line drill for any quiz stored as JSON (it was written against a quiz file from another of Abrar's projects); `quiz_content.txt` is the raw text pulled from the exam PDF that the questions were modelled on.

## How it works

### `run_quiz.py`

- Loads a JSON array where each item has `question`, `answer` and optionally `options` (a list of four strings).
- For items with `options` it prints them numbered 1-4, reads a number and compares the chosen option to `answer`; for items without options it reads free text and compares case-insensitively.
- Prints "Correct!" or the right answer after each item and a final `score/total`.
- The `__main__` block calls `run_quiz()` with a hard-coded absolute path to a `science_quiz.json` inside another local repository; there is no argument parsing.

Expected JSON shape:

```json
[
  {"question": "Which gas is produced when metals react with acids?",
   "options": ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
   "answer": "Hydrogen"},
  {"question": "Chemical name for rust?", "answer": "iron oxide"}
]
```

### `quiz_content.txt`

Plain-text dump of a six-page Year 8 Science Term 3 exam paper (cover sheet, instructions, three MCQs, four fill-in-the-blank items, the first short-answer prompt). Pages 3-6 contain only headers and page footers because those questions were diagrams or lined answer space in the original. It is reference material, not read by any code.

### `chemistry_quiz/` (static web app)

`script.js` holds everything:

- `questionBank`: 22 objects with `id`, `type` (`mcq` | `blank` | `reason`), `question`, and per type `options` + `answer` index, `answers` (accepted strings) + `placeholder`, or `modelAnswer` + `keywords`; every item has an `explanation`.
- Four modes chosen on the start card: all 22, MCQ only (8), blanks only (8), reason only (6). The active set is shuffled on each start.
- Scoring: MCQ and blank questions are worth 1 point; a blank is correct if the trimmed lower-case input equals an accepted answer, or contains an accepted answer longer than three characters. Reason questions are worth 2 points: the student writes an explanation, clicks "Compare with Marking Scheme" to reveal the model answer, then self-grades 0 / 1 / 2.
- After every answer an explanation panel appears with the correct answer and syllabus note; a timer and progress bar run during the quiz.
- Results card: percentage inside an SVG ring (stroke-dashoffset animation), badge by score (>= 90 % Chemistry Master, >= 75 % Lab Researcher, >= 50 % Lab Assistant, else Novice Chemist), time taken, accuracy, question count, and a full review list with the student's answer, the marking-scheme answer and the explanation. Confetti is sprayed at >= 75 %.
- Extras: Web Audio API oscillators for correct/incorrect/complete sounds (no audio files), an animated canvas particle background, a dark/light theme toggle (`data-theme` on `<body>`), Enter key submits blanks.

`index.html` provides the three cards (start, quiz, results) and loads Google Fonts and Font Awesome from CDNs; `style.css` defines the glassmorphism theme with CSS variables for both themes.

| File | Role |
|------|------|
| `run_quiz.py` | Terminal quiz runner for JSON question files |
| `quiz_content.txt` | Extracted exam-paper text (source material) |
| `chemistry_quiz/index.html` | App markup: start / quiz / results cards |
| `chemistry_quiz/script.js` | Question bank, modes, scoring, timer, audio, particles, results |
| `chemistry_quiz/style.css` | Theme, layout, animations |

## Setup

- `run_quiz.py`: Python 3, standard library only.
- `chemistry_quiz/`: any modern browser. Fonts and icons load from CDNs, so the first load needs Internet access; the quiz logic itself runs offline.

```bash
git clone <repo-url> ~/quiz-tools
cd ~/quiz-tools
```

Edit the path in the `__main__` block of `run_quiz.py` to point at your own JSON file (for example `./science_quiz.json`), or import the function and pass the path yourself.

## Usage

Terminal quiz:

```bash
python3 -c "from run_quiz import run_quiz; run_quiz('science_quiz.json')"
#
# Which gas is produced when metals react with acids?
# 1) Oxygen
# 2) Hydrogen
# ...
# Enter the number of your answer (1-4): 2
# Correct!
# Quiz finished! Your score: 1/2
```

Chemistry quiz:

```bash
# open directly
xdg-open chemistry_quiz/index.html
# or serve it
cd chemistry_quiz && python3 -m http.server 8000   # then open http://localhost:8000
```

Pick a mode, press "Start Revision Quiz", answer, read the explanation, press "Next Question"; use "Retake Revision" on the results card to start over.

## Project structure

```
quiz-tools/
├── run_quiz.py
├── quiz_content.txt
└── chemistry_quiz/
    ├── index.html
    ├── script.js
    └── style.css
```

## Limitations and notes

- `run_quiz.py` crashes on non-numeric or out-of-range input for MCQs (no validation) and has no CLI arguments; the default path points outside this repository.
- Questions in the web app are hard-coded in `script.js`; adding a topic means editing the `questionBank` array.
- Blank-answer matching is a simple substring/equality check, so spelling variants not listed in `answers` count as wrong.
- "Give reason" scores are self-reported; `keywords` are stored but not used for automatic marking.
- No persistence: scores are not saved between sessions.
- The content is specific to one Year 8 chemistry unit (reactions of metals with oxygen, water and acids; the reactivity series).
