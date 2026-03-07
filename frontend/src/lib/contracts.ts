// LoanManager contract ABI - only the functions we need
export const LOAN_MANAGER_ABI = [
    {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'requestLoan',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'repayLoan',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
        name: 'getLoan',
        outputs: [
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'uint256', name: 'interestRate', type: 'uint256' },
            { internalType: 'bool', name: 'active', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
] as const;

// Deployed contract address (from your Hardhat deploy)
export const LOAN_MANAGER_ADDRESS = '0x8783943ab5dC1e158f77Da10156830669748dC43' as `0x${string}`;
