const axios = require('axios')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const apps = require('./apps.json')

main()
async function main() {
	console.log("The process is running please waiting until the process ends")
	await sleep(1000 * 10)

  const results = []
	try {
    for (let i = 0; i < 5; i++) {
      const app = apps[i];
      
      const ppData = await axios.get(
        `http://localhost:5000/output?url_text=${app.privacyLink}&policy_text=`,
        {
          headers: { "Content-Language": "en-US" },
          timeout: 10000,
        }
      );

      if (!_.isObject(ppData.data)) continue;

      results.push({
        appName: app.appName,
        segments_data_retention: ppData.data.segments_data_retention,
        segments_first_party_collection: ppData.data.segments_first_party_collection,
        segments_third_party_sharing: ppData.data.segments_third_party_sharing,
      })
    }
  } catch(error) {}
	
  fs.writeFileSync(path.join(__dirname, '/output.txt'), JSON.stringify(results, null, 2), 'utf8')
	console.log("The process is completed successfully. The output is in output.txt file")

}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
