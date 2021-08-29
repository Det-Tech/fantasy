const ProfileContract = {
    kovan:"0x7Bb80C3A61acBFC20FED536E67d9a78ebC5E24c0",
    abi:[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "data",
					"type": "string"
				}
			],
			"name": "save",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getPlayersHistory",
			"outputs": [
				{
					"internalType": "string[]",
					"name": "",
					"type": "string[]"
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
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "playersHistory",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
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
			"name": "profiles",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_data",
					"type": "string"
				}
			],
			"name": "saveProfile",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_data",
					"type": "string"
				}
			],
			"name": "updatePlayers",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}

export default ProfileContract;