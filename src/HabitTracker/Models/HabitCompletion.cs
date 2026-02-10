namespace HabitTracker.Models;

public class HabitCompletion
{
    public Guid Id { get; set; }
    public Guid HabitId { get; set; }
    public DateOnly CompletedDate { get; set; }
    public DateTime CreatedAt { get; set; }
}
