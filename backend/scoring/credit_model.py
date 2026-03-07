import numpy as np

def predict_credit_score(features):

    wallet_age, tx_count, repayment, liquidations = features

    score = 50

    score += wallet_age * 0.01
    score += tx_count * 0.05
    score += repayment * 30
    score -= liquidations * 10

    score = max(0, min(100, score))

    return int(score)