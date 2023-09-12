import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css'; // Import your CSS file

const initialCode = 
`<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    
  </body>
</html>`;

const taskValidations = [
  // Validation codes corresponding to each task
`<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
`<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>I love cats</p>
  </body>
</html>`,
  // Add validation codes for more tasks here
];

const initialTasks = [
  {
    id: 1,
    description: 'Write Hello World',
  },
  {
    id: 2,
    description: 'Write a paragraph: <p>I love cats</p>',
  }
  // Add more tasks as needed
];

function App() {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationColor, setValidationColor] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showNextTask, setShowNextTask] = useState(false); // Track whether to show the next task
  const [userInputs, setUserInputs] = useState(Array(initialTasks.length).fill(''));
  const [allTasksCompleted, setAllTasksCompleted] = useState(false); // Track whether all tasks are completed

  const currentTask = initialTasks[currentTaskIndex];
  const currentValidationCode = taskValidations[currentTaskIndex];

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setValidationMessage(''); // Clear validation message when code is edited
  };

  const handleRunClick = () => {
    // Clear the previous output and validation message
    setOutput('');
    setValidationMessage('');
    setValidationColor(''); // Clear the validation color as well

    // Trim whitespaces and line breaks from both code and validationCode
    const trimmedCode = code.trim();
    const trimmedValidationCode = currentValidationCode.trim();

    try {
      // You can set the output as HTML content
      setOutput(code);

      // Check if the trimmed code matches the trimmed validation code
      if (trimmedCode === trimmedValidationCode) {
        setValidationMessage('Good Job!');
        setValidationColor('green');

        // If the answer is correct, add the completed task to the list
        setCompletedTasks([...completedTasks, currentTask]);

        // Move to the next task if it's not the last one
        if (currentTaskIndex + 1 < initialTasks.length) {
          setCurrentTaskIndex(currentTaskIndex + 1);
        } else {
          // All tasks are completed
          setAllTasksCompleted(true);
        }
      } else {
        setValidationMessage('Try Again.');
        setValidationColor('red');
      }

      setIsOutputVisible(true); // Show the output column here
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setValidationMessage('Try Again.');
      setValidationColor('red');
    }
  };

  const handleNextTaskClick = () => {
    // Store the user's input for the current task
    const updatedUserInputs = [...userInputs];
    updatedUserInputs[currentTaskIndex] = code;
    setUserInputs(updatedUserInputs);

    // Move to the next task
    setCurrentTaskIndex(currentTaskIndex + 1);

    // Reset the code editor content to the initial code of the next task
    setCode(initialCode);

    // Hide the "Next Task" button until the next task is completed
    setShowNextTask(false);
  };

  useEffect(() => {
    // Check if all tasks are complete
    if (completedTasks.length === initialTasks.length) {
      // All tasks are complete, show the "Next Task" button and "GREAT JOB" message
      setShowNextTask(true);
      setAllTasksCompleted(true);
    }
  }, [completedTasks]);

  return (
    <div className="App">
      <h1>React Code Editor</h1>
      <div className="row">
        <div className="column">
          <h2>Completed Tasks</h2>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id}>{task.description}</li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Task</h2>
          {allTasksCompleted ? (
            <p style={{ color: 'green' }}>GREAT JOB!</p>
          ) : (
            <p>{currentTask.description}</p>
          )}
        </div>
        <div className="column">
          <h2>Editor</h2>
          <CodeEditor code={code} onChange={handleCodeChange} />
          <button onClick={handleRunClick}>Run</button>
          <div style={{ color: validationColor, paddingTop: "20px" }}>{validationMessage}</div>
          {showNextTask && (
            <button onClick={handleNextTaskClick}>Next Task</button>
          )}
        </div>
        <div className={`column ${isOutputVisible ? '' : 'hidden'}`}>
          <h2>Output</h2>
          {isOutputVisible && <div dangerouslySetInnerHTML={{ __html: output }}></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
