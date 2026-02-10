using HabitTracker.Models;
using HabitTracker.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSingleton<HabitService>();

var app = builder.Build();

// Serve static files
app.UseDefaultFiles();
app.UseStaticFiles();

// API Endpoints
app.MapGet("/api/habits", (HabitService service) =>
{
    return Results.Ok(service.GetAllHabits());
});

app.MapGet("/api/habits/{id}", (int id, HabitService service) =>
{
    var habit = service.GetHabit(id);
    return habit != null ? Results.Ok(habit) : Results.NotFound();
});

app.MapPost("/api/habits", (CreateHabitRequest request, HabitService service) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
        return Results.BadRequest("Habit name is required");

    var habit = service.CreateHabit(request.Name);
    return Results.Created($"/api/habits/{habit.Id}", habit);
});

app.MapPost("/api/habits/{id}/complete", (int id, HabitService service) =>
{
    var success = service.CompleteHabit(id);
    return success ? Results.Ok() : Results.NotFound();
});

app.MapDelete("/api/habits/{id}/complete", (int id, HabitService service) =>
{
    var success = service.UncompleteHabit(id);
    return success ? Results.Ok() : Results.NotFound();
});

app.Run();
