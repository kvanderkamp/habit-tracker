namespace HabitTracker.Models;

public class HabitDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public int CompletionCount { get; set; }
    public List<bool> Last7Days { get; set; } = new();
}
