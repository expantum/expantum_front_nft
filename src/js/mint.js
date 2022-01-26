import { abi } from './abi-mint';
const infuraId = 'f9c604b0fdfe48e1b6e040eb05ba75ec';
const contractAddress = '0xEdc7Fb3b31c56Eb283289833BA62486EADb0AAdE';
const chainId = 1;
const maxNft = 1;

const mintModalScript = () => {
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;

    var mintSetNumberButtons = document.querySelectorAll('.mint-set-number-btn');
    var input = document.querySelector('.counter__field');
    var plus = document.querySelector('.counter__plus');
    var minus = document.querySelector('.counter__minus');
    var connectButton = document.getElementById('connect__button');
    var mintButton = document.getElementById('mint__button');
    var mintPausedButton = document.getElementById('mint__button__isPaused');

    const mintFormSetInput = (number) => {
        input.value = number;
    };
    const mintFormIncreaseInput = () => {
        if (input.value.length > 0 && Number(input.value) < maxNft) {
            input.value = Number(input.value) + 1;
        } else if (Number(input.value) >= maxNft) {
            input.value = maxNft;
        } else {
            input.value = 1;
        }
    };
    const mintFormDecreaseInput = () => {
        if (input.value.length > 0 && Number(input.value) > 1) {
            input.value = Number(input.value) - 1;
        } else {
            input.value = 1;
        }
    };
    const preventNegativeNumber = () => {
        if (Number(input.value) < 1) {
            input.value = 1;
        }
    };

    input.onchange = () => preventNegativeNumber();
    mintSetNumberButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            mintFormSetInput(btn.getAttribute('data-value'));
        });
    });
    minus.onclick = () => mintFormDecreaseInput();
    plus.onclick = () => mintFormIncreaseInput();

    // login
    let provider;
    let web3;

    const checkPaused = async () => {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const paused = await contract.methods.getPause().call();
        if (!paused) {
            mintButton.style.display = 'flex';
            mintPausedButton.style.display = 'none';
        }
        if (paused) {
            mintButton.style.display = 'none';
            mintPausedButton.style.display = 'flex';
        }
        return paused;
    };

    let isPaused = true;
    const interval = setInterval(async () => {
        // isPaused = .......
        if (web3) {
            const issPaused = await checkPaused();
            if (!issPaused) {
                clearInterval(interval);
            }
        }
    }, 10000);

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: infuraId,
                chainId: chainId,
            },
        },
    };

    const checkLogin = async () => {
        if (!provider || !web3) {
            connectButton.style.display = 'flex';
            mintButton.style.display = 'none';
            mintPausedButton.style.display = 'none';
        } else {
            connectButton.style.display = 'none';
            checkPaused();
        }
    };
    window.onload = () => checkLogin();

    const fetchAccountData = () => {
        web3 = new Web3(provider);
        checkPaused();
        checkLogin();
    };

    const login = async () => {
        const web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
            disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
        });

        try {
            provider = await web3Modal.connect();
            console.log('provider', provider);
            if (provider.chainId === '0x' + chainId.toString(16)) {
                web3 = new Web3(provider);
            } else {
                const res = await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x' + chainId.toString(16) }], // chainId must be in hexadecimal numbers
                });
                console.log('res', res);
            }
        } catch (e) {
            console.log('Could not get a wallet connection', e);
            return;
        }

        provider.on('accountsChanged', (accounts) => {
            fetchAccountData();
        });
        provider.on('chainChanged', (chainId) => {
            fetchAccountData();
        });
        provider.on('networkChanged', (networkId) => {
            fetchAccountData();
        });
        checkPaused();
        checkLogin();

        // await refreshAccountData();
    };

    const mint = async () => {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const account = provider.selectedAddress;
        let amount;

        if (Number(input.value) > 0 && Number(input.value) <= maxNft) {
            amount = Number(input.value);
        } else if (Number(input.value) < 1) {
            input.value = 1;
            amount = 1;
        } else if (Number(input.value) > maxNft) {
            input.value = maxNft;
            amount = maxNft;
        }

        try {
            const isPaused = await contract.methods.getPause().call();
            const cost = await contract.methods.cost().call();
            if (isPaused) {
                return alert('Mint is paused');
            }
            contract.methods.mint(amount).send({
                value: cost * amount,
                from: account,
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    connectButton.onclick = () => login();
    mintButton.onclick = () => mint();
};
export default mintModalScript;
