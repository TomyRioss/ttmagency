export interface ProjectType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
  technologies: string; // JSON string
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialType {
  id: string;
  name: string;
  comment: string;
  company: string | null;
  avatarUrl: string | null;
  rating: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillType {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  level: number;
  order: number;
}

// Helper to parse technologies JSON
export function parseTechnologies(tech: string): string[] {
  try {
    return JSON.parse(tech) as string[];
  } catch {
    return [];
  }
}
