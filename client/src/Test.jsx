import { Heading } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useEffect } from "react";
const ContractAddress = process.env.ContractAddress;
const abi = require("./abi");
function Test() {
  const setCid = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const pubKey = ethers.utils.computePublicKey(address);
        console.log(pubKey);

        {
          /*
           *const TaskContract = new ethers.Contract(ContractAddress, abi, signer);
           *const transaction = await TaskContract.setCid(newCid);
           *const transactionReceipt = await transaction.wait();
           *if (transactionReceipt.status !== 1) {
           *  alert("error message");
           *  return;
           *} else {
           *  alert("done! content updated");
           *}
           */
        }
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCid();
  }, []);

  return <Heading>Test</Heading>;
}

export default Test;
