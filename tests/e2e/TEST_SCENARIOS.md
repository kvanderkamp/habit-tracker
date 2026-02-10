# E2E Test Scenarios for Habit Tracker

This document describes the end-to-end test scenarios for the Habit Tracker application using Playwright MCP integration.

## Test Scenario 1: Creating a New Habit

**Description**: Test that users can create a new habit through the UI.

**Steps**:
1. Navigate to the application home page
2. Locate the habit input field
3. Type a habit name (e.g., "Morning Exercise")
4. Click the "Add Habit" button
5. Verify the habit appears in the habits list

**Expected Result**: 
- New habit card is displayed with the correct name
- Completion count shows "0 total completions"
- All 7 day boxes are shown as incomplete (gray)
- Today's box has a blue border

## Test Scenario 2: Marking a Habit as Complete

**Description**: Test that users can mark a habit as complete for today.

**Steps**:
1. Navigate to the application home page
2. Locate an existing habit
3. Click on today's day box (last box with blue border)
4. Verify the day box turns green
5. Verify the completion count increases by 1

**Expected Result**:
- Day box background changes from gray to green
- Completion count increases (e.g., "0 total completions" → "1 total completions")

## Test Scenario 3: Toggling Completion Status

**Description**: Test that users can toggle a habit completion on and off.

**Steps**:
1. Navigate to the application home page
2. Locate a habit that is already marked complete for today
3. Click on today's day box (green box with blue border)
4. Verify the day box turns gray
5. Verify the completion count decreases by 1
6. Click the same day box again
7. Verify it turns green and count increases

**Expected Result**:
- First click: green → gray, count decreases
- Second click: gray → green, count increases
- Toggle functionality works correctly

## Test Scenario 4: 7-Day Trend Visualization

**Description**: Test that the 7-day trend is displayed correctly.

**Steps**:
1. Navigate to the application home page
2. Locate a habit with some completions
3. Verify all 7 day boxes are displayed
4. Verify boxes are labeled with day abbreviations (S, M, T, W, T, F, S)
5. Verify completed days show green boxes
6. Verify incomplete days show gray boxes
7. Verify today's box has a blue border

**Expected Result**:
- All 7 days are visible
- Day labels are correct (Sun through Sat)
- Color coding is correct (green = complete, gray = incomplete)
- Today is highlighted with blue border

## Test Scenario 5: Multiple Habits Management

**Description**: Test that users can manage multiple habits simultaneously.

**Steps**:
1. Navigate to the application home page
2. Create first habit "Morning Exercise"
3. Create second habit "Read for 30 minutes"
4. Create third habit "Drink 8 glasses of water"
5. Mark first habit complete for today
6. Mark third habit complete for today
7. Verify both habits show 1 completion
8. Verify second habit shows 0 completions

**Expected Result**:
- All three habits are displayed
- Each habit maintains independent completion state
- Clicking one habit's day box doesn't affect others

## Test Scenario 6: Empty State Display

**Description**: Test that the empty state is shown when no habits exist.

**Steps**:
1. Navigate to the application with no habits created
2. Verify the empty state message is displayed

**Expected Result**:
- Message "No habits yet!" is shown
- Subtext "Add your first habit to get started on your journey." is displayed

## Running Tests with MCP

These tests can be executed using the Playwright MCP server. Example commands:

### Navigate to the app
```
Navigate to http://localhost:5192
```

### Create a habit
```
Type "Morning Exercise" in the habit input field and click Add Habit
```

### Mark habit complete
```
Click on the last day box (today) for the "Morning Exercise" habit
```

### Verify state
```
Take a screenshot to verify the current state
```

## Manual Testing Checklist

- [ ] Application starts without errors
- [ ] UI loads correctly with gradient background
- [ ] Input field accepts text
- [ ] Add button creates new habits
- [ ] Enter key submits the form
- [ ] Day boxes are clickable
- [ ] Completion status toggles on click
- [ ] Completion counts update correctly
- [ ] 7-day view shows correct days
- [ ] Today is highlighted
- [ ] Multiple habits work independently
- [ ] Empty state displays when no habits exist

## API Testing

The E2E tests can be combined with API testing:

### Get all habits
```bash
curl http://localhost:5192/api/habits
```

### Create a habit
```bash
curl -X POST http://localhost:5192/api/habits \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Habit"}'
```

### Complete a habit
```bash
curl -X POST http://localhost:5192/api/habits/1/complete
```

### Uncomplete a habit
```bash
curl -X DELETE http://localhost:5192/api/habits/1/complete
```
