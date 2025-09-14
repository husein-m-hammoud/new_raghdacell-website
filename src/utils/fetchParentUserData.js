import { baseUrl } from "../Tools/APIs";

export async function fetchParentUserData() {
    const stored = localStorage.getItem("website_info_data");
    let shouldFetch = true;
    let websiteInfo = null;

    if (stored) {
        const parsed = JSON.parse(stored);
        const now = Date.now();

        // Check if it's less than 1 hour old
        if (parsed.timestamp && now - parsed.timestamp < 60 * 60 * 1000) {
            websiteInfo = parsed.websiteInfo;
            shouldFetch = false;
        }
    }

    if (shouldFetch) {
        try {
            const res = await fetch(`${baseUrl}website/info`);
            const json = await res.json();

            if (json?.data?.website_info) {
                websiteInfo = JSON.parse(json.data.website_info);

                // Save with timestamp
                localStorage.setItem(
                    "website_info_data",
                    JSON.stringify({
                        websiteInfo,
                        timestamp: Date.now(),
                    })
                );
            }
        } catch (err) {
            console.error("Error fetching website info:", err);
        }
    }

    return websiteInfo;
}