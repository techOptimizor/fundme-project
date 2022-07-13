import { ethers } from "./ethers_min.js"
import { abi, contractAddress } from "./constants.js"
const connectbt = document.getElementById("con")
connectbt.onclick = connect
const fundm = document.getElementById("fundM")
fundm.onclick = fund
const balanceof = document.getElementById("getbalance")
const withdrawbal = document.getElementById("withdraw")
balanceof.onclick = getbalance
withdrawbal.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectbt.textContent = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectbt.textContent = "Please install metamask"
    }
}

async function fund() {
    const ethamount = document.getElementById("valueeth").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const getSign = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, getSign)
        try {
            const transresp = await contract.fund({
                value: ethers.utils.parseEther(ethamount),
            })
            await listener(transresp, provider)
            console.log("Done")
            const owner = await contract.i_owner()
            console.log(owner)
        } catch (error) {
            console.log(error)
        }
    }
}
function listener(transresp, provider) {
    console.log(`mining ${transresp.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(transresp.hash, (transrecp) => {
            console.log(
                `completed with ${transrecp.confirmations} comfirmation`
            )
            resolve()
        })
    })
}

async function getbalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        const manbal = await ethers.utils.formatEther(balance)
        document.getElementById("balance").textContent = ` Balance:${manbal}`
    }
}

async function withdraw() {
    console.log("withdrawing...")
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const getSign = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, getSign)
        try {
            const transresp = await contract.withdraw()
            await listener(transresp, provider)
            console.log("Done")
        } catch (error) {
            console.log(error)
        }
    }
}
