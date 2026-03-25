// ─── Header Component ─────────────────────────────────────────────────────────
import { LEVEL_COLORS } from "@/constants/colors";
import { getCurrentMembership } from "@/services/membership";
import { daysRemaining } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    const { data: membership, isLoading, isError } = useQuery({
        queryKey: ["currentMembership"],
        queryFn: getCurrentMembership,
        staleTime: 1000 * 60, // دقيقة واحدة cache
    });

    const remainingDays = membership?.active ? daysRemaining(membership.expires_at) : 0;

    return (
        <div style={{
            background: "linear-gradient(180deg, #17171f 0%, #0d0d11 100%)",
            borderBottom: "1px solid #222",
            padding: "28px 24px 24px",
            position: "sticky", top: 0, zIndex: 40,
        }}>
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                <div className="flex items-center gap-12  mb-5">
                    <span style={{ fontSize: "22px" }}>⭐</span>
                    <div>
                        <h1 style={{
                            margin: 0, fontSize: "22px", fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 700, letterSpacing: "0.04em",
                            background: "linear-gradient(90deg, #e2c97e, #f5e6b0, #e2c97e) 200% center / 200% auto",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            animation: "shimmer 4s linear infinite",
                        }}>
                            {t("header.title")}
                        </h1>
                        <p style={{ margin: 0, fontSize: "12px", color: "#666", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            {t("header.subtitle")}
                        </p>
                    </div>
                </div>

                {/* Current Status Banner */}
                {membership?.active ? (
                    <div style={{
                        background: "rgba(226,201,126,0.07)",
                        border: "1px solid rgba(226,201,126,0.25)",
                        borderRadius: "14px", padding: "14px 18px",

                        animation: "pulse-glow 3s ease-in-out infinite",
                    }}>
                        <div className="flex items-center justify-between flex-col md:flex-row md:gap-8 gap-2">
                            {/* الشمال */}
                            <div className="flex items-center sm:gap-8 gap-2">
                                <div className="flex items-center gap-3">
                                    <span style={{ fontSize: "18px" }}>{LEVEL_COLORS[membership.level]?.badge}</span>
                                    <div>
                                        <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                            {t("header.activePlan")}
                                        </div>
                                        <div style={{ color: "#e2c97e", fontWeight: 700, fontSize: "15px" }}>
                                            {t("header.maxLevel")} {membership.level}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: "1px", height: "36px", background: "#333" }} />

                                <div>
                                    <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        {t("header.daysRemaining")}
                                    </div>
                                    <div style={{ color: "#5ddb8a", fontWeight: 700, fontSize: "15px" }}>
                                        {remainingDays} {t("header.days")}
                                    </div>
                                </div>

                                <div style={{ width: "1px", height: "36px", background: "#333" }} />

                                <div>
                                    <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        {t("header.activeFeatures")}
                                    </div>
                                    <div style={{ color: "#e8dfc8", fontWeight: 700, fontSize: "15px" }}>
                                        {membership.features.length} {t("header.features")}
                                    </div>
                                </div>
                            </div>

                            {/* اليمين */}
                            <div className="">
                                <span style={{ fontSize: "11px", color: "#666" }}>
                                    {t("header.expires")} {membership.expires_at}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        background: "rgba(255,255,255,0.03)", border: "1px solid #222",
                        borderRadius: "14px", padding: "14px 18px",
                        display: "flex", alignItems: "center", gap: "10px",
                    }}>
                        <span style={{ color: "#555", fontSize: "22px" }}>○</span>
                        <span style={{ color: "#555", fontSize: "14px" }}>{t("header.noMembership")}</span>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Header