from fastapi import APIRouter

from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score

from blockchain.contract_client import (
    rate_model_contract,
    lending_pool_contract
)

from ai.loan_advisor import loan_advice

router = APIRouter()

@router.get("/ai/loan-advice/{wallet}")
def advisor(wallet: str):

    features = analyze_wallet(wallet)

    vector = build_feature_vector(features)

    score = predict_credit_score(vector)

    interest = rate_model_contract.functions.getInterestRate(score).call()

    liquidity_wei = lending_pool_contract.functions.getTotalLiquidity().call()

    liquidity_eth = liquidity_wei / 10**18

    max_loan = round(min((score/100)*5, liquidity_eth*0.3),2)

    advice = loan_advice(
        wallet,
        score,
        max_loan,
        interest,
        features
    )

    return {
        "wallet": wallet,
        "credit_score": score,
        "max_loan": max_loan,
        "interest_rate": interest,
        "loan_advice": advice
    }