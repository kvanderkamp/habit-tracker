using HabitTracker.Models;
using HabitTracker.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSingleton<IHabitService, InMemoryHabitService>();

var app = builder.Build();

// Serve static files
app.UseDefaultFiles();
app.UseStaticFiles();

// API Endpoints
app.MapPost("/api/habits", async (IHabitService habitService, CreateHabitRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.BadRequest(new { error = "Habit name is required" });
    }

    var habit = await habitService.CreateHabitAsync(request.Name, request.Description);
    return Results.Created($"/api/habits/{habit.Id}", habit);
});

app.MapGet("/api/habits", async (IHabitService habitService) =>
{
    var habits = await habitService.GetAllHabitsAsync();
    return Results.Ok(habits);
});

app.MapPost("/api/habits/{habitId:guid}/complete", async (IHabitService habitService, Guid habitId) =>
{
    var today = DateOnly.FromDateTime(DateTime.Today);
    var success = await habitService.MarkHabitCompleteAsync(habitId, today);
    
    if (!success)
    {
        return Results.NotFound(new { error = "Habit not found" });
    }
    
    return Results.Ok(new { message = "Habit marked as complete" });
});

app.MapGet("/api/habits/{habitId:guid}/trend", async (IHabitService habitService, Guid habitId) =>
{
    var trend = await habitService.GetHabitTrendAsync(habitId);
    return Results.Ok(trend);
});

app.Run();

public record CreateHabitRequest(string Name, string? Description);
