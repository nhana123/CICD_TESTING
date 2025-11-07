Feature('AI Testing - Core Functionality');

// Test AI validation for date and time calculations
Scenario('AI validates date existence logic', async ({ I }) => {
  console.log('🧠 Testing AI Date Validation Logic');
  
  const testCases = [
    {
      input: '29/02/2024',
      result: 'Ngày 29 tháng 2 năm 2024 tồn tại',
      context: { day: '29', month: '2', year: '2024', note: 'Leap year validation' }
    },
    {
      input: '31/04/2025', 
      result: 'Ngày 31 tháng 4 năm 2025 không tồn tại',
      context: { day: '31', month: '4', year: '2025', note: 'Invalid date - April has 30 days' }
    }
  ];

  for (const testCase of testCases) {
    console.log(`📝 Testing: ${testCase.input}`);
    
    await I.assertWithAI(
      testCase.context,
      testCase.result,
      'dateValidation'
    );
  }
});

Scenario('AI validates days in month calculations', async ({ I }) => {
  console.log('📅 Testing AI Days Calculation Logic');
  
  const testCases = [
    {
      result: 'Tháng 2 năm 2024 có 29 ngày',
      context: { month: '2', year: '2024', note: 'Leap year February' }
    },
    {
      result: 'Tháng 4 năm 2025 có 30 ngày', 
      context: { month: '4', year: '2025', note: 'April has 30 days' }
    }
  ];

  for (const testCase of testCases) {
    console.log(`📝 Testing: Month ${testCase.context.month}/${testCase.context.year}`);
    
    await I.assertWithAI(
      testCase.context,
      testCase.result,
      'daysInMonth'
    );
  }
});

Scenario('AI evaluates Vietnamese language quality', async ({ I }) => {
  console.log('🇻🇳 Testing Vietnamese Language Quality');
  
  const samples = [
    { text: 'Ngày 15 tháng 6 năm 2025 tồn tại', expected: 'good' },
    { text: 'Thang 15 nam 2025 co ton tai', expected: 'poor' }
  ];

  for (const sample of samples) {
    console.log(`📝 Analyzing: "${sample.text}"`);
    
    const isQualityGood = await I.validateDateCalculationSemantics(
      sample.text,
      'Clear Vietnamese message about date validity'
    );
    
    console.log(`✅ Quality: ${isQualityGood ? 'GOOD' : 'NEEDS_IMPROVEMENT'}`);
  }
});

Scenario('AI generates dynamic test cases', async ({ I }) => {
  console.log('🤖 Testing AI Test Case Generation');
  
  try {
    const generated = await I.generateTestCasesWithAI('date validation');
    
    if (generated && generated.testCases && generated.testCases.length > 0) {
      console.log(`✅ Generated ${generated.testCases.length} test cases successfully`);
      
      // Show first 2 examples
      generated.testCases.slice(0, 2).forEach((testCase, index) => {
        console.log(`${index + 1}. ${testCase.description}`);
      });
    } else {
      console.log('⚠️ No test cases generated');
    }
    
  } catch (error) {
    console.error(`❌ Generation failed: ${error.message}`);
  }
});
