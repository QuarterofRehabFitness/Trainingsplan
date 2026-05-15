import { useState, useEffect, useRef } from "react";

const ACCENT = "#A2E2B2";
const BG = "#0a0a0a";
const CARD = "#141414";
const BORDER = "#232323";
const GRAY = "#6b6b6b";
const LIGHTGRAY = "#2a2a2a";
const PHASE_COLORS = ["#A2E2B2", "#7EC8E3", "#F5C842", "#E8A87C", "#C3A2E2", "#E2A2C3"];

// ── Real Quarter Logo SVG (paths from original, recolored white) ───────────
const QuarterLogo = ({ height = 40 }) => {
  // viewBox="0 0 580.1 294.1" — full logo with wordmark, white fill
  const ratio = 580.1 / 294.1;
  const width = height * ratio;
  return (
    <svg width={width} height={height} viewBox="0 0 580.1 294.1" fill="white" xmlns="http://www.w3.org/2000/svg">
      {/* Piktogramm — Q+R mark */}
      <path d="M327,66c2.1-5.1,3.1-10.5,3.1-16.3s-1.1-11.3-3.3-16.4c-2.2-5.1-5.2-9.6-9.1-13.5c-3.9-3.9-8.3-6.9-13.4-9.1
        c-5.1-2.2-10.5-3.3-16.3-3.3s-11.2,1.1-16.3,3.3c-5.1,2.2-9.6,5.2-13.5,9.1c-3.9,3.9-7,8.4-9.2,13.5c-2.2,5.1-3.3,10.6-3.3,16.4
        s1.1,11.2,3.3,16.3c2.2,5.1,5.3,9.5,9.2,13.4c3.9,3.9,8.4,6.9,13.5,9.1c5.1,2.2,10.5,3.3,16.3,3.3c6,0,11.6-1.1,16.7-3.3
        c2.4-1,4.7-2.2,6.8-3.7l5.2,6.3h8.9l-8.6-10.7c0.3-0.3,0.7-0.6,1-1C321.9,75.5,324.9,71,327,66z M312,73.9l-5.9-7.3
        c2.1-1,3.8-2.3,5.2-3.9c1.5-1.8,2.6-3.7,3.3-5.9c0.7-2.2,1-4.4,1-6.7c0-2.9-0.5-5.5-1.6-7.7c-0.5-1-1-1.9-1.6-2.7h8.3
        c1,3.2,1.5,6.6,1.5,10.1c0,4.6-0.9,9-2.7,13.1c-1.8,4.1-4.2,7.7-7.3,10.8C312.1,73.7,312,73.8,312,73.9z M275,80.9
        c-4.2-1.7-7.8-4.1-11-7.2c-3.2-3.1-5.7-6.7-7.5-10.8c-1.8-4.1-2.8-8.6-2.8-13.3c0-3.5,0.5-6.8,1.5-10H280v42.9
        C278.3,82.1,276.6,81.6,275,80.9z M301.7,40.7c1.4,0.7,2.5,1.6,3.4,2.6c0.9,1.1,1.5,2.2,1.9,3.5c0.4,1.2,0.6,2.5,0.6,3.6
        c0,1.1-0.2,2.3-0.6,3.6c-0.4,1.3-1,2.5-1.8,3.5c-0.8,1.1-2,2-3.5,2.7c-1.5,0.7-3.4,1-5.7,1h-8.3V39.6h8.9
        C298.6,39.6,300.3,40,301.7,40.7z M295.2,32.2H280h-21.4c1.5-2.4,3.2-4.6,5.2-6.6c3.1-3.1,6.8-5.5,10.9-7.3
        c4.2-1.8,8.6-2.7,13.3-2.7c4.8,0,9.2,0.9,13.3,2.7c4.1,1.8,7.7,4.2,10.8,7.3c2,2,3.7,4.2,5.2,6.6H295.2z M287.7,68.5h8.5
        c0.7,0,1.3,0,1.9-0.1l8.2,9.9c-1.5,1-3.2,1.8-4.9,2.5c-4.1,1.7-8.5,2.6-13.2,2.6c-0.2,0-0.3,0-0.5,0V68.5z"/>
      {/* QUARTER wordmark */}
      <path d="M85.4,199.6c2.1-4.9,3.2-10.3,3.2-15.9c0-5.5-1.1-10.8-3.2-15.7c-2.1-4.9-5.1-9.3-8.9-13.1
        c-3.8-3.8-8.2-6.8-13.1-9c-4.9-2.2-10.2-3.3-15.8-3.3c-5.7,0-11,1.1-15.9,3.3c-4.9,2.2-9.3,5.2-13,9c-3.7,3.8-6.7,8.2-8.8,13.1
        c-2.1,4.9-3.2,10.2-3.2,15.7c0,5.7,1.1,11,3.2,15.9c2.1,4.9,5,9.3,8.8,13c3.7,3.7,8.1,6.7,13,8.8c4.9,2.1,10.3,3.2,15.9,3.2
        c2.9,0,5.8-0.3,8.5-0.9H93v-15.5H80.3C82.3,205.6,84,202.7,85.4,199.6z M38.1,207.3c-3-1.3-5.7-3.1-8-5.5
        c-2.3-2.4-4.1-5.1-5.3-8.2c-1.3-3.1-1.9-6.4-1.9-9.9c0-3.5,0.6-6.8,1.9-9.9c1.2-3.1,3-5.8,5.2-8.1c2.3-2.3,4.9-4.1,7.9-5.5
        c3-1.3,6.2-2,9.7-2c3.5,0,6.7,0.7,9.7,2c3,1.3,5.6,3.1,7.8,5.5c2.2,2.3,4,5,5.2,8.1c1.3,3.1,1.9,6.4,1.9,9.9c0,3.6-0.6,6.9-1.9,10
        c-1.2,3.1-2.9,5.8-5.1,8.1c-2.2,2.3-4.7,4.1-7.7,5.5c-2.9,1.3-6.1,2-9.5,2C44.4,209.2,41.1,208.6,38.1,207.3z"/>
      <path d="M162.6,194.1c0,2.5-0.7,5-2.2,7.3c-1.5,2.3-3.5,4.2-6.1,5.7c-2.5,1.5-5.5,2.2-8.7,2.2c-3,0-5.7-0.7-8.2-2.2
        c-2.5-1.5-4.5-3.3-6.1-5.7c-1.5-2.3-2.3-4.8-2.3-7.3v-50.6h-15.8v50.9c0,5.9,1.5,11.1,4.4,15.6c2.9,4.5,6.8,8.1,11.7,10.7
        c4.9,2.6,10.3,3.9,16.3,3.9c6,0,11.5-1.3,16.5-3.9c4.9-2.6,8.9-6.1,11.8-10.7c2.9-4.5,4.4-9.8,4.4-15.6v-50.9h-15.6V194.1z"/>
      <path d="M228.2,140.3L192,223.7h15.6l6.5-15.7h26.6l6.2,15.7h18.3L229,140.3H228.2z M219.6,194.7l8.1-19.6l7.7,19.6H219.6z"/>
      <path d="M329.5,189.3c2.2-2.7,3.8-5.7,4.8-8.9c1-3.3,1.5-6.5,1.5-9.8c0-4.1-0.7-7.9-2.1-11.2
        c-1.4-3.3-3.4-6.1-6.1-8.5c-2.6-2.4-5.9-4.2-9.9-5.5c-3.9-1.3-8.4-1.9-13.4-1.9H280v15.3h27.2c2.8,0,5,0.5,6.6,1.4
        c1.6,0.9,2.9,2.1,3.7,3.5c0.8,1.4,1.3,2.7,1.6,4.1c0.3,1.3,0.4,2.4,0.4,3.3c0,1.2-0.2,2.4-0.6,3.8c-0.4,1.3-1,2.6-2,3.9
        c-0.9,1.2-2.2,2.3-3.8,3.1c-1.6,0.8-3.6,1.2-6,1.2h-4h-15.8H280v15.3h26.3l17,25.5h18.4L323,194.5
        C325.6,193.1,327.7,191.3,329.5,189.3z"/>
      <polygon points="356.5,158.7 375.3,158.7 375.3,223.7 391.1,223.7 391.1,158.7 410.6,158.7 410.6,143.5 356.5,143.5"/>
      <polygon points="447.6,191.1 482.1,191.1 482.1,175.8 447.6,175.8 447.6,158.7 486.6,158.7 486.6,143.5 431.8,143.5 431.8,223.7 488.1,223.7 488.1,208.5 447.6,208.5"/>
      <path d="M573.5,223.7l-18.7-29.2c2.6-1.4,4.7-3.2,6.4-5.3c2.2-2.7,3.8-5.7,4.8-8.9c1-3.3,1.5-6.5,1.5-9.8
        c0-4.1-0.7-7.9-2.1-11.2c-1.4-3.3-3.4-6.1-6.1-8.5c-2.7-2.4-5.9-4.2-9.9-5.5c-3.9-1.3-8.4-1.9-13.4-1.9h-24.3v80.3h15.8v-25.5
        h10.5l17,25.5H573.5z M527.6,158.7h11.3c2.8,0,5,0.5,6.6,1.4c1.6,0.9,2.9,2.1,3.7,3.5c0.8,1.4,1.3,2.7,1.6,4.1
        c0.3,1.3,0.4,2.5,0.4,3.3c0,1.2-0.2,2.4-0.6,3.8c-0.4,1.3-1.1,2.6-2,3.9c-0.9,1.2-2.2,2.3-3.8,3.1c-1.6,0.8-3.6,1.2-6,1.2h-11.2V158.7z"/>
      {/* OF REHAB & FITNESS subline */}
      <path d="M90.7,272.8c0,7.4-4.1,13.9-12.5,13.9c-7.9,0-12.2-6.1-12.2-13.7c0-7.6,4.5-13.7,12.6-13.7C86,259.2,90.7,264.9,90.7,272.8z M69.6,272.9c0,5.8,2.9,10.8,8.7,10.8c6.2,0,8.7-5.1,8.7-10.8c0-5.8-2.8-10.6-8.7-10.6C72.3,262.3,69.6,267.2,69.6,272.9z"/>
      <path d="M100.1,259.6h17.2v3h-13.7v8.7h12.8v3h-12.8v12h-3.5V259.6z"/>
      <path d="M142.6,274.6v11.7h-3.5v-26.7h10.4c5.5,0,8.4,3,8.4,7.1c0,3.5-2,5.6-4.6,6.3c2.2,0.6,4.1,2.2,4.1,6.8v1.2c0,1.8-0.1,4.2,0.4,5.3h-3.5c-0.5-1.2-0.5-3.2-0.5-5.8V280c0-3.8-1.1-5.5-5.9-5.5H142.6z M142.6,271.6h5.8c4.1,0,5.9-1.5,5.9-4.5c0-2.8-1.8-4.5-5.5-4.5h-6.2V271.6z"/>
      <path d="M184.6,273.9h-13.3v9.4h14.6l-0.5,3h-17.6v-26.7h17.4v3h-13.9v8.2h13.3V273.9z"/>
      <path d="M194.6,259.6h3.5v11.2H212v-11.2h3.6v26.7H212v-12.5h-13.9v12.5h-3.5V259.6z"/>
      <path d="M230.1,278.3l-2.9,8h-3.5l9.5-26.7h4.3l9.9,26.7h-3.8l-3-8H230.1z M239.8,275.3c-2.6-7-4-10.7-4.5-12.8c-0.7,2.3-2.2,6.8-4.3,12.8H239.8z"/>
      <path d="M255.5,259.6h10.3c5.6,0,8.3,3,8.3,6.7c0,3.1-1.8,5.1-3.8,5.8c1.9,0.6,4.7,2.5,4.7,6.4c0,5-3.8,7.8-8.9,7.8h-10.5V259.6z M265.1,270.7c3.9,0,5.4-1.5,5.4-4.1c0-2.4-1.7-4-4.8-4H259v8.2H265.1z M259,283.4h6.6c3.3,0,5.7-1.6,5.7-4.9c0-2.9-1.8-4.8-6.4-4.8H259V283.4z"/>
      <path d="M320.9,269.4l-6.8,10l7.1,6.9h-4.6l-4.4-4.3c-2.4,3-4.6,4.7-8.5,4.7c-5,0-7.6-3.6-7.6-7.1c0-3.1,1.4-5.2,5.8-7.9c-1.9-2-3.2-3.6-3.2-6.1c0-3.5,2.4-6.5,6.7-6.5c4,0,6.4,2.8,6.4,6.1c0,2.7-1.6,4.5-5.2,6.6l5.4,5.3l5.3-7.9H320.9z M310.2,280l-6.5-6.4c-3.2,2.1-4.1,3.5-4.1,5.7c0,2.3,1.9,4.4,4.4,4.4C306.3,283.7,307.9,282.9,310.2,280z M301.9,265.5c0,1.6,1,2.9,3,4.8c3.1-2,3.8-3.2,3.8-4.9c0-1.8-1.1-3.6-3.3-3.6C303.3,261.8,301.9,263.2,301.9,265.5z"/>
      <path d="M343.7,259.6h17.2v3h-13.7v8.7H360v3h-12.8v12h-3.5V259.6z"/>
      <path d="M372.7,259.6v26.7h-3.5v-26.7H372.7z"/>
      <path d="M389.3,262.6h-8.6v-3h20.8v3h-8.6v23.7h-3.6V262.6z"/>
      <path d="M409.2,286.3v-26.7h4.7c3.8,6.3,12.2,19.5,13.7,22.4c-0.3-3.4-0.2-7.6-0.2-12v-10.4h3.3v26.7h-4.4c-3.5-5.8-12.2-20.1-13.9-23.1h-0.1c0.2,3,0.2,7.6,0.2,12.4v10.7H409.2z"/>
      <path d="M458.6,273.9h-13.3v9.4h14.6l-0.5,3h-17.6v-26.7h17.4v3h-13.9v8.2h13.3V273.9z"/>
      <path d="M470.5,278.9c0.7,3.2,2.9,5,6.8,5c4.1,0,5.8-2,5.8-4.5c0-2.7-1.3-4.2-6.6-5.5c-6.3-1.5-8.5-3.7-8.5-7.4c0-4,2.9-7.2,8.9-7.2c6.4,0,9,3.7,9.4,7.2h-3.6c-0.5-2.3-2-4.3-5.9-4.3c-3.3,0-5.1,1.5-5.1,4c0,2.5,1.5,3.5,6.2,4.6c7.6,1.8,8.9,4.8,8.9,8.3c0,4.3-3.2,7.7-9.7,7.7c-6.7,0-9.6-3.7-10.2-7.8H470.5z"/>
      <path d="M497.9,278.9c0.7,3.2,2.9,5,6.8,5c4.1,0,5.8-2,5.8-4.5c0-2.7-1.3-4.2-6.6-5.5c-6.3-1.5-8.5-3.7-8.5-7.4c0-4,2.9-7.2,8.9-7.2c6.4,0,9,3.7,9.4,7.2h-3.6c-0.5-2.3-2-4.3-5.9-4.3c-3.3,0-5.1,1.5-5.1,4c0,2.5,1.5,3.5,6.2,4.6c7.6,1.8,8.9,4.8,8.9,8.3c0,4.3-3.2,7.7-9.7,7.7c-6.7,0-9.6-3.7-10.2-7.8H497.9z"/>
    </svg>
  );
};

// Piktogramm only (for TopBar)
const QuarterMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 580.1 294.1" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M327,66c2.1-5.1,3.1-10.5,3.1-16.3s-1.1-11.3-3.3-16.4c-2.2-5.1-5.2-9.6-9.1-13.5c-3.9-3.9-8.3-6.9-13.4-9.1
      c-5.1-2.2-10.5-3.3-16.3-3.3s-11.2,1.1-16.3,3.3c-5.1,2.2-9.6,5.2-13.5,9.1c-3.9,3.9-7,8.4-9.2,13.5c-2.2,5.1-3.3,10.6-3.3,16.4
      s1.1,11.2,3.3,16.3c2.2,5.1,5.3,9.5,9.2,13.4c3.9,3.9,8.4,6.9,13.5,9.1c5.1,2.2,10.5,3.3,16.3,3.3c6,0,11.6-1.1,16.7-3.3
      c2.4-1,4.7-2.2,6.8-3.7l5.2,6.3h8.9l-8.6-10.7c0.3-0.3,0.7-0.6,1-1C321.9,75.5,324.9,71,327,66z M312,73.9l-5.9-7.3
      c2.1-1,3.8-2.3,5.2-3.9c1.5-1.8,2.6-3.7,3.3-5.9c0.7-2.2,1-4.4,1-6.7c0-2.9-0.5-5.5-1.6-7.7c-0.5-1-1-1.9-1.6-2.7h8.3
      c1,3.2,1.5,6.6,1.5,10.1c0,4.6-0.9,9-2.7,13.1c-1.8,4.1-4.2,7.7-7.3,10.8C312.1,73.7,312,73.8,312,73.9z M275,80.9
      c-4.2-1.7-7.8-4.1-11-7.2c-3.2-3.1-5.7-6.7-7.5-10.8c-1.8-4.1-2.8-8.6-2.8-13.3c0-3.5,0.5-6.8,1.5-10H280v42.9
      C278.3,82.1,276.6,81.6,275,80.9z M301.7,40.7c1.4,0.7,2.5,1.6,3.4,2.6c0.9,1.1,1.5,2.2,1.9,3.5c0.4,1.2,0.6,2.5,0.6,3.6
      c0,1.1-0.2,2.3-0.6,3.6c-0.4,1.3-1,2.5-1.8,3.5c-0.8,1.1-2,2-3.5,2.7c-1.5,0.7-3.4,1-5.7,1h-8.3V39.6h8.9
      C298.6,39.6,300.3,40,301.7,40.7z M295.2,32.2H280h-21.4c1.5-2.4,3.2-4.6,5.2-6.6c3.1-3.1,6.8-5.5,10.9-7.3
      c4.2-1.8,8.6-2.7,13.3-2.7c4.8,0,9.2,0.9,13.3,2.7c4.1,1.8,7.7,4.2,10.8,7.3c2,2,3.7,4.2,5.2,6.6H295.2z M287.7,68.5h8.5
      c0.7,0,1.3,0,1.9-0.1l8.2,9.9c-1.5,1-3.2,1.8-4.9,2.5c-4.1,1.7-8.5,2.6-13.2,2.6c-0.2,0-0.3,0-0.5,0V68.5z"/>
  </svg>
);

const SEED_EXERCISES = [
  { id: "ex1", name: "Kniebeuge", category: "Kraft", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U", description: "Klassische Kniebeuge – Oberschenkel parallel zum Boden, Knie über den Zehen." },
  { id: "ex2", name: "Einbeinige Kniebeuge (Pistol)", category: "Kraft", videoUrl: "https://www.youtube.com/embed/vq5-vdgJc0I", description: "Einbeinige Kniebeuge zur Verbesserung der Asymmetrie und Stabilität." },
  { id: "ex3", name: "Nordic Hamstring Curl", category: "Exzentrik", videoUrl: "https://www.youtube.com/embed/0Cf7P32DLfA", description: "Exzentrisches Hamstringtraining – bewiesen zur Verletzungsprävention." },
  { id: "ex4", name: "Copenhagen Hip Adduktion", category: "Stabilität", videoUrl: "https://www.youtube.com/embed/Rm6yFGSIpM4", description: "Seitliche Hüftstabilisation für Adduktoren und Leistenkräftigung." },
  { id: "ex5", name: "Einbeiniger Deadlift", category: "Kraft", videoUrl: "https://www.youtube.com/embed/WKTKx0c3aok", description: "Hüftdominante Bewegung zur Kräftigung der Hüftstrecker und Verbesserung der Balance." },
  { id: "ex6", name: "Wadenheben", category: "Rehabilitation", videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI", description: "Konzentrisch-exzentrisches Wadenheben nach Alfredson-Protokoll." },
  { id: "ex7", name: "Glute Bridge", category: "Aktivierung", videoUrl: "https://www.youtube.com/embed/wPM8icPu6H8", description: "Gluteusaktivierung und lumbale Stabilisation." },
  { id: "ex8", name: "Side-lying Hip Abduktion", category: "Aktivierung", videoUrl: "https://www.youtube.com/embed/2aGiXJa0OJE", description: "Isolierte Abduktorenkräftigung in Seitlage." },
];

const SEED_THERAPISTS = [
  { id: "t1", name: "David", role: "Physiotherapeut", pin: "0000" },
];

const SEED_PATIENTS = [
  { id: "p1", name: "Max Muster", dob: "1990-03-15", diagnosis: "VKB-Rekonstruktion re.", pin: "1234" },
  { id: "p2", name: "Anna Beispiel", dob: "1985-07-22", diagnosis: "Patellatendinopathie li.", pin: "5678" },
];

const CATEGORIES = ["Kraft", "Exzentrik", "Stabilität", "Rehabilitation", "Aktivierung", "Mobility"];

function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(d) { return new Date(d).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }); }
function uid() { return Math.random().toString(36).slice(2, 9); }

async function load(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function save(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [therapistId, setTherapistId] = useState(null);
  const [exercises, setExercises] = useState(SEED_EXERCISES);
  const [patients, setPatients] = useState(SEED_PATIENTS);
  const [therapists, setTherapists] = useState(SEED_THERAPISTS);
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const ex = await load("qr_exercises"); if (ex) setExercises(ex);
      const pa = await load("qr_patients"); if (pa) setPatients(pa);
      const th = await load("qr_therapists"); if (th) setTherapists(th);
      const pl = await load("qr_plans"); if (pl) setPlans(pl);
      const lo = await load("qr_logs"); if (lo) setLogs(lo);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded) save("qr_exercises", exercises); }, [exercises, loaded]);
  useEffect(() => { if (loaded) save("qr_patients", patients); }, [patients, loaded]);
  useEffect(() => { if (loaded) save("qr_therapists", therapists); }, [therapists, loaded]);
  useEffect(() => { if (loaded) save("qr_plans", plans); }, [plans, loaded]);
  useEffect(() => { if (loaded) save("qr_logs", logs); }, [logs, loaded]);

  if (!loaded) return (
    <div style={{ background: BG, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'DM Sans',sans-serif" }}>Laden…</div>
  );

  const shared = { exercises, setExercises, patients, setPatients, therapists, setTherapists, plans, setPlans, logs, setLogs };
  const currentTherapist = therapists.find(t => t.id === therapistId);

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: BG, minHeight: "100vh", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${BG}}::-webkit-scrollbar-thumb{background:${BORDER};border-radius:2px}
        input,textarea,select,button{font-family:'DM Sans',sans-serif;}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      {mode === null && <HomeScreen setMode={setMode} />}
      {mode === "therapist" && !therapistId && (
        <TherapistPinLogin therapists={therapists} onSuccess={setTherapistId} onBack={() => setMode(null)} />
      )}
      {mode === "therapist" && therapistId && (
        <TherapistApp {...shared} currentTherapist={currentTherapist} onBack={() => { setMode(null); setTherapistId(null); }} />
      )}
      {mode === "patient" && <PatientApp {...shared} onBack={() => setMode(null)} />}
    </div>
  );
}

// ── Therapist PIN Login ────────────────────────────────────────────────────
function TherapistPinLogin({ therapists, onSuccess, onBack }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const r0 = useRef(null); const r1 = useRef(null); const r2 = useRef(null); const r3 = useRef(null);
  const refs = [r0, r1, r2, r3];

  function handleDigit(idx, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin]; next[idx] = val; setPin(next); setError(false);
    if (val && idx < 3) refs[idx + 1].current?.focus();
    if (next.every(d => d !== "")) {
      const match = therapists.find(t => t.pin === next.join(""));
      if (match) { onSuccess(match.id); }
      else { setError(true); setShake(true); setTimeout(() => { setShake(false); setPin(["","","",""]); refs[0].current?.focus(); }, 600); }
    }
  }
  function handleKeyDown(idx, e) { if (e.key === "Backspace" && !pin[idx] && idx > 0) refs[idx - 1].current?.focus(); }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar onBack={onBack} title="Therapeuten-Bereich" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, animation: "fadeIn .4s ease" }}>
        <div style={{ marginBottom: 32 }}><IconTherapist size={52} color={ACCENT} /></div>
        <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Therapeuten-Login</div>
        <div style={{ fontSize: 13, color: GRAY, marginBottom: 48, textAlign: "center", maxWidth: 260, lineHeight: 1.8 }}>
          Bitte gib deinen persönlichen<br />4-stelligen PIN-Code ein
        </div>
        <div style={{ display: "flex", gap: 16, animation: shake ? "shake .5s ease" : "none" }}>
          {pin.map((digit, i) => (
            <input key={i} ref={refs[i]} type="password" inputMode="numeric" maxLength={1} value={digit}
              onChange={e => handleDigit(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} autoFocus={i === 0}
              style={{ width: 64, height: 76, textAlign: "center", fontSize: 30, fontWeight: 800,
                background: error ? "#1e0909" : CARD,
                border: `2px solid ${error ? "#d94f4f" : digit ? ACCENT : BORDER}`,
                borderRadius: 14, color: error ? "#d94f4f" : "white", outline: "none", transition: "all .2s", caretColor: "transparent" }} />
          ))}
        </div>
        {error && <div style={{ marginTop: 20, color: "#d94f4f", fontSize: 13 }}>✕ Falscher PIN — bitte erneut versuchen</div>}
        <div style={{ marginTop: 56, fontSize: 11, color: GRAY, textAlign: "center", lineHeight: 1.9 }}>
          Nur für autorisierte Therapeuten<br />von Quarter of Rehab & Fitness.
        </div>
      </div>
    </div>
  );
}

// ── Mode Icons ─────────────────────────────────────────────────────────────
const IconTherapist = ({ size = 48, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Stethoscope outline */}
    <path d="M6 3a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2" />
    <path d="M6 3h1M16 3h1" />
    <path d="M12 13v2a5 5 0 0 0 5 5h0a3 3 0 0 0 3-3v-1" />
    <circle cx="20" cy="16" r="1.5" fill={color} stroke="none"/>
    <line x1="10" y1="3" x2="14" y2="3" />
  </svg>
);

const IconPatient = ({ size = 48, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Person + activity line */}
    <circle cx="12" cy="5" r="2.5" />
    <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    <path d="M3 13h3l2-3 2 5 2-2h3" strokeWidth="1.5" />
  </svg>
);

function HomeScreen({ setMode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, gap: 52 }}>
      <div style={{ textAlign: "center", animation: "fadeIn .5s ease" }}>
        <QuarterLogo height={80} />
      </div>
      <div style={{ fontSize: 12, color: GRAY, letterSpacing: 2, textTransform: "uppercase" }}>Bereich wählen</div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <ModeCard icon="therapist" title="Therapeut" sub="Übungen & Pläne verwalten" onClick={() => setMode("therapist")} accent />
        <ModeCard icon="patient" title="Patient" sub="Mein Plan & Fortschritt" onClick={() => setMode("patient")} />
      </div>
    </div>
  );
}

function ModeCard({ icon, title, sub, onClick, accent }) {
  const [hov, setHov] = useState(false);
  const iconColor = hov && accent ? "#000" : accent ? ACCENT : "white";
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? (accent ? ACCENT : LIGHTGRAY) : CARD, border: `1px solid ${accent && !hov ? ACCENT : BORDER}`, borderRadius: 16, padding: "36px 40px", width: 220, textAlign: "center", transition: "all .2s", color: hov && accent ? "#000" : "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: 16 }}>
        {icon === "therapist" ? <IconTherapist size={48} color={iconColor} /> : <IconPatient size={48} color={iconColor} />}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12, color: hov && accent ? "#333" : GRAY }}>{sub}</div>
    </button>
  );
}

function TherapistApp({ onBack, exercises, setExercises, patients, setPatients, therapists, setTherapists, plans, setPlans, logs, currentTherapist }) {
  const [tab, setTab] = useState("pool");
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar onBack={onBack} title="Therapeuten-Dashboard" sub={currentTherapist ? currentTherapist.name + " · " + currentTherapist.role : ""} />
      <TabBar tabs={[{ id: "pool", label: "Übungspool" }, { id: "patients", label: "Patienten" }, { id: "plans", label: "Pläne" }, { id: "team", label: "Team" }]} active={tab} setActive={setTab} />
      <div style={{ flex: 1, padding: "24px 20px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
        {tab === "pool" && <ExercisePool exercises={exercises} setExercises={setExercises} />}
        {tab === "patients" && <PatientManager patients={patients} setPatients={setPatients} logs={logs} plans={plans} />}
        {tab === "plans" && <PlanBuilder exercises={exercises} patients={patients} plans={plans} setPlans={setPlans} />}
        {tab === "team" && <TeamManager therapists={therapists} setTherapists={setTherapists} />}
      </div>
    </div>
  );
}

// ── Team Manager ───────────────────────────────────────────────────────────
function TeamManager({ therapists, setTherapists }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", pin: "" });
  const [pinError, setPinError] = useState("");

  function addTherapist() {
    if (!form.name.trim()) return;
    if (!/^\d{4}$/.test(form.pin)) { setPinError("PIN muss genau 4 Ziffern sein"); return; }
    if (therapists.find(t => t.pin === form.pin)) { setPinError("Dieser PIN ist bereits vergeben"); return; }
    setTherapists(prev => [...prev, { ...form, id: "t" + uid() }]);
    setForm({ name: "", role: "", pin: "" });
    setPinError(""); setAdding(false);
  }

  return (
    <div>
      <SectionHeader title="Team" count={therapists.length} action={<Btn accent onClick={() => setAdding(true)}>+ Therapeut</Btn>} />
      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12 }}>Neuer Therapeut</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Rolle (z.B. Physiotherapeut)" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
          </div>
          <div style={{ marginTop: 10 }}>
            <Input placeholder="PIN (4 Ziffern)" value={form.pin}
              onChange={e => { setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 4) })); setPinError(""); }} />
            {pinError && <div style={{ fontSize: 11, color: "#d94f4f", marginTop: 4 }}>{pinError}</div>}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn accent onClick={addTherapist}>Speichern</Btn>
            <Btn onClick={() => { setAdding(false); setPinError(""); }}>Abbrechen</Btn>
          </div>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {therapists.map(t => (
          <Card key={t.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ background: LIGHTGRAY, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconTherapist size={20} color={ACCENT} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  {t.role && <div style={{ fontSize: 12, color: GRAY }}>{t.role}</div>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: GRAY }}>PIN</div>
                  <div style={{ fontWeight: 800, color: "white", letterSpacing: 4, fontSize: 13 }}>{t.pin}</div>
                </div>
                {therapists.length > 1 && <SmallBtn onClick={() => setTherapists(prev => prev.filter(x => x.id !== t.id))}>✕</SmallBtn>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExercisePool({ exercises, setExercises }) {
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name: "", category: CATEGORIES[0], videoUrl: "", description: "" });
  const filtered = exercises.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()) || e.category.toLowerCase().includes(filter.toLowerCase()));

  function addExercise() {
    if (!form.name.trim()) return;
    setExercises(prev => [...prev, { ...form, id: "ex" + uid() }]);
    setForm({ name: "", category: CATEGORIES[0], videoUrl: "", description: "" });
    setAdding(false);
  }

  return (
    <div>
      <SectionHeader title="Übungspool" count={exercises.length} action={<Btn accent onClick={() => setAdding(true)}>+ Übung</Btn>} />
      <Input placeholder="Suchen…" value={filter} onChange={e => setFilter(e.target.value)} style={{ marginBottom: 16 }} />
      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12 }}>Neue Übung</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <Input placeholder="Video-URL (YouTube Embed, Vimeo, MP4…)" value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} style={{ marginTop: 10 }} />
          <TextArea placeholder="Beschreibung / Coaching-Cues" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Btn accent onClick={addExercise}>Speichern</Btn>
            <Btn onClick={() => setAdding(false)}>Abbrechen</Btn>
          </div>
        </Card>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {filtered.map(ex => <ExCard key={ex.id} ex={ex} onDelete={() => setExercises(prev => prev.filter(e => e.id !== ex.id))} />)}
      </div>
    </div>
  );
}

function ExCard({ ex, onDelete, selectable, selected, onSelect, phaseColor }) {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ cursor: selectable ? "pointer" : "default", border: selected ? `1px solid ${phaseColor || ACCENT}` : `1px solid ${BORDER}`, position: "relative" }}
      onClick={selectable ? onSelect : undefined}>
      {selected && phaseColor && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: phaseColor, borderRadius: "12px 12px 0 0" }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>
          <Tag>{ex.category}</Tag>
        </div>
        {!selectable && onDelete && <SmallBtn onClick={onDelete}>✕</SmallBtn>}
        {selected && <div style={{ color: phaseColor || ACCENT, fontSize: 16, fontWeight: 800 }}>✓</div>}
      </div>
      {ex.description && <div style={{ fontSize: 11, color: GRAY, marginTop: 5, lineHeight: 1.5 }}>{ex.description}</div>}
      {ex.videoUrl && (
        <button onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
          style={{ marginTop: 8, background: "none", border: `1px solid ${BORDER}`, color: GRAY, fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "pointer" }}>
          {open ? "▲ schließen" : "▶ Video"}
        </button>
      )}
      {open && ex.videoUrl && (
        <div style={{ marginTop: 8, borderRadius: 8, overflow: "hidden" }}>
          <iframe src={ex.videoUrl} width="100%" height="150" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={ex.name} />
        </div>
      )}
    </Card>
  );
}

function PatientManager({ patients, setPatients, logs, plans }) {
  const [form, setForm] = useState({ name: "", dob: "", diagnosis: "", pin: "" });
  const [adding, setAdding] = useState(false);
  const [pinError, setPinError] = useState("");

  function addPatient() {
    if (!form.name.trim()) return;
    if (!/^\d{4}$/.test(form.pin)) { setPinError("PIN muss genau 4 Ziffern sein"); return; }
    if (patients.find(p => p.pin === form.pin)) { setPinError("Dieser PIN ist bereits vergeben"); return; }
    setPatients(prev => [...prev, { ...form, id: "p" + uid() }]);
    setForm({ name: "", dob: "", diagnosis: "", pin: "" });
    setPinError(""); setAdding(false);
  }

  return (
    <div>
      <SectionHeader title="Patienten" count={patients.length} action={<Btn accent onClick={() => setAdding(true)}>+ Patient</Btn>} />
      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12 }}>Neuer Patient</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input type="date" value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} />
          </div>
          <Input placeholder="Diagnose" value={form.diagnosis} onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))} style={{ marginTop: 10 }} />
          <div style={{ marginTop: 10 }}>
            <Input placeholder="PIN (4 Ziffern)" value={form.pin}
              onChange={e => { setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 4) })); setPinError(""); }} />
            {pinError && <div style={{ fontSize: 11, color: "#d94f4f", marginTop: 4 }}>{pinError}</div>}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn accent onClick={addPatient}>Speichern</Btn>
            <Btn onClick={() => { setAdding(false); setPinError(""); }}>Abbrechen</Btn>
          </div>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {patients.map(p => {
          const pLogs = logs.filter(l => l.patientId === p.id);
          const pPlans = plans.filter(pl => pl.patientId === p.id);
          return (
            <Card key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  {p.dob && <div style={{ fontSize: 12, color: GRAY }}>*{formatDate(p.dob)}</div>}
                  {p.diagnosis && <div style={{ fontSize: 12, color: GRAY }}>{p.diagnosis}</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: GRAY }}>{pPlans.length} Plan(e)</div>
                  <div style={{ fontSize: 12, color: ACCENT }}>{pLogs.length} Sets dokumentiert</div>
                  <div style={{ marginTop: 4, fontSize: 11, color: GRAY }}>PIN: <span style={{ fontWeight: 800, color: "white", letterSpacing: 4, fontSize: 13 }}>{p.pin || "—"}</span></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const DEFAULT_PHASES = () => [
  { id: uid(), name: "Aufwärmen", color: PHASE_COLORS[2], items: [] },
  { id: uid(), name: "Hauptteil", color: PHASE_COLORS[0], items: [] },
  { id: uid(), name: "Cool-down", color: PHASE_COLORS[1], items: [] },
];

function PlanBuilder({ exercises, patients, plans, setPlans }) {
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ patientId: patients[0]?.id || "", title: "", phases: DEFAULT_PHASES() });
  const [activePhaseId, setActivePhaseId] = useState(null);
  const [pickingFor, setPickingFor] = useState(null);

  function initForm(base) {
    const f = base || { patientId: patients[0]?.id || "", title: "", phases: DEFAULT_PHASES() };
    setForm(f); setActivePhaseId(f.phases[0]?.id || null); setPickingFor(null);
  }
  function addPhase() {
    const p = { id: uid(), name: "Neue Phase", color: PHASE_COLORS[form.phases.length % PHASE_COLORS.length], items: [] };
    setForm(f => ({ ...f, phases: [...f.phases, p] })); setActivePhaseId(p.id);
  }
  function updatePhaseName(pid, name) { setForm(f => ({ ...f, phases: f.phases.map(p => p.id === pid ? { ...p, name } : p) })); }
  function updatePhaseColor(pid, color) { setForm(f => ({ ...f, phases: f.phases.map(p => p.id === pid ? { ...p, color } : p) })); }
  function deletePhase(pid) {
    setForm(f => ({ ...f, phases: f.phases.filter(p => p.id !== pid) }));
    setActivePhaseId(form.phases.find(p => p.id !== pid)?.id || null);
  }
  function toggleExercise(phaseId, exId) {
    setForm(f => ({ ...f, phases: f.phases.map(p => {
      if (p.id !== phaseId) return p;
      const exists = p.items.find(i => i.exerciseId === exId);
      if (exists) return { ...p, items: p.items.filter(i => i.exerciseId !== exId) };
      return { ...p, items: [...p.items, { exerciseId: exId, sets: 3, reps: 10, frequency: "3x/Woche" }] };
    })}));
  }
  function updateItem(phaseId, exId, field, val) {
    setForm(f => ({ ...f, phases: f.phases.map(p => p.id !== phaseId ? p : { ...p, items: p.items.map(i => i.exerciseId === exId ? { ...i, [field]: val } : i) }) }));
  }
  function removeItem(phaseId, exId) {
    setForm(f => ({ ...f, phases: f.phases.map(p => p.id !== phaseId ? p : { ...p, items: p.items.filter(i => i.exerciseId !== exId) }) }));
  }
  function savePlan() {
    if (!form.title.trim() || !form.patientId) return;
    if (editId) { setPlans(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p)); }
    else { setPlans(prev => [...prev, { ...form, id: "plan" + uid(), createdAt: today() }]); }
    setCreating(false); setEditId(null);
  }
  function editPlan(plan) { initForm({ ...plan, phases: plan.phases || DEFAULT_PHASES() }); setEditId(plan.id); setCreating(true); }

  const activePhase = form.phases.find(p => p.id === activePhaseId);
  const totalItems = form.phases.reduce((a, p) => a + p.items.length, 0);

  return (
    <div>
      <SectionHeader title="Trainingspläne" count={plans.length} action={<Btn accent onClick={() => { initForm(null); setEditId(null); setCreating(true); }}>+ Neuer Plan</Btn>} />
      {creating && (
        <Card style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 16 }}>{editId ? "Plan bearbeiten" : "Neuer Trainingsplan"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            <Input placeholder="Plantitel" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <Select value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))}>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
          </div>
          <div style={{ fontSize: 11, color: GRAY, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Phasen</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
            {form.phases.map(phase => (
              <button key={phase.id} onClick={() => { setActivePhaseId(phase.id); setPickingFor(null); }}
                style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${phase.id === activePhaseId ? phase.color : BORDER}`, background: phase.id === activePhaseId ? phase.color + "22" : CARD, color: phase.id === activePhaseId ? phase.color : GRAY, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, display: "inline-block" }} />
                {phase.name} {phase.items.length > 0 && <span style={{ opacity: .6, fontSize: 10 }}>({phase.items.length})</span>}
              </button>
            ))}
            <SmallBtn onClick={addPhase}>+ Phase</SmallBtn>
          </div>
          {activePhase && (
            <div style={{ background: "#0f0f0f", borderRadius: 12, padding: 16, border: `1px solid ${activePhase.color}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <input value={activePhase.name} onChange={e => updatePhaseName(activePhase.id, e.target.value)}
                  style={{ background: LIGHTGRAY, border: `1px solid ${BORDER}`, color: "white", borderRadius: 8, padding: "6px 12px", fontSize: 14, fontWeight: 700, outline: "none", flex: 1, minWidth: 120 }} />
                <div style={{ display: "flex", gap: 6 }}>
                  {PHASE_COLORS.map(c => (
                    <button key={c} onClick={() => updatePhaseColor(activePhase.id, c)}
                      style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: activePhase.color === c ? "2px solid white" : "2px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
                {form.phases.length > 1 && <SmallBtn onClick={() => deletePhase(activePhase.id)}>Phase löschen</SmallBtn>}
              </div>
              {activePhase.items.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: GRAY, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Übungen in dieser Phase</div>
                  {activePhase.items.map(item => {
                    const ex = exercises.find(e => e.id === item.exerciseId);
                    return (
                      <div key={item.exerciseId} style={{ background: LIGHTGRAY, borderRadius: 8, padding: "10px 14px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", borderLeft: `3px solid ${activePhase.color}` }}>
                        <div style={{ fontSize: 13, fontWeight: 600, flex: 1, minWidth: 120 }}>{ex?.name}</div>
                        <label style={{ fontSize: 11, color: GRAY }}>Sätze<br /><SmallInput type="number" value={item.sets} onChange={e => updateItem(activePhase.id, item.exerciseId, "sets", e.target.value)} /></label>
                        <label style={{ fontSize: 11, color: GRAY }}>Wdh.<br /><SmallInput type="number" value={item.reps} onChange={e => updateItem(activePhase.id, item.exerciseId, "reps", e.target.value)} /></label>
                        <label style={{ fontSize: 11, color: GRAY }}>Frequenz<br /><SmallInput value={item.frequency} onChange={e => updateItem(activePhase.id, item.exerciseId, "frequency", e.target.value)} style={{ width: 90 }} /></label>
                        <SmallBtn onClick={() => removeItem(activePhase.id, item.exerciseId)}>✕</SmallBtn>
                      </div>
                    );
                  })}
                </div>
              )}
              <button onClick={() => setPickingFor(pickingFor === activePhase.id ? null : activePhase.id)}
                style={{ background: pickingFor === activePhase.id ? activePhase.color + "22" : LIGHTGRAY, border: `1px solid ${pickingFor === activePhase.id ? activePhase.color : BORDER}`, color: pickingFor === activePhase.id ? activePhase.color : GRAY, borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {pickingFor === activePhase.id ? "▲ Auswahl schließen" : "+ Übungen hinzufügen"}
              </button>
              {pickingFor === activePhase.id && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: GRAY, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Klicke zum Hinzufügen / Entfernen</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                    {exercises.map(ex => <ExCard key={ex.id} ex={ex} selectable selected={!!activePhase.items.find(i => i.exerciseId === ex.id)} phaseColor={activePhase.color} onSelect={() => toggleExercise(activePhase.id, ex.id)} />)}
                  </div>
                </div>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center" }}>
            <Btn accent onClick={savePlan}>{editId ? "Aktualisieren" : "Plan erstellen"}</Btn>
            <Btn onClick={() => { setCreating(false); setEditId(null); }}>Abbrechen</Btn>
            {totalItems > 0 && <span style={{ fontSize: 12, color: GRAY, marginLeft: 8 }}>{totalItems} Übung(en) in {form.phases.filter(p => p.items.length > 0).length} Phase(n)</span>}
          </div>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {plans.map(plan => {
          const patient = patients.find(p => p.id === plan.patientId);
          const phases = plan.phases || [];
          const total = phases.reduce((a, p) => a + p.items.length, 0);
          return (
            <Card key={plan.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{plan.title}</div>
                  <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{patient?.name} · {total} Übung(en) · {phases.length} Phase(n){plan.createdAt ? ` · ${formatDate(plan.createdAt)}` : ""}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <SmallBtn onClick={() => editPlan(plan)}>✎</SmallBtn>
                  <SmallBtn onClick={() => setPlans(prev => prev.filter(p => p.id !== plan.id))}>✕</SmallBtn>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {phases.map(phase => (
                  <span key={phase.id} style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: phase.color + "22", color: phase.color, border: `1px solid ${phase.color}44` }}>
                    {phase.name} ({phase.items.length})
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function PatientApp({ onBack, patients, exercises, plans, logs, setLogs }) {
  const [patientId, setPatientId] = useState(null);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const r0 = useRef(null); const r1 = useRef(null); const r2 = useRef(null); const r3 = useRef(null);
  const refs = [r0, r1, r2, r3];

  function handleDigit(idx, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin]; next[idx] = val; setPin(next); setError(false);
    if (val && idx < 3) refs[idx + 1].current?.focus();
    if (next.every(d => d !== "")) {
      const match = patients.find(p => p.pin === next.join(""));
      if (match) { setPatientId(match.id); }
      else { setError(true); setShake(true); setTimeout(() => { setShake(false); setPin(["","","",""]); refs[0].current?.focus(); }, 600); }
    }
  }
  function handleKeyDown(idx, e) { if (e.key === "Backspace" && !pin[idx] && idx > 0) refs[idx - 1].current?.focus(); }

  if (!patientId) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar onBack={onBack} title="Patienten-Bereich" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, animation: "fadeIn .4s ease" }}>
        <QuarterLogo height={56} />
        <div style={{ marginTop: 40, fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Willkommen</div>
        <div style={{ fontSize: 13, color: GRAY, marginBottom: 48, textAlign: "center", maxWidth: 260, lineHeight: 1.8 }}>Bitte gib deinen persönlichen<br />4-stelligen PIN-Code ein</div>
        <div style={{ display: "flex", gap: 16, animation: shake ? "shake .5s ease" : "none" }}>
          {pin.map((digit, i) => (
            <input key={i} ref={refs[i]} type="password" inputMode="numeric" maxLength={1} value={digit}
              onChange={e => handleDigit(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} autoFocus={i === 0}
              style={{ width: 64, height: 76, textAlign: "center", fontSize: 30, fontWeight: 800, background: error ? "#1e0909" : CARD, border: `2px solid ${error ? "#d94f4f" : digit ? ACCENT : BORDER}`, borderRadius: 14, color: error ? "#d94f4f" : "white", outline: "none", transition: "all .2s", caretColor: "transparent" }} />
          ))}
        </div>
        {error && <div style={{ marginTop: 20, color: "#d94f4f", fontSize: 13 }}>✕ Falscher PIN — bitte erneut versuchen</div>}
        <div style={{ marginTop: 56, fontSize: 11, color: GRAY, textAlign: "center", lineHeight: 1.9 }}>Deinen persönlichen PIN erhältst du<br />von deinem Therapeuten bei Quarter.</div>
      </div>
    </div>
  );

  const patient = patients.find(p => p.id === patientId);
  const myPlans = plans.filter(pl => pl.patientId === patientId);
  const myLogs = logs.filter(l => l.patientId === patientId);
  return <PatientDashboard patient={patient} myPlans={myPlans} exercises={exercises} logs={myLogs} setLogs={setLogs}
    onBack={() => { setPatientId(null); setPin(["","","",""]); setError(false); }} />;
}

function PatientDashboard({ patient, myPlans, exercises, logs, setLogs, onBack }) {
  const [tab, setTab] = useState("plan");
  const [selectedPlanId, setSelectedPlanId] = useState(myPlans[0]?.id || null);
  const plan = myPlans.find(p => p.id === selectedPlanId);
  const todayLogs = logs.filter(l => l.date === today());
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekLogs = logs.filter(l => new Date(l.date) >= weekStart);

  function logSet(planId, phaseId, exerciseId) {
    setLogs(prev => [...prev, { id: "log" + uid(), planId, phaseId, exerciseId, patientId: patient.id, date: today(), ts: Date.now() }]);
  }
  function undoLast(planId, exerciseId) {
    setLogs(prev => {
      const idx = [...prev].reverse().findIndex(l => l.planId === planId && l.exerciseId === exerciseId && l.date === today());
      if (idx === -1) return prev;
      return prev.filter((_, i) => i !== prev.length - 1 - idx);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar onBack={onBack} title={patient?.name || "Patient"} sub={patient?.diagnosis} />
      <TabBar tabs={[{ id: "plan", label: "Mein Plan" }, { id: "log", label: "Verlauf" }]} active={tab} setActive={setTab} />
      <div style={{ flex: 1, padding: "24px 20px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        {tab === "plan" && (
          <>
            {myPlans.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: GRAY, textTransform: "uppercase", letterSpacing: 1 }}>Plan:</div>
                {myPlans.map(pl => (
                  <button key={pl.id} onClick={() => setSelectedPlanId(pl.id)}
                    style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${pl.id === selectedPlanId ? ACCENT : BORDER}`, background: pl.id === selectedPlanId ? ACCENT : CARD, color: pl.id === selectedPlanId ? "#000" : "white", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                    {pl.title}
                  </button>
                ))}
              </div>
            )}
            {plan ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                  <StatCard label="Heute" value={todayLogs.filter(l => l.planId === plan.id).length} unit="Sets" />
                  <StatCard label="Diese Woche" value={weekLogs.filter(l => l.planId === plan.id).length} unit="Sets" accent />
                </div>
                {(plan.phases || []).map(phase => (
                  <div key={phase.id} style={{ marginBottom: 28 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: phase.color }} />
                      <div style={{ fontWeight: 700, fontSize: 15, color: phase.color }}>{phase.name}</div>
                      <div style={{ fontSize: 12, color: GRAY }}>{phase.items.length} Übung(en)</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {phase.items.map(item => {
                        const ex = exercises.find(e => e.id === item.exerciseId);
                        if (!ex) return null;
                        const doneSets = logs.filter(l => l.planId === plan.id && l.exerciseId === item.exerciseId && l.date === today()).length;
                        return <ExerciseLogCard key={item.exerciseId} ex={ex} item={item} doneSets={doneSets} phaseColor={phase.color}
                          onLog={() => logSet(plan.id, phase.id, item.exerciseId)} onUndo={() => undoLast(plan.id, item.exerciseId)} />;
                      })}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ color: GRAY, fontSize: 13, marginTop: 40, textAlign: "center", lineHeight: 1.8 }}>Noch kein Trainingsplan zugewiesen.<br />Bitte deinen Therapeuten kontaktieren.</div>
            )}
          </>
        )}
        {tab === "log" && <LogHistory logs={logs} exercises={exercises} />}
      </div>
    </div>
  );
}

function ExerciseLogCard({ ex, item, doneSets, onLog, onUndo, phaseColor }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const color = phaseColor || ACCENT;
  const total = parseInt(item.sets) || 3;
  const progress = Math.min(doneSets / total, 1);
  const done = doneSets >= total;
  return (
    <Card style={{ border: done ? `1px solid ${color}` : `1px solid ${BORDER}`, borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
            {done && <span style={{ color }}>✓</span>}{ex.name}
          </div>
          <div style={{ fontSize: 12, color: GRAY, marginTop: 3 }}>{item.sets} Sätze · {item.reps} Wdh. · {item.frequency}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {ex.videoUrl && <SmallBtn onClick={() => setVideoOpen(o => !o)}>{videoOpen ? "▲" : "▶"}</SmallBtn>}
          <SmallBtn onClick={onUndo} title="Rückgängig">↩</SmallBtn>
          <button onClick={onLog} style={{ background: done ? LIGHTGRAY : color, color: done ? GRAY : "#000", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: done ? "default" : "pointer", transition: "all .15s" }}>Set ✓</button>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: GRAY }}>Heute: {doneSets} / {total} Sätze</span>
          <span style={{ fontSize: 11, color: done ? color : GRAY }}>{done ? "Erledigt 🎉" : `${total - doneSets} verbleibend`}</span>
        </div>
        <div style={{ height: 4, background: LIGHTGRAY, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: color, transition: "width .3s" }} />
        </div>
      </div>
      {videoOpen && ex.videoUrl && (
        <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}>
          <iframe src={ex.videoUrl} width="100%" height="220" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={ex.name} />
        </div>
      )}
      {ex.description && <div style={{ marginTop: 8, fontSize: 12, color: GRAY, lineHeight: 1.6, borderTop: `1px solid ${BORDER}`, paddingTop: 8 }}>{ex.description}</div>}
    </Card>
  );
}

function LogHistory({ logs, exercises }) {
  const grouped = {};
  logs.forEach(l => { if (!grouped[l.date]) grouped[l.date] = []; grouped[l.date].push(l); });
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  return (
    <div>
      <SectionHeader title="Trainingsverlauf" count={`${logs.length} Einheiten`} />
      {dates.length === 0 && <div style={{ color: GRAY, fontSize: 13, textAlign: "center", marginTop: 40 }}>Noch keine Einheiten dokumentiert.</div>}
      {dates.map(date => {
        const exMap = {};
        grouped[date].forEach(l => { if (!exMap[l.exerciseId]) exMap[l.exerciseId] = 0; exMap[l.exerciseId]++; });
        return (
          <div key={date} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: GRAY, marginBottom: 8 }}>{formatDate(date)}</div>
            <Card>
              {Object.entries(exMap).map(([exId, count], i, arr) => {
                const ex = exercises.find(e => e.id === exId);
                return (
                  <div key={exId} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <span style={{ fontSize: 13 }}>{ex?.name || "Übung"}</span>
                    <span style={{ fontSize: 13, color: ACCENT, fontWeight: 700 }}>{count} Set{count > 1 ? "s" : ""}</span>
                  </div>
                );
              })}
            </Card>
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ onBack, title, sub }) {
  return (
    <div style={{ padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 14, background: "#0f0f0f", position: "sticky", top: 0, zIndex: 10 }}>
      <QuarterMark size={36} />
      <button onClick={onBack} style={{ background: "none", border: "none", color: GRAY, fontSize: 20, cursor: "pointer", lineHeight: 1, padding: "0 4px" }}>←</button>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: GRAY }}>{sub}</div>}
      </div>
    </div>
  );
}
function TabBar({ tabs, active, setActive }) {
  return (
    <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, background: "#0f0f0f" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActive(t.id)}
          style={{ flex: 1, padding: "14px 8px", border: "none", background: "none", color: active === t.id ? ACCENT : GRAY, fontWeight: active === t.id ? 700 : 400, fontSize: 13, cursor: "pointer", borderBottom: active === t.id ? `2px solid ${ACCENT}` : "2px solid transparent", transition: "all .15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
function Card({ children, style, onClick }) {
  return <div onClick={onClick} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", ...style }}>{children}</div>;
}
function SectionHeader({ title, count, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 18 }}>{title}</span>
        {count !== undefined && <span style={{ fontSize: 12, color: GRAY }}>({count})</span>}
      </div>
      {action}
    </div>
  );
}
function Tag({ children }) {
  return <span style={{ display: "inline-block", background: LIGHTGRAY, color: GRAY, fontSize: 10, padding: "2px 8px", borderRadius: 20, marginTop: 4, marginRight: 4 }}>{children}</span>;
}
function StatCard({ label, value, unit, accent }) {
  return (
    <div style={{ background: accent ? `${ACCENT}15` : CARD, border: `1px solid ${accent ? ACCENT : BORDER}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
      <div style={{ fontSize: 30, fontWeight: 800, color: accent ? ACCENT : "white" }}>{value}</div>
      <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 1 }}>{unit}</div>
      <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>{label}</div>
    </div>
  );
}
function Btn({ children, onClick, accent, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${accent ? ACCENT : BORDER}`, background: hov ? (accent ? ACCENT : LIGHTGRAY) : (accent ? `${ACCENT}18` : CARD), color: hov && accent ? "#000" : accent ? ACCENT : "white", fontWeight: 600, fontSize: 13, transition: "all .15s", cursor: "pointer", ...style }}>
      {children}
    </button>
  );
}
function SmallBtn({ children, onClick, title }) {
  return <button onClick={onClick} title={title} style={{ background: LIGHTGRAY, border: "none", color: GRAY, borderRadius: 6, padding: "4px 9px", fontSize: 12, cursor: "pointer" }}>{children}</button>;
}
function Input({ placeholder, value, onChange, type = "text", style }) {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{ background: LIGHTGRAY, border: `1px solid ${BORDER}`, color: "white", borderRadius: 8, padding: "8px 12px", fontSize: 13, width: "100%", outline: "none", ...style }} />;
}
function SmallInput({ value, onChange, type = "text", style }) {
  return <input type={type} value={value} onChange={onChange}
    style={{ background: "#1e1e1e", border: `1px solid ${BORDER}`, color: "white", borderRadius: 6, padding: "4px 8px", fontSize: 12, width: 52, marginTop: 2, outline: "none", ...style }} />;
}
function TextArea({ placeholder, value, onChange }) {
  return <textarea placeholder={placeholder} value={value} onChange={onChange} rows={3}
    style={{ background: LIGHTGRAY, border: `1px solid ${BORDER}`, color: "white", borderRadius: 8, padding: "8px 12px", fontSize: 13, width: "100%", resize: "vertical", marginTop: 10, outline: "none" }} />;
}
function Select({ value, onChange, children }) {
  return <select value={value} onChange={onChange}
    style={{ background: LIGHTGRAY, border: `1px solid ${BORDER}`, color: "white", borderRadius: 8, padding: "8px 12px", fontSize: 13, width: "100%", outline: "none" }}>{children}</select>;
}
