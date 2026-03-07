// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LendingPool {

    address public owner;
    

    mapping(address => uint256) public deposits;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event LoanIssued(address indexed borrower, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    
   

    function deposit() external payable {
    require(msg.value > 0, "Deposit must be > 0");

    deposits[msg.sender] += msg.value;

    emit Deposit(msg.sender, msg.value);
   
   }

    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        deposits[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdraw(msg.sender, amount);
    }

    function issueLoan(address borrower, uint256 amount) external onlyOwner {

    require(address(this).balance >= amount, "Pool balance low");

    (bool success, ) = payable(borrower).call{value: amount}("");
    require(success, "ETH transfer failed");

    emit LoanIssued(borrower, amount);
    
   }

    function getTotalLiquidity() external view returns(uint256){
        return address(this).balance;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function repay() external payable {
    require(msg.value > 0, "Repay must be > 0");
}
}