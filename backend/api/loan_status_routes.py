from fastapi import APIRouter
from web3 import Web3
from blockchain.contract_client import loan_manager_contract

router = APIRouter()

@router.get("/loan/status/{wallet}")
def get_loan_status(wallet: str):

    wallet = Web3.to_checksum_address(wallet)

    loan = loan_manager_contract.functions.getLoan(wallet).call()

    return {
        "wallet": wallet,
        "amount_wei": loan[0],
        "interest_rate": loan[1],
        "active": loan[2]
    }