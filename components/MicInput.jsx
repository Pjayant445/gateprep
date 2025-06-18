// 📄 components/MicInput.jsx
import React, { useState } from 'react';
import './MicInput.css';

export default function MicInput() {
  const [text, setText] = useState('');

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
  };

  return (
    <div className="mic-input">
      <button onClick={startListening}>🎤 Speak</button>
      <p>{text}</p>
    </div>
  );
}
