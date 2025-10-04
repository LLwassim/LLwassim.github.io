export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
    frontend?: string;
    backend?: string;
  };
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  logo: string;
  website?: string;
  current?: boolean;
}
