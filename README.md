# @inscrib3/example
A reference implementation showcasing how to use the Inscrib3 SDK and React components to build a complete Ordinals drop management application.

## Overview

This example application demonstrates the integration of `@inscrib3/react` to create a fully functional web application for managing Ordinals drops on Bitcoin. It includes all the essential features:

- Wallet connection
- Creating new drops
- Listing all drops
- Viewing drop details
- Removing drops
- Minting from drops
- Managing file uploads

## Getting Started

### Prerequisites

- npm or yarn
- Xverse wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/inscrib3/example.git
cd example
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
example/
├── src/                  # Source code
│   ├── app.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── style.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Features

### Wallet Connection

The example uses the `useSdk` hook from `@inscrib3/react` to connect to Bitcoin wallet:

```tsx
const sdk = useSdk();

// Connect wallet
<button onClick={() => sdk.wallet.connect()}>
  {sdk.wallet.recipientAddress ? sdk.wallet.recipientAddress : 'Connect Wallet'}
</button>
```

### Creating Drops

The application provides a form to create new Ordinals drops:

```tsx
// Form inputs for drop details
<input type="text" placeholder="Name" onChange={(e) => {
  setTempDrop({ ...tempDrop, name: e.target.value });
}} />
// ... other inputs

// Create drop
<button onClick={async () => {
  if (!tempDrop || !tempDrop.name || !tempDrop.symbol || !tempDrop.description || !files || !tempDrop.price) return;
  setCreateRes(await sdk.drops.create(
    tempDrop.name, 
    tempDrop.symbol, 
    tempDrop.description, 
    files, 
    tempDrop.price
  ));
}}>Submit</button>
```

### Listing Drops

Fetch and display all drops owned by the connected user:

```tsx
<button onClick={async () => {
  setAllRes(await sdk.drops.all());
}}>Get All</button>

// Display drops
{allRes && allRes.map((drop) => (
  <div key={drop.id}>
    <h3>{drop.name}</h3>
    <p>{drop.description}</p>
    {/* ... */}
  </div>
))}
```

### Viewing Drop Details

Fetch and display details for a specific drop:

```tsx
<input type="text" placeholder="Drop ID" onChange={(e) => {
  setTempDrop({ ...tempDrop, id: e.target.value });
}} />

<button onClick={async () => {
  if (!tempDrop || !tempDrop.id) return;
  setReadRes(await sdk.drops.read(tempDrop.id));
}}>Get Drop</button>
```

### Minting from Drops

The application demonstrates how to mint from a drop:

```tsx
<button onClick={async () => {
  if (!tempDrop || !tempDrop.id) return;
  setMintRes(await sdk.drops.mint(tempDrop.id));
}}>Mint</button>
```

### Managing Uploads

The example shows how to upload files to a drop and manage them:

```tsx
// Upload files
<button onClick={async () => {
  if (!tempDrop || !tempDrop.id || !files) return;
  setUpdateUploadsRes(await sdk.drops.uploads.update(tempDrop.id, files));
}}>Upload</button>

// List uploads
<button onClick={async () => {
  if (!tempDrop || !tempDrop.id) return;
  setAllUploadsRes(await sdk.drops.uploads.all(tempDrop.id));
}}>Get All Uploads</button>

// Remove uploads
<button onClick={async () => {
  if (!tempDrop || !tempDrop.id || !tempDrop.files) return;
  setRemoveUploadsRes(await sdk.drops.uploads.remove(tempDrop.id, tempDrop.files));
}}>Remove</button>
```

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build:

```bash
npm run preview
```

## License

MIT

