export const swapAbi = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "_tokenMZC",
        internalType: "address",
      },
      {
        type: "address",
        name: "_tokenMUC",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "admin",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "depositMUC",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "swapMZCForMUC",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tokenMUC",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenMZC",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawMUC",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawMZC",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
