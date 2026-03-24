// src/components/ActionButtons.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateMembership, upgradeMembership } from "@/services/membership";
import toast from "react-hot-toast";
import { LEVEL_COLORS } from "@/constants/colors";
import { useTranslation } from "react-i18next";

const MembershipActions = ({ lvl, membership, setShowUpgrade }) => {
    const { t } = useTranslation();

    const col = LEVEL_COLORS[lvl.level];
    const queryClient = useQueryClient();
    const activateMutation = useMutation({
        mutationFn: () => activateMembership({
            level: lvl.level,
            months: 1
        }),
        onSuccess: (res) => {
            if (res.data.payment_required) {
                alert(`Payment required: $${res.data.amount_usd}`);

            } else {
                queryClient.invalidateQueries({ queryKey: ["currentMembership"] });
                setUpgradeLevel(null);
                // نجاح بدون دفع for female
                toast.success(res.message || t("actionButtons.activatedSuccess"));
            }
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error?.message || t("actionButtons.somethingWentWrong");

            toast.error(message);
        }
    });


    const canUpgrade = membership.active && membership.level < lvl.level;
    const isCurrent = membership.active && membership.level === lvl.level;

    return (
        <div className="sticky bottom-0 " >
            {isCurrent && (
                <div className="py-2">
                    <div className="px-4 text-center  w-full py-2 rounded-lg bg-green-500 text-white font-semibold text-sm"
                        style={{ boxShadow: " 0 8px 8px 0 rgba(0, 0, 0, 0.20), 0 8px 20px 0 rgba(0, 0, 0, 0.20)" }}>
                        {t("actionButtons.currentlyActive")}
                    </div>
                </div>
            )}

            {
                canUpgrade && !isCurrent && (
                    <div className="py-2">
                        <button
                            onClick={() => setShowUpgrade(lvl.level)}
                            className="w-full cursor-pointer px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 transition-colors"
                            style={{ boxShadow: " 0 8px 8px 0 rgba(0, 0, 0, 0.20), 0 8px 20px 0 rgba(0, 0, 0, 0.20)" }}
                        >
                            {t("actionButtons.upgrade")}
                        </button>
                    </div>
                )
            }

            {
                !membership.active && (
                    <div className="py-2">
                        <button
                            onClick={() => activateMutation.mutate()}
                            className="w-full cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                            style={{ boxShadow: " 0 8px 8px 0 rgba(0, 0, 0, 0.20), 0 8px 20px 0 rgba(0, 0, 0, 0.20)" }}
                        >
                            {t("actionButtons.activate")}
                        </button>
                    </div>
                )
            }
        </div >
    );
};

export default MembershipActions;