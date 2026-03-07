def build_feature_vector(features):

    return [
        features["wallet_age_days"],
        features["tx_count"],
        features["repayment_history"],
        features["liquidations"]
    ]