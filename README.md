# Habit Tracker

A lightweight ASP.NET Core application for tracking daily habits with a minimal UI and RESTful API.

## Features

- ✨ **Create Habits**: Add custom habits to track
- ✅ **Mark Completions**: Click on day boxes to mark habits as complete or incomplete
- 📊 **7-Day Trends**: Visualize your progress over the last 7 days
- 🔄 **Real-time Updates**: See your completion counts update instantly
- 🐳 **Docker Ready**: Easy deployment with Docker and docker-compose
- 🧪 **E2E Testing**: Automated tests via Playwright MCP integration

## Quick Start

### Prerequisites

- .NET 10.0 SDK or later
- Docker (optional, for containerized deployment)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/kvanderkamp/habit-tracker.git
   cd habit-tracker
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

3. Open your browser and navigate to `http://localhost:5000`

### Running with Docker

Build and run using Docker Compose:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:8080`

## API Endpoints

### Get All Habits
```
GET /api/habits
```
Returns a list of all habits with their 7-day completion status.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Morning Exercise",
    "createdAt": "2024-01-15T10:30:00Z",
    "completionCount": 5,
    "last7Days": [true, false, true, true, false, true, false]
  }
]
```

### Get Single Habit
```
GET /api/habits/{id}
```
Returns a specific habit by ID.

### Create Habit
```
POST /api/habits
Content-Type: application/json

{
  "name": "Morning Exercise"
}
```
Creates a new habit.

### Complete Habit
```
POST /api/habits/{id}/complete
```
Marks a habit as complete for today.

### Uncomplete Habit
```
DELETE /api/habits/{id}/complete
```
Removes today's completion for a habit.

## UI Features

### Adding a Habit
1. Type the habit name in the input field
2. Click "Add Habit" or press Enter
3. The habit will appear in the list below

### Marking Completions
- Each habit shows 7 day boxes representing the last 7 days
- Green boxes = completed days
- Gray boxes = incomplete days
- Box with blue border = today
- Click any day box to toggle completion status

### Understanding the Display
- **Habit Name**: Displayed prominently at the top of each card
- **Total Completions**: Shows lifetime completion count
- **7-Day View**: Sunday through Saturday, with today highlighted

## Project Structure

```
habit-tracker/
├── Models/              # Data models and DTOs
│   ├── Habit.cs
│   ├── HabitDto.cs
│   └── ...
├── Services/            # Business logic
│   └── HabitService.cs
├── wwwroot/            # Static web files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── tests/
│   └── e2e/            # End-to-end tests
├── Program.cs          # Application entry point
├── Dockerfile          # Docker configuration
└── docker-compose.yml  # Docker Compose configuration
```

## Technology Stack

- **Backend**: ASP.NET Core 10.0 (Minimal APIs)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: In-memory (can be extended to use database)
- **Containerization**: Docker
- **Testing**: Playwright MCP integration

## Development

### Building
```bash
dotnet build
```

### Running in Development
```bash
dotnet run
```

The application will start on `http://localhost:5000` (or the port configured in `launchSettings.json`).

## Testing

### E2E Tests with MCP

The application includes MCP integration for automated E2E testing with Playwright. See `tests/e2e/README.md` for details.

### Manual Testing

1. Start the application
2. Navigate to the UI
3. Test creating habits, marking completions, and viewing trends

## Deployment

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t habit-tracker .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 habit-tracker
   ```

### Docker Compose Deployment

```bash
docker-compose up -d
```

## Future Enhancements

- Persistent storage (SQLite, PostgreSQL)
- User authentication and multi-user support
- Habit categories and tags
- Streak tracking and achievements
- Export data to CSV/JSON
- Mobile-responsive improvements
- Dark mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.
