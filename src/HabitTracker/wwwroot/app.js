const API_BASE = '/api';

// Load habits on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    setupFormSubmit();
});

function setupFormSubmit() {
    const form = document.getElementById('habitForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('habitName').value.trim();
        const description = document.getElementById('habitDescription').value.trim();
        
        if (!name) {
            showMessage('Please enter a habit name', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE}/habits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description: description || null
                })
            });
            
            if (response.ok) {
                showMessage('Habit added successfully!', 'success');
                form.reset();
                await loadHabits();
            } else {
                const error = await response.json();
                showMessage(error.error || 'Failed to add habit', 'error');
            }
        } catch (error) {
            showMessage('Error adding habit', 'error');
            console.error('Error:', error);
        }
    });
}

async function loadHabits() {
    try {
        const response = await fetch(`${API_BASE}/habits`);
        const habits = await response.json();
        
        const habitsList = document.getElementById('habitsList');
        
        if (habits.length === 0) {
            habitsList.innerHTML = '<p class="empty-state">No habits yet. Add your first habit above!</p>';
            return;
        }
        
        habitsList.innerHTML = '';
        
        for (const habit of habits) {
            const habitElement = await createHabitElement(habit);
            habitsList.appendChild(habitElement);
        }
    } catch (error) {
        console.error('Error loading habits:', error);
        showMessage('Error loading habits', 'error');
    }
}

async function createHabitElement(habit) {
    const div = document.createElement('div');
    div.className = 'habit-item';
    div.setAttribute('data-testid', `habit-item-${habit.id}`);
    
    // Get trend data
    const trend = await getHabitTrend(habit.id);
    
    div.innerHTML = `
        <div class="habit-header">
            <div class="habit-name" data-testid="habit-name">${escapeHtml(habit.name)}</div>
            <button 
                class="complete-button" 
                onclick="markComplete('${habit.id}')"
                data-testid="complete-button-${habit.id}"
            >
                ✓ Complete Today
            </button>
        </div>
        ${habit.description ? `<div class="habit-description">${escapeHtml(habit.description)}</div>` : ''}
        <div>
            <div class="trend-label">Last 7 Days</div>
            <div class="trend" data-testid="trend-${habit.id}">
                ${createTrendHtml(trend)}
            </div>
        </div>
    `;
    
    return div;
}

function createTrendHtml(trend) {
    if (!trend || !trend.last7Days) {
        return '<span>No data</span>';
    }
    
    return trend.last7Days.map(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
        const completedClass = day.isCompleted ? 'completed' : '';
        
        return `
            <div class="day ${completedClass}" data-testid="day-${day.date}">
                <div>${dayName}</div>
                <div class="day-date">${dateStr}</div>
            </div>
        `;
    }).join('');
}

async function getHabitTrend(habitId) {
    try {
        const response = await fetch(`${API_BASE}/habits/${habitId}/trend`);
        return await response.json();
    } catch (error) {
        console.error('Error getting trend:', error);
        return null;
    }
}

async function markComplete(habitId) {
    try {
        const response = await fetch(`${API_BASE}/habits/${habitId}/complete`, {
            method: 'POST'
        });
        
        if (response.ok) {
            showMessage('Habit marked as complete!', 'success');
            await loadHabits();
        } else {
            const error = await response.json();
            showMessage(error.error || 'Failed to mark habit complete', 'error');
        }
    } catch (error) {
        showMessage('Error marking habit complete', 'error');
        console.error('Error:', error);
    }
}

function showMessage(text, type) {
    const existing = document.querySelector('.message');
    if (existing) {
        existing.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const container = document.querySelector('.container');
    container.insertBefore(message, container.firstChild);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
