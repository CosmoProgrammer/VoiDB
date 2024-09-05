const voidb = require("./index.js");
const readline = require("readline");
const util = require("util");
const { printTable } = require("console-table-printer");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "voidb> ",
});

function run(command) {
  try {
    const result = voidb(command);
    if (!result[0].data) {
      console.table(util.inspect(result[0].message, false, null, true));
    } else {
      //console.table(util.inspect(result[0], false, null, true));
      if (typeof result[0].data[0] == "string") {
        console.table(util.inspect(result[0], false, null, true));
      } else {
        console.log(result[0].info);
        printTable(result[0].data);
      }
    }
    console.log("\n");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

console.log("VoiDB REPL. Type your commands below:");
rl.prompt();

rl.on("line", (line) => {
  run(line.trim());
  rl.prompt();
}).on("close", () => {
  console.log("Exiting");
  process.exit(0);
});
