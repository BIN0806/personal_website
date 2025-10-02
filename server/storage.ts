import { type User, type InsertUser, type Campaign, type InsertCampaign, type Backup, type InsertBackup, type Analytics, type InsertAnalytics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Campaigns
  getCampaigns(userId?: string): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
  
  // Backups
  getBackups(userId?: string): Promise<Backup[]>;
  createBackup(backup: InsertBackup): Promise<Backup>;
  
  // Analytics
  getAnalytics(campaignId?: string): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;
  private backups: Map<string, Backup>;
  private analytics: Map<string, Analytics>;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.backups = new Map();
    this.analytics = new Map();
    
    // Initialize with sample data for demo
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create default user
    const defaultUser: User = {
      id: "user-1",
      username: "demo@campaignflow.com",
      password: "demo"
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create sample campaigns
    const sampleCampaigns: Campaign[] = [
      {
        id: "camp-1",
        name: "Spring Product Launch",
        description: "Multi-channel campaign for Q2 product launch",
        status: "active",
        budget: 125000,
        channels: ["email", "social", "ads"],
        metrics: { reach: 84320, conversions: 2847, roi: 247 },
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        userId: defaultUser.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "camp-2",
        name: "Black Friday 2024",
        description: "Holiday season promotional campaign",
        status: "scheduled",
        budget: 450000,
        channels: ["email", "social", "ads", "content"],
        metrics: { reach: 0, conversions: 0, roi: 0 },
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        userId: defaultUser.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "camp-3",
        name: "Customer Retention Q4",
        description: "Re-engagement campaign for inactive customers",
        status: "active",
        budget: 82000,
        channels: ["email"],
        metrics: { reach: 15420, conversions: 1893, roi: 312 },
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        userId: defaultUser.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    sampleCampaigns.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign);
    });

    // Create sample backups
    const sampleBackups: Backup[] = [
      {
        id: "backup-1",
        type: "campaigns",
        size: 2400000,
        status: "completed",
        userId: defaultUser.id,
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: "backup-2",
        type: "assets",
        size: 18700000,
        status: "completed",
        userId: defaultUser.id,
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: "backup-3",
        type: "analytics",
        size: 847000,
        status: "completed",
        userId: defaultUser.id,
        createdAt: new Date(Date.now() - 1 * 60 * 1000)
      }
    ];

    sampleBackups.forEach(backup => {
      this.backups.set(backup.id, backup);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCampaigns(userId?: string): Promise<Campaign[]> {
    const campaigns = Array.from(this.campaigns.values());
    return userId ? campaigns.filter(c => c.userId === userId) : campaigns;
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { ...campaign, ...updates, updatedAt: new Date() };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getBackups(userId?: string): Promise<Backup[]> {
    const backups = Array.from(this.backups.values());
    return userId ? backups.filter(b => b.userId === userId) : backups;
  }

  async createBackup(insertBackup: InsertBackup): Promise<Backup> {
    const id = randomUUID();
    const backup: Backup = {
      ...insertBackup,
      id,
      createdAt: new Date()
    };
    this.backups.set(id, backup);
    return backup;
  }

  async getAnalytics(campaignId?: string): Promise<Analytics[]> {
    const analytics = Array.from(this.analytics.values());
    return campaignId ? analytics.filter(a => a.campaignId === campaignId) : analytics;
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      createdAt: new Date()
    };
    this.analytics.set(id, analytics);
    return analytics;
  }
}

export const storage = new MemStorage();
