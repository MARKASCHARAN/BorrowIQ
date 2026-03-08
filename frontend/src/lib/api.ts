const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

// ─── Types ─────────────────────────────────────────────────────────────

export interface ScoreResponse {
    wallet: string;
    features: Record<string, unknown>;
    credit_score: number;
}

export interface ProfileResponse {
    wallet: string;
    credit_score: number;
    wallet_age_days: number;
    tx_count: number;
    repayment_history: number;
    liquidations: number;
    risk_level: string;
    interest_rate: number;
}

export interface EligibilityResponse {
    wallet: string;
    eligible: boolean;
    credit_score: number;
    max_loan: number;
    interest_rate: number;
    risk_level: string;
}

export interface LoanStatusResponse {
    wallet: string;
    amount_wei: number;
    interest_rate: number;
    active: boolean;
}

export interface ProtocolStatsResponse {
    pool_liquidity: string;
    active_loans: number;
}

export interface AIExplainResponse {
    wallet: string;
    credit_score: number;
    max_loan: number;
    interest_rate: number;
    ai_explanation: string;
}

export interface AIAdvisorResponse {
    wallet: string;
    credit_score: number;
    max_loan: number;
    interest_rate: number;
    loan_advice: string;
}

// ─── Fetchers ──────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}

/** GET /score/{wallet} */
export const fetchScore = (wallet: string) =>
    apiFetch<ScoreResponse>(`/score/${wallet}`);

/** GET /profile/{wallet} */
export const fetchProfile = (wallet: string) =>
    apiFetch<ProfileResponse>(`/profile/${wallet}`);

/** GET /eligibility/{wallet} */
export const fetchEligibility = (wallet: string) =>
    apiFetch<EligibilityResponse>(`/eligibility/${wallet}`);

/** GET /loan/status/{wallet} */
export const fetchLoanStatus = (wallet: string) =>
    apiFetch<LoanStatusResponse>(`/loan/status/${wallet}`);

/** GET /protocol/stats */
export const fetchProtocolStats = () =>
    apiFetch<ProtocolStatsResponse>('/protocol/stats');

/** GET /ai/explain/{wallet} */
export const fetchAIExplanation = (wallet: string) =>
    apiFetch<AIExplainResponse>(`/ai/explain/${wallet}`);

/** GET /ai/loan-advice/{wallet} */
export const fetchLoanAdvice = (wallet: string) =>
    apiFetch<AIAdvisorResponse>(`/ai/loan-advice/${wallet}`);
