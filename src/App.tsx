import { useState } from "react";
import "./App.css";
import { appInsights, offlineChannel } from "./main";

function App() {
  const [isOnline, setIsOnline] = useState(true);

  const sendAiEvent = (eventName: string) => {
    appInsights.trackEvent({ name: eventName });
  };

  const sendOfflineEvent = () => sendAiEvent("OfflineEvent");
  const sendNormalEvent = () => sendAiEvent("TestEvent");

  return (
    <>
      <h2>{`Offline Channel Demo - onlineState ${isOnline ? 1 : 2}`}</h2>
      <div className="card">
        <button
          onClick={() =>
            setIsOnline((isOnline) => {
              const offlineListener = offlineChannel.getOfflineListener();
              const val = !isOnline ? 1 : 2;
              console.log("Setting offlineListener onlineState:", val);
              offlineListener.setOnlineState(val);
              return !isOnline;
            })
          }
        >
          {isOnline ? "Set to offline" : "Set to online"}
        </button>
        <button onClick={sendNormalEvent}>Send Test Event</button>
        <button onClick={sendOfflineEvent}>Send Offline Event</button>
      </div>
    </>
  );
}

export default App;
