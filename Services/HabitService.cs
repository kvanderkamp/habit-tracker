using HabitTracker.Models;

namespace HabitTracker.Services;

public class HabitService
{
    private readonly List<Habit> _habits = new();
    private int _nextId = 1;

    public List<HabitDto> GetAllHabits()
    {
        return _habits.Select(h => ToDto(h)).ToList();
    }

    public HabitDto? GetHabit(int id)
    {
        var habit = _habits.FirstOrDefault(h => h.Id == id);
        return habit != null ? ToDto(habit) : null;
    }

    public HabitDto CreateHabit(string name)
    {
        var habit = new Habit
        {
            Id = _nextId++,
            Name = name,
            CreatedAt = DateTime.UtcNow,
            Completions = new List<DateTime>()
        };
        _habits.Add(habit);
        return ToDto(habit);
    }

    public bool CompleteHabit(int habitId, DateTime? date = null)
    {
        var habit = _habits.FirstOrDefault(h => h.Id == habitId);
        if (habit == null)
            return false;

        var completionDate = (date ?? DateTime.UtcNow).Date;
        
        // Avoid duplicate completions for the same day
        if (!habit.Completions.Any(c => c.Date == completionDate))
        {
            habit.Completions.Add(completionDate);
        }
        
        return true;
    }

    public bool UncompleteHabit(int habitId, DateTime? date = null)
    {
        var habit = _habits.FirstOrDefault(h => h.Id == habitId);
        if (habit == null)
            return false;

        var completionDate = (date ?? DateTime.UtcNow).Date;
        habit.Completions.RemoveAll(c => c.Date == completionDate);
        
        return true;
    }

    private HabitDto ToDto(Habit habit)
    {
        var today = DateTime.UtcNow.Date;
        var last7Days = new List<bool>();
        
        // Build array of last 7 days (oldest to newest)
        for (int i = 6; i >= 0; i--)
        {
            var date = today.AddDays(-i);
            last7Days.Add(habit.Completions.Any(c => c.Date == date));
        }

        return new HabitDto
        {
            Id = habit.Id,
            Name = habit.Name,
            CreatedAt = habit.CreatedAt,
            CompletionCount = habit.Completions.Count,
            Last7Days = last7Days
        };
    }
}
