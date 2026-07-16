# AdLists

A fast, automatically generated DNS blocklist that combines multiple trusted public blocklists into a single cleaned, validated, deduplicated list.

## Features

* ✅ Downloads multiple public blocklists
* ✅ Cleans and normalizes different list formats
* ✅ Removes invalid entries
* ✅ Removes duplicate domains
* ✅ Sorts the final list alphabetically
* ✅ Generates a single ready-to-use blocklist
* ✅ Can be updated automatically using GitHub Actions

---

## Main Blocklist

After GitHub Pages is enabled, the latest blocklist will be available at:

```
https://petermiinge.github.io/adlists/adlist.txt
```

(Currently this URL will work after GitHub Pages has been configured.)

---

## Statistics

Each build also generates:

* `stats.json` — Build information and statistics
* `sources.json` — List of all enabled sources

---

## Current Sources

* AdGuard DNS Filter
* AWAvenue Ads Rule
* Yoyo
* 1Hosts Lite
* SomeoneWhoCares
* HaGeZi Multi
* HaGeZi Pro
* StevenBlack Hosts
* OISD Small
* OISD Big

More sources can be added at any time by editing `scripts/sources.js`.

---

## How It Works

```
Download Sources
        │
        ▼
Parse Lists
        │
        ▼
Validate Domains
        │
        ▼
Remove Invalid Entries
        │
        ▼
Deduplicate Domains
        │
        ▼
Sort Alphabetically
        │
        ▼
Generate adlist.txt
```

---

## Build

Install dependencies:

```bash
npm install
```

Generate the blocklist:

```bash
npm run build
```

Generated files are written to the `output` directory.

---

## Project Structure

```
.
├── output/
│   ├── adlist.txt
│   ├── stats.json
│   └── sources.json
├── scripts/
│   ├── build.js
│   ├── downloader.js
│   ├── parser.js
│   ├── validator.js
│   ├── dedupe.js
│   ├── writer.js
│   ├── stats.js
│   └── sources.js
├── package.json
└── README.md
```

---

## Adding a New Source

Open:

```
scripts/sources.js
```

Add another source:

```javascript
{
  name: "Example List",
  url: "https://example.com/blocklist.txt",
  enabled: true
}
```

Run:

```bash
npm run build
```

The new list will automatically be downloaded, cleaned, validated, merged, and deduplicated with all other sources.

---

## License

This project combines publicly available blocklists created and maintained by their respective authors. Please review the individual source licenses and usage terms where applicable.

The build scripts in this repository are released under the MIT License.
