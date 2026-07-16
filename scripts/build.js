import { writeOutput } from "./writer.js";
import sources from "./sources.js";
import { downloadSources } from "./downloader.js";
import { parseList } from "./parser.js";


async function main() {

    console.log("====================================");
    console.log(" AdLists Builder");
    console.log("====================================");
    console.log("");


    const enabledSources =
        sources.filter(source => source.enabled);


    console.log(`Sources configured : ${sources.length}`);
    console.log(`Sources enabled    : ${enabledSources.length}`);
    console.log("");


    const downloaded =
        await downloadSources(enabledSources);


    console.log("");
    console.log("====================================");
    console.log("Parsing Lists");
    console.log("====================================");


    const allDomains = new Set();


    let totalLines = 0;


    for (const source of downloaded) {

        console.log(`Parsing ${source.name}...`);


        const lines =
            source.text.split("\n").length;


        totalLines += lines;


        const domains =
            parseList(source.text);


        console.log(
            `✓ ${source.name}: ${domains.length} domains`
        );


        for (const domain of domains) {
            allDomains.add(domain);
        }

    }


    console.log("");

    console.log("====================================");
    console.log("Final Statistics");
    console.log("====================================");


    console.log(
        `Lines processed : ${totalLines}`
    );


    console.log(
    `Unique domains  : ${allDomains.size}`
    );


await writeOutput(
    allDomains,
    {
        generated: new Date().toISOString(),
        lines_processed: totalLines,
        unique_domains: allDomains.size
    },
    downloaded.map(source => ({
        name: source.name,
        url: source.url
    }))
);


}


main().catch(error => {

    console.error(error);

    process.exit(1);

});


