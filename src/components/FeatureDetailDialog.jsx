import { useTranslation } from "react-i18next";
import { LEVEL_COLORS } from "@/constants/colors";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X, Sparkles, CheckCircle2, XCircle, Hammer } from "lucide-react";

const FeatureDetailDialog = ({ feature, isActive, open, onOpenChange, IconComponent }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    if (!feature) return null;

    const levelStyle = LEVEL_COLORS?.[feature.level] || {};
    const title = t(`featureDetails.${feature.key}.title`, { defaultValue: feature.label });
    const description = t(`featureDetails.${feature.key}.description`, { defaultValue: "" });
    const highlight = t(`featureDetails.${feature.key}.highlight`, { defaultValue: "" });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                dir={isRTL ? "rtl" : "ltr"}
                className="
                    max-w-sm w-[92vw] p-0 gap-0 border-0 rounded-3xl overflow-hidden
                    bg-transparent shadow-[0_32px_80px_rgba(0,0,0,0.6)]
                "
            >
                {/* ── Background layers ── */}
                <div className="absolute inset-0 rounded-3xl bg-[#0e0c0a] z-0" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#e2c97e]/8 via-transparent to-transparent z-0" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e2c97e]/50 to-transparent z-0" />

                {/* Close button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="
                        absolute top-4 end-4 z-20 w-7 h-7 rounded-full
                        bg-white/5 hover:bg-white/10 border border-white/10
                        flex items-center justify-center transition-all duration-200
                        text-white/40 hover:text-white/80
                    "
                >
                    <X size={13} />
                </button>

                {/* ── Content ── */}
                <div className="relative z-10 flex flex-col">

                    {/* Header section */}
                    <div className="px-6 pt-7 pb-5">
                        <DialogHeader className="gap-0">
                            {/* Icon + active indicator */}
                            <div className="flex items-start  gap-4 mb-4">
                                <div className={`
                                    relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                                    ${isActive
                                        ? "bg-gradient-to-br from-[#e2c97e]/25 to-[#c9a84c]/10 border border-[#e2c97e]/30"
                                        : "bg-white/5 border border-white/8"
                                    }
                                `}>
                                    {/* Glow */}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-2xl bg-[#e2c97e]/10 blur-lg" />
                                    )}
                                    {IconComponent && (
                                        <IconComponent
                                            size={22}
                                            className={isActive ? "text-[#e2c97e] relative z-10" : "text-white/25 relative z-10"}
                                            strokeWidth={1.5}
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5 pt-1 min-w-0">
                                    <DialogTitle className="text-[15px] font-semibold text-white/90 leading-tight">
                                        {title}
                                    </DialogTitle>

                                    {/* Status pill */}
                                    <div className={`
                                        inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-medium
                                        ${isActive
                                            ? "bg-[#5ddb8a]/12 border border-[#5ddb8a]/30 text-[#5ddb8a]"
                                            : "bg-white/5 border border-white/10 text-white/35"
                                        }
                                    `}>
                                        {isActive
                                            ? <><CheckCircle2 size={10} /> {t("featureDialog.status_active")}</>
                                            : <><XCircle size={10} /> {t("featureDialog.status_inactive")}</>
                                        }
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                    </div>

                    {/* Description */}
                    <div className="px-6 pb-4">
                        <p className="text-[13px] text-white/55 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Highlight strip */}
                    {highlight && (
                        <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-[#e2c97e]/6 border border-[#e2c97e]/15 flex items-center gap-2.5">
                            <Sparkles size={13} className="text-[#e2c97e] flex-shrink-0" />
                            <span className="text-[12px] text-[#e2c97e]/80 font-medium leading-tight">
                                {highlight}
                            </span>
                        </div>
                    )}

                    {/* Footer row: level badge + dev badge */}
                    <div className="px-6 pb-6 flex items-center gap-2 flex-wrap">
                        {/* Level badge */}
                        {feature.level >= 1 && (() => {
                            const ls = LEVEL_COLORS[feature.level] || {};
                            return (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-white/35">
                                        {t("featureDialog.level")}
                                    </span>
                                    <span
                                        className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold"
                                        style={{
                                            background: ls.glow,
                                            color: ls.primary,
                                            border: `1px solid ${ls.primary}44`,
                                        }}
                                    >
                                        Lv{feature.level}
                                    </span>
                                </div>
                            );
                        })()}

                        {/* Dev badge */}
                        {feature.dev && (
                            <div className="flex items-center gap-1.5 ms-auto">
                                <Hammer size={10} className="text-orange-400" />
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/25 font-mono">
                                    {t("featureDialog.dev_badge")}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Dev note */}
                    {feature.dev && (
                        <div className="mx-6 mb-6 -mt-2 px-3 py-2.5 rounded-lg bg-orange-400/5 border border-orange-400/15">
                            <p className="text-[11px] text-orange-400/70 leading-relaxed">
                                {t("featureDialog.dev_note")}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FeatureDetailDialog;