import { LEVEL_COLORS } from "@/constants/colors";
import Tooltip from "./Tooltip";
import {
    Award,
    ImagePlay,
    Lock,
    Ghost,
    MessageSquareMore,
    CalendarOff,
    ImageUp,
    EyeOff,
    Zap,
    BellOff,
    UserRoundX,
    Sparkles,
    Users,
    BadgePercent,
    Flame,
    Gift,
    Palette,
    ShieldOff,
} from "lucide-react";

const FEATURE_ICON_MAP = {
    badge: Award,
    room_background: ImagePlay,
    room_lock: Lock,
    stealth_visit: Ghost,
    chat_background: MessageSquareMore,
    hide_reg_days: CalendarOff,
    send_photos_room: ImageUp,
    hide_charge_game_level: EyeOff,
    wealth_speed_3: Zap,
    friend_cancel_alert: BellOff,
    hide_top_supporters: UserRoundX,
    animated_avatar: Sparkles,
    close_friends_toggle: Users,
    vip_discount_30: BadgePercent,
    wealth_speed_5: Flame,
    exclusive_gifts: Gift,
    room_list_color: Palette,
    hide_agent_badges: ShieldOff,
};

const FeatureCard = ({ feature, isActive, showLevel }) => {
    const IconComponent = FEATURE_ICON_MAP[feature.key] || Award;

    return (
        <div
            className={`
                relative group flex flex-col items-center justify-between gap-2
                p-3 rounded-2xl border transition-all duration-300 cursor-default
                backdrop-blur-md overflow-hidden
                ${isActive
                    ? "bg-white/10 border-[#e2c97e]/40 shadow-[0_0_18px_0_rgba(226,201,126,0.15)]"
                    : "bg-white/[0.03] border-white/[0.07] opacity-40 grayscale"
                }
                ${feature.dev ? "opacity-40" : ""}
            `}
        >
            {/* Glow blob behind icon */}
            {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#e2c97e]/20 blur-2xl pointer-events-none" />
            )}

            {/* Active checkmark badge */}
            {isActive && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#5ddb8a]/20 border border-[#5ddb8a]/50 flex items-center justify-center text-[8px] text-[#5ddb8a] font-black leading-none">
                    ✓
                </span>
            )}

            {/* Icon */}
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${isActive
                    ? "bg-gradient-to-br from-[#e2c97e]/20 to-[#c9a84c]/10 shadow-inner"
                    : "bg-white/5"
                }
            `}>
                <IconComponent
                    size={18}
                    className={isActive ? "text-[#e2c97e]" : "text-white/30"}
                    strokeWidth={1.6}
                />
            </div>

            {/* Label */}
            <span className={`
                text-center text-[11px] font-medium leading-tight
                ${isActive ? "text-[#e8dfc8]" : "text-white/30"}
            `}>
                {feature.label}
            </span>

            {/* Bottom badges row */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
                {/* Level badge */}
                {showLevel && feature.level >= 1 && (() => {
                    const ls = LEVEL_COLORS[feature.level] || {};
                    return (
                        <span
                            className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                            style={{
                                background: ls.glow,
                                color: ls.primary,
                                border: `1px solid ${ls.primary}33`,
                            }}
                        >
                            Lv{feature.level}
                        </span>
                    );
                })()}

                {/* DEV badge */}
                {feature.dev && (
                    <Tooltip text="Under Development – Coming Soon">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/30 font-mono cursor-help">
                            DEV
                        </span>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;