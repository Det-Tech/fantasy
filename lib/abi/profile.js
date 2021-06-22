const ProfileContract = {
    kovan:"0xF21419616547630211BbC6A66589267231279f84",
    abi:[
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
        }
    ]
}

export default ProfileContract;