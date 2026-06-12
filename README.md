# Premium Facial Analysis Dashboard

A high-performance, pixel-precise frontend implementation built with **Next.js**, **TypeScript**, and **SCSS Modules**. This application bridges complex motion design and data-driven visualization to create an immersive, responsive biometric assessment interface.

This repository represents the core 3 sections of the premium dashboard experience, engineered with a strict focus on component encapsulation, performance, and future scalability.

## PREVIEW LINK:  [🔗Vercel Link](https://app-qoves-test-nextjs.vercel.app/)

---

## 🚀 Key Features & Engineering Highlights

### 1. Section 1: Synchronized Dual-Comet Loop
* **The Motion:** A static 1px base line track traced by two independent 1.5px fading comets led by a 6x6px rounded head traveling clockwise.
* **The Solution:** Built using **GSAP** and its `MotionPathPlugin`. Instead of separate complex math loops, both comets instantiate off a single timeline constructor. Advancing the second comet's initial timeline `.progress()` to exactly `0.5` permanently locks them half a track length apart, ensuring they never drift out of alignment over infinite cycles.

### 2. Section 2: Biometric Analytics Grid
* **Volume Bell Curve:** Rendered smoothly using **Recharts** `<AreaChart>` with custom inline linear SVG gradient masks.
* **Data-Driven Architecture:** Charts like the *Matrix Grid* and *Melanin Spectrum* are decoupled from their layout styles. The matrix maps coordinates based on an `(X, Y)` distance formula, and the melanin chart maps over a discrete array of hex values. This makes them fully prepared to plug directly into a live database API.
* **Responsive Layer Shifting (768px Breakpoint):** On mobile and tablet, the cards compress tightly behind the subject. A strategic media query scales the central profile image and bumps it to `z-index: 20` while dropping the glass cards to `z-index: 10`. This allows the subject's hair and shoulders to naturally mask the borders of the glass modules, preserving visual depth.
* **Advanced Edge Blurring:** The left and right edges feature a feathered, hardware-accelerated blur overlay using CSS `backdrop-filter` combined with a linear `mask-image` mask gradient to keep the center completely crisp.

### 3. Section 3: Glassmorphic FAQ System
* **Two-Tier Interaction:** Main categories act as dynamic white tabs that cleanly transform into deep, slate-grey frosted glass containers when clicked.
* **Nested Accordions:** Inside an active category, clicking individual queries smoothly expands the bounding box to reveal the answer text using custom `cubic-bezier` transitions and precise typography weights to ensure optimum readability.

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** Next.js (App Router architecture)
* **Language:** TypeScript (Strict type interfaces)
* **Styling:** Sass / SCSS Modules (Scoped boundaries)
* **Animation Engine:** GSAP (GreenSock) + MotionPathPlugin + ScrollTrigger
* **Data Graphics:** Recharts

---

## 🏛️ Directory Architecture

This codebase embraces strict **Component Colocation**. Every presentation card or layout section lives inside its own dedicated directory alongside its uniquely scoped style sheet. This makes files incredibly easy to hunt down, isolates style boundaries, and makes components modular enough for instant deletion without leaving dead code behind.

```text
├── app/
│   ├── fonts/             # Local optimized custom .woff2 files
│   ├── globals.scss       # Global CSS token variables
│   ├── layout.tsx         # Root document layout wrapping
│   └── page.tsx           # Dashboard main entry point
├── components/
│   ├── charts/            # Encapsulated presenting modules
│   │   ├── BellCurveChart/
│   │   │   ├── BellCurveChart.tsx
│   │   │   └── BellCurveChart.module.scss
│   │   ├── MatrixChart/
│   │   │   ├── MatrixChart.tsx
│   │   │   └── MatrixChart.module.scss
│   │   └── ...
│   └── sections/          # Page structural section viewports
│       ├── FAQs/
│       │   ├── FAQs.tsx
│       │   └── FAQs.module.scss
│       └── ...
├── hooks/                 # Custom global React hooks (e.g., useAnimations.ts)
├── models/                # Static TypeScript type safety blueprints
├── public/assets/         # High-resolution image and mask assets
└── utils/                 # Layout math constants and path coordinates

```

## 🏁 Getting Started
* 1. Clone the repository
Bash
```
git clone https://github.com/isteppu/app-qoves-test-nextjs.git
cd your-repo-name
```
* 2. Install dependencies
Bash

```
npm install
# or
yarn install
```

* 3. Run the development server
Bash

```
npm run dev
# or
yarn dev
```
Open http://localhost:5120 with your browser to see the live rendering.

---

## 🔮 Scalability & Future Extensibility

Every metric, text label, coordinate mapping, and accordion query is driven by decoupled data constants (utils/constants.ts or local state arrays). If this application needs to be connected to a live production database backend tomorrow, a developer simply needs to swap the static hooks for an API fetch response. The UI will adapt, reposition, and re-animate automatically based on the incoming data model.