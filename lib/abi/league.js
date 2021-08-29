const LeagueContract = {
    kovan:"0x54224cC8e8c4477F557C935d28610E993d56AFcd",
    abi: [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "id",
					"type": "string"
				}
			],
			"name": "Create",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_key",
					"type": "string"
				}
			],
			"name": "Join",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_key",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "first",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "second",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "third",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "loadflag",
					"type": "bool"
				}
			],
			"name": "Update",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"name": "childId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_key",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_startWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_endWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_amount",
					"type": "string"
				}
			],
			"name": "create",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_key",
					"type": "string"
				}
			],
			"name": "getJoiner",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "id",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "joinerByKey",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "leagueChild",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "leaguesByAddress",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "key",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "startWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "endWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "amount",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "first",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "second",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "third",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "loadflag",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "leaguesById",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "key",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "startWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "endWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "amount",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "first",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "second",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "third",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "loadflag",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"name": "leaguesByKey",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "key",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "startWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "endWeek",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "amount",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "first",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "second",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "third",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "loadflag",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}

export default LeagueContract;