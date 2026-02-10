namespace HabitTracker.Models;

public class Habit
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<DateTime> Completions { get; set; } = new();
}
