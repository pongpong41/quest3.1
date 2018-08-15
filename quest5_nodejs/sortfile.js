var fs = require("fs");
var inputFile = fs.readFileSync("in.txt", { encoding: "utf8" });
var x = inputFile.split(" ").map(Number);
x.sort(function(a, b) {
  return a - b;
});
var output = x.join(" ");
console.log(output);
fs.writeFileSync("out.txt", output, "utf8");
