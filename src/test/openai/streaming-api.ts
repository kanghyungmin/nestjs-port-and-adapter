import axios from 'axios';
import { EventSource } from 'eventsource';
import * as fs from 'fs';

// const OPENAI_API_KEY = ''
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

let imagePath = "./test/test3.jpg";
let imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

async function streamChatGPT() {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        };

        const payload = {
            model: 'gpt-4-mini', // 또는 'gpt-3.5-turbo'
            messages: [
                // {
                //     "role": "system",
                //     "content": [
                //       {
                //         "type": "text",
                //         "text": "Given an image of food, identify each food item, extract its name in Korean, and its weight in grams. Then, calculate the bounding box information for each food item in pixel units. Finally, include nutritional information for carbohydrates, proteins, and fats in grams. If no food is present in the image, return an empty array. Return the information in JSON format.\n\n# Steps\n\n1. **Food Recognition:** Analyze the image to identify distinct food items.\n2. **Data Extraction:**\n   - Extract the food name in Korean.\n   - Determine the weight of the food item in grams.\n3. **Bounding Box Calculation:** Calculate the bounding box for each identified food item, providing pixel coordinates and dimensions (x, y, width, height).\n4. **Nutritional Information:** Extract or estimate nutritional values for each food item, listing carbohydrate, protein, and fat content in grams.\n5. **Output Verification:**\n   - Prepare the results in a structured JSON format as specified.\n   - If no food is present, ensure the output is an empty array.\n\n# Output Format\n\nThe output should be in JSON format as follows. Ensure the variable names match exactly:\n\n```json\n{\n  \"length\": [number of food items],\n  \"contents\": [ \n    {\n      \"name\": \"[Food Name in Korean]\",\n      \"weightGram\": [Weight in grams],\n      \"location\": {\n        \"x\": [X-coordinate],\n        \"y\": [Y-coordinate],\n        \"width\": [Width in pixels],\n        \"height\": [Height in pixels]\n      },\n      \"nutritional\": {\n        \"carbohydrateG\": [Carbohydrates in grams],\n        \"proteinG\": [Protein in grams],\n        \"fatG\": [Fat in grams]\n      }\n    }, ...\n  ]\n}\n```\n\n# Examples\n\n**Input Image:** [Sample Image]\n\n**JSON Output Example:** \n```json\n{\n  \"length\": 1,\n  \"contents\": [{\n    \"name\": \"튀김\",\n    \"weightGram\": 100,\n    \"location\": {\n      \"x\": 180,\n      \"y\": 30,\n      \"width\": 250,\n      \"height\": 120\n    },\n    \"nutritional\": {\n      \"carbohydrateG\": 30,\n      \"proteinG\": 4,\n      \"fatG\": 8\n    }\n  }]\n}\n```\n\n**Empty Result Example:**\n```json\n{\n  \"length\": 0,\n  \"contents\": []\n}\n```\n\n# Notes\n\n- Ensure accurate food detection and measurement for best results.\n- Use the provided variable names exactly in the JSON response.\n- Respond as promptly as possible for enhanced user experience."
                //       }
                //     ]
                //   },
                //   {
                //     "role": "user",
                //     "content": [
                //       {
                //         "type": "image_url",
                //         "image_url": {
                //           "url": `data:image/jpeg;base64, ${imageBase64}`
                //         }
                //       }
                //     ]
                //   },
                  { role: 'system', content: 'You are a helpful assistant.' },
                  { role: 'user', content: 'Tell me a story about a brave knight.' },
            ],
            stream: true, // 스트리밍 활성화
        };

        // 요청을 보내고 스트리밍을 수신
        const response = await axios.post(OPENAI_API_URL, payload, {
            headers,
            responseType: 'stream', // 스트리밍 활성화
        });

        const eventSource = new EventSource(OPENAI_API_URL);
        console.log('Streaming response:');

        // 데이터 이벤트 리스너 추가
        response.data.on('data', (chunk: Buffer) => {
            const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const data = line.replace(/^data: /, '');
                    if (data === '[DONE]') {
                        console.log('Stream complete.');
                        response.data.destroy(); // 스트리밍 종료
                        return;
                    }

                    const parsedData = JSON.parse(data);
                    const content = parsedData.choices[0]?.delta?.content || '';
                    process.stdout.write(content); // 실시간 출력
                }
            }
        });

        response.data.on('end', () => {
            console.log('\nStream ended.');
        });

        response.data.on('error', (error: Error) => {
            console.error('Error occurred:', error.message);
        });
    } catch (error) {
        console.error('Failed to fetch response:', error);
    }
}

// 실행
streamChatGPT();
