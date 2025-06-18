// 📄 App.js
import React from 'react';
import ChatBox from './components/ChatBox';
import ScheduleCard from './components/ScheduleCard';
import MicInput from './components/MicInput';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>ReyuFlow Assistant</h1>
      <ScheduleCard />
      <ChatBox />
      <MicInput />
    </div>
  );
}

export default App;
