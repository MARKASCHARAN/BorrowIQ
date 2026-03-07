from fastapi import APIRouter
from blockchain.contract_client import  loan_manager_contract
from web3 import Web3

router = APIRouter()

@router.post("/loan/repay/{wallet}")
def repay(wallet: str):

    wallet = Web3.to_checksum_address(wallet)

    loan = loan_manager_contract.functions.getLoan(wallet).call()

    amount = Web3.from_wei(loan[0], "ether")
    interest = loan[1]

    repayment = float(amount) * (1 + interest / 100)
    repayment = round(repayment, 6)

    tx = repay_loan(repayment)

    return {
        "wallet": wallet,
        "repayment": repayment,
        "tx_hash": tx
    }