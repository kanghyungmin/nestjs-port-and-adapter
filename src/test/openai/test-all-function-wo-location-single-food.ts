// 음식 사진을 던져 줄거야. 제일 먼저 인식되는 음식에 대해 음식명(한글)과 무게(g)를 추출해. 그리고 음식에 대한 탄수화물, 단백질, 지방에 대한 정보를 g단위로 포함해줘.
// 마지막으로 위 정보들을 가지고 JSON 타입으로 리턴해주면 돼.사진에 음식 사진이 없으면 빈 배열로 리턴해주면 되구.반환 결과는 아래를 참조해. 특히 변수명은 같아야 한다.
// Prompt는 영어어야 한다. 
// {
// length : 1 //contents의 길이
// contents : [{
//     "name": "튀김",  //음식명
//     "weightGram": 100, //무게
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

const startTime = Date.now();

const openai = new OpenAI({
  apiKey: "sk-svcacct-P1kB_d6qD2P6zLOqlcakLNPPxLar5aVwGPSgPjyNpC6a3LHTdnsJHXFmlUDVWI3qGkfViT3BlbkFJevRtMBHDwfvvskHxJuA6RsPQW4TrohR0gw2P7g4U8zwjHoYfKl2ZHud1EZ6z_12Lai7YwA",
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
              "text": "Identify the first recognized food from the given image and extract the following details in Korean: food name and weight in grams. Additionally, include information on carbohydrates, proteins, and fats in grams. Return the collected information in a JSON format. If the image does not contain any discernible food, return an empty array.\n\n# Steps\n\n1. Analyze the provided image to identify the most prominent food item.\n2. For the identified food, determine:\n   - Food name (in Korean)\n   - Weight (in grams)\n   - Nutritional values (in grams) including:\n     - Carbohydrates\n     - Proteins\n     - Fats\n3. Structure the extracted information in JSON format.\n\n# Output Format\n\n- The JSON format should be structured as follows:\n  ```json\n  {\n    \"length\": [integer representing the number of items in the contents array],\n    \"contents\": [\n      {\n        \"name\": \"[Food Name in Korean]\",\n        \"weightGram\": [integer, weight in grams],\n        \"nutritional\": {\n          \"carbohydrateG\": [integer, grams of carbohydrates],\n          \"proteinG\": [integer, grams of protein],\n          \"fatG\": [integer, grams of fat]\n        }\n      }\n      ...\n    ]\n  }\n  ```\n- Return an empty array for \"contents\" if no food is recognizable.\n\n# Examples\n\n**Example 1: Food Recognized**\nInput: Image containing fried food.\nOutput:\n```json\n{\n  \"length\": 1,\n  \"contents\": [\n    {\n      \"name\": \"튀김\",\n      \"weightGram\": 100,\n      \"nutritional\": {\n        \"carbohydrateG\": 30,\n        \"proteinG\": 4,\n        \"fatG\": 8\n      }\n    }\n  ]\n}\n```\n\n**Example 2: No Food Recognized**\nInput: Image with no detectable food items.\nOutput:\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Notes\n\n- The \"length\" key should always reflect the number of items within the \"contents\" array.\n- Ensure all food names are provided in Korean language as requested."
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
    })
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
export async function executeMultipleRequests(imageBase64,filename) {
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
  fs.writeFileSync(`SingleFood-${filename}.csv`, csvContent, "utf8");

  console.log("파일이 성공적으로 작성되었습니다!");
}

// Base64-encoded image (replace this with your actual Base64 image string)
const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

// Execute 10 requests
// executeMultipleRequests(imageBase64);


// {
//   "name": "떡꼬치",
//   "weightGram": 80,
//   "location": {
//     "x": 220,
//     "y": 180,
//     "width": 80,
//     "height": 50
//   },
//   "nutritional": {
//     "carbohydrateG": 40,
//     "proteinG": 3,
//     "fatG": 2
//   }
// }
