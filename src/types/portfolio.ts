export type AccentColor = 'emerald' | 'cyan' | 'violet' | 'amber' | 'ruby';
export type ThemeMode = 'dark' | 'light';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  codeLink: string;
  liveLink?: string;
  image: string;
  tech: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  name: string;
  jobTitle: string;
  work: string;
  bulletPoints?: string[];
  year: string;
  logo: string;
  skills?: string[];
  current?: boolean;
}

export interface SkillItem {
  name: string;
  icon?: string;
  level?: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'devops' | 'familiar';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  image: string;
  completed: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}
