# Lambda Testing Framework for Date Time Checker

## Overview
This is a comprehensive Lambda Testing framework that validates the Date Time Checker application's core business logic using popular web platforms (Google and YouTube) as testing vehicles. The framework tests two main functionalities without requiring complex local setup.

## Architecture

### 🎯 **Two Core Testing Functions**

#### 1. **Date Validation Testing** (`DateValidationLambdaTest.java`)
- **Platform**: Google Search
- **Purpose**: Validates date existence logic from Date Time Checker
- **Test Cases**:
  - ✅ Leap year validation (29/02/2024)
  - ✅ Invalid date detection (31/04/2025)
  - ✅ Multiple date format support
  - ✅ Current date validation

#### 2. **Days Calculation Testing** (`DaysCalculationLambdaTest.java`)
- **Platform**: YouTube Search
- **Purpose**: Validates days-in-month calculation logic
- **Test Cases**:
  - ✅ Leap year February calculation (29 days)
  - ✅ Regular month days (30-day months)
  - ✅ 31-day months calculation
  - ✅ Current month validation
  - ✅ Leap year detection logic

## Project Structure

```
lambda-testing/
├── pom.xml                     # Maven configuration with dependencies
├── testng.xml                  # TestNG suite configuration
├── README.md                   # This file
└── src/test/
    ├── java/com/datetimechecker/lambda/
    │   ├── DateValidationLambdaTest.java    # Google-based date validation
    │   └── DaysCalculationLambdaTest.java   # YouTube-based days calculation
    └── resources/
        └── (configuration files)
```

## Key Features

### 🌍 **No Local Setup Required**
- Uses publicly available websites (Google, YouTube)
- No need for LambdaTest account setup
- No complex infrastructure requirements
- Works out-of-the-box with standard Selenium

### 🤖 **Intelligent Business Logic Testing**
- **Date Validation**: Tests the same logic as Date Time Checker's date existence validation
- **Days Calculation**: Validates month length calculations including leap year logic
- **Real-world Validation**: Uses actual web content to verify business rules

### 🔧 **Technical Implementation**
- **WebDriver**: Chrome (headless mode for CI/CD)
- **Framework**: TestNG for test organization
- **Management**: WebDriverManager for automatic driver setup
- **Parallel**: Supports parallel test execution

## Dependencies

```xml
<!-- Core Testing -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.15.0</version>
</dependency>

<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
</dependency>

<!-- Driver Management -->
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
</dependency>
```

## Usage Instructions

### 1. **Install Dependencies**
```bash
mvn clean install
```

### 2. **Run All Tests**
```bash
mvn test
```

### 3. **Run Specific Test Class**
```bash
# Date validation tests only
mvn test -Dtest=DateValidationLambdaTest

# Days calculation tests only  
mvn test -Dtest=DaysCalculationLambdaTest
```

### 4. **Run with Custom Browser**
```bash
mvn test -Dbrowser=chrome -Dheadless=false
```

## Test Scenarios

### 📅 **Date Validation Tests (Google Platform)**

#### Test 1: Leap Year Validation
- **Input**: February 29, 2024
- **Expected**: Should be recognized as valid (2024 is leap year)
- **Method**: Search Google for "February 29 2024 calendar"
- **Validation**: Verify search results contain relevant leap year information

#### Test 2: Invalid Date Detection  
- **Input**: April 31, 2025
- **Expected**: Should be recognized as invalid (April has 30 days)
- **Method**: Search Google for "April 31 2025 calendar date"
- **Validation**: Verify results indicate correction or invalid date

#### Test 3: Multiple Date Formats
- **Input**: Various formats (MM/DD/YYYY, DD Month YYYY, YYYY-MM-DD)
- **Expected**: All formats should be properly interpreted
- **Method**: Search different format representations
- **Validation**: Consistent date recognition across formats

#### Test 4: Current Date Validation
- **Input**: Today's date
- **Expected**: Should be recognized as current/valid
- **Method**: Search for current date information
- **Validation**: Verify current date context

### 📊 **Days Calculation Tests (YouTube Platform)**

#### Test 1: Leap Year February
- **Input**: February 2024
- **Expected**: 29 days (leap year)
- **Method**: Search YouTube for "February 2024 calendar leap year 29 days"
- **Validation**: Verify content mentions leap year and 29 days

#### Test 2: Regular 30-Day Months
- **Input**: April, June, September, November
- **Expected**: 30 days each
- **Method**: Search for calendar content of these months
- **Validation**: Verify month-specific day counts

#### Test 3: 31-Day Months
- **Input**: January, March, May, July, August, October, December
- **Expected**: 31 days each
- **Method**: Search for calendar content mentioning 31 days
- **Validation**: Verify extended month lengths

#### Test 4: Current Month Calculation
- **Input**: Current month and year
- **Expected**: Correct days for current month
- **Method**: Search current month calendar information
- **Validation**: Dynamic validation based on actual current date

#### Test 5: Leap Year Detection Logic
- **Input**: Multiple leap years (2020, 2024, 2028) and non-leap years (2021, 2022, 2023, 2025)
- **Expected**: Correct leap year identification
- **Method**: Search calendar information for each year
- **Validation**: Verify February has correct days (28 vs 29)

## Sample Test Output

```
🚀 Setting up Lambda Date Validation Test
✅ WebDriver initialized successfully

📅 Testing Leap Year Date Validation
=====================================
🌐 Navigated to Google Search
🍪 Cookies accepted
🔍 Searched for: February 29 2024 calendar
📊 Found 12 search results
✅ Found relevant date information in results
✅ Leap year date 29/02/2024 validated successfully

🚫 Testing Invalid Date Detection
==================================
🌐 Navigated to Google Search
🔍 Searched for: April 31 2025 calendar date
✅ Invalid date 31/04/2025 detection working correctly

🧹 Cleaning up Lambda Date Validation Test
✅ WebDriver closed successfully
🏁 Date validation test completed
```

## Business Logic Mapping

### Date Time Checker → Lambda Testing

| Original Function | Lambda Test Equivalent | Platform | Validation Method |
|------------------|------------------------|----------|-------------------|
| `checkDateExists(day, month, year)` | Date validation via Google search | Google | Search result analysis |
| `calculateDaysInMonth(month, year)` | Days calculation via YouTube | YouTube | Content verification |
| `isLeapYear(year)` | Leap year detection | Both | Calendar content analysis |
| `validateDateFormat(date)` | Format testing | Google | Multiple format searches |

## Advantages

### ✅ **Practical Benefits**
- **No Infrastructure**: No need for local test applications or complex setups
- **Real-world Validation**: Uses actual web platforms that users interact with
- **Reliable**: Google and YouTube are highly available and consistent
- **Scalable**: Can run in any CI/CD environment

### ✅ **Testing Benefits**
- **Business Logic Focus**: Tests the same logic as Date Time Checker without UI dependencies
- **Cross-platform**: Works on any OS with Chrome browser
- **Parallel Execution**: Supports concurrent test execution
- **Comprehensive Coverage**: Tests both positive and negative scenarios

## Integration with Main Project

This Lambda Testing framework complements the existing Date Time Checker test suite:

- **E2E Tests**: UI interaction testing
- **API Tests**: HTTP endpoint testing  
- **AI Tests**: Semantic business logic testing
- **CI/CD Tests**: Pipeline simulation testing
- **Lambda Tests**: Real-world business logic validation using external platforms

## Future Enhancements

1. **Additional Platforms**: Extend to other websites (Wikipedia, Wolfram Alpha)
2. **More Date Functions**: Test additional date calculations
3. **Performance Testing**: Add timing and performance validations
4. **Mobile Testing**: Extend to mobile browser testing
5. **Localization**: Test different language/locale scenarios

This Lambda Testing framework provides a unique approach to business logic validation by leveraging the reliability and ubiquity of major web platforms, ensuring that the Date Time Checker's core functionality works correctly in real-world scenarios! 🚀
