// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private randomNumber;

    event NewWave(address indexed sender, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        randomNumber = (block.number + block.difficulty) % 100;
    }

    function wave(string memory message) public {
        if ((lastWavedAt[msg.sender] + 15 minutes) > block.timestamp) {
            revert("Wait at least 15 minutes between waves");
        }

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves = totalWaves + 1;

        randomNumber = (block.number + block.difficulty + randomNumber) % 100;
        console.log("updated seed %d", randomNumber);

        waves.push(Wave(msg.sender, message, block.timestamp));

        if (randomNumber <= 50) {
            console.log("Waver %s won", msg.sender);
            uint256 prize = 0.001 ether;

            if (prize > address(this).balance) {
                revert("Contract funds is insufficient to grant prize");
            }

            (bool sent, ) = (msg.sender).call{value: prize}("");

            require(sent, "Failed to send prize");
        }

        emit NewWave(msg.sender, block.timestamp, message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getWaveCount() public view returns (uint256) {
        return totalWaves;
    }
}
