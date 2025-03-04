import { ethers, parseEther } from "ethers";
import address from "../../../contract/abis/contractAddress.json";
import abi from "../../../contract/artifacts/contracts/SimpleProject.sol/SimpleProject.json";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

// ABI (Application Binary Interface): The ABI is a JSON file that describes how to interact with the contract.
const connectWallet = async () => {
  try {
    if (!ethereum) {
      console.log("Make sure you have metamask installed!");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("account address", accounts[0]?.toLowerCase());
    return accounts[0]?.toLowerCase(); // return account address
  } catch (error) {
    reportError(error);
  }
};
// getting ethereum contract
const getEtheriumContract = async () => {
  const connectedAccount = await connectWallet();
  if (connectedAccount) {
    const provider = new ethers.BrowserProvider(ethereum);
    console.log("Provider", provider);
    const signer = await provider.getSigner();
    // ABI is like the API documentation that tells how to interact with it.
    console.log("signner", signer);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    console.log("No Account connected");
  }
};

const createProject = async ({ title, description }) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEtheriumContract();
    console.log("Contract Address:", contract);
    // cost = parseEther(cost); // convert in wei
    const tx = await contract.createProject(title, description);
    await tx.wait();
    console.log("successfully added");
  } catch (error) {
    reportError(error);
  }
};
const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEtheriumContract();
    const projects = await contract.getAllProjects();

    // contract.getAllProjects() returns a proxy
    //Why This Happens
    // When a smart contract function returns an array of structs, Ethers.js wraps the result in a Proxy object. This is done for performance and memory optimization reasons. The Proxy object allows Ethers.js to lazily decode the data only when you access it.

    const formattedProjects = projects.map((project) => ({
      id: project.id.toString(),
      title: project.title,
      description: project.description,
    }));
    // console.log("Formatted Projects:", formattedProjects);
    return formattedProjects;
  } catch (error) {
    console.error("Error calling getProjects:", error);
    reportError(error);
  }
};
export { connectWallet, createProject, loadProjects };
