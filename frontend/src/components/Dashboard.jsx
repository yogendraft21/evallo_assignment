import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CalendarView from "./CalendarView";
import { getUser } from "../services";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     const fetchData = async () => {
       const token = localStorage.getItem("token")
       try {
         const userData = await getUser(token);
         setUser(userData.user);
         setLoading(false);
       } catch (err) {
         console.error("Error fetching user data:", err);
         setError(err.message);
         setLoading(false);
       }
     };

     fetchData();
   }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className="container mx-auto p-4 flex-grow h-screen/2 w-screen/2">
        <div className="h-auto w-full overflow-hidden">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
