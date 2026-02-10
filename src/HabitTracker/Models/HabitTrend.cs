namespace HabitTracker.Models;

public class HabitTrend
{
    public Guid HabitId { get; set; }
    public string HabitName { get; set; } = string.Empty;
    public List<DayCompletion> Last7Days { get; set; } = new();
}

public class DayCompletion
{
    public DateOnly Date { get; set; }
    public bool IsCompleted { get; set; }
}
