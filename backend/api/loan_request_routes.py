from fastapi import APIRouter

from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score
from scoring.risk_model import calculate_interest



router = APIRouter()


def loan_limit(score):

    if score >= 80:
        return 2

    elif score >= 60:
        return 1

    elif score >= 40:
        return 0.5

    else:
        return 0


@router.post("/loan/request/{wallet}")
def request_loan(wallet: str):

    # analyze wallet activity
    features = analyze_wallet(wallet)

    vector = build_feature_vector(features)

    score = predict_credit_score(vector)

    interest, risk = calculate_interest(score)

    if score < 40:

        return {
            "wallet": wallet,
            "eligible": False,
            "reason": "Credit score too low"
        }

    amount = loan_limit(score)

    if amount == 0:

        return {
            "wallet": wallet,
            "eligible": False,
            "reason": "Loan limit too low"
        }

    tx = issue_loan(amount)

    return {
        "wallet": wallet,
        "credit_score": score,
        "loan_amount_eth": amount,
        "interest_rate": interest,
        "risk_level": risk,
        "tx_hash": tx
    }