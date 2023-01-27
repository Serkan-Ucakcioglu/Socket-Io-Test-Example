import { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

function App() {
  const [on, setOn] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("connect", (socket) => {
      setOn(true);
    });
    socket.on("message", (data) => {
      alert(data);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const socketEmit = () => {
    socket.emit("message", message);
  };
  return (
    <div className="App w-full h-screen flex flex-col justify-center items-center">
      <div className="mb-3">{on ? "online 🟢" : "ofline🔴"}</div>
      <div className="flex flex-row">
        <input
          type="text"
          className="border-2 border-gray-600 h-10 w-[300px] outline-none px-3"
          placeholder="push notification"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 border border-blue-500 bg-blue-500 text-white h-10 w-10 outline-none"
          onClick={socketEmit}
        >
          emit
        </button>
      </div>
    </div>
  );
}

export default App;
