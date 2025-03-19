import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [
        process.env.PRIVATE_KEY || '', 
      ],
    },
  },
};

export default config;
