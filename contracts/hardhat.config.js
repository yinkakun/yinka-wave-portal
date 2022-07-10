require('@nomiclabs/hardhat-waffle');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/PtEBnSVcwjAuB-zt-O1gqXEDOZ3Y1-0L',
      accounts: [
        '1dd5262896ba46195e631119afb1fcd30712b84d9fa439adce7c0fb27c195380',
      ],
    },
  },
};
