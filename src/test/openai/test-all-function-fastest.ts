import OpenAI from "openai";
import * as fs from "fs"; 

// 로컬 파일 경로
const imagePath = "./test/test3.jpg";

// 이미지를 base64로 인코딩
const startTime = Date.now();

const openai = new OpenAI({
  apiKey: "
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
              "text": "Given an image of food, identify each food item, extract its name in Korean, and its weight in grams. Then, calculate the bounding box information for each food item in pixel units. Finally, include nutritional information for carbohydrates, proteins, and fats in grams. If no food is present in the image, return an empty array. Return the information in JSON format.\n\n# Steps\n\n1. **Food Recognition:** Analyze the image to identify distinct food items.\n2. **Data Extraction:**\n   - Extract the food name in Korean.\n   - Determine the weight of the food item in grams.\n3. **Bounding Box Calculation:** Calculate the bounding box for each identified food item, providing pixel coordinates and dimensions (x, y, width, height).\n4. **Nutritional Information:** Extract or estimate nutritional values for each food item, listing carbohydrate, protein, and fat content in grams.\n5. **Output Verification:**\n   - Prepare the results in a structured JSON format as specified.\n   - If no food is present, ensure the output is an empty array.\n\n# Output Format\n\nThe output should be in JSON format as follows. Ensure the variable names match exactly:\n\n```json\n{\n  \"length\": [number of food items],\n  \"contents\": [ \n    {\n      \"name\": \"[Food Name in Korean]\",\n      \"weightGram\": [Weight in grams],\n      \"location\": {\n        \"x\": [X-coordinate],\n        \"y\": [Y-coordinate],\n        \"width\": [Width in pixels],\n        \"height\": [Height in pixels]\n      },\n      \"nutritional\": {\n        \"carbohydrateG\": [Carbohydrates in grams],\n        \"proteinG\": [Protein in grams],\n        \"fatG\": [Fat in grams]\n      }\n    }, ...\n  ]\n}\n```\n\n# Examples\n\n**Input Image:** [Sample Image]\n\n**JSON Output Example:** \n```json\n{\n  \"length\": 1,\n  \"contents\": [{\n    \"name\": \"튀김\",\n    \"weightGram\": 100,\n    \"location\": {\n      \"x\": 180,\n      \"y\": 30,\n      \"width\": 250,\n      \"height\": 120\n    },\n    \"nutritional\": {\n      \"carbohydrateG\": 30,\n      \"proteinG\": 4,\n      \"fatG\": 8\n    }\n  }]\n}\n```\n\n**Empty Result Example:**\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Notes\n\n- Ensure accurate food detection and measurement for best results.\n- Use the provided variable names exactly in the JSON response.\n- Respond as promptly as possible for enhanced user experience."
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

    // console.log(response.choices[0].message.content);
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
  fs.writeFileSync(`all-function-fastest-${filename}.csv`, csvContent, "utf8");

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



