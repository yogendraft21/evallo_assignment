import axios from "axios";

const API_URL = "http://localhost:8000/";

export const loginWithGoogle = async (credential) => {
  try {
    const response = await axios.post(`${API_URL}api/google/redirect`, {
      token: credential,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error during Google login: " + error.message);
  }
};

export const createToken = async (code) => {
  try {
    const response = await axios.post(`${API_URL}api/create-token`, {
      code
    })

    return response.data;
  } catch (error) {
    throw new Error("Error during creating token: " + error.message);
  }
}

export const createEvent = async (eventData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}user/create-event`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error during event creation: " + error.message);
  }
};

export const getUser = async (user_token) => {
  try {
    const response = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

export const getEvents = async (user_token) => {
  try {
    const response = await axios.get(`${API_URL}user/get-events`, {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    });
    return response.data.events;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};

export const deleteEvent = async (eventId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL}user/delete-event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error during event deletion: " + error.message);
  }
};
