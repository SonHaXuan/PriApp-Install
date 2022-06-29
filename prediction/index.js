const _ = require('lodash')

const predictionService = require('./services/prediction.service.js')
const apps = require('./apps.json')
const answer = require('./answer.json')
const constants = require('./helpers/constants')
main()
async function main() {
  console.log("The process is running please waiting until the process ends")
  await sleep(1000 * 10)
  const result = []
  for (let index = 10; index < apps.length; index++) {
    const app = apps[index];
    const PPModel = JSON.parse(app.PPModel);
    const apisModel = JSON.parse(app.apisModel);
    let ourPrediction;

    if (index >= 10 && index < 14) {
      const tranningApps = apps.slice(0, index);

      const traningSet = tranningApps.map(tranningApp => {
        let { PPModel, apisModel, id } = tranningApp;
        PPModel = JSON.parse(PPModel);
        apisModel = JSON.parse(apisModel);

       
        const userAnswerQuestion = answer.questions.find(
          question => question._id === id
        );

        let questionInstallation = userAnswerQuestion.responses.find(
          item => item.name === "install"
        );
        if (!questionInstallation)
          questionInstallation = userAnswerQuestion.responses.find(
            item => item.name === "agreePredict"
          );

        if (!questionInstallation) throw Error("Answer not found");
        const label = questionInstallation.value;

        return [
          ...Object.values(PPModel).map(item => item.toString()),
          ...Object.values(apisModel).map(item => item.toString()),
          label.toString()
        ];
      });

      const testSet = [
        [
          ...Object.values(PPModel).map(item => item.toString()),
          ...Object.values(apisModel).map(item => item.toString()),
          "-1"
        ]
      ];

      // get prediction
      ourPrediction = await predictionService.getPredictEM({
        train: traningSet,
        test: testSet
      });
      ourPrediction = ourPrediction[0][0];
    } else if (index >= 14 && index < 18) {
      let tranningApps = [];
      if (index >= 14 && index < 16)
        tranningApps = [
          ...apps.slice(0, 5),
          ...apps.slice(14, index)
        ];
      if (index >= 16 && index < 18)
        tranningApps = [
          ...apps.slice(5, 10),
          ...apps.slice(16, index)
        ];

    const traningSet = tranningApps.map(tranningApp => {
      let { PPModel, apisModel, id } = tranningApp;
      PPModel = JSON.parse(PPModel);
      apisModel = JSON.parse(apisModel);

      const userAnswerQuestion = answer.questions.find(
        question => question._id === id
      );
      let questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "install"
      );
      if (!questionInstallation)
        questionInstallation = userAnswerQuestion.responses.find(
          item => item.name === "agreePredict"
        );
      if (!questionInstallation) throw Error("Answer not found");
      const label = questionInstallation.value;

      return [...Object.values(PPModel), ...Object.values(apisModel), label];
    });

      const testSet = [
        [
          ...Object.values(PPModel).map(item => item.toString()),
          ...Object.values(apisModel).map(item => item.toString()),
          "-1"
        ]
      ];

      // get prediction
      ourPrediction = await predictionService.getPredictEM({
        train: traningSet,
        test: testSet
      });

      ourPrediction = ourPrediction[0][0];
    }
     else if (index >= 18 && index < 22) {
      const tranningApps = [
        ...apps.slice(0, 10),
        ...apps.slice(18, index)
      ];

      ourPrediction = await getOurPredictionApproach3(
        tranningApps,
        answer,
        app
      );
    } 
    else if (index >= 22 && index < 26) {
      const tranningApps = [
        ...apps.slice(0, 10),
        ...apps.slice(22, index)
      ];
      ourPrediction = await getOurPredictionApproach4(
        tranningApps,
        answer,
        app
      );
    }

    result.push({
      appName: app.appName,
      ourPrediction
    })
  }

  console.log("The process is completed successfully. Here is the output:")
  console.log(JSON.stringify(result, null, 2))
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getOurPredictionApproach4 = async (
  tranningApps,
  userAnswer,
  question,
  algorithm = "EM",
  questionPrediction = []
) => {
  const category = Object.entries(constants.categoryGroups).find(item => {
    const subCategories = item[1];

    if (subCategories.includes(question.categoryName)) return true;
    return false;
  })[0];

  // app (view 1)
  const view1Tranning = tranningApps.map((tranningApp, index) => {
    let { id, categoryName } = tranningApp;

    const category = Object.entries(constants.categoryGroups).find(item => {
      const subCategories = item[1];

      if (subCategories.includes(categoryName)) return true;
      return false;
    })[0];

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    let label;
    const ourPrediction = questionPrediction.find(item => item.id === id);
    if (ourPrediction) {
      label = ourPrediction.value;
    } else {
      label = questionInstallation.value;
    }

    return [
      index + 1,
      Object.keys(constants.categoryGroups).indexOf(category) + 1,
      Number(label)
    ];
  });
  // app and categor(view 1)
  const view1Test = tranningApps.map((tranningApp, index) => {
    let { id, categoryName } = tranningApp;
    const category = Object.entries(constants.categoryGroups).find(item => {
      const subCategories = item[1];

      if (subCategories.includes(categoryName)) return true;
      return false;
    })[0];

    return [
      index + 1,
      Object.keys(constants.categoryGroups).indexOf(category) + 1,
      -1
    ];
  });
  view1Test.push([
    view1Test.length + 1,
    Object.keys(constants.categoryGroups).indexOf(category) + 1,
    -1
  ]);

  // apis(view 2)
  const view2Tranning = tranningApps.map((tranningApp, index) => {
    let { id, apisModel } = tranningApp;

    apisModel = JSON.parse(apisModel);

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [...Object.values(apisModel), Number(label)];
  });
  const view2Test = tranningApps.map((tranningApp, index) => {
    let { id, apisModel } = tranningApp;

    apisModel = JSON.parse(apisModel);

    return [...Object.values(apisModel), -1];
  });
  view2Test.push([...Object.values(JSON.parse(question.apisModel)), -1]);

  // collection and third party
  const view3Tranning = tranningApps.map((tranningApp, index) => {
    let { id, thirdPartyData, collectionData } = tranningApp;

    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      Number(label)
    ];
  });
  const view3Test = tranningApps.map((tranningApp, index) => {
    let { id, thirdPartyData, collectionData } = tranningApp;

    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    return [
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      -1
    ];
  });
  view3Test.push([
    ...buildDataCollectionAndThirdParty(question.collectionData, "collection"),
    ...buildDataCollectionAndThirdParty(question.thirdPartyData, "thirdParty"),
    -1
  ]);

  let data = [];
  switch (algorithm) {
    // SVM
    case "SVM":
      data = await Promise.all([
        // view1
        predictionService.getPredictSVM({
          train: view1Tranning,
          test: view1Test
        }),
        // view2
        predictionService.getPredictSVM({
          train: view2Tranning,
          test: view2Test
        }),
        // appAndPP
        predictionService.getPredictSVM({
          train: view3Tranning,
          test: view3Test
        })
      ]);

      break;
    // GradientBoostingClassifier
    case "GradientBoostingClassifier":
      data = await Promise.all([
        // view1
        predictionService.getPredictGradientBoostingClassifier({
          train: view1Tranning,
          test: view1Test
        }),
        // view2
        predictionService.getPredictGradientBoostingClassifier({
          train: view2Tranning,
          test: view2Test
        }),
        // appAndPP
        predictionService.getPredictGradientBoostingClassifier({
          train: view3Tranning,
          test: view3Test
        })
      ]);

      break;
    // AdaBoostClassifier
    case "AdaBoostClassifier":
      data = await Promise.all([
        // view1
        predictionService.getPredictAdaBoostClassifier({
          train: view1Tranning,
          test: view1Test
        }),
        // view2
        predictionService.getPredictAdaBoostClassifier({
          train: view2Tranning,
          test: view2Test
        }),
        // appAndPP
        predictionService.getPredictAdaBoostClassifier({
          train: view3Tranning,
          test: view3Test
        })
      ]);

      break;
    // GradientBoostingRegressor
    case "GradientBoostingRegressor":
      data = await Promise.all([
        // view1
        predictionService.getPredictGradientBoostingRegressor({
          train: view1Tranning,
          test: view1Test
        }),
        // view2
        predictionService.getPredictGradientBoostingRegressor({
          train: view2Tranning,
          test: view2Test
        }),
        // appAndPP
        predictionService.getPredictGradientBoostingRegressor({
          train: view3Tranning,
          test: view3Test
        })
      ]);

      break;

    default:
      data = await Promise.all([
        // view1
        predictionService.getPredictEM({
          train: view1Tranning,
          test: view1Test
        }),
        // view2
        predictionService.getPredictEM({
          train: view2Tranning,
          test: view2Test
        }),
        // appAndPP
        predictionService.getPredictEM({
          train: view3Tranning,
          test: view3Test
        })
      ]);
      break;
  }

  const tranningSet = Array.from({ length: tranningApps.length }, (v, i) => {
    const { id } = tranningApps[i];
    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [
      data[0][i][0].toString(),
      data[1][i][0].toString(),
      data[2][i][0].toString(),
      label
    ];
  });

  const testSet = [
    [
      _.last(data[0])[0].toString(),
      _.last(data[1])[0].toString(),
      _.last(data[2])[0].toString(),
      "-1"
    ]
  ];

  let predict;
  switch (algorithm) {
    // SVM
    case "SVM":
      predict = await predictionService.getPredictSVM({
        train: tranningSet,
        test: testSet
      });
      break;
    // GradientBoostingClassifier
    case "GradientBoostingClassifier":
      predict = await predictionService.getPredictGradientBoostingClassifier({
        train: tranningSet,
        test: testSet
      });
      break;
    // AdaBoostClassifier
    case "AdaBoostClassifier":
      predict = await predictionService.getPredictAdaBoostClassifier({
        train: tranningSet,
        test: testSet
      });
      break;
    // GradientBoostingRegressor
    case "GradientBoostingRegressor":
      predict = await predictionService.getPredictGradientBoostingRegressor({
        train: tranningSet,
        test: testSet
      });
      break;
    default:
      predict = await predictionService.getPredictEM({
        train: tranningSet,
        test: testSet
      });
      break;
  }

  return predict[0][0];
};

const getOurPredictionApproach3 = async (
  tranningApps,
  userAnswer,
  question,
  algorithm,
  questionPrediction = []
) => {
  
  const category = Object.entries(constants.categoryGroups).find(item => {
    const subCategories = item[1];

    if (subCategories.includes(question.categoryName)) return true;
    return false;
  })[0];

  // app and category and api (view 1)
  const view1Tranning = tranningApps.map((tranningApp, index) => {
    let { id, categoryName, apisModel } = tranningApp;
    apisModel = JSON.parse(apisModel);

    const category = Object.entries(constants.categoryGroups).find(item => {
      const subCategories = item[1];

      if (subCategories.includes(categoryName)) return true;
      return false;
    })[0];

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    let label;
    const ourPrediction = questionPrediction.find(item => item.id === id);
    if (ourPrediction) {
      label = ourPrediction.value;
    } else {
      label = questionInstallation.value;
    }

    return [
      index + 1,
      Object.keys(constants.categoryGroups).indexOf(category) + 1,
      ...Object.values(apisModel),
      label
    ];
  });
  // app and category and api (view 1)
  const view1Test = tranningApps.map((tranningApp, index) => {
    let { id, categoryName, apisModel } = tranningApp;
    apisModel = JSON.parse(apisModel);

    const category = Object.entries(constants.categoryGroups).find(item => {
      const subCategories = item[1];

      if (subCategories.includes(categoryName)) return true;
      return false;
    })[0];

    return [
      index + 1,
      Object.keys(constants.categoryGroups).indexOf(category) + 1,
      ...Object.values(apisModel),
      -1
    ];
  });
  view1Test.push([
    view1Test.length + 1,
    Object.keys(constants.categoryGroups).indexOf(category) + 1,
    ...Object.values(JSON.parse(question.apisModel)),
    -1
  ]);

  // apis and collection and third party (view 2)
  const view2Tranning = tranningApps.map((tranningApp, index) => {
    let { id, apisModel, thirdPartyData, collectionData } = tranningApp;

    apisModel = JSON.parse(apisModel);
    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [
      ...Object.values(apisModel),
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      label
    ];
  });
  const view2Test = tranningApps.map((tranningApp, index) => {
    let { id, apisModel, thirdPartyData, collectionData } = tranningApp;

    apisModel = JSON.parse(apisModel);
    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    return [
      ...Object.values(apisModel),
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      -1
    ];
  });
  view2Test.push([
    ...Object.values(JSON.parse(question.apisModel)),
    ...buildDataCollectionAndThirdParty(question.collectionData, "collection"),
    ...buildDataCollectionAndThirdParty(question.thirdPartyData, "thirdParty"),
    -1
  ]);

  // collection and third party and app
  const view3Tranning = tranningApps.map((tranningApp, index) => {
    let { id, apisModel, thirdPartyData, collectionData } = tranningApp;

    apisModel = JSON.parse(apisModel);
    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      index + 1,
      label
    ];
  });
  const view3Test = tranningApps.map((tranningApp, index) => {
    let { id, apisModel, thirdPartyData, collectionData } = tranningApp;

    apisModel = JSON.parse(apisModel);
    collectionData = JSON.parse(collectionData || "[]");
    thirdPartyData = JSON.parse(thirdPartyData || "[]");

    return [
      ...buildDataCollectionAndThirdParty(collectionData, "collection"),
      ...buildDataCollectionAndThirdParty(thirdPartyData, "thirdParty"),
      index + 1,
      -1
    ];
  });
  view3Test.push([
    ...buildDataCollectionAndThirdParty(question.collectionData, "collection"),
    ...buildDataCollectionAndThirdParty(question.thirdPartyData, "thirdParty"),
    view3Test.length + 1,
    -1
  ]);

  const data = await Promise.all([
    // view1
    predictionService.getPredictEM({
      train: view1Tranning,
      test: view1Test
    }),
    // view2
    predictionService.getPredictEM({
      train: view2Tranning,
      test: view2Test
    }),
    // appAndPP
    predictionService.getPredictEM({
      train: view3Tranning,
      test: view3Test
    })
  ]);

  const tranningSet = Array.from({ length: tranningApps.length }, (v, i) => {
    const { id } = tranningApps[i];
    const userAnswerQuestion = userAnswer.questions.find(
      question => question._id === id
    );
    let questionInstallation = userAnswerQuestion.responses.find(
      item => item.name === "install"
    );
    if (!questionInstallation)
      questionInstallation = userAnswerQuestion.responses.find(
        item => item.name === "agreePredict"
      );
    if (!questionInstallation) throw Error("Answer not found");
    const label = questionInstallation.value;

    return [
      data[0][i][0].toString(),
      data[1][i][0].toString(),
      data[2][i][0].toString(),
      label
    ];
  });

  const testSet = [
    [
      _.last(data[0])[0].toString(),
      _.last(data[1])[0].toString(),
      _.last(data[2])[0].toString(),
      "-1"
    ]
  ];

  const predict = await predictionService.getPredictEM({
    train: tranningSet,
    test: testSet
  });

  return predict[0][0];
};

const buildDataCollectionAndThirdParty = (data, type) => {
  let flattendata = {};
  flattenTree(data, "children", flattendata);

  let categories = [];
  switch (type) {
    case "collection": {
      categories = constants.categoriesCollection;
      break;
    }
    case "thirdParty": {
      categories = constants.categoriesThirdParty;
      break;
    }
  }

  const result = [];
  categories.forEach(item => {
    result.push(Object.keys(flattendata).includes(item.name) ? "1" : "0");
  });

  return result;
};

const flattenTree = function(tree, key, collection) {
  if (!tree[key] || tree[key].length === 0) return;
  for (var i = 0; i < tree[key].length; i++) {
    var child = tree[key][i];
    collection[child.id] = child;
    bfs(child, key, collection);
  }
  return;
};