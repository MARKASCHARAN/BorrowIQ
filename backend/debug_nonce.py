from blockchain.contract_client import registry_contract, w3
import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

try:
    acct = w3.eth.account.from_key(os.getenv("PRIVATE_KEY"))
    nonce = w3.eth.get_transaction_count(acct.address, "pending")
    print("Pending Nonce for python backend is:", nonce)
    
    score = 99
    wallet = "0x5FbDB2315678afecb367f032d93F642f64180aa3" 
    
    txn = registry_contract.functions.updateScore(
        Web3.to_checksum_address(wallet.lower()), 
        score
    ).build_transaction({
        'from': acct.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=os.getenv("PRIVATE_KEY"))
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    print("Successfully shot raw transaction from python:", tx_hash.hex())
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaction confirmed dynamically!")
except Exception as e:
    print("PYTHON ERROR DETECTED:", e)
