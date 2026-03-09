// services/membership.js
import api from "./api";

export const getCurrentMembership = async () => {
    console.log("TOKEN:", localStorage.getItem("token"));
    const res = await api.get("/max-membership/current");
    return res.data.data;
};

export const getMembershipLevels = async () => {
    const res = await api.get("/max-membership-levels");
    return res.data.data;
};

export const getMembershipFeatures = async () => {
    const res = await api.get("/max-membership/features");
    return res.data.data; // هيكون شكلها: { "1": [...], "2": [...], "3": [...] }
};

export const activateMembership = async (level) => {
    const res = await api.post("/max-membership/activate", { level });
    return res.data.data;
};

export const confirmMembershipPayment = async (product_reference) => {
    const res = await api.post("/max-membership/confirm-payment", { product_reference });
    return res.data.data;
};

export const upgradeMembershipPreview = async (new_level, months = 1) => {
    const res = await api.get(`/max-membership/upgrade-preview?new_level=${new_level}&months=${months}`);
    return res.data.data;
};

export const upgradeMembership = async (new_level, months = 1) => {
    const res = await api.post("/max-membership/upgrade", {
        new_level,
        months
    });
    return res.data.data;
};