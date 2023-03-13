const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cid",
        type: "bytes32",
      },
    ],
    name: "added",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cid",
        type: "bytes32",
      },
    ],
    name: "updated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_cid",
        type: "bytes32",
      },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = abi;
