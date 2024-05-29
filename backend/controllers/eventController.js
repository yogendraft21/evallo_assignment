const { google } = require("googleapis");
const mongoose = require("mongoose");
const config = require("../config/config");
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");

const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    participants,
    date,
    time,
    duration,
    sessionNotes,
    userId,
  } = req.body;

  console.log(req.body);

  try {
    // Set the OAuth2 credentials
    oauth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Combine date and time strings into a single string
    const dateTimeString = `${date}T${time}`;

    // Convert to Indian time zone
    const startDateTime = new Date(dateTimeString).toISOString();

    // Calculate the end date by adding the duration
    const endDateTime = new Date(
      new Date(dateTimeString).getTime() + duration * 60 * 60 * 1000
    ).toISOString();

    const event = {
      summary: title,
      description: `${description}\n\nSession Notes:\n${sessionNotes}`,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
      attendees: participants.map((email) => ({ email: email.trim() })),
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    const googleEventId = response.data.id;

    // Create and save the event in the database
    const newEvent = new eventModel({
      title,
      description,
      participants: participants.map((email) => email.trim()),
      date: new Date(startDateTime),
      time,
      duration: Number(duration),
      sessionNotes,
      googleEventId,
      user: new mongoose.Types.ObjectId(userId),
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error during event creation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }

  try {
    const user = await userModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEvents = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find all events associated with the userId
    const events = await eventModel.find({ user: userId });

    res.status(200).json({ events: events });
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  const { googleEventId } = req.params;

  try {
    // Set the OAuth2 credentials
    oauth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

    // Find the event in the database by googleEventId
    const event = await eventModel.findOne({
      googleEventId: googleEventId.trim(),
    });
    if (!event) {
      console.log(
        `Event not found in database for Google Event ID: ${googleEventId}`
      );
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete the event from Google Calendar
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    await calendar.events.delete({
      calendarId: "primary",
      eventId: googleEventId.trim(),
    });

    // Delete the event from the database
    await eventModel.findOneAndDelete({ googleEventId: googleEventId.trim() });

    console.log(`Event deleted from database: ${googleEventId}`);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error during event deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
