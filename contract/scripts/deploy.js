const hre = require("hardhat");
const fs = require("fs"); // Import the fs module
async function main() {
  // Get the contract factory
  const SimpleProject = await hre.ethers.getContractFactory("SimpleProject");

  // Deploy the contract
  const simpleProject = await SimpleProject.deploy();

  // Wait for the deployment to complete
  await simpleProject.waitForDeployment();

  // Get the contract address
  const contractAddress = await simpleProject.getAddress();

  // Create a JSON object with the contract address
  const address = JSON.stringify({ address: contractAddress }, null, 4);
  console.log("contract Address", address);

  // Write the contract address to the file
  fs.writeFileSync("./abis/contractAddress.json", address);
  // console.log("Deployed contract address:", contractAddress);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
