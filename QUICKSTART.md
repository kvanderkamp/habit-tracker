# Quick Start Guide

Get the Habit Tracker up and running in under 5 minutes!

## Option 1: Run Locally with .NET

### Prerequisites
- .NET 10.0 SDK or later

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/kvanderkamp/habit-tracker.git
cd habit-tracker

# 2. Run the application
dotnet run

# 3. Open your browser
# Navigate to http://localhost:5192
```

That's it! 🎉

## Option 2: Run with Docker

### Prerequisites
- Docker installed

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/kvanderkamp/habit-tracker.git
cd habit-tracker

# 2. Build and run with Docker
docker-compose up -d

# 3. Open your browser
# Navigate to http://localhost:8080
```

Done! 🚀

## Option 3: Build Docker Image Manually

```bash
# Build the image
docker build -t habit-tracker .

# Run the container
docker run -p 8080:8080 habit-tracker

# Access at http://localhost:8080
```

## First Steps

Once the application is running:

1. **Add your first habit**
   - Type a habit name in the input field (e.g., "Morning Exercise")
   - Click "Add Habit" or press Enter

2. **Mark it complete**
   - Click on today's box (the one with the blue border)
   - Watch it turn green! ✅

3. **Track your progress**
   - See your 7-day trend at a glance
   - Toggle any day by clicking on it

## Testing the API

```bash
# Get all habits
curl http://localhost:5192/api/habits

# Create a new habit
curl -X POST http://localhost:5192/api/habits \
  -H "Content-Type: application/json" \
  -d '{"name":"Drink Water"}'

# Mark habit #1 as complete for today
curl -X POST http://localhost:5192/api/habits/1/complete

# Remove today's completion for habit #1
curl -X DELETE http://localhost:5192/api/habits/1/complete
```

## Development

### Build the project
```bash
dotnet build
```

### Run in watch mode (auto-reload on changes)
```bash
dotnet watch run
```

### Clean build artifacts
```bash
dotnet clean
```

## Troubleshooting

**Port already in use?**
- Check `Properties/launchSettings.json` to change the port
- Or set the environment variable: `export ASPNETCORE_URLS=http://localhost:YOUR_PORT`

**Docker not starting?**
- Make sure Docker daemon is running
- Check if port 8080 is available: `lsof -i :8080` (macOS/Linux) or `netstat -ano | findstr :8080` (Windows)

**API not responding?**
- Verify the app is running: `ps aux | grep dotnet` (macOS/Linux) or Task Manager (Windows)
- Check application logs for errors

## Next Steps

- Read the [README.md](../README.md) for detailed documentation
- Check out [E2E Test Scenarios](tests/e2e/TEST_SCENARIOS.md) for testing examples
- Customize the UI by editing `wwwroot/styles.css`
- Extend the API in `Program.cs`

Happy habit tracking! 🎯
