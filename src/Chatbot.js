import React, { useState } from 'react';
import './Chatbot.css';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: input,
      });

      const reply = response.data.reply;
      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const deleteAll = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-wrapper">
      <h1>🤖 AI Chatbot</h1>
      <div className="chat-container">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.sender === 'bot' ? '🤖' : '🧑‍💻'} {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="delete-area">
        <button className="delete-button" onClick={deleteAll}>
          🗑️ Delete All Conversations
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
