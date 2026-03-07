def calculate_interest(score):

    if score >= 80:
        return 7, "LOW"

    elif score >= 60:
        return 10, "MEDIUM"

    elif score >= 40:
        return 14, "HIGH"

    else:
        return 18, "VERY_HIGH"