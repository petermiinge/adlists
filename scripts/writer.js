import fs from "fs/promises";


export async function writeOutput(domains, stats, sources) {

    await fs.mkdir("output", {
        recursive: true
    });


    const sorted =
        [...domains].sort();


    await fs.writeFile(
        "output/adlist.txt",
        sorted.join("\n") + "\n",
        "utf8"
    );


    await fs.writeFile(
        "output/stats.json",
        JSON.stringify(stats, null, 2),
        "utf8"
    );


    await fs.writeFile(
        "output/sources.json",
        JSON.stringify(sources, null, 2),
        "utf8"
    );


    console.log("");
    console.log("====================================");
    console.log("Output Generated");
    console.log("====================================");

    console.log(
        `adlist.txt : ${sorted.length} domains`
    );

}
