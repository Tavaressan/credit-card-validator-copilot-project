function validateCardLabel(cardNumber) {
    if (!luhnCheck(cardNumber)) {
        return "Invalid Card Number (Failed Luhn Check)";
    }

    const cardPatterns = [
        { label: "Visa", regex: /^4\d{15}$/ }, // Starts with 4, 16 digits
        { label: "MasterCard", regex: /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/ }, // 51-55 or 2221-2720
        { label: "Elo", regex: /^(4011|4312|4389|5041|5066|509\d|6277|6362|6363)\d{12}$/ }, // Various intervals
        { label: "American Express", regex: /^3[47]\d{13}$/ }, // Starts with 34 or 37, 15 digits
        { label: "Discover", regex: /^(6011\d{12}|65\d{14}|64[4-9]\d{13})$/ }, // 6011, 65, or 644-649
        { label: "Hipercard", regex: /^6062\d{12}$/ }, // Starts with 6062
        { label: "EnRoute", regex: /^2(014|149)\d{11}$/ }, // Starts with 2014 or 2149, 15 digits
        { label: "JCB", regex: /^(352[89]\d{12}|35[3-8]\d{13})$/ }, // Starts with 3528-3589
        { label: "Voyager", regex: /^8699\d{11}$/ }, // Starts with 8699
        { label: "Aura", regex: /^50\d{14}$/ }, // Starts with 50, 16 digits
        { label: "Diners Club", regex: /^3(0[0-5]\d{11}|[68]\d{12})$/ } // Starts with 300-305, 36, or 38
    ];

    for (const card of cardPatterns) {
        if (card.regex.test(cardNumber)) {
            return card.label;
        }
    }

    return "Unknown Card Label";
}

// Luhn Algorithm implementation
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Process digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Example usage:
console.log(validateCardLabel("4532814674608453")); // Visa
console.log(validateCardLabel("5105105105105100")); // MasterCard
console.log(validateCardLabel("341111111111111"));  // American Express
console.log(validateCardLabel("869989043569031"));  // Voyager
console.log(validateCardLabel("6062824364551106")); // Hipercard
console.log(validateCardLabel("869912345678901")); // Invalid Card Number (Failed Luhn Check)