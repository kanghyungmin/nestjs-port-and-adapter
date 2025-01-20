import OpenAI from "openai";
import * as fs from "fs"; 








// 로컬 파일 경로
const imagePath = "./test2.jpg";

// 이미지를 base64로 인코딩
const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

const startTime = Date.now();

const openai = new OpenAI({
  apiKey: "",
});

openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'system',
      content:
        'Analyze the image and provide nutritional information. If there is any ambiguity, return an estimated value. If determining the nutritional content is difficult, compare it with known products and provide an answer. When retrieving calorie and nutrient information, the calorie calculation must be accurate, with carbohydrates and proteins providing 4 kcal per gram, and fats providing 9 kcal per gram. Please provide the response in Korean.',
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Extract the product name, calory, protein, carbohydrate, and fat content from the image.',
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
          },
        },
      ],
    },
  ],
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'nutrition',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          name: {type: 'string'},
          calory: {type: 'number'},
          protein: {type: 'number'},
          carbohydrate: {type: 'number'},
          fat: {type: 'number'},
        },
        required: ['name', 'calory', 'protein', 'carbohydrate', 'fat'],
        additionalProperties: false,
      },
    },
  },
}).then(response => {
    console.log(response);
    console.log(
        JSON.stringify(response.choices[0].message.content)
    )
    console.log(response.choices[0].message.content)
    const endTime = Date.now()-startTime;
    console.log("Time taken: ", endTime);
    // console.log(JSON.parse(response.choices[0].message.content))
    // console.log(JSON.parse(response.choices[0].message.content))
}).catch(error => {
    console.error(error);
});
