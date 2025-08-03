import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Save to storage
      const contact = await storage.createContact(contactData);
      
      // Send email notification
      const emailSent = await sendContactEmail(contactData);
      
      if (emailSent) {
        res.json({ success: true, contact, message: "Contact submitted successfully and email sent" });
      } else {
        res.json({ success: true, contact, message: "Contact submitted successfully but email failed to send" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error in contact submission:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Stats endpoint for happy clients counter
  app.get("/api/stats", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const happyClients = 582 + contacts.length; // Base number plus new contacts
      res.json({ happyClients });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch stats" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
