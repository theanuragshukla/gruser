import React, { useState, useEffect, useContext, useCallback } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { UserContext } from "../utils/UserContext";

function Navbar() {
  let [accountChanged, setAccChange] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const PolygonChainId = "0x13881";

      if (chainId !== PolygonChainId) {
        alert("You are not connected to the Polygon Testnet!");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setUser({
        connected: true,
        address: accounts[0],
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      setUser({
        connected: false,
      });

      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    if (window.ethereum)
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccChange((prev) => {
          return !prev;
        });
      });
    else
      alert(
        "No Ethereum wallet detected\nThe website may not work as expected\nPlease install Metamask"
      );
  }, []);

  const getAccount = useCallback(async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setUser({
        connected: true,
        address: accounts[0],
      });
      setCurrentAccount(accounts[0]);
    } else {
      setUser({
        connected: false,
        address: null,
      });
      setCurrentAccount("wallet not connected");
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, [accountChanged]);

  const disconnectwallet = () => {};

  return (
    <Flex
      bg="red.200"
      minH={"50px"}
      justify="space-between"
      align={"center"}
      p={2}
    >
      <Heading fontWeight={500}>GrUser</Heading>
      <Button onClick={user.connected ? () => {} : connectWallet}>
        {user.connected
          ? `${user.address.toString().substring(0, 5)}...${user.address
              .toString()
              .substring(38, 42)}`
          : "Connect"}
      </Button>
    </Flex>
  );
}

export default Navbar;
