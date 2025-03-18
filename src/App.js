import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/TaskManager.json";
import './App.css';

const contractAddress = "0x649711Ffd299A2B40a4E9141b3ab84300DAE5dA1";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(newProvider);
          
          // Check if already connected
          const accounts = await newProvider.listAccounts();
          if (accounts.length > 0) {
            handleConnected(accounts[0].address, newProvider);
          }

          // Setup event listeners
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
              handleConnected(accounts[0], newProvider);
            } else {
              handleDisconnected();
            }
          });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      }
    };

    initializeProvider();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  const handleConnected = async (accountAddress, provider) => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TaskManager.abi, signer);
      setContract(contract);
      setAccount(accountAddress);
      fetchTasks(contract);
    } catch (error) {
      console.error("Error connecting:", error);
      alert(`Connection error: ${error.reason || error.message}`);
    }
  };

  const handleDisconnected = () => {
    setAccount(null);
    setContract(null);
    setTasks([]);
  };

  async function fetchTasks(contract) {
    try {
      const allTasks = await contract.getAllTasks();
      const validTasks = allTasks.filter(task => task.id.toString() !== "0");
      setTasks(validTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Error loading tasks. Please try refreshing.");
    }
  }

  async function addTask() {
    if (!contract) return;
    
    try {
      const tx = await contract.addTask(title, description);
      await tx.wait();
      await fetchTasks(contract);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert(`Error adding task: ${error.reason || error.message}`);
    }
  }

  async function markAsCompleted(taskId) {
    if (!contract) return;
    
    try {
      const tx = await contract.markTaskCompleted(taskId);
      await tx.wait();
      await fetchTasks(contract);
    } catch (error) {
      console.error("Error completing task:", error);
      alert(`Error completing task: ${error.reason || error.message}`);
    }
  }

  async function editTask(taskId, newTitle, newDescription) {
    if (!contract || !newTitle || !newDescription) return;
    
    try {
      const tx = await contract.editTask(taskId, newTitle, newDescription);
      await tx.wait();
      await fetchTasks(contract);
    } catch (error) {
      console.error("Error editing task:", error);
      alert(`Error editing task: ${error.reason || error.message}`);
    }
  }

  async function deleteTask(taskId) {
    if (!contract) return;
    
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const tx = await contract.deleteTask(taskId);
      await tx.wait();
      await fetchTasks(contract);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(`Error deleting task: ${error.reason || error.message}`);
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      await handleConnected(accounts[0], provider);
    } catch (error) {
      console.error("Connection error:", error);
      if (error.code === 4001) {
        alert("Please connect your wallet to continue");
      }
    }
  }

  function disconnectWallet() {
    handleDisconnected();
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <div className="wallet-section">
        {account ? (
          <div className="connected-account">
            <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
            <button className="disconnect-button" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      <div className="task-input">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id.toString()} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-status">
              {task.completed ? (
                <span className="completed">Completed</span>
              ) : (
                <span className="pending">Pending</span>
              )}
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button 
                  className="complete-btn" 
                  onClick={() => {
                    if (window.confirm("Mark this task as completed?")) {
                      markAsCompleted(task.id);
                    }
                  }}
                >
                  Complete
                </button>
              )}
              <button 
                className="edit-btn" 
                onClick={() => {
                  const newTitle = prompt("New Title:", task.title);
                  const newDesc = prompt("New Description:", task.description);
                  editTask(task.id, newTitle, newDesc);
                }}
              >
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;