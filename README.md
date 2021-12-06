<!-- ABOUT THE PROJECT -->
## About The Project
...
<p align="right">(<a href="#top">back to top</a>)</p>

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Node >= 10
* Redis
* Mongodb
### Installation

_If you wish to run the tutorial, you can use the following commands_

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Copy `.env-sample` to `.env` and Edit your variables by your setting
   ```js
   MONGODB_URL='ENTER MONGODB URL';
   REDIS_HOST='ENTER REDIS HOST';
   REDIS_PORT='ENTER REDIS PORT';
   ...
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Usage
Available methods:
- [Function and Constanst](#function-and-constanst): Retrieves the Function/Constanst of an application.
- [Privacy policy analysis](#privacy-policy-analysis): Retrieves the privacy policy of an application.
- [Calculate distance](#calculate-distance): Calculate the distance of an application.
- [Prediction](#prediction): Retrieves the prediction of an application by 4 approaches
### Function and Constanst

Retrieves the Function/Constanst of an application.

Command:

```sh
npm run getAppInfo
```
### Privacy policy analysis

Retrieves the privacy policy of an application.

Command:

```sh
npm run privacyPolicyAnalysis
```
### Calculate distance

Calculate the distance of an application.

Command:

```sh
npm run computingDistance
```
### Prediction

Retrieves the prediction of an application by 4 approaches

Command:

```sh
npm run getPrediction
```
### Citation
  If you find the dataset (i.e., app info (36k apps' name, StaticAnalysisParseTree (66 personal APIs))) or static analysis code useful to your research, please cite one of the following papers:
```
  @inproceedings{son2021risk,
  title={A Risk Assessment Mechanism for Android Apps},
  author={Son, Ha Xuan and Carminati, Barbara and Ferrari, Elena},
  booktitle={2021 IEEE International Conference on Smart Internet of Things (SmartIoT)},
  pages={237--244},
  year={2021},
  organization={IEEE}
  } 
```
<p align="right">(<a href="#top">back to top</a>)</p>