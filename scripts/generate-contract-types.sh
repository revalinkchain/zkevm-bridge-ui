#/bin/bash

# Generate Price Oracle contract types
npx typechain --target ethers-v5 --out-dir src/types/contracts/uniswap-quoter "abis/uniswap-quoter.json"
