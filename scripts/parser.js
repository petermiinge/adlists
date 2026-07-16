import { isValidDomain } from "./validator.js";


function cleanCandidate(line) {

    if (!line)
        return null;

    line = line.trim();

    // Ignore comments
    if (
        line.startsWith("!") ||
        line.startsWith("#") ||
        line.startsWith("[")
    ) {
        return null;
    }


    // Ignore allow rules
    if (line.startsWith("@@"))
        return null;


    // Remove inline comments
    

    // DNSMasq format
    if (line.startsWith("address=/")) {
        line = line
            .replace("address=/", "")
            .split("/")[0];
    }


    if (line.startsWith("server=/")) {
        line = line
            .replace("server=/", "")
            .split("/")[0];
    }


    // Hosts format
    // Hosts format
if (
    line.startsWith("0.0.0.0") ||
    line.startsWith("127.0.0.1")
) {

    const parts = line.split(/\s+/);

    const domains = parts
        .slice(1)
        .filter(Boolean)
        .filter(isValidDomain);


    if (domains.length > 0)
        return domains;

    return null;
}
    // Adblock format
    // Adblock format
if (line.startsWith("||")) {

    line = line
        .replace(/^\|\|/, "")
        .replace(/\^.*$/, "")
        .split("$")[0];

}

    // Wildcard
    line = line.replace(/^\*\./, "");


    // Remove paths
    line = line.split("/")[0];


    // Remove modifiers
    line = line.split("$")[0];


    line = line
        .trim()
        .toLowerCase()
        .replace(/\.$/, "");


    if (!isValidDomain(line))
        return null;


    return line;
}


export function parseList(text) {

    const domains = new Set();


    for (const line of text.split("\n")) {

    const result = cleanCandidate(line);

if (!result)
    continue;


if (Array.isArray(result)) {

    for (const domain of result) {
        domains.add(domain);
    }

} else {

    domains.add(result);

}

    }


    return [...domains];

}

