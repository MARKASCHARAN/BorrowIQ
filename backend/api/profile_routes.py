from fastapi import APIRouter

from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score
from scoring.risk_model import calculate_interest

router = APIRouter()


@router.get("/profile/{wallet}")
def credit_profile(wallet: str):

    features = analyze_wallet(wallet)

    vector = build_feature_vector(features)

    score = predict_credit_score(vector)

    interest, risk = calculate_interest(score)

    return {

        "wallet": wallet,

        "credit_score": score,

        "wallet_age_days": features["wallet_age_days"],

        "tx_count": features["tx_count"],

        "repayment_history": features["repayment_history"],

        "liquidations": features["liquidations"],

        "risk_level": risk,

        "interest_rate": interest
    }