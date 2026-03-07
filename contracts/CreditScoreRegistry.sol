// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreditScoreRegistry {

    address public owner;
    address public loanManager;

    mapping(address => uint256) public creditScores;

    event ScoreUpdated(address user, uint256 score);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || msg.sender == loanManager,
            "Not authorized"
        );
        _;
    }

    function setLoanManager(address _loanManager) external {
        require(msg.sender == owner, "Not owner");
        loanManager = _loanManager;
    }

    function updateScore(address user, uint256 score) external onlyAuthorized {
        require(score <= 100, "Invalid score");
        creditScores[user] = score;
        emit ScoreUpdated(user, score);
    }

    function getScore(address user) external view returns (uint256) {
        return creditScores[user];
    }
}