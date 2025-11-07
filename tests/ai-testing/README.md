# AI Testing Framework

## Overview
AI-powered testing framework using Hugging Face API to validate date-time business logic.

## Features
- 🤖 **AI Logic Validation**: Validates business rules using AI intelligence
- 🇻🇳 **Vietnamese Language Assessment**: Evaluates output quality
- 🔄 **Dynamic Test Generation**: AI creates test cases automatically
- 📊 **Semantic Analysis**: Understanding beyond text matching

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Hugging Face Token
```bash
# Edit .env file
HF_TOKEN=your_huggingface_token_here
```

### 3. Run Tests
```bash
npm test
```

## Configuration

### Environment Variables (.env)
```env
HF_TOKEN=your_huggingface_token
HF_API_BASE=https://router.huggingface.co/v1
HF_MODEL=openai/gpt-oss-20b:groq
AI_TEMPERATURE=0.1
AI_MAX_TOKENS=300
```

## Test Structure

### Core Test File: `ai_core_test.js`
- **Date Validation**: AI validates leap years, invalid dates
- **Days Calculation**: AI checks month lengths, leap year logic  
- **Language Quality**: AI evaluates Vietnamese grammar
- **Test Generation**: AI creates dynamic test scenarios

## Example Usage

```javascript
// AI validates business logic
await I.assertWithAI(
  { day: '29', month: '2', year: '2024', note: 'Leap year validation' },
  'Ngày 29 tháng 2 năm 2024 tồn tại',
  'dateValidation'
);

// AI checks language quality
const isGoodVietnamese = await I.validateDateCalculationSemantics(
  'Ngày 15 tháng 6 năm 2025 tồn tại',
  'Clear Vietnamese message'
);
```

## Innovation

This framework represents a breakthrough in testing automation:
- **Intelligence over Rules**: AI understands context vs hardcoded assertions
- **Semantic Understanding**: Validates meaning, not just text presence
- **Self-Improving**: Generates new test scenarios dynamically
- **Multilingual**: Vietnamese language quality assessment

## Technical Stack
- **AI Provider**: Hugging Face Router
- **Model**: OpenAI GPT-OSS-20B via Groq
- **Framework**: CodeceptJS
- **Language**: JavaScript/Node.js
