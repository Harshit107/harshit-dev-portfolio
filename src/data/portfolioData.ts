import type { Project, Experience, Education, SocialLink, SkillCategory } from '../types/portfolio';

// Imported local images
import aboutPhoto from '../assets/images/about-img-transparent.png';
import cornerstoneLogo from '../assets/images/cornerstone-modified.png';
import hexagonLogo from '../assets/images/hexagonLogo.png';
import mtxLogo from '../assets/images/mtxLogo.png';
import tekneyaLogo from '../assets/images/teknesyaLogo.png';
import uemLogo from '../assets/images/uemJaipur.png';
import kvsLogo from '../assets/images/kvs.jpg';
import digitalClassroomImg from '../assets/images/digitalClassroom-image.jpg';
import appStoreImg from '../assets/images/appStore.png';
import expensifyImg from '../assets/images/expensify-img.png';
import freelyEmailImg from '../assets/images/freely-email.png';
import uemConnectImg from '../assets/images/uem-connect-new.png';
import oneloginDashboardImg from '../assets/images/onelogin-dashboard.png';

export const personalData = {
  name: 'Harshit Keshari',
  handle: 'Harshit107',
  role: 'Software Developer',
  company: 'Cornerstone OnDemand',
  companyUrl: 'https://www.cornerstoneondemand.com/',
  location: 'Pune, IN / Durgapur, West Bengal, India',
  email: 'harshit107.in@gmail.com',
  secondaryEmail: 'Contact@harshit107.in',
  phone: '+91 7501781756',
  avatar: aboutPhoto,
  resumeUrl: 'https://drive.google.com/file/d/1Cs2Ak0mgI7Ae5zXXlBuTkcqSzY2XB6mi/view',
  headline: 'Full-Stack Software Developer & AI Systems Engineer',
  bio: `Software Developer at Cornerstone OnDemand with 3+ years of expertise engineering scalable distributed web applications, configurable enterprise workflow engines, and low-latency UI architectures. Proficient across the modern JavaScript/TypeScript stack (React, Next.js, Node.js, GraphQL) and enterprise backend (Java, Spring Boot, PostgreSQL, MongoDB, Redis). Actively pioneering AI Engineering workflows including Model Context Protocol (MCP) design, LLM orchestration, and developer tooling.`,
  whoIsHarshit: `Module owner and core platform engineer at Cornerstone OnDemand. Proven track record leading end-to-end architectures: from JSON-based configuration migrations that reduced manual setup by 70%, to Apollo Client GraphQL caching cutting render latency by 30%, and centralized feature-flagging dashboards slashing debugging cycles from 2 hours to 30 minutes. Passionate about system performance, WCAG accessibility, Black Duck security compliance, and AI-assisted engineering.`,
  stats: [
    { label: 'Years Experience', value: '3+' },
    { label: 'Manual Setup Cut', value: '70%' },
    { label: 'API Latency Drop', value: '30%' },
    { label: 'GPA Score', value: '8.27' }
  ]
};

export const experiences: Experience[] = [
  {
    id: 'csod',
    name: 'Cornerstone OnDemand',
    jobTitle: 'Software Developer',
    year: 'May 2024 — Present (Pune, IN)',
    work: 'Lead end-to-end development of configurable workflow and permission-management platforms, enabling dynamic multi-level forms, granular field-level access controls, and self-service administration tools.',
    bulletPoints: [
      'Lead end-to-end development of configurable workflow and permission-management platforms, enabling administrators to create dynamic multi-level forms, enforce granular field-level access controls, and manage enterprise processes through self-service configuration tools while aligning authorization logic with API contracts.',
      'Designed and implemented a JSON-based configuration migration workflow to export and promote configuration and metadata across staging → pilot → production environments with schema validation, async processing, and rollback safety, reducing manual setup effort by 70%.',
      'Identified network re-fetching in GraphQL queries causing UI latency and implemented client-side caching and batching using Apollo Client, reducing redundant API calls and improving render latency by 30%.',
      'Improved accessibility with semantic markup and ARIA attributes, maintained Black Duck security compliance, and regularly updated packages across admin dashboards while preserving extensible component architecture.',
      'Designed centralized configuration dashboard to dynamically toggle UI feature flags and logging levels across non-production environments, reducing developer debugging turnaround time during cycles from 2 hrs to 30 mins.'
    ],
    logo: cornerstoneLogo,
    skills: [
      'React',
      'TypeScript',
      'GraphQL',
      'Node.js',
      'Express',
      'Java',
      'Spring Boot',
      'Apollo Client',
      'Black Duck',
      'WCAG'
    ],
    current: true
  },
  {
    id: 'hexagon',
    name: 'Hexagon Manufacturing Intelligence',
    jobTitle: 'Jr Software Developer (R & D)',
    year: 'Dec 2022 — May 2024 (1.5 Years • Pune, IN)',
    work: 'Engineered high-performance serialization modules and real-time visualization systems for large engineering datasets.',
    bulletPoints: [
      'Designed a C# export module to serialize and transform engineering models into REXS-compliant format, establishing a robust RPC-based inter-service communication layer to enable reliable data exchange.',
      'Developed Apache ECharts–based JS visualization module supporting dynamic chart rendering, configuration-driven customization, and real-time updates, significantly improving data analysis workflows and UX.',
      'Worked on optimizing client-side rendering performance for large engineering datasets by implementing efficient data handling and state update strategies within visualization components.',
      'Collaborated across distributed cross-functional teams to integrate RPC endpoints, perform unit validation, and adhere to strict geometric serialization tolerances.'
    ],
    logo: hexagonLogo,
    skills: ['React', 'JavaScript', 'C#', 'Apache ECharts', 'REXS 3D Spec', 'RPC Protocol', 'State Optimization'],
    current: false
  },
  {
    id: 'mtx',
    name: 'MTX Group',
    jobTitle: 'Consultant Trainee',
    year: 'Jan 2022 — Nov 2022 (11 Months • Hyderabad, IN)',
    work: 'Engineered Salesforce Lightning Web Components and automated customer service ingestion workflows.',
    bulletPoints: [
      'Developed Salesforce Lightning Web Components (LWC) to streamline customer complaint workflows and automate Web-to-Case data ingestion.',
      'Customized data models and validation logic using Apex and SOQL, reducing manual customer service processing effort by 60%.'
    ],
    logo: mtxLogo,
    skills: ['Salesforce LWC', 'Apex', 'SOQL', 'JavaScript', 'Workflow Automation'],
    current: false
  },
  {
    id: 'teknesya',
    name: 'Teknesya Networks Private Limited',
    jobTitle: 'Android Developer',
    year: 'Feb 2020 — Jul 2020 (5 Months)',
    work: 'Engineered core features across high-traffic mobile delivery and insurance applications.',
    bulletPoints: [
      'Implemented time slot and instruction feature on food delivery mobile application using Volley HTTP library.',
      'Implemented pagination and real-time search in an insurance application, drastically improving query and render speeds.'
    ],
    logo: tekneyaLogo,
    skills: ['Android', 'Java', 'Volley HTTP', 'Pagination', 'Search Optimization'],
    current: false
  }
];

export const projects: Project[] = [
  {
    id: 'freely-email-ecosystem',
    name: 'FreelyEmail Ecosystem & Central Logging',
    tagline: 'Transactional Mail Engine, NPM Library & Distributed Logger',
    description: 'A complete developer ecosystem featuring FreelyEmail-API (Node.js/Express/MongoDB), a zero-dependency native Node 18 client SDK published on NPM, and a centralized TypeScript logging microservice with a real-time observability dashboard for distributed tracing and error telemetry.',
    codeLink: 'https://github.com/Harshit107/FreelyEmail-API',
    liveLink: 'https://www.npmjs.com/package/freely-email?activeTab=readme',
    image: freelyEmailImg,
    tech: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'NPM Package', 'Distributed Logging', 'Telemetry'],
    featured: true
  },
  {
    id: 'one-login-identity',
    name: 'OneLogin Identity Platform',
    tagline: 'Enterprise SSO, Decoupled RBAC & Two-Factor QR Security',
    description: 'Full-stack authentication and identity suite featuring a decoupled React 19 + TypeScript + Tailwind v4 client with QR code 2FA challenge workflows, paired with an Express/MongoDB backend implementing BCrypt, JWT session persistence, and granular permission enforcement.',
    codeLink: 'https://github.com/Harshit107/OneLogin',
    liveLink: 'https://account.harshit107.online',
    image: oneloginDashboardImg,
    tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Node.js', 'Express', 'JWT', 'QR 2FA', 'MongoDB'],
    featured: true
  },
  {
    id: 'digital-classroom',
    name: 'Digital Classroom Platform',
    tagline: 'Collaborative LMS & WebRTC Real-Time Conferencing',
    description: 'A full-stack collaborative platform with Role-Based Access Control (RBAC), real-time Jitsi WebRTC video conferencing, secure document upload/sharing with multi-tier visibility constraints, and automated transactional AWS-SES notification workflows.',
    codeLink: 'https://github.com/Harshit107/DigitalClassroom',
    liveLink: 'https://digitalclassroom.netlify.app/',
    image: digitalClassroomImg,
    tech: ['React', 'Android', 'Node.js', 'Express', 'MongoDB', 'AWS-SES', 'Jitsi WebRTC', 'RBAC'],
    featured: true
  },
  {
    id: 'app-store',
    name: 'App Store Android',
    tagline: 'Custom App Distribution & Management Engine',
    description: 'An Android application repository and marketplace with dynamic developer administration portals, APK staging & draft saving, automated JWT security layers, and secure cloud storage.',
    codeLink: 'https://github.com/Harshit107/appstore',
    liveLink: 'https://appstorein.netlify.app',
    image: appStoreImg,
    tech: ['Android', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'AWS'],
    featured: false
  },
  {
    id: 'expensify',
    name: 'Expensify',
    tagline: 'Interactive Financial Tracker & Analytics',
    description: 'Modern financial analytics dashboard featuring interactive data visualizations via Apache eCharts, multi-criteria filtering, instantaneous search queries, and Google OAuth 2.0 authentication.',
    codeLink: 'https://github.com/Harshit107/expensify',
    liveLink: 'https://myexpensify.netlify.app',
    image: expensifyImg,
    tech: ['React', 'JavaScript', 'eCharts', 'Firebase Auth', 'CSS Modules'],
    featured: false
  },
  {
    id: 'uem-connect',
    name: 'UEM Connect',
    tagline: 'Campus Communication & Student Portal',
    description: 'A mobile hub connecting thousands of university students and faculty, featuring live announcements, syllabus trackers, campus notifications, and cloud document delivery.',
    codeLink: 'https://www.9apps.com/android-apps/UEM-JAIPUR/',
    liveLink: 'https://apkpure.com/uem-connect/com.harshit.uemjaipur',
    image: uemConnectImg,
    tech: ['Android', 'Firebase Realtime DB', 'AWS SES', 'Push Notifications'],
    featured: false
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI Engineering & Agents',
    description: 'Model context protocols, agent design, and AI tooling',
    skills: [
      { name: 'MCP Design & Implementation', level: 'Advanced', category: 'familiar' },
      { name: 'Claude & Kiro SDKs', level: 'Advanced', category: 'familiar' },
      { name: 'Prompt Engineering & System Directives', level: 'Expert', category: 'familiar' },
      { name: 'AI-Assisted Development Workflows', level: 'Expert', category: 'familiar' }
    ]
  },
  {
    title: 'Frontend Architecture',
    description: 'High-performance SPAs, design systems & accessibility',
    skills: [
      { name: 'React 18 / 19', level: 'Expert', category: 'frontend' },
      { name: 'TypeScript & JavaScript (ESNext)', level: 'Expert', category: 'frontend' },
      { name: 'Next.js', level: 'Advanced', category: 'frontend' },
      { name: 'Redux & Zustand', level: 'Advanced', category: 'frontend' },
      { name: 'TanStack Query', level: 'Advanced', category: 'frontend' },
      { name: 'Apollo Client (Caching/Batching)', level: 'Advanced', category: 'frontend' },
      { name: 'Tailwind CSS & Shadcn UI', level: 'Advanced', category: 'frontend' },
      { name: 'Styled Components', level: 'Expert', category: 'frontend' },
      { name: 'WCAG Accessibility & ARIA', level: 'Advanced', category: 'frontend' },
      { name: 'Storybook & Jest', level: 'Proficient', category: 'frontend' }
    ]
  },
  {
    title: 'Backend & Distributed APIs',
    description: 'Scalable services, schema validation & microservices',
    skills: [
      { name: 'Node.js & Express.js', level: 'Advanced', category: 'backend' },
      { name: 'GraphQL & RESTful APIs', level: 'Expert', category: 'backend' },
      { name: 'Java & Spring Boot', level: 'Proficient', category: 'backend' },
      { name: 'Schema Validation & JSON Migration', level: 'Expert', category: 'backend' },
      { name: 'RPC-Based Service Communication', level: 'Advanced', category: 'backend' }
    ]
  },
  {
    title: 'Databases & Caching',
    description: 'Relational, document, and high-speed in-memory caches',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient', category: 'databases' },
      { name: 'MongoDB & Mongoose', level: 'Advanced', category: 'databases' },
      { name: 'Firebase / Firestore', level: 'Advanced', category: 'databases' },
      { name: 'Redis', level: 'Proficient', category: 'databases' }
    ]
  },
  {
    title: 'DevOps & Reliability',
    description: 'CI/CD, observability, security compliance & metrics',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Expert', category: 'devops' },
      { name: 'Docker Containerization', level: 'Proficient', category: 'devops' },
      { name: 'Jenkins CI/CD', level: 'Intermediate', category: 'devops' },
      { name: 'Splunk Observability & Logging', level: 'Intermediate', category: 'devops' },
      { name: 'Black Duck Security Compliance', level: 'Proficient', category: 'devops' },
      { name: 'AWS (SES, S3, EC2)', level: 'Intermediate', category: 'devops' },
      { name: 'Postman & Amplitude Analytics', level: 'Advanced', category: 'devops' }
    ]
  },
  {
    title: 'Enterprise & Mobile Systems',
    description: '3D modeling formats, Salesforce and native mobile',
    skills: [
      { name: 'Apache ECharts Data Viz', level: 'Advanced', category: 'familiar' },
      { name: 'REXS 3D Mechanical Data Serialization', level: 'Proficient', category: 'familiar' },
      { name: 'Salesforce LWC & Apex', level: 'Proficient', category: 'familiar' },
      { name: 'Native Android SDK & Java', level: 'Proficient', category: 'familiar' }
    ]
  }
];

export const educationList: Education[] = [
  {
    id: 'uem',
    institution: 'University of Engineering and Management (UEM) Jaipur',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    duration: '2018 — Jun 2022',
    grade: 'GPA: 8.27 / 10',
    image: uemLogo,
    completed: true
  },
  {
    id: 'kvs',
    institution: 'Kendriya Vidyalaya Andal',
    degree: 'Higher Secondary Certificate — Computer Science Specialization',
    duration: '2006 — 2018',
    grade: '76.0%',
    image: kvsLogo,
    completed: true
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/harshit107/',
    icon: 'linkedin',
    username: 'harshit107'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Harshit107',
    icon: 'github',
    username: 'Harshit107'
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com/harshit107in',
    icon: 'twitter',
    username: '@harshit107in'
  }
];
