import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import axios from "axios"
import { AuthContext } from "../../store/authProvider";
function DashBoard() {
  const {token}=useContext(AuthContext);
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("");
  const [canvases, setCanvases] = useState([]);
  const [newCanvasName, setNewCanvasName] = useState("");
  const navigate = useNavigate();

 

  useEffect(() => {

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setUserName(data.name);
        else console.error("Failed to fetch user:", data.message);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    const fetchCanvases = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/canvas/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setCanvases(data);
        else console.error("Failed to fetch canvases:", data.message);
      } catch (err) {
        console.error("Canvas Fetch Error:", err);
      }
    };

    fetchUser();
    fetchCanvases();
  }, [token]);

  const handleCreateCanvas = async () => {
    if (!newCanvasName.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/api/canvas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCanvasName }),
      });

      const data = await res.json();
      if (res.ok) {
        setCanvases((prev) => [...prev, { name: newCanvasName, _id: data.canvasId }]);
        setNewCanvasName("");
      } else {
        console.error("Failed to create canvas:", data.message);
      }
    } catch (err) {
      console.error("Canvas Create Error:", err);
    }
  };
  const handleDeleteCanvas = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/canvas/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", data.error);
        return;
      }

      // Optional: remove canvas from local state
      setCanvases((prev) => prev.filter((c) => c._id !== id));
      console.log("Canvas deleted:", data.message);
    } catch (error) {
      console.error("Error deleting canvas:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {greeting}, {userName} 👋
        </h1>
        <p className="text-xl text-gray-600">What are you about to cook today?</p>
      </div>

      {/* Create Canvas Section */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCanvasName}
            onChange={(e) => setNewCanvasName(e.target.value)}
            placeholder="Enter canvas name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCreateCanvas}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Canvases</h2>
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Canvas Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {canvases.map((canvas, index) => (
                <tr key={canvas._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{canvas.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                    <button
                      onClick={() => { 
                        localStorage.setItem("canvasId",canvas._id);
                        navigate(`/load/${canvas._id}`) 
                    }}
                      className="text-blue-600 hover:underline"
                    >
                      Open
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteCanvas(canvas._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
              {canvases.length === 0 && (
                <tr>
                  <td className="px-6 py-4 text-center text-sm text-gray-500" colSpan="3">
                    No canvases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
