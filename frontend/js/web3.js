// Web3.js integration
let web3;
let contract;
let userAccount;

console.log('web3.js script loaded');

// ===============================
// CHECK WEB3
// ===============================
function initWeb3() {

    if (typeof window.ethereum !== "undefined") {

        web3 = new Web3(window.ethereum);

        return true;

    } else {

        alert("Vui lòng cài MetaMask");

        return false;

    }

}

// ===============================
// SWITCH TO GANACHE NETWORK
// ===============================
async function switchToGanache() {

    const ganacheChainId = "0x539"; // 1337 in hex

    try {

        const currentChainId = await window.ethereum.request({
            method: "eth_chainId"
        });

        if (currentChainId !== ganacheChainId) {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: ganacheChainId }]
            });

            console.log("Switched to Ganache");

        }

    } catch (error) {

        console.log("Ganache network chưa tồn tại → thêm mới");

        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x539",
                chainName: "Ganache Local",
                rpcUrls: ["http://127.0.0.1:7545"],
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                }
            }]
        });

    }

}

// ===============================
// CONNECT WALLET
// ===============================
async function connectWallet() {

    if (!initWeb3()) return;

    try {

        await switchToGanache();

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if (!accounts || accounts.length === 0) {
            alert("Không có tài khoản MetaMask được phát hiện!");
            return;
        }

        userAccount = accounts[0];

        console.log("Connected wallet:", userAccount);

        // Don't update UI here - let the calling page handle it
        // updateWalletStatus(userAccount);

        alert("✅ Kết nối ví thành công!");

    } catch (error) {

        console.error("Connect wallet error:", error);
        alert("❌ Kết nối ví thất bại: " + error.message);

    }

}

// ===============================
// SWITCH WALLET
// ===============================
async function switchWallet() {

    try {

        await switchToGanache();

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if (!accounts || accounts.length === 0) {
            alert("Không có tài khoản MetaMask được phát hiện!");
            return;
        }

        userAccount = accounts[0];

        console.log("Switched wallet:", userAccount);

        // Don't update UI here - let the calling page handle it
        // updateWalletStatus(userAccount);

        alert("✅ Chuyển ví thành công!");

    } catch (error) {

        console.error("Switch wallet error:", error);
        alert("❌ Chuyển ví thất bại: " + error.message);

    }

}

// ===============================
// LISTEN ACCOUNT CHANGE
// ===============================
if (typeof window.ethereum !== "undefined") {

    window.ethereum.on("accountsChanged", function (accounts) {

        console.log("Account changed:", accounts);

        if (accounts.length > 0) {
            userAccount = accounts[0];
        } else {
            userAccount = null;
        }

    });

    window.ethereum.on("chainChanged", function () {

        console.log("Network changed");

        window.location.reload();

    });

}

// ===============================
// LOAD CONTRACT
// ===============================
// NOTE: loadContract() has been replaced with getContract() from contract.js
// The contract is now loaded from contract.js which has the full ABI

// async function loadContract() {
//     if (!web3 || !userAccount) {
//         console.error("Web3 hoặc ví chưa kết nối");
//         return;
//     }
//     // Now using getContract() from contract.js instead
// }

// ===============================
// PAGE LOAD
// ===============================
window.addEventListener("load", function () {

    console.log("Page loaded - initializing Web3");

    if (!initWeb3()) {
        console.log("Web3 initialization failed");
        return;
    }

    userAccount = null;
    console.log("Web3 initialized successfully");

});

