// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("I'm a contract that happens to be smart!");
    }

    function wave() public {
      totalWaves = totalWaves + 1;
      console.log("%s waved at you!", msg.sender);
    }

    function getWaveCount() public view returns (uint256) {
      console.log("Total waves:", totalWaves);
      return totalWaves;
    }
}
