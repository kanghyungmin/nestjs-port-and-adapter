// 음식 사진을 던져 줄거야. 제일 먼저 인식되는 음식에 대해 음식명(한글)과 무게(g)를 추출해. 그리고 음식에 대한 탄수화물, 단백질, 지방에 대한 정보를 g단위로 포함해줘.
// 마지막으로 위 정보들을 가지고 JSON 타입으로 리턴해주면 돼.사진에 음식 사진이 없으면 빈 배열로 리턴해주면 되구.반환 결과는 아래를 참조해. 특히 변수명은 같아야 한다.
// Prompt는 영어어야 하고 최대한 응답성이 좋게 최적화해줘. 알고리즘도 빠른거 써주고

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
              "text": "Analyze an image of food to extract the name of the most recognizable dish (in Korean), its weight in grams, and nutritional information including carbohydrates, protein, and fat in grams. Output the information in a JSON format as specified, and return an empty array if no food is detected.\n\n- The task should be optimized for responsiveness.\n- Use a fast algorithm for efficient processing.\n- Ensure JSON output follows the specified structure and variable names exactly.\n\n# Steps\n\n1. Analyze the image to identify the most recognizable food item.\n2. Extract the food name in Korean and its weight in grams.\n3. Determine the carbohydrates, protein, and fat content of the food in grams.\n4. Construct a JSON object with the extracted information.\n5. If no food is identified, return an empty array.\n\n# Output Format\n\nThe output should be in JSON format as follows:\n\n```json\n{\n  \"length\": 1, // Number of items in contents\n  \"contents\": [{\n      \"name\": \"튀김\", // Food name in Korean\n      \"weightGram\": 100, // Weight in grams\n      \"nutritional\": {\n        \"carbohydrateG\": 30, // Carbohydrates in grams\n        \"proteinG\": 4, // Protein in grams\n        \"fatG\": 8 // Fat in grams\n      }\n    }...]\n}\n```\n\nIf no food is detected, use this format:\n\n```json\n{\n  \"length\": 0, \n  \"contents\": []\n}\n```\n\n# Examples\n\n## Example with Food Detected\n\n**Input**: Image of fried food\n\n**Output**:\n```json\n{\n  \"length\": 1,\n  \"contents\": [{\n      \"name\": \"튀김\",\n      \"weightGram\": 100,\n      \"nutritional\": {\n        \"carbohydrateG\": 30,\n        \"proteinG\": 4,\n        \"fatG\": 8\n      }\n    }]\n}\n```\n\n## Example with No Food Detected\n\n**Input**: Image with no food\n\n**Output**:\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Notes\n\n- Make sure to follow the JSON structure exactly as specified.\n- Ensure the processing is optimized for speed and accuracy.\n- Handle images with multiple foods by focusing on the most recognizable item."
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
  fs.writeFileSync(`SingleFood-fastest-${filename}.csv`, csvContent, "utf8");

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
