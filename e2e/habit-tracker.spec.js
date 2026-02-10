import { test, expect } from '@playwright/test';

test.describe('Habit Tracker E2E Tests', () => {
  test('should add a habit, mark it complete, and verify trend updates', async ({ page }) => {
    // Navigate to the Habit Tracker
    await page.goto('/');
    
    // Verify the page loaded
    await expect(page).toHaveTitle('Habit Tracker');
    await expect(page.locator('h1')).toHaveText('Habit Tracker');
    
    // Verify initial state shows no habits
    await expect(page.getByTestId('habits-list')).toContainText('No habits yet');
    
    // Add a habit named 'Drink Water'
    await page.getByTestId('habit-name-input').fill('Drink Water');
    await page.getByTestId('add-habit-button').click();
    
    // Verify success message appears
    await expect(page.locator('.message.success')).toBeVisible();
    await expect(page.locator('.message.success')).toContainText('Habit added successfully');
    
    // Verify the habit appears in the list
    await expect(page.getByTestId('habit-name')).toHaveText('Drink Water');
    
    // Verify the 7-day trend is displayed
    const trend = page.locator('[data-testid^="trend-"]');
    await expect(trend).toBeVisible();
    
    // Verify there are 7 days in the trend
    const days = trend.locator('.day');
    await expect(days).toHaveCount(7);
    
    // Mark the habit as completed for today
    const habitId = await page.locator('[data-testid^="habit-item-"]').getAttribute('data-testid');
    const completeButton = page.getByTestId(`complete-button-${habitId?.replace('habit-item-', '')}`);
    await completeButton.click();
    
    // Verify completion success message
    await expect(page.locator('.message.success')).toBeVisible();
    await expect(page.locator('.message.success')).toContainText('Habit marked as complete');
    
    // Verify the trend updates - today should be marked as completed
    const completedDays = trend.locator('.day.completed');
    await expect(completedDays).toHaveCount(1);
    
    // Get today's date to verify the correct day is marked
    const today = new Date();
    const todayDateStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    // Verify the completed day shows today's date
    const completedDay = completedDays.first();
    await expect(completedDay).toContainText(todayDateStr);
  });
  
  test('should allow adding multiple habits', async ({ page }) => {
    await page.goto('/');
    
    // Add first habit
    await page.getByTestId('habit-name-input').fill('Morning Exercise');
    await page.getByTestId('habit-description-input').fill('30 minutes of cardio');
    await page.getByTestId('add-habit-button').click();
    
    // Wait for success message
    await expect(page.locator('.message.success')).toBeVisible();
    
    // Add second habit
    await page.getByTestId('habit-name-input').fill('Read Books');
    await page.getByTestId('add-habit-button').click();
    
    // Verify both habits are displayed
    const habitNames = page.getByTestId('habit-name');
    await expect(habitNames).toHaveCount(2);
  });
  
  test('should validate habit name is required', async ({ page }) => {
    await page.goto('/');
    
    // Try to add a habit without a name
    await page.getByTestId('add-habit-button').click();
    
    // The form should not submit (HTML5 validation)
    // Check that the input has the required attribute
    const nameInput = page.getByTestId('habit-name-input');
    await expect(nameInput).toHaveAttribute('required', '');
  });
  
  test('should use resilient selectors', async ({ page }) => {
    await page.goto('/');
    
    // Add a habit using data-testid selectors (resilient)
    await page.getByTestId('habit-name-input').fill('Test Habit');
    await page.getByTestId('add-habit-button').click();
    
    // Verify using resilient selectors - filter to get the last one added
    const habitNames = page.getByTestId('habit-name');
    await expect(habitNames.last()).toHaveText('Test Habit');
    
    // Verify trend using resilient selector pattern
    const trendSelector = page.locator('[data-testid^="trend-"]');
    await expect(trendSelector.last()).toBeVisible();
  });
});
