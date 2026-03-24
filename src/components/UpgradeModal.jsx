import { useQuery } from "@tanstack/react-query";
import { upgradeMembershipPreview } from "@/services/membership";
import { useTranslation } from "react-i18next";

function UpgradePreview({ fromLevel, toLevel, onClose, onConfirm, isLoading }) {
    const { t } = useTranslation();

    const { data, isLoading: previewLoading } = useQuery({
        queryKey: ["upgrade-preview", toLevel],
        queryFn: () => upgradeMembershipPreview(toLevel, 1),
        enabled: !!toLevel,
    });

    if (previewLoading || !data) return null;

    const { remaining_days, half_days_added, months, price } = data;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#13131a",
                    border: "1px solid #e2c97e44",
                    borderRadius: "20px",
                    padding: "32px",
                    width: "min(440px,90vw)"
                }}
            >
                <h3 style={{ color: "#e2c97e", textAlign: "center" }}>{t("UpgradeModal.title")}</h3>
                <p style={{ color: "#888", textAlign: "center" }}>{t("UpgradeModal.levelChange", { from: fromLevel, to: toLevel })}</p>

                <div style={{ margin: "16px 0", padding: "16px", borderRadius: "12px", background: "rgba(226,201,126,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>{t("UpgradeModal.remainingDays")}: <span>{remaining_days}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>{t("UpgradeModal.halfDaysAdded")}: <span>{half_days_added}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>{t("UpgradeModal.newSubscription")}: <span>{months * 30} days</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>{t("UpgradeModal.totalDays")}: <span>{remaining_days + half_days_added + months * 30}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>{t("UpgradeModal.cost")}: <span>{price.amount_per_month}</span></div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        className="cursor-pointer"
                        onClick={onClose}
                        style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #333", background: "transparent", color: "#888" }}
                    >
                        {t("UpgradeModal.cancel")}
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={onConfirm}
                        disabled={isLoading}
                        style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#e2c97e,#c8a84b)", color: "#0d0d11" }}
                    >
                        {isLoading ? t("UpgradeModal.processing") : t("UpgradeModal.confirmUpgrade")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpgradePreview;