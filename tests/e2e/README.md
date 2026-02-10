# Habit Tracker E2E Tests

This directory contains end-to-end tests using Playwright via MCP integration.

## Running Tests with MCP

The tests are designed to be run through MCP (Model Context Protocol) integration with Playwright.

### Test Coverage

- **Habit Creation**: Tests creating new habits
- **Habit Completion**: Tests marking habits as complete/incomplete
- **7-Day Trend Visualization**: Tests that the 7-day trend is displayed correctly
- **UI Interactions**: Tests all major UI interactions

### Manual Testing

To manually test the application:

1. Start the application:
   ```bash
   dotnet run
   ```

2. Navigate to http://localhost:5000

3. Test the following:
   - Add a new habit
   - Click on day boxes to mark habits complete/incomplete
   - Verify the 7-day trend updates correctly
   - Check that completion count increases

### Automated Testing

The E2E tests can be executed through MCP integration. The Playwright MCP server enables automated browser testing controlled through natural language commands.
