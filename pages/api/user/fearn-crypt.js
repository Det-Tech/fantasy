import nextConnect from 'next-connect';
import FearnContract from '../../../lib/abi/fearn';

const handler = nextConnect();

handler.post(async (req, res)=>{
    
    const rpcUrl = `https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`;
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const CoinContract = new ethers.Contract(FearnContract.maticnet,FearnContract.abi,provider);

    const adminaccount = {
        publicKey:process.env.NEXT_PUBLIC_ADMINADDRESS,
        privateKey:process.env.NEXT_PUBLIC_ADMINPRIVATEKEY
    }


    const adminWallet = new ethers.Wallet(adminaccount.privateKey, provider);

    const SignedCoinContract = CoinContract.connect(adminWallet);
    var amount = Number(req.body.amount).toFixed(0);
    var tx =await SignedCoinContract.transfer(req.body.address,ethers.utils.parseUnits(amount.toString(),coin.decimals));
    if(tx!=null) {
      await tx.wait()   
      res.json({data:tx})
    }
})

export default handler;