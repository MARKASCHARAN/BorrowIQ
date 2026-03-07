from google import genai
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def loan_advice(wallet, score, max_loan, interest, features):

    prompt = f"""
You are a DeFi lending risk advisor.

Wallet: {wallet}

Credit score: {score}
Maximum loan allowed: {max_loan} ETH
Interest rate: {interest}%

Wallet features:
{features}

Provide borrowing advice.

Return format:

Recommended loan:
Reason:

CRITICAL CONSTRAINT: Keep your entire response extremely brief! Do not exceed 3 to 4 short sentences. The UI box is very small, so do not generate long paragraphs. Be concise and punchy.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text