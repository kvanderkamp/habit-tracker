using HabitTracker.Models;
using System.Collections.Concurrent;

namespace HabitTracker.Services;

public class InMemoryHabitService : IHabitService
{
    private readonly ConcurrentDictionary<Guid, Habit> _habits = new();
    private readonly ConcurrentDictionary<Guid, HabitCompletion> _completions = new();

    public Task<Habit> CreateHabitAsync(string name, string? description)
    {
        var habit = new Habit
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            CreatedAt = DateTime.UtcNow
        };

        _habits[habit.Id] = habit;
        return Task.FromResult(habit);
    }

    public Task<List<Habit>> GetAllHabitsAsync()
    {
        var habits = _habits.Values.OrderBy(h => h.CreatedAt).ToList();
        return Task.FromResult(habits);
    }

    public Task<Habit?> GetHabitByIdAsync(Guid id)
    {
        _habits.TryGetValue(id, out var habit);
        return Task.FromResult(habit);
    }

    public Task<bool> MarkHabitCompleteAsync(Guid habitId, DateOnly date)
    {
        if (!_habits.ContainsKey(habitId))
        {
            return Task.FromResult(false);
        }

        // Check if already completed for this date
        var existing = _completions.Values
            .FirstOrDefault(c => c.HabitId == habitId && c.CompletedDate == date);

        if (existing != null)
        {
            return Task.FromResult(true); // Already completed
        }

        var completion = new HabitCompletion
        {
            Id = Guid.NewGuid(),
            HabitId = habitId,
            CompletedDate = date,
            CreatedAt = DateTime.UtcNow
        };

        _completions[completion.Id] = completion;
        return Task.FromResult(true);
    }

    public Task<HabitTrend> GetHabitTrendAsync(Guid habitId)
    {
        var habit = _habits.GetValueOrDefault(habitId);
        var trend = new HabitTrend
        {
            HabitId = habitId,
            HabitName = habit?.Name ?? "Unknown",
            Last7Days = new List<DayCompletion>()
        };

        var today = DateOnly.FromDateTime(DateTime.Today);
        
        for (int i = 6; i >= 0; i--)
        {
            var date = today.AddDays(-i);
            var isCompleted = _completions.Values
                .Any(c => c.HabitId == habitId && c.CompletedDate == date);

            trend.Last7Days.Add(new DayCompletion
            {
                Date = date,
                IsCompleted = isCompleted
            });
        }

        return Task.FromResult(trend);
    }
}
