import Ticket from "../Models/ticketModel.js";
import { ticketSchema } from "../Validation/ticketValidation.js";
import * as yup from "yup";


export const createTicket = async (req, res) => {
  try {
   
    const validatedData = await ticketSchema.validate(req.body, {
      abortEarly: false,
    });

    const ticket = new Ticket(validatedData);
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: error.errors,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { status } = req.body;

    
    if (status) {
      await yup
        .string()
        .oneOf(["open", "in-progress", "closed"], "Invalid status")
        .validate(status);
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status || ticket.status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets); // just send array of all tickets
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await ticket.deleteOne();

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};