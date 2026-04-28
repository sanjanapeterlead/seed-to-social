export type UtmData = {
    source?: string;
    medium?: string;
    campaign?: string;
};

export function captureUtm(){
    if(typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utmData: UtmData = {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
    };

    if(utmData.source || utmData.campaign){
        localStorage.setItem("utm_data", JSON.stringify(utmData));
    }
}

export function getUtm():UtmData {
    if(typeof window === "undefined") return {};

    const stored = localStorage.getItem("seed_to_social_utm");
    return stored ? JSON.parse(stored) : { medium: "unknown" };         
}
