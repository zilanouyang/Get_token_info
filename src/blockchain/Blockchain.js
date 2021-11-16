import Web3 from 'web3';
import ERC20_ABI from '../abis/erc20.json'
export default class BlockchainClient {
    constructor(tokenAddress, chainType){
        const web3 = chainType === 'ethereum' ? new Web3(Web3.givenProvider) : new Web3('https://bsc-dataseed1.binance.org:443');
        let abtract = ERC20_ABI
        this.tokenAddress = tokenAddress;
        this.tokenInstance = new web3.eth.Contract(abtract, tokenAddress);
    }
    async getTokenName() {
        // console.log(this.tokenInstance)
        const tokenName = await this.tokenInstance.methods.name().call();
        console.log(tokenName);
        return tokenName;
    }
}