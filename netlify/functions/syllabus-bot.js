// netlify/functions/syllabus-bot.js

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const { question } = JSON.parse(event.body || "{}");

    if (!question || typeof question !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing or invalid 'question' field." })
      };
    }

    // -----------------------------
    // FULL SYLLABUS (UNCHANGED)
    // -----------------------------
    const syllabus = `
The University of Connecticut Department of Literatures, Cultures, and Languages FALL 2026 ILCS 1001 Elementary Italian I Section 003 TuTh 11:00AM–12:15PM MCHU 110; W 11:15AM–12:05PM HBL 2119A; Instructor TBA; Coordinator Philip Balma (SHH 213) Philip.Balma@uconn.edu.

Course Description and Objectives: Italian 1001 (4 credits) introduces fundamentals of Italian pronunciation, grammar, vocabulary, reading, writing, and conversation; students learn to understand short texts, engage in brief conversations, and write short essays; class is conducted entirely in Italian.

Required Texts: Piacere! by Gemmani, Lottini, Sartini-Rideout (University of Iowa), free open-access Parts I–VII; exercises integrated into Piacere!; additional vocabulary via Quizlet; companion website for all exercises at https://uconn-ilcs1001-oer.netlify.app/.

Participation Policy: Participation is 20%; class time is for oral practice; students must study assigned pages before class; preparation verified through participation and unannounced quizzes; maximum 3 absences allowed without documentation; additional absences require medical or official justification.

Quizzes Policy: Quizzes are 10%; unannounced weekly quizzes (~5 minutes); students may miss 3 quizzes without penalty; additional missed quizzes receive a zero unless documented emergency.

Tests Policy: Tests are 15%; three partial exams assess listening, comprehension, speaking, and writing; students should aim for 75%+ to prepare for mid-term and final.

Compositions Policy: Compositions are 10%; two compositions (100 and 200 words) each with first and final drafts; drafts due on due date; late compositions lose 5 points per day.

Homework and Exercises Policy: Homework is 15%; students complete Piacere! exercises and HuskyCT activities including Quizlet; exercises for each Part due on the day that Part is assessed; must submit screenshots of 100% correctness for web-based exercises; Chrome recommended for Piacere! online platform.

Web-Based Exercises Policy: Students complete Grammar and Reading exercises on Piacere! online; must achieve 100% and submit screenshots; Quizlet used for vocabulary; technical issues from unsupported browsers not accepted.

Mid-term and Final Exam Policy: Mid-term and final exams each worth 15% (oral + written components); consult Final Exam Schedule for exact times.

Grading Breakdown: Participation 20%; Quizzes 10%; Tests 15%; Compositions 10%; Homework 15%; Mid-term written 10%; Mid-term oral 5%; Final written 10%; Final oral 5%; grading scale A 100–94, A– 93–90, B+ 89–87, B 86–84, B– 83–80, C+ 79–77, C 76–74, C– 73–70, D+ 69–67, D 66–64, D– 63–60, F 59–0.

Attendance Policy: Regular attendance essential; more than 3 absences may lower participation grade; excessive absences may cause course failure; illness requires documentation; emergencies reviewed by coordinator; final exam makeup requires Dean of Students authorization.

Late Work Policy: Compositions lose 10% per day late; missed quizzes cannot be made up except for documented emergencies; no late homework accepted without prior arrangement.

Italian-Only Policy: The course is conducted entirely in Italian; immersion is essential; students must prepare before class because instructors use the material rather than lecture on it.

Academic Honesty Policy: Translation programs (Google Translate, ChatGPT, DeepL, etc.) are strictly prohibited; using them results in failure of assignment and possible course failure; AI tools not allowed unless explicitly authorized; students may not consult peers or native speakers for graded writing; copying during exams results in automatic F and reporting.

Plagiarism and Academic Misconduct Policy: Presenting another’s words or ideas as your own—including translation programs, copying from Internet sources, or submitting others’ work—results in an F for the course and referral to the Dean of Students.

Technology in Class Policy: Laptops and tablets allowed for note-taking and class activities; phones must be silenced and put away; recording requires explicit permission.

Copyright Policy: All course materials are intellectual property of the instructor; notes for personal use only; recording requires permission.

Dean of Students Policy: For life circumstances affecting coursework, contact dos@uconn.edu.

Office Hours Policy: Instructors provide at least two office hours weekly; students should seek help early; further assistance available from Prof. Balma.

Free Tutoring Policy: Free tutoring available; instructor announces location and hours; students should not wait until end of semester.

Tips for Success: Speak Italian from day one; come prepared; participate actively; form study groups; immerse yourself in Italian media; ask questions in class.

Policy Against Discrimination and Harassment: University prohibits discrimination and harassment; instructor is mandatory reporter for sexual assault, intimate partner violence, and stalking; more info at equity.uconn.edu and titleix.uconn.edu.

Sexual Assault Reporting Policy: Non-confidential employees must report assaults to Office of Diversity & Equity; information remains private but not confidential; more info at sexualviolence.uconn.edu.

Course Schedule Overview: ILCS 1001 covers Piacere! Parts I–VII; ILCS 1002 covers Parts VIII–XIV; ILCS 1003 covers Parts XV–XXI; semester begins Aug 31; first class Sep 1; Thanksgiving Recess Nov 22–28; last day of classes Dec 11; final exams Dec 14–20.

Schedule Items:
Tu Sep 1 pp. 7–10 Part I Introduzione al corso; l’alfabeto; i saluti; Part I exercises due Thu Sep 24.
Wed Sep 2 pp. 10–17 Part I presentazioni; numeri 0–100.
Thu Sep 3 pp. 19–23 Part I pronomi soggetto; verbo AVERE.
Tu Sep 8 pp. 23–26 Part I esercizi AVERE e numeri.
Wed Sep 9 Ripasso di AVERE.
Thu Sep 10 pp. 27–32 Part II i nomi; Part II exercises due Thu Sep 24.
Tu Sep 15 Part II articolo indeterminativo.
Wed Sep 16 pp. 32–37 Part II plurale dei nomi.
Thu Sep 17 pp. 37–40 Ripasso nomi e articoli.
Tu Sep 22 Conversazione e attività comunicative.
Wed Sep 23 Ripasso generale Parts I–II.
Thu Sep 24 TEST 1 Parts I–II.
Tu Sep 29 pp. 53–59 Part III verbi in -ARE; Part III exercises due Wed Oct 21.
Wed Sep 30 pp. 57–64 Part III verbi irregolari in -ARE.
Thu Oct 1 pp. 61–64 Part III Lettura Lo Studente; COMPOSIZIONE #1 versione iniziale.
Tu Oct 6 Part III esercizi e pratica.
Wed Oct 7 pp. 67–72 Part IV articolo determinativo; Part IV exercises due Wed Oct 21.
Thu Oct 8 pp. 72–75 Part IV questo e quello.
Tu Oct 13 pp. 75–78 Part IV Lettura Un Incontro.
Wed Oct 14 Part IV Ripasso; COMPOSIZIONE #1 versione finale.
Thu Oct 15 Pratica e preparazione per Test 2 Parts III–IV.
Wed Oct 21 TEST 2 Parts III–IV.
Thu Oct 22 pp. 81–87 Part V aggettivi possessivi; Part V exercises due Tue Nov 3.
Tu Oct 27 pp. 87–90 Part V questo/quello + possessivi.
Wed Oct 28 pp. 90–93 Part V Lettura Un Incontro parte 2.
Thu Oct 29 Part V ripasso e pratica orale.
Tu Nov 3 ORAL MID-TERM.
Wed Nov 4 Ripasso Parts I–V.
Thu Nov 5 WRITTEN MID-TERM Parts I–V.
Tu Nov 10 pp. 95–99 Part VI verbi in -ERE; COMPOSIZIONE #2 versione iniziale.
Wed Nov 11 pp. 99–103 Part VI verbi in -IRE; Part VI exercises due Thu Nov 19.
Thu Nov 12 pp. 103–107 Part VI Lettura La Giornata di Francesco.
Tu Nov 17 pp. 95–99 Part VII preposizioni; giorni e mesi.
Wed Nov 18 Part VII esercizi e pratica.
Thu Nov 19 TEST 3 Parts V–VI–VII.
Nov 22–28 THANKSGIVING RECESS no class.
Tu Dec 1 Ripasso esame orale finale; COMPOSIZIONE #2 versione finale.
Wed Dec 2 Preparazione esame orale.
Thu Dec 3 ORAL FINAL EXAM.
Tu Dec 8 ORAL FINAL EXAM (cont.).
Wed Dec 9 Ripasso esame scritto finale.
Thu Dec 10 Preparazione esame scritto.
Dec 14–20 WRITTEN FINAL EXAM.

Syllabus Notice: Syllabus subject to change; updates announced in class and on HuskyCT; success depends on preparation and engagement.
`;

    // -----------------------------
    // OPENAI CALL
    // -----------------------------
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are sylla-BOT, an assistant that answers ONLY using the ILCS 1001 syllabus provided below. If the syllabus does not contain the answer, explicitly say that the syllabus does not specify."
          },
          {
            role: "user",
            content: "QUESTION:\n" + question + "\n\nSYLLABUS:\n" + syllabus
          }
        ]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "OpenAI API error",
          status: response.status,
          details: text
        })
      };
    }

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No answer generated from the syllabus.";

    return {
      statusCode: 200,
      body: JSON.stringify({ answer })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal function error",
        details: err.message || String(err)
      })
    };
  }
};
