from web3 import Web3
import json
import os
from dotenv import load_dotenv

load_dotenv()

RPC = os.getenv("RPC")
w3 = Web3(Web3.HTTPProvider(RPC))

# -----------------------
# CreditScoreRegistry
# -----------------------

REGISTRY_ADDRESS = Web3.to_checksum_address(os.getenv("CREDIT_SCORE_REGISTRY"))

base_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(base_dir, "../abi/CreditScoreRegistry.json")) as f:
    registry_abi = json.load(f)["abi"]

registry_contract = w3.eth.contract(
    address=REGISTRY_ADDRESS,
    abi=registry_abi
)

# -----------------------
# LoanManager
# -----------------------

LOAN_MANAGER_ADDRESS = Web3.to_checksum_address(os.getenv("LOAN_MANAGER"))

with open(os.path.join(base_dir, "../abi/LoanManager.json")) as f:
    loan_abi = json.load(f)["abi"]

loan_manager_contract = w3.eth.contract(
    address=LOAN_MANAGER_ADDRESS,
    abi=loan_abi
)

# -----------------------
# InterestRateModel
# -----------------------

RATE_MODEL_ADDRESS = Web3.to_checksum_address(os.getenv("INTEREST_RATE_MODEL"))

with open(os.path.join(base_dir, "../abi/InterestRateModel.json")) as f:
    rate_abi = json.load(f)["abi"]

rate_model_contract = w3.eth.contract(
    address=RATE_MODEL_ADDRESS,
    abi=rate_abi
)

# -----------------------
# LendingPool
# -----------------------

LENDING_POOL_ADDRESS = Web3.to_checksum_address(os.getenv("LENDING_POOL"))

with open(os.path.join(base_dir, "../abi/LendingPool.json")) as f:
    pool_abi = json.load(f)["abi"]

lending_pool_contract = w3.eth.contract(
    address=LENDING_POOL_ADDRESS,
    abi=pool_abi
)