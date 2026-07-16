import axios from "axios";

/**
 * Download all enabled sources.
 */
export async function downloadSources(sources) {

    const results = [];

    for (const source of sources) {

        if (!source.enabled)
            continue;

        console.log(`Downloading ${source.name}...`);

        try {

            const response = await axios.get(source.url, {
                timeout: 120000,
                responseType: "text",
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                headers: {
                    "User-Agent": "AdLists Builder/1.0"
                }
            });


            console.log(`✓ ${source.name}`);


            results.push({
                ...source,
                text: response.data
            });


        } catch (error) {

            if (error.response) {

                console.error(
                    `✗ ${source.name}: HTTP ${error.response.status}`
                );

            } else if (error.code) {

                console.error(
                    `✗ ${source.name}: ${error.code}`
                );

            } else {

                console.error(
                    `✗ ${source.name}: ${error.message || "Unknown error"}`
                );

            }

        }

    }


    return results;

}
