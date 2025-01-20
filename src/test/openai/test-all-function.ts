// 음식사진을 던져 줄거야. 먼저, 음식들을 인식하고 각 음식에 대한 음식명(한글)과 무게(g) 추출해. 그 다음, 음식의 Bounded Box로 사각 위치 정보를 픽셀 단위로 계산해줘. 그리고 마지막으로 각 음식에 대한 탄수화물, 단백질, 지방에 대한 정보를 g단위로 포함해줘.
// 위 정보들을 가지고 JSON 타입으로 리턴해주면 돼.
// 사진에 음식 사진이 없으면 빈 배열로 리턴해주면 되구.
// 반환 결과는 아래를 참조해. 특히 변수명은 같아야 한다.
// {
// length : 1 //contents의 길이
// contents : [{
//     "name": "튀김",  //음식명
//     "weightGram" : 100g//
//     "location": {
//       "x": 180, "y": 30,"width": 250, "height": 120}
//     },
//     "nutritional": {
//       "carbohydrateG": 30,
//       "proteinG": 4,
//       "fatG": 8
//     }
//   }...]
// }

import OpenAI from "openai";
import * as fs from "fs"; 

// 로컬 파일 경로
const imagePath = "./test/test3.jpg";

// 이미지를 base64로 인코딩


const startTime = Date.now();

const openai = new OpenAI({
  apiKey: 
});


// Function to execute OpenAI chat API call
async function executeOpenAIRequest(imageBase64, index) {
  const startTime = Date.now(); // Start time for execution

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "Provide a detailed analysis of food items from an image. First, identify the foods in the image and extract each food's name in Korean and its weight in grams. Then, calculate the bounding box for each food item, providing the pixel location details. Finally, include the nutritional information for each food item, specifying carbohydrate, protein, and fat content in grams. Return the gathered information in JSON format. If no food items are detected in the image, return an empty array.\n\n# Steps\n\n1. **Food Identification**: Process the image to identify each food item. For each food, provide:\n   - **Name**: The name of the food in Korean.\n   - **Weight**: The approximate weight in grams.\n2. **Bounding Box Calculation**: Determine the location details of the found food items:\n   - **Location**: Compute the x and y coordinates along with width and height in pixels.\n3. **Nutritional Information**: For each identified food, extract the nutritional details:\n   - **Carbohydrates**: Amount in grams.\n   - **Protein**: Amount in grams.\n   - **Fat**: Amount in grams.\n\n# Output Format\n\nReturn the output as a JSON formatted as follows:\n\n```json\n{\n  \"length\": [number of identified food items],\n  \"contents\": [\n    {\n      \"name\": \"[Food name in Korean]\",\n      \"weightGram\": [Weight in grams],\n      \"location\": {\n        \"x\": [x-coordinate],\n        \"y\": [y-coordinate],\n        \"width\": [width in pixels],\n        \"height\": [height in pixels]\n      },\n      \"nutritional\": {\n        \"carbohydrateG\": [grams of carbohydrates],\n        \"proteinG\": [grams of protein],\n        \"fatG\": [grams of fat]\n      }\n    }\n    ...\n  ]\n}\n```\n\nIf no food is identified, return:\n\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Examples\n\n**Example 1:**\n\nInput: An image containing different foods.\n\nOutput: \n```json\n{\n  \"length\": 2,\n  \"contents\": [\n    {\n      \"name\": \"튀김\",\n      \"weightGram\": 100,\n      \"location\": {\n        \"x\": 180,\n        \"y\": 30,\n        \"width\": 250,\n        \"height\": 120\n      },\n      \"nutritional\": {\n        \"carbohydrateG\": 30,\n        \"proteinG\": 4,\n        \"fatG\": 8\n      }\n    },\n    {\n      \"name\": \"김치\",\n      \"weightGram\": 50,\n      \"location\": {\n        \"x\": 100,\n        \"y\": 75,\n        \"width\": 80,\n        \"height\": 60\n      },\n      \"nutritional\": {\n        \"carbohydrateG\": 5,\n        \"proteinG\": 1,\n        \"fatG\": 0.5\n      }\n    }\n  ]\n}\n```\n\n**Example 2:**\n\nInput: An image with no food items.\n\nOutput:\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Notes\n\n- Ensure the variable names and structure match exactly the provided example.\n- The weight and nutritional data should be estimated as accurately as possible based on visual analysis.\n- Always return a JSON object, even if empty, for consistency."
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64, ${imageBase64}`
              }
            }
          ]
        },
      ],
      response_format: {
        "type": "text"
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    // Process response
    // console.log(`Response for request #${index + 1}:`, response);
    // console.log("Formatted JSON:", JSON.stringify(response.choices[0].message.content));
    // console.log("Content:", response.choices[0].message.content);
    // console.log(response.choices[0].message.content.)
    // JSON.parse(
    //   response.choices[0].message.content.replace(/^```json\s*/, "").replace(/```$/, "")
    // )
    // console.log(`Time taken for request #${index + 1}: ${endTime} ms`);

    console.log(response.choices[0].message.content);
    const endTime = Date.now() - startTime; // Calculate execution time
    return [index+1, endTime, 
      JSON.parse(
        response.choices[0].message.content.replace(/^```json\s*/, "").replace(/```$/, "")
      ).length];
      //JSON.parse(response.choices[0].message.content)];
  } catch (error) {
    console.error(`Error in request #${index + 1}:`, error);
  }
}

// Function to repeat the process 10 times
export async function executeMultipleRequests(imageBase64, filename) {
  let result : Map<number, {
    index: number,
    time: number,
    length: number
  }> = new Map();
  let count = 0;
  for (let i = 0; i < 100; i++) {
    let ret = await executeOpenAIRequest(imageBase64, i);

    if(ret[2] !== 0) {
      result.set(ret[0], {
        index: ret[0],
        time: ret[1],
        length: ret[2]
      });
    }
    if(result.size == 10) break;
    console.log("result.size", result.size);
    console.log("count", i);
  }
  result.forEach((value, key) => {
    console.log(`Response for request #${value.index}:`, value);
  })

  // CSV 헤더
  const header = "key,index,time,length\n";

  // 데이터 변환
  const rows = Array.from(result.entries()).map(
    ([key, value]) => `${key},${value.index},${value.time},${value.length}`
  ).join("\n");

  // 파일로 쓰기
  const csvContent = header + rows;
  fs.writeFileSync(`all-function-output-${filename}.csv`, csvContent, "utf8");

  console.log("파일이 성공적으로 작성되었습니다!");
}

// Base64-encoded image (replace this with your actual Base64 image string)
const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

// Execute 10 requests
// executeMultipleRequests(imageBase64),;
