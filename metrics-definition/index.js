const Promise = require("bluebird");
const csv =require("csvtojson");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");

main()
async function main() {
	console.log("The process is running please waiting until the process ends")
	const matrix = {
    expert: {
			1: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			2: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			3: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			4: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		},
    paid: {
			1: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			2: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			3: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			4: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		},
    unpaid: {
			1: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			2: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			3: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			4: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		},
    totalexpert: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
		},
    totalpaid: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
		},
    totalunpaid: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
		},
  };
	const [paidData, unpaidData, expertData] = await Promise.all([
		csv({
			noheader: true,
			output: "csv"
		}).fromFile(
			path.join(
				__dirname,
				"/Test dataset/Crowd workers.csv"
			)
		),
		csv({
			noheader: true,
			output: "csv"
		}).fromFile(
			path.join(
				__dirname,
				"/Test dataset/IT workers.csv"
			)
		),
		csv({
			noheader: true,
			output: "csv"
		}).fromFile(
			path.join(
				__dirname,
				"/Test dataset/S&P expert.csv"
			)
		),
	])

	const getMatrix = (type, data) => {
		[1, 2, 3, 4].forEach((approachNum) => {
			let [, yy, yn, ym] = data[(4 * (approachNum - 1)) + 2]
			let [, ny, nn, nm] = data[(4 * (approachNum - 1)) + 3]
			let [, my, mn, mm] = data[(4 * (approachNum - 1)) + 4]

			yy = Number(yy)
			yn = Number(yn)
			ym = Number(ym)
			ny = Number(ny)
			nn = Number(nn)
			nm = Number(nm)
			my = Number(my)
			mn = Number(mn)
			mm = Number(mm)
						
			matrix[type][approachNum][0][0] = nn
			matrix[type][approachNum][0][1] = ny
			matrix[type][approachNum][0][2] = nm

			matrix[type][approachNum][1][0] = yn
			matrix[type][approachNum][1][1] = yy
			matrix[type][approachNum][1][2] = ym

			matrix[type][approachNum][2][0] = mn
			matrix[type][approachNum][2][1] = my
			matrix[type][approachNum][2][2] = mm

			matrix[`total${type}`][approachNum] = _.sum([yy, yn, ym, ny, nn, nm, my, mn, mm])
		})
	}

	getMatrix('paid', paidData)
	getMatrix('unpaid', unpaidData)
	getMatrix('expert', expertData)
	

  const result = {
    expert: { 1: {}, 2: {}, 3: {}, 4: {} },
    paid: { 1: {}, 2: {}, 3: {}, 4: {} },
    unpaid: { 1: {}, 2: {}, 3: {}, 4: {} }
  };

	const getResult = (type) => {
		[1, 2, 3, 4].forEach(approachNum => {
				result[type][approachNum]["accurancy"] =
				(matrix[type][approachNum][0][0] +
					matrix[type][approachNum][1][1] +
					matrix[type][approachNum][2][2]) /
				matrix[`total${type}`][approachNum];

			//precisionY
			result[type][approachNum]["precisionY"] =
				matrix[type][approachNum][0][0] /
				(matrix[type][approachNum][0][0] +
					matrix[type][approachNum][1][0] +
					matrix[type][approachNum][2][0]);
			//precisionN
			result[type][approachNum]["precisionN"] =
				matrix[type][approachNum][0][0] /
				(matrix[type][approachNum][0][0] +
					matrix[type][approachNum][1][0] +
					matrix[type][approachNum][2][0]);

			//precisionM
			result[type][approachNum]["precisionM"] =
				matrix[type][approachNum][2][2] /
				(matrix[type][approachNum][2][2] +
					matrix[type][approachNum][1][2] +
					matrix[type][approachNum][0][2]);

			//recallY
			result[type][approachNum]["recallY"] =
				matrix[type][approachNum][0][0] /
				(matrix[type][approachNum][0][0] +
					matrix[type][approachNum][0][1] +
					matrix[type][approachNum][0][2]);

			//recallN
			result[type][approachNum]["recallN"] =
				matrix[type][approachNum][1][1] /
				(matrix[type][approachNum][1][1] +
					matrix[type][approachNum][1][0] +
					matrix[type][approachNum][1][2]);

			//recallM
			result[type][approachNum]["recallM"] =
				matrix[type][approachNum][2][2] /
				(matrix[type][approachNum][2][2] +
					matrix[type][approachNum][2][0] +
					matrix[type][approachNum][2][1]);

			result[type][approachNum]["F1Y"] =
				(2 *
					(result[type][approachNum]["precisionY"] *
						result[type][approachNum]["recallY"])) /
				(result[type][approachNum]["precisionY"] +
					result[type][approachNum]["recallY"]);

			result[type][approachNum]["F1N"] =
				(2 *
					(result[type][approachNum]["precisionN"] *
						result[type][approachNum]["recallN"])) /
				(result[type][approachNum]["precisionN"] +
					result[type][approachNum]["recallN"]);

			result[type][approachNum]["F1M"] =
				(2 *
					(result[type][approachNum]["precisionM"] *
						result[type][approachNum]["recallM"])) /
				(result[type][approachNum]["precisionM"] +
					result[type][approachNum]["recallM"]);
		})
	}
	getResult("paid")
	getResult("unpaid")
	getResult("expert")

	
	const generateFile = (type) => {
		let content = "";

		[1, 2, 3, 4].forEach(approachNum => {
    	content += `
* Approach ${approachNum}

	Accurancy: ${result[type][approachNum]["accurancy"]} 

	Precision Yes: ${result[type][approachNum]["precisionY"]}
	Precision No: ${result[type][approachNum]["precisionN"]}
	Precision Maybe: ${result[type][approachNum]["precisionM"]} 

	Recall Yes: ${result[type][approachNum]["recallY"]}
	Recall No: ${result[type][approachNum]["recallN"]}
	Recall Maybe: ${result[type][approachNum]["recallM"]}

	F1 Yes: ${result[type][approachNum]["F1Y"]}
	F1 No: ${result[type][approachNum]["F1N"]}
	F1 Maybe: ${result[type][approachNum]["F1M"]} \n
			`;

			
		})

		fs.writeFileSync(path.join(__dirname, `/report/${type}.txt`), content);
	}

	generateFile("paid")
	generateFile("unpaid")
	generateFile("expert")

	 console.log("The process is completed successfully. The output is in report folder")
}