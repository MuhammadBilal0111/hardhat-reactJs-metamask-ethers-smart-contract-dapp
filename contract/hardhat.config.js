require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env file

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY; // go to metamask and go to Acoount Details and find the generate the Private key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY; // create account and navigate to dashboard
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_TOKEN;

// To deploy the contract in the sepolia network use this command
// npx hardhat run scripts/deploy.js --network sepolia
module.exports = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  sourcify: {
    enabled: false, // Disable Sourcify verification
  },
};
