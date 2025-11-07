// AI Testing Helper Methods for CodeceptJS
const OpenAI = require('openai');

// Initialize OpenAI client with Hugging Face router
const openai = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: process.env.HF_API_BASE || 'https://router.huggingface.co/v1',
});

module.exports = function() {
  return actor({

    // Core AI validation method
    async validateWithAI(context, actualResult, expectedType) {
      const prompt = this.buildValidationPrompt(context, actualResult, expectedType);

      try {
        const response = await openai.chat.completions.create({
          model: process.env.HF_MODEL || 'openai/gpt-oss-20b:groq',
          messages: [
            {
              role: 'system',
              content: 'You are a QA expert validating date-time logic. Respond with PASS or FAIL followed by brief explanation.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.1,
          max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 300
        });

        const aiResponse = response.choices[0].message.content;
        console.log(`🤖 AI: ${aiResponse}`);

        return {
          isValid: aiResponse.toUpperCase().startsWith('PASS'),
          explanation: aiResponse
        };
      } catch (error) {
        console.error('❌ AI Error:', error.message);
        return {
          isValid: false,
          explanation: `AI validation failed: ${error.message}`
        };
      }
    },

    // Build validation prompts
    buildValidationPrompt(context, actualResult, expectedType) {
      switch (expectedType) {
        case 'dateValidation':
          return `Validate if date ${context.input || context.day + '/' + context.month + '/' + context.year} existence is correctly determined by: "${actualResult}". Consider leap years and month lengths.`;

        case 'daysInMonth':
          return `Validate if days in month ${context.month}/${context.year} is correctly calculated by: "${actualResult}". Consider leap years for February.`;

        default:
          return `Validate if this result is logically correct: "${actualResult}"`;
      }
    },

    // Vietnamese language quality assessment
    async validateDateCalculationSemantics(actualText, expectedPattern) {
      try {
        const response = await openai.chat.completions.create({
          model: process.env.HF_MODEL || 'openai/gpt-oss-20b:groq',
          messages: [{
            role: 'user',
            content: `Analyze Vietnamese text quality: "${actualText}". Check grammar, clarity, and correctness. Respond PASS/FAIL with brief explanation.`
          }],
          temperature: 0.1,
          max_tokens: 200
        });

        const aiResponse = response.choices[0].message.content;
        console.log(`🧠 Language Analysis: ${aiResponse}`);
        return aiResponse.toUpperCase().startsWith('PASS');
      } catch (error) {
        console.error('❌ Language validation failed:', error.message);
        return false;
      }
    },

    // Generate test cases dynamically
    async generateTestCasesWithAI(functionality) {
      try {
        const response = await openai.chat.completions.create({
          model: process.env.HF_MODEL || 'openai/gpt-oss-20b:groq',
          messages: [{
            role: 'user',
            content: `Generate 3 test cases for "${functionality}" in JSON format: {"testCases":[{"description":"...","input":"...","expectedOutcome":"..."}]}`
          }],
          temperature: 0.3,
          max_tokens: 400
        });

        let jsonStr = response.choices[0].message.content;
        if (jsonStr.includes('```json')) {
          jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
        } else if (jsonStr.includes('```')) {
          jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
        }

        return JSON.parse(jsonStr);
      } catch (error) {
        console.error('❌ Test generation failed:', error.message);
        return { testCases: [] };
      }
    },

    // Assert with AI validation
    async assertWithAI(context, actualResult, expectedType) {
      const validation = await this.validateWithAI(context, actualResult, expectedType);

      if (!validation.isValid) {
        throw new Error(`❌ AI Validation Failed: ${validation.explanation}`);
      }

      console.log(`✅ AI Validation Passed`);
    }

  });
}
