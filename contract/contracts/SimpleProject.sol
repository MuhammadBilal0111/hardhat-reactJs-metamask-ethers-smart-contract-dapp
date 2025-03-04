// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleProject {
    // Struct to represent a project
    struct Project {
        uint id;
        address owner;
        string title;
        string description;
        uint timestamp;
    }

    // Array to store all projects
    Project[] public projects;

    // Mapping to check if a project exists
    mapping(uint => bool) public projectExists;

    // Event to emit when a project is created
    event ProjectCreated(
        uint id,
        address owner,
        string title,
        string description,
        uint timestamp
    );

    // Function to create a new project
    function createProject(
        string memory _title,
        string memory _description
    ) public returns (uint) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        uint projectId = projects.length;
        Project memory newProject = Project({
            id: projectId,
            owner: msg.sender,
            title: _title,
            description: _description,
            timestamp: block.timestamp
        });

        projects.push(newProject);
        projectExists[projectId] = true;

        emit ProjectCreated(
            projectId,
            msg.sender,
            _title,
            _description,
            block.timestamp
        );

        return projectId;
    }

    // Function to get a project by ID
    function getProject(uint _id) public view returns (Project memory) {
        require(projectExists[_id], "Project does not exist");
        return projects[_id];
    }

    // Function to get all projects
    function getAllProjects() public view returns (Project[] memory) {
        return projects;
    }
}
