
import {executeMultipleRequests as excute1} from '../openai/test-all-function-without-location-fastest';
// import {executeMultipleRequests as excute2} from '../openai/test-all-function-wo-location-single-food-fastest';
import * as fs from 'fs';


let imagePath = "./test/test3.jpg";
let imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

excute1(imageBase64, "test3.jpg");
// excute2(imageBase64, "test3.jpg");

// imagePath = "./test/test2.jpg";
// imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

// excute1(imageBase64, "test2.jpg");
// excute2(imageBase64, "test2.jpg");

// imagePath = "./test/test.jpg";
// imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

// excute1(imageBase64, "test1.jpg");
// excute2(imageBase64, "test1.jpg");
