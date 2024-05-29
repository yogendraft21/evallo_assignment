import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";
import EventView from "./EventView";
import { deleteEvent, getEvents } from "../services";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token')
      try {
        const fetchedEvents = await getEvents(token);
        const renamedEvents = fetchedEvents.map((event) => ({
          ...event,
          eventDuration: event.duration,
        }));
        setEvents(renamedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setShowEventForm(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
  };

  const handleEventSubmit = async (eventData) => {
     setEvents([...events, eventData]);
     setShowEventForm(false);
    setShowEventForm(false);
  };

  const handleEventDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      alert("Event Deleted Successfully")
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {showEventForm && (
        <EventForm
          date={selectedDate}
          onClose={() => setShowEventForm(false)}
          onSubmit={handleEventSubmit}
        />
      )}
      {selectedEvent && (
        <EventView
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleEventDelete}
        />
      )}
    </>
  );
};

export default CalendarView;
