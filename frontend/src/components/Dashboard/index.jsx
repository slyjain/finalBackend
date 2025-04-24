import React, { useEffect, useState } from "react";

function DashBoard() {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Fetch user info
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log(token);
        const res = await fetch("http://localhost:8000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserName(data.name);
          console.log(data);
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">
        {greeting}, {userName} 👋
      </h1>
      <p className="text-xl text-gray-600">
        What are you about to cook today?
      </p>
    </div>
  );
}

export default DashBoard;
