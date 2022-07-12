const networkconfig = {
    4: {
        name: "rinkeby",
        ethusd: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    // 137:{
    //     name :"polygone"
    // }
}

const deve = ["hardhat", "localhost"]
const decimal = 8
const initial_answer = 200000000000
module.exports = {
    networkconfig,
    deve,
    decimal,
    initial_answer,
}
