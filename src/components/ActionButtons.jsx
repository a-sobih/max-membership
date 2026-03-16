// src/components/ActionButtons.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateMembership, upgradeMembership } from "@/services/membership";
import toast from "react-hot-toast";

const MembershipActions = ({ lvl, membership, setShowUpgrade }) => {
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
                toast.success(res.message || "Membership activated successfully");
            }
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error?.message || "Something went wrong";

            toast.error(message);
        }
    });


    const canUpgrade = membership.active && membership.level < lvl.level;
    const isCurrent = membership.active && membership.level === lvl.level;

    return (
        <div className="flex flex-wrap gap-3">
            {isCurrent && (
                <div className="px-4 text-center w-full py-2 rounded-lg bg-green-500 text-white font-semibold text-sm">
                    ✓ Currently Active
                </div>
            )}

            {canUpgrade && !isCurrent && (
                <button
                    onClick={() => setShowUpgrade(lvl.level)}
                    className="w-full cursor-pointer px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 transition-colors"
                >
                    Upgrade
                </button>
            )}

            {!membership.active && (
                <button
                    onClick={() => activateMutation.mutate()}
                    className="w-full cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                    Activate
                </button>
            )}
        </div>
    );
};

export default MembershipActions;