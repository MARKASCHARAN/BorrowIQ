// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InterestRateModel {

    uint256 public constant HIGH_RISK_RATE = 18;
    uint256 public constant MEDIUM_RISK_RATE = 12;
    uint256 public constant LOW_RISK_RATE = 7;

    function getInterestRate(uint256 creditScore) public pure returns (uint256) {

        require(creditScore <= 100, "Invalid credit score");

        if (creditScore >= 71) {
            return LOW_RISK_RATE;
        }

        if (creditScore >= 41) {
            return MEDIUM_RISK_RATE;
        }

        return HIGH_RISK_RATE;
    }
}