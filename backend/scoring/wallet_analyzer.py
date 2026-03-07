import hashlib
import random

def analyze_wallet(wallet):

    # convert wallet into deterministic seed
    seed = int(hashlib.sha256(wallet.encode()).hexdigest(), 16) % (10**8)

    random.seed(seed)

    return {

        "wallet_age_days": random.randint(100,1200),

        "tx_count": random.randint(10,200),

        "repayment_history": round(random.uniform(0.6,0.95),3),

        "liquidations": random.randint(0,3)
    }