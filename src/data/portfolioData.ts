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

export const personalData = {
  name: 'Harshit Keshari',
  handle: 'Harshit107',
  role: 'Software Developer',
  company: 'Cornerstone OnDemand',
  companyUrl: 'https://www.cornerstoneondemand.com/',
  location: 'Andal, Durgapur, West Bengal, India',
  email: 'Harshit107.in@gmail.com',
  secondaryEmail: 'Contact@harshit107.in',
  phone: '+91 7501781756',
  avatar: aboutPhoto,
  resumeUrl: 'https://drive.google.com/file/d/1Cs2Ak0mgI7Ae5zXXlBuTkcqSzY2XB6mi/view',
  headline: 'Full-Stack Developer & UI Architect',
  bio: `I am Harshit Keshari, currently working as a Software Developer at Cornerstone OnDemand. Known in the developer community as Harshit107, I specialize in designing scalable web applications using React, Next.js, TypeScript, Node.js, and GraphQL. Strong focus on frontend performance optimization, accessibility (WCAG), and clean UI architecture.`,
  whoIsHarshit: `Founding team member and module owner for a core product area at Cornerstone OnDemand. I specialize in designing API-driven systems, integrating REST and GraphQL services, and working with PostgreSQL, MongoDB, and Firebase. Proven track record of improving UI responsiveness, AI bot-friendly structures, and developer productivity through reusable design systems and tooling.`,
  stats: [
    { label: 'Years Experience', value: '3+' },
    { label: 'Production Apps', value: '10+' },
    { label: 'Core Products Owned', value: '1' },
    { label: 'Technologies', value: '20+' }
  ]
};

export const experiences: Experience[] = [
  {
    id: 'csod',
    name: 'Cornerstone OnDemand',
    jobTitle: 'Software Developer',
    year: 'May 2024 — Present (2+ Years)',
    work: 'Founding team member and module owner for a core product area at Cornerstone OnDemand. Responsible for end-to-end design, development, and maintenance using React, TypeScript, Node.js, and GraphQL. Driving architectural decisions, performance optimization, accessibility compliance (WCAG), and resilient API integrations.',
    logo: cornerstoneLogo,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Performance', 'WCAG', 'Architecture'],
    current: true
  },
  {
    id: 'hexagon',
    name: 'Hexagon Manufacturing Intelligence',
    jobTitle: 'Junior Software Developer',
    year: 'Nov 2022 — May 2024 (1.5 Years)',
    work: 'Engineered a specialized module that enables high-fidelity bi-directional conversion of complex 3D mechanical models between international standard REXS and JSON formats.',
    logo: hexagonLogo,
    skills: ['JavaScript', 'C#', 'Smalltalk', '3D Data Modeling', 'JSON Serialization'],
    current: false
  },
  {
    id: 'mtx',
    name: 'MTX Group',
    jobTitle: 'Salesforce Developer',
    year: 'Jan 2022 — Nov 2022 (11 Months)',
    work: 'Architected and deployed enterprise Lightning Web Components (LWC) for customer complaints registration and automated workflow data ingestion via Salesforce web-to-case capabilities, dramatically cutting manual resolution time.',
    logo: mtxLogo,
    skills: ['Salesforce LWC', 'Apex', 'JavaScript', 'Process Automation'],
    current: false
  },
  {
    id: 'teknesya',
    name: 'Teknesya Networks Private Limited',
    jobTitle: 'Android Developer',
    year: 'Feb 2020 — Jul 2020 (5 Months)',
    work: 'Implemented time-slot scheduling and smart driver instruction pipelines on high-traffic food delivery apps using the Volley HTTP library. Integrated efficient server-side pagination and real-time search in an Insurance mobile platform.',
    logo: tekneyaLogo,
    skills: ['Android', 'Java', 'Volley HTTP', 'Pagination', 'Search Optimization'],
    current: false
  }
];

export const projects: Project[] = [
  {
    id: 'digital-classroom',
    name: 'Digital Classroom',
    tagline: 'Modern LMS & Video Conferencing Ecosystem',
    description: 'A full-stack collaborative platform providing real-time classroom management, automated biometric attendance calculation, WebRTC live video meetings, and automated transactional email dispatching.',
    codeLink: 'https://github.com/Harshit107/DigitalClassroom',
    liveLink: 'https://Harshit107.tech',
    image: digitalClassroomImg,
    tech: ['Android', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'AWS'],
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
    featured: true
  },
  {
    id: 'expensify',
    name: 'Expensify',
    tagline: 'Interactive Financial Tracker & Analytics',
    description: 'Modern financial analytics dashboard featuring interactive data visualizations via eCharts, multi-criteria filtering, instantaneous search queries, and Google OAuth 2.0 authentication.',
    codeLink: 'https://github.com/Harshit107/expensify',
    liveLink: 'https://myexpensify.netlify.app',
    image: expensifyImg,
    tech: ['React', 'JavaScript', 'eCharts', 'Firebase Auth', 'CSS Modules'],
    featured: true
  },
  {
    id: 'freely-email',
    name: 'Freely-Email',
    tagline: 'Developer NPM Library & Mail Microservice',
    description: 'A robust developer API and published NPM library automating transactional mail delivery with custom domain configuration, SPF/DKIM validation, and rate-limited queueing.',
    codeLink: 'https://github.com/Harshit107/FreelyEmail-API',
    liveLink: 'https://www.npmjs.com/package/freely-email?activeTab=readme',
    image: freelyEmailImg,
    tech: ['Node.js', 'Express', 'Mongoose', 'NPM Package', 'SMTP'],
    featured: false
  },
  {
    id: 'uem-connect',
    name: 'UEM Connect',
    tagline: 'Campus Communication & Student Portal',
    description: 'A mobile hub connecting thousands of university students and faculty, featuring live announcements, syllabus trackers, campus notifications, and cloud document delivery.',
    codeLink: 'https://www.9apps.com/android-apps/UEM-JAIPUR/',
    liveLink: 'https://www.9apps.com/android-apps/UEM-JAIPUR/',
    image: uemConnectImg,
    tech: ['Android', 'Firebase Realtime DB', 'AWS SES', 'Push Notifications'],
    featured: false
  },
  {
    id: 'one-login',
    name: 'OneLogin Identity',
    tagline: 'Federated SSO & Authentication Framework',
    description: 'Full-stack authentication suite modeled after Google Single Sign-On with MFA challenge workflows, session persistence, and OAuth 2.0 provider integration.',
    codeLink: 'https://github.com/Harshit107/oneLogin',
    liveLink: 'https://github.com/Harshit107/oneLogin',
    image: expensifyImg,
    tech: ['React', 'TypeScript', 'Firebase Auth', 'JWT', 'OAuth2'],
    featured: false
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Languages',
    description: 'Foundation and high-performance computing',
    skills: [
      { name: 'TypeScript', level: 'Advanced', category: 'languages' },
      { name: 'JavaScript (ESNext)', level: 'Advanced', category: 'languages' },
      { name: 'Java', level: 'Proficient', category: 'languages' },
      { name: 'SQL', level: 'Proficient', category: 'languages' }
    ]
  },
  {
    title: 'Frontend Architecture',
    description: 'Modern responsive SPAs & microfrontends',
    skills: [
      { name: 'React 18 / 19', level: 'Expert', category: 'frontend' },
      { name: 'Next.js', level: 'Advanced', category: 'frontend' },
      { name: 'Redux Toolkit', level: 'Advanced', category: 'frontend' },
      { name: 'TanStack Query', level: 'Advanced', category: 'frontend' },
      { name: 'Framer Motion', level: 'Advanced', category: 'frontend' },
      { name: 'Apollo Client', level: 'Proficient', category: 'frontend' },
      { name: 'Styled Components', level: 'Expert', category: 'frontend' },
      { name: 'DND Kit', level: 'Proficient', category: 'frontend' },
      { name: 'HTML5 & Modern CSS3', level: 'Expert', category: 'frontend' }
    ]
  },
  {
    title: 'Backend & APIs',
    description: 'Scalable cloud services & data streaming',
    skills: [
      { name: 'Node.js', level: 'Advanced', category: 'backend' },
      { name: 'Express.js', level: 'Advanced', category: 'backend' },
      { name: 'GraphQL', level: 'Advanced', category: 'backend' },
      { name: 'RESTful API Design', level: 'Expert', category: 'backend' }
    ]
  },
  {
    title: 'Databases & Caching',
    description: 'Relational, document, and key-value stores',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient', category: 'databases' },
      { name: 'MongoDB', level: 'Advanced', category: 'databases' },
      { name: 'Firebase / Firestore', level: 'Advanced', category: 'databases' },
      { name: 'Redis', level: 'Proficient', category: 'databases' }
    ]
  },
  {
    title: 'DevOps & Tooling',
    description: 'CI/CD, observability, and containerization',
    skills: [
      { name: 'Docker', level: 'Proficient', category: 'devops' },
      { name: 'Git & GitHub Workflows', level: 'Expert', category: 'devops' },
      { name: 'Jenkins CI/CD', level: 'Intermediate', category: 'devops' },
      { name: 'Postman', level: 'Advanced', category: 'devops' },
      { name: 'Jira', level: 'Advanced', category: 'devops' },
      { name: 'Splunk Observability', level: 'Intermediate', category: 'devops' }
    ]
  },
  {
    title: 'Also Familiar With',
    description: 'Cross-platform mobile and enterprise frameworks',
    skills: [
      { name: 'AWS (SES, S3, EC2)', level: 'Intermediate', category: 'familiar' },
      { name: 'Spring Boot', level: 'Intermediate', category: 'familiar' },
      { name: 'Native Android SDK', level: 'Proficient', category: 'familiar' },
      { name: 'Three.js / WebGL', level: 'Proficient', category: 'familiar' }
    ]
  }
];

export const educationList: Education[] = [
  {
    id: 'uem',
    institution: 'University of Engineering and Management (UEM) Jaipur',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    duration: '2018 — 2022',
    grade: '8.3 CGPA',
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
    url: 'https://www.linkedin.com/in/harshit-keshari-296823156/',
    icon: 'linkedin',
    username: 'harshit-keshari'
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
