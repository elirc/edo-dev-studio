import { gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";

const base = process.env.BASE || "http://127.0.0.1:3000";
const offline = process.argv.includes("--build");
for (const route of ["/", "/contatti", "/concept/casa-lino"]) {
  const html = offline
    ? await readFile(
        `.next/server/app${route === "/" ? "/index" : route}.html`,
        "utf8",
      )
    : await fetch(new URL(route, base)).then((response) => {
        if (!response.ok) throw new Error(`${route}: ${response.status}`);
        return response.text();
      });
  const scripts = [
    ...new Set(
      [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]),
    ),
  ];
  let bytes = 0;
  let gzipBytes = 0;
  for (const path of scripts) {
    const body = offline
      ? await readFile(
          decodeURIComponent(path.replace("/_next/", ".next/").split("?")[0]),
        )
      : await fetch(new URL(path, base)).then(async (asset) => {
          if (!asset.ok) throw new Error(`${path}: ${asset.status}`);
          return Buffer.from(await asset.arrayBuffer());
        });
    bytes += body.byteLength;
    gzipBytes += gzipSync(body).byteLength;
  }
  console.log(
    JSON.stringify({
      route,
      scripts: scripts.length,
      scriptBytes: bytes,
      gzipBytes,
      htmlBytes: Buffer.byteLength(html),
    }),
  );
}
