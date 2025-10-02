import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCampaignSchema, insertBackupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Campaigns routes
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const campaign = await storage.getCampaign(id);
      
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const campaign = await storage.updateCampaign(id, updates);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  app.delete("/api/campaigns/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCampaign(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });

  // Backups routes
  app.get("/api/backups", async (req, res) => {
    try {
      const backups = await storage.getBackups();
      res.json(backups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch backups" });
    }
  });

  app.post("/api/backups", async (req, res) => {
    try {
      const validatedData = insertBackupSchema.parse(req.body);
      const backup = await storage.createBackup(validatedData);
      res.status(201).json(backup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid backup data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create backup" });
    }
  });

  // Analytics routes
  app.get("/api/analytics", async (req, res) => {
    try {
      const { campaignId } = req.query;
      const analytics = await storage.getAnalytics(campaignId as string);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Dashboard summary endpoint
  app.get("/api/dashboard/summary", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      const backups = await storage.getBackups();
      
      const activeCampaigns = campaigns.filter(c => c.status === "active").length;
      const totalReach = campaigns.reduce((sum, c) => sum + (c.metrics?.reach || 0), 0);
      const totalConversions = campaigns.reduce((sum, c) => sum + (c.metrics?.conversions || 0), 0);
      const avgROI = campaigns.length > 0 
        ? campaigns.reduce((sum, c) => sum + (c.metrics?.roi || 0), 0) / campaigns.length 
        : 0;

      const conversionRate = totalReach > 0 ? (totalConversions / totalReach * 100) : 0;
      const lastBackup = backups.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      res.json({
        activeCampaigns,
        totalReach: Math.round(totalReach / 1000) / 1000, // Convert to K/M format
        conversionRate: Math.round(conversionRate * 100) / 100,
        avgROI: Math.round(avgROI),
        lastBackup: lastBackup?.createdAt || new Date(),
        totalCampaigns: campaigns.length,
        backupStatus: "active"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
