import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newHours, setNewHours] = useState('');

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(savedSubjects);
  }, []);

  const addSubject = () => {
    if (newSubject && newHours) {
      const updatedSubjects = [...subjects, { subject: newSubject, hours: parseInt(newHours) }];
      setSubjects(updatedSubjects);
      setNewSubject('');
      setNewHours('');

      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  const increaseHours = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += 1;
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  const decreaseHours = (index) => {
    const updatedSubjects = [...subjects];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubjects(updatedSubjects);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Education Planner</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Hours"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            className="input"
          />
          <button onClick={addSubject} className="button button-add">
            Add
          </button>
        </div>
        {subjects.map((subject, index) => (
          <div key={index} className="subject">
            <div className="subject-info">{subject.subject} - {subject.hours} hours</div>
            <div className="button-container">
              <button onClick={() => increaseHours(index)} className="button button-increase">
                +
              </button>
              <button onClick={() => decreaseHours(index)} className="button button-decrease">
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
