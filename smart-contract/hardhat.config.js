require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */

const POLYGON_URL = "https://polygon-mumbai.g.alchemy.com/v2/fZrknTXjEYJctRct3O_33StLOBfWPnH5";
const PRIVATE_KEY = "0557de1e1e79c92dee76597c59e3a8333526f2b047e854de611571ecf5c12634";
module.exports = {
  networks: {
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true
    }
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

}