from fastapi import APIRouter

from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score
from scoring.risk_model import calculate_interest

router = APIRouter()


@router.get("/loan/terms/{wallet}")
def loan_terms(wallet: str):

    features = analyze_wallet(wallet)

    vector = build_feature_vector(features)

    score = predict_credit_score(vector)

    interest, risk = calculate_interest(score)

    return {
        "wallet": wallet,
        "credit_score": score,
        "risk_level": risk,
        "interest_rate": interest
    }