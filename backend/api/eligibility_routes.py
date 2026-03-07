from fastapi import APIRouter
from web3 import Web3

from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score

from blockchain.contract_client import (
    rate_model_contract,
    lending_pool_contract,
    registry_contract,
    w3
)
import os

router = APIRouter()

MAX_PROTOCOL_LOAN = 5


def loan_limit(score, pool_liquidity):

    if score < 40:
        return 0

    score_limit = (score / 100) * MAX_PROTOCOL_LOAN * 0.8
    liquidity_limit = pool_liquidity * 0.3

    return round(min(score_limit, liquidity_limit), 2)


@router.get("/eligibility/{wallet}")
def check_eligibility(wallet: str):

    features = analyze_wallet(wallet)
    vector = build_feature_vector(features)
    score = predict_credit_score(vector)
    
    try:
        checksum_wallet = Web3.to_checksum_address(wallet.lower())
        current_onchain_score = registry_contract.functions.creditScores(checksum_wallet).call()
        if current_onchain_score == 0:
            # Score not on chain yet. We must push it so they can borrow!
            acct = w3.eth.account.from_key(os.getenv("PRIVATE_KEY"))
            nonce = w3.eth.get_transaction_count(acct.address, "pending")
            
            # Build transaction to push score
            txn = registry_contract.functions.updateScore(
                checksum_wallet, 
                score
            ).build_transaction({
                'from': acct.address,
                'nonce': nonce,
                'gas': 200000,
                'gasPrice': w3.eth.gas_price
            })
            
            # Sign and send
            signed_txn = w3.eth.account.sign_transaction(txn, private_key=os.getenv("PRIVATE_KEY"))
            tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
            w3.eth.wait_for_transaction_receipt(tx_hash)
            print(f"Pushed initial score of {score} to blockchain for {wallet}!")
            
            # SPONSOR GAS FOR NEW USERS FOR DEMO
            if w3.eth.get_balance(checksum_wallet) < w3.to_wei(0.01, 'ether'):
                sponsor_tx = {
                    'to': checksum_wallet,
                    'value': w3.to_wei(0.1, 'ether'),
                    'gas': 21000,
                    'gasPrice': w3.eth.gas_price,
                    'nonce': w3.eth.get_transaction_count(acct.address, "pending"),
                    'chainId': 102031
                }
                signed_faucet = w3.eth.account.sign_transaction(sponsor_tx, os.getenv("PRIVATE_KEY"))
                f_hash = w3.eth.send_raw_transaction(signed_faucet.raw_transaction)
                print(f"Sponsored 0.1 TCTC to new user {wallet} for gas! Hash: {f_hash.hex()}")
                
    except Exception as e:
        print("Skipping on-chain score push for now:", e)

    interest = rate_model_contract.functions.getInterestRate(score).call()

    liquidity_wei = lending_pool_contract.functions.getTotalLiquidity().call()
    liquidity_eth = float(Web3.from_wei(liquidity_wei, "ether"))

    max_loan = loan_limit(score, liquidity_eth)

    if interest == 7:
        risk = "LOW"
    elif interest == 12:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    eligible = score >= 40 and max_loan > 0

    return {
        "wallet": wallet,
        "eligible": eligible,
        "credit_score": score,
        "max_loan": max_loan,
        "interest_rate": interest,
        "risk_level": risk
    }