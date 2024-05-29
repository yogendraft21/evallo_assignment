import React, { useEffect } from "react";

const EventView = ({ event, onClose, onDelete }) => {
  console.log(event)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("bg-gray-900")) {
        onClose();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h2 className="text-2xl mb-6">Event Details</h2>
        <div className="mb-6">
          <strong>Title:</strong> {event.title}
        </div>
        <div className="mb-6">
          <strong>Description:</strong> {event.extendedProps.description}
        </div>
        <div className="mb-6">
          <strong>Participants:</strong>{" "}
          <div className="border border-gray-300 p-4 max-h-32 overflow-auto text-blue-600">
            {event.extendedProps.participants.join(", ")}
          </div>
        </div>
        <div className="mb-6">
          <strong>Date:</strong> {event.start.toLocaleDateString()}
        </div>
        <div className="mb-6">
          <strong>Time:</strong> {event.extendedProps.time}
        </div>
        <div className="mb-6">
          <strong>Duration:</strong> {event.extendedProps.eventDuration} hrs
        </div>
        <div className="mb-6">
          <strong>Session Notes:</strong> {event.extendedProps.sessionNotes}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-2"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onDelete(event.extendedProps.googleEventId)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventView;
