const contractAddress = process.env.ContractAddress;
const PORT = process.env.PORT || 3001;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const MONGO_URL = process.env.MONGO_URL
const contractAbi = require("./abi");

require("dotenv").config();
require('./connection')(MONGO_URL)
const express = require("express");
const app = express();
const { ethers } = require("ethers");
const http = require("http").Server(app);
const axios = require("axios");

const {userSchema} = require('./model')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ status: true });
});

app.get("/upload-to-ipfs", async (req, res) => {
  const { userProfile } = req.body;
  try {
    const cid = uploadToIPFS(userProfile);
    res.json({ status: true, cid });
  } catch (e) {
    console.log(e);
    res.json({ status: false });
  }
});

async function uploadToIPFS(obj) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const res = await axios.post(
    url,
    {
      pinataMetadata: {
        name: "user",
      },
      pinataContent: obj,
    },
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    }
  );
  const cid = res.data.IpfsHash;
  return cid;
}

async function unPinCID(cid) {
  var config = {
    method: "delete",
    url: "https://api.pinata.cloud/pinning/unpin/" + cid,
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
  };
  const res = await axios(config);
  console.log(res.data);
}

async function getAllLogs() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com"
  );
  const latestBlockNumber = await provider.getBlockNumber();
  console.log(latestBlockNumber);
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  for (let i = 1; i <= latestBlockNumber; i++) {
    const block = await provider.getBlock(i);
    const events = await contract.queryFilter("*", block.number, block.number);

    events.forEach((event) => {
      console.log(event);
    });
  }
}

const server = http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
