from fastapi import APIRouter
from scoring.wallet_analyzer import analyze_wallet
from scoring.feature_engineering import build_feature_vector
from scoring.credit_model import predict_credit_score


router = APIRouter()

@router.get("/score/{wallet}")

def generate_score(wallet):

    features = analyze_wallet(wallet)

    vector = build_feature_vector(features)

    score = predict_credit_score(vector)

    return {
        "wallet": wallet,
        "features": features,
        "credit_score": score
    }

