import React, { useState, useEffect, useRef } from "react";
import { createEvent } from "../services";

const EventForm = ({ date, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const popupRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedDate = formatDate(date);

 const handleSubmit = async (e) => {
   e.preventDefault();
   const eventData = {
     title,
     description,
     participants: participants.split(",").map((p) => p.trim()),
     date: formattedDate,
     time,
     duration : Number(duration),
     sessionNotes,
   };

   try {
     const response = await createEvent(eventData);
     console.log("Event created successfully:", response);
     if (onSubmit) {
       onSubmit(response);
     }
     window.location.reload();
   } catch (error) {
     console.error("Error:", error);
   }
 };



  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div
        ref={popupRef}
        className="bg-white p-4 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto"
      >
        <h2 className="text-2xl mb-2">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">Participants</label>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Comma-separated emails"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">Date</label>
            <input
              type="text"
              value={formattedDate}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">
              Duration (hrs)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1">
              Session Notes
            </label>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
