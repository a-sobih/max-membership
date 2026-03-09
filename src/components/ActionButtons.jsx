// src/components/ActionButtons.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateMembership, upgradeMembership } from "@/services/membership";

const MembershipActions = ({ lvl, membership, setShowUpgrade }) => {
    const queryClient = useQueryClient();

    const activateMutation = useMutation({
        mutationFn: () => activateMembership(lvl.level),
        onSuccess: (data) => {
            if (data.payment_required) {
                alert(`Payment required: $${data.amount_usd}`);
                // بدل window.location.href
            } else {
                queryClient.invalidateQueries({ queryKey: ["currentMembership"] });
                setUpgradeLevel(null);
            }
        },
    });

    // const upgradeMutation = useMutation({
    //     mutationFn: () => upgradeMembership(lvl.level),
    //     onSuccess: (data) => {
    //         if (data.payment_required) {
    //             window.location.href = `/payment?pr=${data.product_reference}&amount=${data.amount_usd}`;
    //         } else {
    //             queryClient.invalidateQueries({ queryKey: ["currentMembership"] });
    //         }
    //     },
    // });

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
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                    Activate
                </button>
            )}
        </div>
    );
};

export default MembershipActions;