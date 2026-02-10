// API base URL
const API_BASE = '/api';

// Load habits on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    setupEventListeners();
});

function setupEventListeners() {
    const addButton = document.getElementById('addButton');
    const habitInput = document.getElementById('habitInput');

    addButton.addEventListener('click', addHabit);
    habitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabit();
        }
    });
}

async function loadHabits() {
    try {
        const response = await fetch(`${API_BASE}/habits`);
        const habits = await response.json();
        renderHabits(habits);
    } catch (error) {
        console.error('Error loading habits:', error);
    }
}

async function addHabit() {
    const input = document.getElementById('habitInput');
    const habitName = input.value.trim();

    if (!habitName) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/habits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: habitName }),
        });

        if (response.ok) {
            input.value = '';
            loadHabits();
        }
    } catch (error) {
        console.error('Error adding habit:', error);
    }
}

async function toggleHabitCompletion(habitId, dayIndex) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - (6 - dayIndex));

    try {
        // Get current habit state
        const response = await fetch(`${API_BASE}/habits/${habitId}`);
        const habit = await response.json();
        
        // Check if this day is already completed
        const isCompleted = habit.last7Days[dayIndex];
        
        if (isCompleted) {
            // Uncomplete
            await fetch(`${API_BASE}/habits/${habitId}/complete`, {
                method: 'DELETE',
            });
        } else {
            // Complete
            await fetch(`${API_BASE}/habits/${habitId}/complete`, {
                method: 'POST',
            });
        }

        loadHabits();
    } catch (error) {
        console.error('Error toggling habit completion:', error);
    }
}

function renderHabits(habits) {
    const habitsList = document.getElementById('habitsList');
    
    if (habits.length === 0) {
        habitsList.innerHTML = `
            <div class="empty-state">
                <h2>No habits yet!</h2>
                <p>Add your first habit to get started on your journey.</p>
            </div>
        `;
        return;
    }

    habitsList.innerHTML = habits.map(habit => createHabitCard(habit)).join('');
}

function createHabitCard(habit) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const todayIndex = 6; // Today is always the last day in the 7-day array

    const streakHtml = habit.last7Days.map((completed, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - index));
        const dayName = days[date.getDay()];
        const isToday = index === todayIndex;
        
        return `
            <div class="day-box ${completed ? 'completed' : 'incomplete'} ${isToday ? 'today' : ''}" 
                 onclick="toggleHabitCompletion(${habit.id}, ${index})"
                 title="${dayName}">
                <div>${dayName[0]}</div>
            </div>
        `;
    }).join('');

    return `
        <div class="habit-card">
            <div class="habit-header">
                <div class="habit-name">${escapeHtml(habit.name)}</div>
                <div class="habit-stats">
                    ${habit.completionCount} total completions
                </div>
            </div>
            <div class="habit-streak">
                ${streakHtml}
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
