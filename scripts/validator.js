export function isValidDomain(domain) {

    if (!domain)
        return false;


    domain = domain.toLowerCase().trim();


    // Maximum DNS length
    if (domain.length > 253)
        return false;


    // Reject IP addresses
    if (/^[0-9.]+$/.test(domain))
        return false;


    // Reject localhost/private names
    if (
        domain === "localhost" ||
        domain.endsWith(".local")
    )
        return false;


    // Must contain a dot
    if (!domain.includes("."))
        return false;


    // Remove obvious invalid endings
    const blockedExtensions = [
        "gif",
        "png",
        "jpg",
        "jpeg",
        "js",
        "css",
        "svg",
        "woff",
        "woff2",
        "ico"
    ];


    const tld =
        domain.split(".").pop();


    if (blockedExtensions.includes(tld))
        return false;


    // No leading/trailing dot or hyphen
    if (
        domain.startsWith(".") ||
        domain.endsWith(".") ||
        domain.startsWith("-")
    )
        return false;


    // Validate labels
    const labels = domain.split(".");


    for (const label of labels) {

        if (!label)
            return false;


        if (label.length > 63)
            return false;


        if (
            label.startsWith("-") ||
            label.endsWith("-")
        )
            return false;


        if (!/^[a-z0-9-]+$/i.test(label))
            return false;

    }

// Reject domains that are mostly numeric/hyphen patterns
const alphaCount = (domain.match(/[a-z]/gi) || []).length;

if (alphaCount < 3)
    return false;


// Reject very long repeated numeric labels
if (
    (domain.match(/-/g) || []).length > 8 &&
    alphaCount < 10
)
    return false;
    return true;

}
