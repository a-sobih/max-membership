// src/components/tap panel/Taps.jsx
import { LEVEL_COLORS } from "@/constants/colors";
import { getCurrentMembership, getMembershipFeatures, getMembershipLevels, upgradeMembership } from "@/services/membership";
import { handlePurchase, handleUpgrade, hexToRgb } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FeatureRow from "../FeatureRow";
import MembershipActions from "../ActionButtons";
import { useState } from "react";
import UpgradePreview from "../UpgradeModal";
import Spinner from "../ui/Spinner";

const Taps = ({ activeTab, setActiveTab }) => {
    const queryClient = useQueryClient();
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeLevel, setUpgradeLevel] = useState(null);

    const upgradeMutation = useMutation({
        mutationFn: (level) => upgradeMembership(level),
        onSuccess: (data) => {
            setUpgradeLevel(null);
            if (data.payment_required) {
                alert(`Payment required: $${data.amount_usd}`);
                // window.location.href = `/payment?pr=${data.product_reference}&amount=${data.amount_usd}`;
            } else {
                queryClient.invalidateQueries({ queryKey: ["currentMembership"] });
            }
        },
        onError: (err) => {
            console.error("Upgrade failed", err);
        },
    });

    const { data: levels = [], isLoading: loadingLevels } = useQuery({
        queryKey: ["membership-levels"],
        queryFn: getMembershipLevels,
    });

    const { data: membership = {} } = useQuery({
        queryKey: ["currentMembership"],
        queryFn: getCurrentMembership,
        staleTime: 1000 * 60, // دقيقة واحدة cache
    });

    const { data: levelsFeatures = {}, isLoading: loadingFeatures } = useQuery({
        queryKey: ["membership-features"],
        queryFn: getMembershipFeatures,
    });

    const activeFeatures = [];
    for (let i = 1; i <= activeTab; i++) {
        const features = levelsFeatures[i] || [];

        features.forEach((f) => {
            activeFeatures.push({
                key: f,
                label: f.replaceAll("_", " "),
                level: i
            });
        });
    }

    const allFeatures = Object.entries(levelsFeatures).flatMap(([level, features]) =>
        features?.map((f) => ({
            key: f,
            label: f.replaceAll("_", " "),
            level: Number(level)
        }))
    );

    if (loadingLevels || loadingFeatures) return <Spinner />;

    const getFeaturesUpToLevel = (lvlNumber) => {
        let features = [];
        for (let i = 1; i <= lvlNumber; i++) {
            features = features.concat(levelsFeatures[i] || []);
        }
        return features;
    };



    return (
        <>
            <div style={{ display: "flex", gap: "6px", padding: "20px 0 0", overflowX: "auto" }}>
                {levels?.map(lvl => {
                    const col = LEVEL_COLORS[lvl.level];
                    const isCurrent = membership?.active && membership.level === lvl.level;
                    const isActive = activeTab === lvl.level;
                    return (
                        <button key={lvl.level} className="tab-btn" onClick={() => setActiveTab(lvl.level)}
                            style={{
                                flex: 1, minWidth: "100px", padding: "12px 10px",
                                borderRadius: "12px 12px 0 0",
                                border: `1px solid ${isActive ? col.primary + "55" : "#222"}`,
                                borderBottom: isActive ? "none" : "1px solid #222",
                                background: isActive ? `rgba(${hexToRgb(col.primary)},0.1)` : "transparent",
                                color: isActive ? col.primary : "#555",
                                cursor: "pointer", position: "relative",
                                fontFamily: "'DM Sans', sans-serif", fontWeight: isActive ? 700 : 400,
                                fontSize: "13px",
                            }}>
                            {isCurrent && (
                                <span style={{
                                    position: "absolute", top: "-8px", right: "8px",
                                    fontSize: "9px", padding: "2px 6px", borderRadius: "20px",
                                    background: col.primary, color: "#0d0d11", fontWeight: 700,
                                    letterSpacing: "0.04em",
                                }}>ACTIVE</span>
                            )}
                            <span style={{ fontSize: "16px", display: "block", marginBottom: "3px" }}>{col.badge}</span>
                            Level {lvl.level}
                        </button>
                    );
                })}
            </div>

            {/* Tab Panel */}
            {levels?.map(lvl => {
                if (activeTab !== lvl.level) return null;
                const col = LEVEL_COLORS[lvl.level];
                const featuresForLevel = getFeaturesUpToLevel(lvl.level);
                const isCurrent = membership.active && membership.level === lvl.level;
                const canUpgrade = membership.active && membership.level < lvl.level;
                const canBuy = !membership.active || membership.level < lvl.level;

                return (
                    <div key={lvl.level} style={{
                        border: `1px solid ${col.primary}44`,
                        borderTop: "none",
                        borderRadius: "0 0 16px 16px",
                        background: `linear-gradient(160deg, rgba(${hexToRgb(col.primary)},0.05) 0%, #0d0d11 50%)`,
                        padding: "24px",
                        animation: "fadeIn .3s ease",
                    }}>
                        {/* Level header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
                            <div>
                                <h2 style={{
                                    margin: 0, fontSize: "26px",
                                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                                    color: col.primary,
                                }}>
                                    {col.badge} {lvl.name_en}
                                </h2>
                                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px" }}>
                                    {featuresForLevel.length} features included
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div className="text-center" style={{
                                    background: `rgba(${hexToRgb(col.primary)},0.12)`,
                                    border: `1px solid ${col.primary}44`,
                                    borderRadius: "12px", padding: "12px 18px",
                                }}>
                                    <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>
                                        Female (Coins)
                                    </div>
                                    <div style={{ color: col.primary, fontWeight: 700, fontSize: "18px" }}>
                                        {lvl.price_coins.toLocaleString()} <span style={{ fontSize: "13px", opacity: .7 }}>coins</span>
                                    </div>
                                    <div style={{ borderTop: `1px solid ${col.primary}22`, paddingTop: "8px", marginTop: "8px" }}>
                                        <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", marginBottom: "3px" }}>
                                            Male (USD)
                                        </div>
                                        <div style={{ color: "#e8dfc8", fontWeight: 700, fontSize: "16px" }}>
                                            ${lvl.price_usd} <span style={{ fontSize: "12px", opacity: .6 }}>/ month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features list */}
                        <div style={{ marginBottom: "22px" }}>
                            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "10px" }}>
                                Features
                            </div>
                            {allFeatures?.map((feature) => {
                                const isActive = activeFeatures.some(f => f.key === feature.key);

                                return (
                                    <FeatureRow
                                        key={feature.key}
                                        feature={feature}
                                        isActive={isActive}
                                        showLevel={true}
                                    />
                                );
                            })}
                        </div>

                        {/* Action buttons */}
                        <MembershipActions
                            lvl={lvl}
                            membership={membership}
                            setShowUpgrade={setUpgradeLevel} // تمرير level للمودال
                        />

                        {upgradeLevel && (
                            <UpgradePreview
                                fromLevel={membership?.level || 0}
                                toLevel={upgradeLevel}
                                onClose={() => setUpgradeLevel(null)}
                                onConfirm={() => {
                                    console.log("Calling upgrade for level", upgradeLevel); // 🔥 debug
                                    upgradeMutation.mutate(upgradeLevel); // <== مهم جداً تمرر level
                                }}
                                isLoading={upgradeMutation.isLoading}
                            />
                        )}
                    </div>
                );
            })}
        </>

    )
}

export default Taps