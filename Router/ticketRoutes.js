import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../Controller/ticketController.js";

const ticketRoutes = express.Router();

ticketRoutes.post("/tickets", createTicket);
ticketRoutes.get("/tickets", getTickets);
ticketRoutes.get("/tickets/:id", getTicketById);
ticketRoutes.put("/tickets/:id", updateTicket);
ticketRoutes.delete("/tickets/:id", deleteTicket);

export default ticketRoutes;