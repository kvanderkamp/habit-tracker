using HabitTracker.Models;

namespace HabitTracker.Services;

public interface IHabitService
{
    Task<Habit> CreateHabitAsync(string name, string? description);
    Task<List<Habit>> GetAllHabitsAsync();
    Task<Habit?> GetHabitByIdAsync(Guid id);
    Task<bool> MarkHabitCompleteAsync(Guid habitId, DateOnly date);
    Task<HabitTrend> GetHabitTrendAsync(Guid habitId);
}
