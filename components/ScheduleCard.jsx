// 📄 components/ScheduleCard.jsx
import React, { useEffect, useState } from 'react';
import './ScheduleCard.css';

const gateSchedule = [
  { subject: "Signals & Systems", topics: 6, days: 10, note: "Core subject, complete by June" },
  { subject: "Engineering Maths", topics: 8, days: 14, note: "Spread across June/July" },
  { subject: "Digital Electronics", topics: 7, days: 7, note: "Fast & scoring" },
  { subject: "Network Theory", topics: 7, days: 10, note: "Requires practice" },
  { subject: "Electronic Devices", topics: 6, days: 7, note: "Foundation for Analog" },
  { subject: "Analog Circuits", topics: 7, days: 10, note: "Op-Amps, BJT, MOSFET" },
  { subject: "Control Systems", topics: 5, days: 8, note: "Root Locus, Bode, etc." },
  { subject: "Communications", topics: 6, days: 10, note: "Analog + Digital modulation" },
  { subject: "Electromagnetics", topics: 6, days: 10, note: "Vectors, waveguides, Smith chart" },
  { subject: "General Aptitude", topics: 6, days: 15, note: "2 hrs per week is enough" },
];

export default function ScheduleCard() {
  const [schedule, setSchedule] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    let scheduleForToday = JSON.parse(localStorage.getItem('dynamicSchedule')) || [];
    if (!scheduleForToday.length) {
      scheduleForToday = gateSchedule.map((subject, idx) => {
        const perDay = Math.ceil(subject.topics / subject.days);
        return {
          date: todayStr,
          task: `${perDay} topics of ${subject.subject}`
        };
      });
    }
    setSchedule(scheduleForToday.filter(item => item.date === todayStr));
  }, []);

  const addToSchedule = () => {
    if (newTime && newTask) {
      const newEntry = { time: newTime, task: newTask };
      const all = JSON.parse(localStorage.getItem('dailySchedule')) || [];
      const updated = [...all, newEntry];
      localStorage.setItem('dailySchedule', JSON.stringify(updated));
      setSchedule([...schedule, newEntry]);
      setNewTime('');
      setNewTask('');
    }
  };

  return (
    <div className="schedule-card">
      <h2>Today's Plan</h2>
      {schedule.length === 0 ? (
        <p>No schedule set for today.</p>
      ) : (
        <ul>
          {schedule.map((item, idx) => (
            <li key={idx}><strong>{item.time || idx + 1}</strong> - {item.task}</li>
          ))}
        </ul>
      )}
      <div className="schedule-form">
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addToSchedule}>Add Task</button>
      </div>
    </div>
  );
}
