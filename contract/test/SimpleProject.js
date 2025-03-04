const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs"); // Import anyValue

describe("SimpleProject", function () {
  let SimpleProject, simpleProject, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    SimpleProject = await ethers.getContractFactory("SimpleProject");
    simpleProject = await SimpleProject.deploy();
  });

  it("Should create a project", async function () {
    await expect(simpleProject.createProject("Test Project", "This is a test"))
      .to.emit(simpleProject, "ProjectCreated")
      .withArgs(0, owner.address, "Test Project", "This is a test", anyValue); // Use anyValue here

    const project = await simpleProject.getProject(0);
    expect(project.title).to.equal("Test Project");
    expect(project.description).to.equal("This is a test");
  });

  it("Should get all projects", async function () {
    await simpleProject.createProject("Project 1", "Description 1");
    await simpleProject.createProject("Project 2", "Description 2");

    const allProjects = await simpleProject.getAllProjects();
    expect(allProjects.length).to.equal(2);
    expect(allProjects[0].title).to.equal("Project 1");
    expect(allProjects[1].title).to.equal("Project 2");
  });
});
