// 📄 components/ChatBox.jsx
import React, { useState } from 'react';
import { getGPTResponse } from '../services/gptService';
import './ChatBox.css';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    // Smart scheduler command detection
    const scheduleRegex = /plan (\d+) lectures? of (.+?) in (\d+) days?/i;
    const match = input.match(scheduleRegex);
    if (match) {
      const [, lectures, subject, days] = match;
      const dailyCount = Math.ceil(Number(lectures) / Number(days));
      const today = new Date();
      const plan = [];
      for (let i = 0; i < Number(days); i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        plan.push({
          date: date.toISOString().split('T')[0],
          task: `${dailyCount} lectures of ${subject}`
        });
      }
      localStorage.setItem('dynamicSchedule', JSON.stringify(plan));
    }

    const reply = await getGPTResponse(updatedMessages);
    setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>{msg.content}</div>
        ))}
      </div>
      <div className="chat-controls">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask ReyuFlow..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
