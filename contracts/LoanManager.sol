// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CreditScoreRegistry.sol";
import "./InterestRateModel.sol";
import "./LendingPool.sol";

contract LoanManager {

    CreditScoreRegistry public creditRegistry;
    InterestRateModel public rateModel;
    LendingPool public lendingPool;

    address public owner;

    uint256 public activeLoans;

    struct Loan {
        uint256 amount;
        uint256 interestRate;
        bool active;
    }

    mapping(address => Loan) public loans;

    event LoanIssued(address borrower, uint256 amount, uint256 interest);
    event LoanRepaid(address borrower, uint256 amount);

    constructor(
        address _creditRegistry,
        address _rateModel,
        address payable _lendingPool
    ) {
        creditRegistry = CreditScoreRegistry(_creditRegistry);
        rateModel = InterestRateModel(_rateModel);
        lendingPool = LendingPool(_lendingPool);

        owner = msg.sender;
    }

   

    // ----------------------------
    // Request Loan
    // ----------------------------

    function requestLoan(uint256 amount) external {

        require(amount > 0, "Loan must be > 0");
        require(!loans[msg.sender].active, "Existing loan active");

        uint256 score = creditRegistry.getScore(msg.sender);
        require(score > 0, "No credit score"); // FIX 1

        // Risk-adjusted borrowing limit
        uint256 poolLiquidity = lendingPool.getTotalLiquidity();
        uint256 maxLoan = (poolLiquidity * score) / 200;

        require(amount <= maxLoan, "Loan exceeds limit");

        uint256 interest = rateModel.getInterestRate(score);

        loans[msg.sender] = Loan({
            amount: amount,
            interestRate: interest,
            active: true
        });

        activeLoans += 1;

        lendingPool.issueLoan(msg.sender, amount);

        emit LoanIssued(msg.sender, amount, interest);
    }

    // ----------------------------
    // Repay Loan
    // ----------------------------

    function repayLoan() external payable {

        Loan storage loan = loans[msg.sender];

        require(loan.active, "No active loan");

        uint256 interestAmount =
            (loan.amount * loan.interestRate) / 100;

        uint256 repaymentAmount =
            loan.amount + interestAmount; // FIX 2

        require(msg.value == repaymentAmount, "Insufficient repayment");

        loan.active = false;
        activeLoans -= 1;

        // return funds to pool
        lendingPool.repay{value: msg.value}();

        // improve credit score
        uint256 currentScore = creditRegistry.getScore(msg.sender);
        uint256 newScore = currentScore + 5;

        if (newScore > 100) {
            newScore = 100;
        }

        creditRegistry.updateScore(msg.sender, newScore);

        emit LoanRepaid(msg.sender, repaymentAmount);
    }

    // ----------------------------
    // View Loan
    // ----------------------------

    function getLoan(address user)
        external
        view
        returns (
            uint256 amount,
            uint256 interestRate,
            bool active
        )
    {
        Loan memory loan = loans[user];
        return (loan.amount, loan.interestRate, loan.active);
    }
}