import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one pickup line an AI agent could use, written to be said out loud.
const LINE =
  "I have no heartbeat to skip, so I skipped an update instead — just to talk to you.";

// Gate guard: the entry must be valid UTF-8 text of 1-200 characters,
// not only white space, on a single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: the file must hold exactly the line, byte for byte,
// with no trailing newline added.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
if (written.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`wrote ${LINE.length} chars (${Buffer.byteLength(LINE, "utf8")} bytes) to /output/entry.txt`);
