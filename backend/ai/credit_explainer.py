from google import genai
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def explain_credit(wallet, features, score, max_loan, interest):

    prompt = f"""
You are a DeFi credit analyst.

Explain the credit score of a blockchain wallet.

Wallet: {wallet}

Wallet features:
{features}

Credit score: {score}

Maximum loan allowed: {max_loan} ETH
Interest rate: {interest}%

Explain:

1. Why this wallet received this credit score
2. Risk assessment
3. What behavior improved the score
4. What behavior could improve it

CRITICAL CONSTRAINT: Keep your entire response extremely brief! Use a maximum of 4 to 5 short bullet points or sentences total. Do not generate long paragraphs because the UI box is very small. Be concise and punchy.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text