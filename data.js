/*
  ✏️  EDIT THIS FILE to make the portfolio yours.
  Everything on the site is generated from this object — you never need to touch index.html.
  Filled from github.com/mehrshadnava and linkedin.com/in/mehrshad-nava. Anything marked "sample" is still placeholder.
  Text fields may contain simple HTML (e.g. <b>, <a>).
*/
window.PORTFOLIO = {
  name: "Mehrshad Nava",
  initials: "MN",
  role: "Product Associate at Yotta & full-stack developer",
  tagline: "I build efficient, scalable web apps with React, Node.js, MongoDB and APIs, co-founded a herbal hair-colour brand, and I'm always learning. This is the story so far.",
  email: "", // leave empty to send the "Say hi" buttons to LinkedIn instead

  // How the doodle "you" looks in every scene.
  // hairStyle: "swept" | "short" | "curly" | "long" | "bun" | "buzz" | "none"
  look: {
    skin: "#f7d9c4",
    hair: "#2b1e17",
    hairStyle: "swept",
    stubble: true,
    beard: false,
    glasses: false,
    shirt: "#ffffff",
    pants: "#3b4a6b",
    lanyard: "#4a74d4", // set to "" to remove
  },

  // Speech bubble lines — click the character in the prologue to cycle through them.
  speech: [
    "Hey, I'm Mehrshad! 👋",
    "Easy, I'm debugging here.",
    "Psst… try ↑ ↑ ↓ ↓ ← → ← → B A",
    "Alright, scroll down. Let's go.",
  ],

  // Handwritten notes scribbled in the margins of each chapter.
  notes: {
    hero: "that's me!",
    work: "coffee count: classified ☕",
    projects: "#5 exists because the projector's remote was terrible",
    achievements: "SIH taught me how long 24 hours really is",
    hobbies: "leg day is not optional",
    contact: "I reply faster than my CI pipeline",
  },

  socials: [
    { label: "GitHub", url: "https://github.com/mehrshadnava" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mehrshad-nava/" },
  ],

  // Chapter 01 — Origin
  origin: {
    story:
      "My journey began in 2021 with a diploma in Computer Science at K J Somaiya Polytechnic, and grew into a Computer Engineering degree at KJ Somaiya College of Engineering. Along the way I took on three internships, co-founded a herbal hair-colour brand, competed in national hackathons and kept shipping side projects.",
    // Shown after the story in big marker type with an orange underline.
    highlight: "Today, I help build India's sovereign cloud at Yotta.",
    facts: [
      ["Based in", "Mumbai, India"],
      ["Currently", "Product Associate @ Yotta"],
      ["Studied", "Computer Engineering, KJ Somaiya"],
      ["Favourite stack", "React · Node.js · MongoDB · Python"],
    ],
  },

  // Chapter 02 — Work, newest first.
  work: [
    {
      period: "Jul 2026 — Present",
      role: "Product Associate",
      company: "Yotta Data Services · Mumbai",
      summary: "Graduate Engineering Trainee working on Yntraa, Yotta's sovereign, MeitY-empanelled cloud hosted in India's Tier-IV data centres.",
      highlights: [
        "Joined through Yotta Catalyst 5.0, the campus hiring programme",
        "Work across Yntraa Compute: VMs, bare metal, managed Kubernetes, serverless and GPU workstations",
      ],
      stack: ["Cloud", "Product", "TypeScript", "React"],
    },
    {
      period: "Side venture",
      role: "Co-founder",
      company: "AyurKesha · ayurkesha.com",
      summary: "An Indian herbal hair-colour brand: henna blended with eight Ayurvedic herbs. “From leaves, not from labs.”",
      highlights: ["Co-founded the brand and its online store"],
      stack: ["E-commerce", "D2C", "Branding"],
    },
    {
      period: "Feb 2026 — Jul 2026",
      role: "Intern",
      company: "Godrej & Boyce Mfg. Co.",
      summary: "Came back for a second, full-time internship.",
      highlights: ["Data and reporting work with Python and Microsoft Power BI"],
      stack: ["Python", "Power BI"],
    },
    {
      period: "May 2025 — Jul 2025",
      role: "Intern",
      company: "Infotech Financials",
      summary: "Python and databases in the world of stock-market data.",
      highlights: ["Worked on data-science problems with Python and databases"],
      stack: ["Python", "Databases", "Data Science"],
    },
    {
      period: "May 2024 — Jul 2024",
      role: "Intern",
      company: "Godrej & Boyce Mfg. Co. · Mumbai",
      summary: "My first look inside a large company, rotating across divisions.",
      highlights: [
        "Built web-scraping projects and automated PDF reading with Python",
        "Automated workflows with Power Apps and Power Automate",
        "Built a front-sheet automation project",
      ],
      stack: ["Python", "Power Apps", "Power Automate", "Power BI"],
    },
  ],

  // Chapter 03 — Projects: each becomes a card that flips. color = sticky-note colour.
  projects: [
    {
      title: "Little Stitch Studio",
      kicker: "Small business · 2026",
      description:
        "Website for a small business selling hand-knitted scarves made to order. Customers design their scarf in the browser and see a live preview as they choose.",
      stack: ["Web", "Live preview", "Small business"],
      links: [{ label: "Code", url: "https://github.com/mehrshadnava/projectshawl" }],
      color: "#ffc59e",
    },
    {
      title: "AyurKesha platform",
      kicker: "E-commerce · Co-founder",
      description:
        "Storefront, checkout, order management, delivery and after-sales in one Next.js app. Razorpay payments and refunds, Shiprocket shipping and live tracking, GST invoices.",
      stack: ["Next.js", "Postgres", "Razorpay", "Shiprocket"],
      links: [{ label: "Live store", url: "https://ayurkesha.com" }],
      color: "#c5cba0",
    },
    {
      title: "NavaGator",
      kicker: "Enterprise tool · 2026",
      description: "An enterprise project tracker for keeping projects on course, with Excel import and export built in.",
      stack: ["React 19", "Vite", "Tailwind CSS", "ExcelJS"],
      links: [{ label: "Code", url: "https://github.com/mehrshadnava/NavaGator" }],
      color: "#e9d4a7",
    },
    {
      title: "DRAUPADI",
      kicker: "Smart India Hackathon · 2024",
      description:
        "A framework for Defence, Resilience, Assurance, Unity, Protection, Awareness, Diligence and Integrity, built around real-time person detection and gender recognition from camera feeds.",
      stack: ["Python", "YOLOv5", "Computer vision", "Docker"],
      links: [{ label: "Code", url: "https://github.com/mehrshadnava/DRAUPADI" }],
      color: "#d6bf98",
    },
    {
      title: "Projector Remote",
      kicker: "Android · 2026",
      description:
        "Turns your phone into a Bluetooth remote, trackpad and keyboard for a cheap Android projector, plus a lamp-off mode and real 4-corner keystone correction the stock firmware hides.",
      stack: ["Java", "Android", "Bluetooth HID"],
      links: [{ label: "Code", url: "https://github.com/mehrshadnava/Projector-remote" }],
      color: "#ffc59e",
    },
  ],

  // Chapter 04 — Achievements
  achievements: {
    stats: [
      { value: 3, label: "Internships" },
      { value: 1, label: "Brand co-founded" },
      { value: 25, label: "Public repos" },
      { value: 1.3, decimals: 1, suffix: "k", label: "LinkedIn followers" },
    ],
    milestones: [
      { year: "2026", title: "Joined Yotta as a Product Associate", detail: "Through the Yotta Catalyst 5.0 campus programme." },
      { year: "2026", title: "Bachelor's in Computer Engineering", detail: "KJ Somaiya College of Engineering, Vidyavihar (2023 – 2026)." },
      { year: "2025", title: "ONDC Hackathon", detail: "Built for India's Open Network for Digital Commerce." },
      { year: "2024", title: "Smart India Hackathon: Round 2", detail: "Our team cleared the 24-hour internal round at KJSCE with Project DRAUPADI." },
      { year: "2024", title: "First internship", detail: "Godrej & Boyce: Python automation and Power Platform." },
      { year: "2023", title: "Diploma in Computer Science", detail: "K J Somaiya Polytechnic (2021 – 2023)." },
    ],
  },

  // Chapter 05 — Hobbies.
  // icon: motorbike | gym | running | camera | bike | chess | music | cooking | book | code | coffee | game | travel  (anything else shows the emoji)
  hobbies: [
    { icon: "motorbike", emoji: "🏍️", title: "Bike rides", text: "Open roads, helmet on, notifications off." },
    { icon: "gym", emoji: "🏋️", title: "Gym", text: "Lifting to balance out the screen time." },
    { icon: "running", emoji: "🏃", title: "Running", text: "Clearing my head one kilometre at a time." },
  ],

  // Chapter 06 — Epilogue
  contact: {
    heading: "Let's write the next chapter together.",
    text: "I'm open to new roles, freelance projects, and good conversations about code.",
  },
};
