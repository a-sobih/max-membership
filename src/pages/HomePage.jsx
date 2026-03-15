import Header from "@/components/Header";
import Taps from "@/components/tap panel/Taps";
import { LEVEL_COLORS } from "@/constants/colors";
import { ALL_FEATURES } from "@/constants/features";
import { LEVELS_DATA } from "@/constants/levelsData";
import { CURRENT_MEMBERSHIP } from "@/constants/membership";
import { hexToRgb } from "@/utils/helpers";
import { useState } from "react";






// ─── Helpers ──────────────────────────────────────────────────────────────────
function daysRemaining(expiresAt) {
  const now = new Date();
  const exp = new Date(expiresAt);
  return Math.max(0, Math.ceil((exp - now) / (1000 * 60 * 60 * 24)));
}

function calcUpgradeDays(remainingDays, newLevelMonths = 1) {
  const halfRemaining = Math.floor(remainingDays / 2);
  const newDays = newLevelMonths * 30;
  return { halfRemaining, total: halfRemaining + newDays };
}

// ─── Sub-components ───────────────────────────────────────────────────────────



function UpgradePreview({ fromLevel, toLevel, remainingDays, onClose, onConfirm }) {
  const { halfRemaining, total } = calcUpgradeDays(remainingDays);
  const target = LEVELS_DATA.find(l => l.level === toLevel);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#13131a", border: "1px solid #e2c97e44",
        borderRadius: "20px", padding: "32px", width: "min(440px, 90vw)",
        boxShadow: "0 30px 80px #000a, 0 0 0 1px #e2c97e22",
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>⬆</div>
          <h3 style={{ color: "#e2c97e", fontSize: "20px", fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>
            Upgrade Preview
          </h3>
          <p style={{ color: "#888", fontSize: "13px", marginTop: "6px" }}>
            Level {fromLevel} → Level {toLevel}
          </p>
        </div>

        <div style={{ background: "rgba(226,201,126,0.06)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ color: "#888", fontSize: "13px" }}>Days remaining (Level {fromLevel})</span>
            <span style={{ color: "#e8dfc8", fontWeight: 600 }}>{remainingDays} days</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ color: "#888", fontSize: "13px" }}>Half credited to new level</span>
            <span style={{ color: "#5ddb8a", fontWeight: 600 }}>+{halfRemaining} days</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ color: "#888", fontSize: "13px" }}>New subscription (1 month)</span>
            <span style={{ color: "#e2c97e", fontWeight: 600 }}>+30 days</span>
          </div>
          <div style={{
            borderTop: "1px solid #e2c97e22", paddingTop: "12px",
            display: "flex", justifyContent: "space-between",
          }}>
            <span style={{ color: "#e8dfc8", fontWeight: 700 }}>Total days at Level {toLevel}</span>
            <span style={{ color: "#e2c97e", fontWeight: 700, fontSize: "18px" }}>{total} days</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "13px", color: "#888" }}>
          <span>Cost</span>
          <span style={{ color: "#e2c97e" }}>
            {target?.price_coins?.toLocaleString()} Coins&nbsp;/&nbsp;${target?.price_usd}
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #333",
            background: "transparent", color: "#888", cursor: "pointer", fontSize: "14px",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 2, padding: "12px", borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #e2c97e, #c8a84b)",
            color: "#0d0d11", cursor: "pointer", fontSize: "14px", fontWeight: 700,
          }}>Confirm Upgrade</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MaxMembership() {
  const [activeTab, setActiveTab] = useState(1);
  const [membership, setMembership] = useState(CURRENT_MEMBERSHIP);
  const [showUpgrade, setShowUpgrade] = useState(null); // target level
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }


  function confirmUpgrade() {
    const { total } = calcUpgradeDays(remainingDays);
    const newExp = new Date();
    newExp.setDate(newExp.getDate() + total);
    setMembership({
      active: true,
      level: showUpgrade,
      expires_at: newExp.toISOString().split("T")[0],
      features: ALL_FEATURES.filter(f => f.level <= showUpgrade).map(f => f.key),
    });
    setShowUpgrade(null);
    showToast(`Upgraded to Max Level ${showUpgrade}! 🚀`);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d11",
      fontFamily: "'DM Sans', sans-serif",
      color: "#e8dfc8",
      padding: "0 0 60px",
    }}>

      {/* Header */}
      <Header />

      {/* Tabs */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 16px" }}>

        <Taps activeTab={activeTab} setActiveTab={setActiveTab} />

      </div>

      {/* Upgrade Modal */}
      {/* {showUpgrade && (
        <UpgradePreview
          fromLevel={membership.level}
          toLevel={showUpgrade}
          remainingDays={remainingDays}
          onClose={() => setShowUpgrade(null)}
          onConfirm={confirmUpgrade}
        />
      )} */}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", right: "24px",
          background: toast.type === "success" ? "#1a2d1f" : "#2d1a1a",
          border: `1px solid ${toast.type === "success" ? "#5ddb8a44" : "#db5d5d44"}`,
          color: toast.type === "success" ? "#5ddb8a" : "#db5d5d",
          padding: "14px 20px", borderRadius: "12px",
          fontSize: "14px", fontWeight: 500,
          animation: "toast-in .3s ease",
          boxShadow: "0 8px 30px #0008",
          zIndex: 200, maxWidth: "320px",
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

