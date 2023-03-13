require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config()
module.exports = {
  solidity: "0.8.9",
  networks: {
    polygon: {
      url: process.env.API_URL,
      accounts: [process.env.SECRET_KEY],
    }
  }
};;

