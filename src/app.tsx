import { useState } from "react";
import useSdk from "@inscrib3/react";

const App = () => {
  const sdk = useSdk();

  const [tempDrop, setTempDrop] = useState<{
    id?: string;
    name?: string;
    symbol?: string;
    description?: string;
    price?: string;
    files?: string[];
  } | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const [createRes, setCreateRes] = useState<{ id: string }>();
  const [allRes, setAllRes] = useState<{
    id: string;
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
  }[]>();
  const [readRes, setReadRes] = useState<{
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
  const [removeRes, setRemoveRes] = useState<{ id: string }>();
  const [mintRes, setMintRes] = useState<{ txid: string }>();
  const [updateUploadsRes, setUpdateUploadsRes] = useState<{ supply: string }>();
  const [removeUploadsRes, setRemoveUploadsRes] = useState<{ supply: string }>();
  const [allUploadsRes, setAllUploadsRes] = useState<{ files: string[] }>();

  return (
    <div className="min-h-screen">
      <nav className="container mx-auto my-12 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">@inscrib3/example</h1>
          <ul className="flex space-x-6">
            <li>
              <button className="btn btn-primary" onClick={() => sdk.wallet.connect()}>{sdk.wallet.recipientAddress ? sdk.wallet.recipientAddress : 'Connect Wallet'}</button>
            </li>
          </ul>
        </div>
      </nav>

      <section className="container mx-auto my-12 px-6">
        <div className="grid gap-8">
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Create Drop</h2>
              <input type="text" placeholder="Name" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, name: e.target.value });
              }} />
              <input type="text" placeholder="Symbol" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, symbol: e.target.value });
              }} />
              <input type="text" placeholder="Description" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, description: e.target.value });
              }} />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Icon</legend>
                <input type="file" className="file-input" onChange={(e) => {
                  setFiles(e.target.files);
                }} />
                <label className="fieldset-label">Max size 100kb</label>
              </fieldset>
              <input type="text" placeholder="Price" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, price: e.target.value });
              }} />
              {!!createRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(createRes)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress || !tempDrop} className="btn" onClick={async () => {
                  if (!tempDrop || !tempDrop.name || !tempDrop.symbol || !tempDrop.description || !files || !tempDrop.price) return;
                  setCreateRes(await sdk.drops.create(tempDrop.name, tempDrop.symbol, tempDrop.description, files, tempDrop.price));
                }}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Read Drops</h2>
              {!!allRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(allRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => setAllRes(await sdk.drops.all())}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Read Drop</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              {!!readRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(readRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && setReadRes(await sdk.drops.read(tempDrop.id))}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Remove Drop</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              {!!removeRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(removeRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && setRemoveRes(await sdk.drops.remove(tempDrop.id))}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Read Drop Uploades</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              {!!allUploadsRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(allUploadsRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && setAllUploadsRes(await sdk.drops.uploads.all(tempDrop.id))}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Update Drop Uploads</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pick files</legend>
                <input multiple type="file" className="file-input" onChange={(e) => {
                  setFiles(e.target.files);
                }} />
                <label className="fieldset-label">Max size 100kb x file</label>
              </fieldset>
              {!!updateUploadsRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(updateUploadsRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && !!files && setUpdateUploadsRes(await sdk.drops.uploads.update(tempDrop.id, files))}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Remove Drop Uploads</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              <input type="text" placeholder="Files" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, files: [e.target.value] });
              }} />
              {!!removeUploadsRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(removeUploadsRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && !!tempDrop.files && setRemoveUploadsRes(await sdk.drops.uploads.remove(tempDrop.id, tempDrop.files))}>Submit</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Mint Drop</h2>
              <input type="text" placeholder="Id" className="input w-100" onChange={(e) => {
                setTempDrop({ ...tempDrop, id: e.target.value });
              }} />
              {!!mintRes && (
                <div className="mockup-code w-full">
                  <pre data-prefix="$"><code>{JSON.stringify(mintRes, undefined, 2)}</code></pre>
                </div>
              )}
              <div className="justify-end card-actions">
                <button disabled={!sdk.wallet.paymentAddress || !sdk.wallet.recipientAddress} className="btn" onClick={async () => !!tempDrop?.id && setMintRes(await sdk.drops.mint(tempDrop.id))}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
