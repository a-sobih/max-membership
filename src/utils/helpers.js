// src/utils/helpers.js
export function calcUpgradeDays(remainingDays, newLevelMonths = 1) {
    const halfRemaining = Math.floor(remainingDays / 2);
    const newDays = newLevelMonths * 30;
    return { halfRemaining, total: halfRemaining + newDays };
}
export function daysRemaining(expiresAt) {
    const now = new Date();
    const exp = new Date(expiresAt);
    return Math.max(0, Math.ceil((exp - now) / (1000 * 60 * 60 * 24)));
}

// Hex to RGB helper
export function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}

export function handlePurchase(level) {
    setMembership({ active: true, level, expires_at: "2026-06-05", features: ALL_FEATURES.filter(f => f.level <= level).map(f => f.key) });
    showToast(`Max Level ${level} activated! 🎉`);
}

export function handleUpgrade(toLevel) {
    setShowUpgrade(toLevel);
}