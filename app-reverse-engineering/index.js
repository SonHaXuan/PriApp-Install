const { execSync } = require("child_process");
const path = require("path");
main();
async function main() {
  const apkFilePath = path.join(__dirname, "/input.apk");
  const outputPath = path.join(__dirname, "/output");

  const jadxPath = path.join(__dirname, "/jadx/build/jadx/bin/jadx");
  const jadxScript = `sh ${jadxPath} -d "${outputPath}" "${apkFilePath}"`;

  execSync(jadxScript, {
    timeout: 1000 * 60 * 5, // 5 mins
  });

  console.log(
    `Decompiled the apk successful. The output is in your folder ${outputPath}`
  );
}
