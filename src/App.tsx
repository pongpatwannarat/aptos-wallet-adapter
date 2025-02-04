import { useEffect } from 'react';
// import { Button } from 'antd';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletConnector } from '@aptos-labs/wallet-adapter-mui-design';

function App() {
  function WalletContent() {
    const { connected, account, wallet } = useWallet();

    // Effect to fetch account balance or other details when connected
    useEffect(() => {
      const fetchAccountDetails = async () => {
        if (connected && account) {
          // window.ReactNativeWebView.postMessage("");
          console.log('wallet address:', account?.address);
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(account?.address);
          } else {
            console.log('ReactNativeWebView not found');
          }
        } else {
          console.log('disconnect wallet');
        }
      };

      fetchAccountDetails();
    }, [connected, account]);

    const shortenAddress = (address: string) => (address ? `${address.substring(0, 6)}....${address.slice(-5)}` : '');

    return (
      <div>
        <WalletConnector networkSupport='' />
        {connected && account && (
          <div>
            <p>
              Connected Wallet: <span style={{ color: 'blue' }}>{wallet?.name}</span>
            </p>
            <p>Account Address: {<span style={{ color: 'blue' }}>{shortenAddress(account?.address)}</span>}</p>
          </div>
        )}
        <p>{connected ? <span style={{ color: 'green' }}>Wallet connected successfully!</span> : 'Connect to your Aptos wallet.'}</p>
      </div>
    );
  }

  const optInWallets = ['Continue with Google', 'Petra'];

  return (
    <>
      <div style={{ margin: 'auto', padding: '1rem', backgroundColor: '#cccc', textAlign: 'center', height: 'calc(100vh - 2rem)' }}>
        <AptosWalletAdapterProvider autoConnect={true} optInWallets={optInWallets}>
          <WalletContent />
        </AptosWalletAdapterProvider>
      </div>
    </>
  );
}

export default App;
