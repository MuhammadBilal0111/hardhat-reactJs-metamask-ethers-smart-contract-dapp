import { useState } from "react";
import "./App.css";
import { createProject, loadProjects } from "./services/blockchain";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]); // State to store projects

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    await createProject({ title, description }); // Create a new project
    const formattedProjects = await loadProjects(); // Fetch updated projects
    setProjects(formattedProjects); // Update state with the new projects
  };

  return (
    <div className="container">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Create
          </button>
        </form>

        {/* Display the list of projects */}
        <div className="projects-list">
          <h2>Projects</h2>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
