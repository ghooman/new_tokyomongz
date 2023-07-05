const MzcAbi = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "string",
        name: "name_",
        internalType: "string",
      },
      {
        type: "string",
        name: "symbol_",
        internalType: "string",
      },
      {
        type: "uint8",
        name: "decimals_",
        internalType: "uint8",
      },
      {
        type: "uint256",
        name: "initialBalance_",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "taxFeePerMille_",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "taxAddress_",
        internalType: "address",
      },
      {
        type: "bytes",
        name: "signature_",
        internalType: "bytes",
      },
      {
        type: "address",
        name: "feeReceiver_",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        type: "address",
        name: "from",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "subtractedValue",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "addedValue",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isExcludedFromTaxFee",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
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
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setExclusionFromTaxFee",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
      {
        type: "bool",
        name: "status",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTaxAddress",
    inputs: [
      {
        type: "address",
        name: "taxAddress",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTaxFeePerMille",
    inputs: [
      {
        type: "uint256",
        name: "taxFeePerMille",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "taxAddress",
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
    name: "taxFeePerMille",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        type: "address",
        name: "from",
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export default MzcAbi;
