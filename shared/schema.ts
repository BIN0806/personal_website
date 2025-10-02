import { z } from "zod";

export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  subtitle: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
});

export const processStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  link: z.string().optional(),
  featured: z.boolean().optional(),
});

export const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  icon: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
