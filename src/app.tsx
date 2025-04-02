import { useState } from "react";
import useSdk from "@inscrib3/react";
import gif from './assets/gif.gif';

const App = () => {
  const sdk = useSdk();

  const [mintRes, setMintRes] = useState<{ txid: string }>();


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
              NO RIGHTS RESERVED, XCOPY works are licensed <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="blank">CC0</a>.
              </h5>
              
              
              {!!mintRes && (
                <div className="mockup-code w-full mb-6">
                  <pre data-prefix="$"><code>{JSON.stringify(mintRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="w-full mt-auto">
                <button 
                  disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} 
                  className="btn w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors" 
                  onClick={async () => setMintRes(await sdk.drops.mint('67ea65c49c6f49413f06d21b'))}
                >
                  Mint your Grifter
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