import { useState, useEffect } from "react";
import useSdk from "@inscrib3/react";
import gif from './assets/gif.gif';

const App = () => {
  const sdk = useSdk('signet');

  const [mintRes, setMintRes] = useState<{ txid: string }>();
  const [dropInfo, setDropInfo] = useState<{
    name: string;
    symbol: string;
    description: string;
    icon: string;
    price: string;
    recipientAddress: string;
    recipientPublicKey: string;
    supply: string;
    minting: string;
    minted: string;
  }>();

  // Recupera le informazioni sul drop quando il wallet è connesso
  useEffect(() => {
    const fetchDropInfo = async () => {
      if (sdk.wallet.paymentAddress && sdk.wallet.recipientAddress) {
        try {
          // Carica informazioni dal drop specifico
          const drop = await sdk.drops.read('67ed49c75f5fdede4200cd76');
          setDropInfo(drop);
          console.log("Drop info:", drop);
        } catch (error) {
          console.error("Error fetching drop info:", error);
        }
      }
    };

    // Esegue la query solo quando il wallet è connesso
    if (sdk.wallet.recipientAddress) {
      fetchDropInfo();
    }
  }, [sdk.wallet.recipientAddress, sdk.wallet.paymentAddress]);

  return (
    <div className="min-h-screen bg-black">
      <nav className="container mx-auto py-6 px-6">
        <div className="container mx-auto flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-white">Grifters by Xcopy on BTC</h1>
          <ul className="flex space-x-6">
            <li>
              <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors" onClick={() => sdk.wallet.connect()}>{sdk.wallet.recipientAddress ? sdk.wallet.recipientAddress : 'Connect Wallet'}</button>
            </li>
          </ul>
        </div>
      </nav>

      <section className="container mx-auto my-12 px-6">
        <div className="grid grid-cols-5 gap-6">
          <div className="card col-span-2 bg-black text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <div>
                <img src={gif} alt="Grifters GIF" className="w-full h-auto" />
              </div>
            </div>
          </div>
          <div className="card col-span-3 bg-black text-primary-content card-lg shadow-sm">
            <div className="card-body flex flex-col">
              <h2 className="text-xl font-bold text-white mb-4">Grifter gonna grift! </h2>
              <h3 className="text-l font-bold text-white mb-4">Free mint with self inscription</h3>
              <h5 className="text-s font-bold text-white mb-4">
              NO RIGHTS RESERVED, XCOPY works are licensed <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="blank" className="text-orange-500 hover:underline">CC0</a>.
              </h5>
              
              {/* Visualizza informazioni sugli NFT solo se il wallet è connesso e le informazioni sono disponibili */}
              {sdk.wallet.recipientAddress && dropInfo && (
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-bold mb-2">Drop Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400">Total Supply:</p>
                      <p className="text-white font-semibold">{dropInfo.supply}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Minted:</p>
                      <p className="text-white font-semibold">{dropInfo.minted}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Minting:</p>
                      <p className="text-white font-semibold">{dropInfo.minting}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Available:</p>
                      <p className="text-white font-semibold">
                        {parseInt(dropInfo.supply) - parseInt(dropInfo.minted) - parseInt(dropInfo.minting)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-orange-500 h-2" 
                        style={{ 
                          width: `${(parseInt(dropInfo.minted) / parseInt(dropInfo.supply)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">0</span>
                      <span className="text-xs text-gray-400">{dropInfo.supply}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {!!mintRes && (
                <div className="mockup-code w-full mb-6">
                  <pre data-prefix="$"><code>{JSON.stringify(mintRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="w-full mt-auto">
                <button 
                  disabled={
                    !sdk.wallet.paymentAddress || 
                    !sdk.wallet.recipientAddress || 
                    (dropInfo && (parseInt(dropInfo.minted) + parseInt(dropInfo.minting) >= parseInt(dropInfo.supply)))
                  } 
                  className="btn w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={async () => {
                    try {
                      // Esegui il mint
                      const result = await sdk.drops.mint('67ed49c75f5fdede4200cd76');
                      setMintRes(result);
                      
                      // Dopo il mint, aggiorna le informazioni del drop
                      const updatedDrop = await sdk.drops.read('67ed49c75f5fdede4200cd76');
                      setDropInfo(updatedDrop);
                      console.log("Drop info updated after mint:", updatedDrop);
                    } catch (error) {
                      console.error("Error during mint or update:", error);
                    }
                  }}
                >
                  {dropInfo && (parseInt(dropInfo.minted) + parseInt(dropInfo.minting) >= parseInt(dropInfo.supply)) 
                    ? "Sold Out" 
                    : "Mint your Grifter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;