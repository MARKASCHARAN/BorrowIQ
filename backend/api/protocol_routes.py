from fastapi import APIRouter
from blockchain.contract_client import lending_pool_contract, loan_manager_contract
from web3 import Web3

router = APIRouter()

@router.get("/protocol/stats")
def protocol_stats():

    # total liquidity in pool
    liquidity_wei = lending_pool_contract.functions.getTotalLiquidity().call()
    liquidity_eth = Web3.from_wei(liquidity_wei, "ether")

    # NOTE: if contract doesn't track active loans,
    # we return placeholder for now
    active_loans = loan_manager_contract.functions.activeLoans().call()

    return {
        "pool_liquidity": f"{liquidity_eth} ETH",
        "active_loans": active_loans
    }