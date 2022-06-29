const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

main();
async function main() {
  console.log("Running Get app's function and constants");

  let file2 = await csv({
    noheader: true,
    output: "csv",
  }).fromFile(path.join(__dirname, "/file2.csv"));

  let apps = fs.readFileSync(path.join(__dirname, "/apps.json"), "utf-8");
  apps = JSON.parse(apps);
  const result = [];
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    console.log(`Running ${i}/${apps.length}`);

    const { nodes, dataTypes } = app;
    let functionsInfiles = [];

    file2.forEach((item, index) => {
      const [, , , , functionItem] = item;
      if (index === 0 || !functionItem) return;

      if (_.map(nodes, "name").includes(functionItem.trim())) {
        functionsInfiles.push(item);
      }
    });

    // filter functions has lables
    const functionsInfiles2 = functionsInfiles.filter((item) =>
      dataTypes.includes(item[7].trim())
    );

    const functionsInfiles1 = functionsInfiles.filter(
      (item) => !dataTypes.includes(item[7].trim())
    );

    const dynamicFunctions = _.uniq(_.map(functionsInfiles1, 4));
    const dynamicApis = _.uniq(_.map(functionsInfiles1, 2));

    const staticFunctions = _.uniq(_.map(functionsInfiles2, 4));
    const staticApis = _.uniq(_.map(functionsInfiles2, 2));

    result.push({
      appName: app.appName,
      dynamicFunctions,
      dynamicApis,
      staticFunctions,
      staticApis,
    });
  }

  const outputPath = path.join(__dirname, "/output.json");
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

  console.log(
    `The process is completed successfully. The output is in ${outputPath}`
  );
}
