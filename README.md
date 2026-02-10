# Habit Tracker

A lightweight ASP.NET Core application for tracking daily habits with a minimal, fast-loading UI and comprehensive end-to-end testing.

![Habit Tracker UI](https://github.com/user-attachments/assets/d254a241-df13-4d8e-95fd-42154325af8c)

## Features

- ✅ Create new habits with name and optional description
- ✅ Mark habits as completed for the current day
- ✅ View all habits in a clean, minimal UI list
- ✅ See a 7-day completion trend per habit with visual indicators
- ✅ Containerized deployment via Docker
- ✅ End-to-end testing with Playwright MCP

## Technology Stack

- **Backend**: ASP.NET Core 10.0 with Minimal APIs
- **Frontend**: HTML, CSS, JavaScript (Vanilla - no frameworks)
- **Testing**: Playwright for E2E tests
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (for E2E tests)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/kvanderkamp/habit-tracker.git
   cd habit-tracker
   ```

2. **Run the application**
   ```bash
   dotnet run --project src/HabitTracker/HabitTracker.csproj
   ```

3. **Open your browser**
   Navigate to `http://localhost:5172`

### Running with Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   Navigate to `http://localhost:8080`

## API Endpoints

The application exposes the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/habits` | Create a new habit |
| GET | `/api/habits` | Get all habits |
| POST | `/api/habits/{id}/complete` | Mark a habit as complete for today |
| GET | `/api/habits/{id}/trend` | Get 7-day completion trend for a habit |

### Example API Usage

**Create a habit:**
```bash
curl -X POST http://localhost:5172/api/habits \
  -H "Content-Type: application/json" \
  -d '{"name": "Drink Water", "description": "8 glasses per day"}'
```

**Mark habit as complete:**
```bash
curl -X POST http://localhost:5172/api/habits/{habit-id}/complete
```

## End-to-End Testing

The project includes comprehensive E2E tests using Playwright.

### Running E2E Tests

1. **Install dependencies**
   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Run tests with UI**
   ```bash
   npm run test:ui
   ```

### E2E Test Coverage

The E2E tests cover the following scenarios:
- ✅ Adding a habit named "Drink Water"
- ✅ Marking it as completed
- ✅ Verifying the UI trend updates
- ✅ Adding multiple habits
- ✅ Form validation
- ✅ Resilient selectors for test stability

![Habit Tracker with Completed Habit](https://github.com/user-attachments/assets/bc302bd9-8913-454b-9e25-be389bec5f26)

## Architecture

### Backend Structure
```
src/HabitTracker/
├── Models/               # Data models
│   ├── Habit.cs
│   ├── HabitCompletion.cs
│   └── HabitTrend.cs
├── Services/            # Business logic
│   ├── IHabitService.cs
│   └── InMemoryHabitService.cs
├── wwwroot/             # Static files
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── Program.cs           # Application entry point
```

### Data Storage

The application uses an in-memory data store (`InMemoryHabitService`) for simplicity. Data is stored in thread-safe `ConcurrentDictionary` collections and persists only for the application lifetime.

For production use, this can be easily replaced with a database implementation by creating a new service that implements `IHabitService`.

## Development

### Building the Project

```bash
dotnet build
```

### Project Structure

- `src/HabitTracker/` - Main application
- `e2e/` - End-to-end tests
- `Dockerfile` - Docker container definition
- `docker-compose.yml` - Docker Compose configuration

## MCP Integration

This application is designed to work seamlessly with MCP (Model Context Protocol) servers, particularly:

- **Playwright MCP Server**: For automated browser testing
- **Content7 MCP**: For content management scenarios

The UI uses resilient `data-testid` selectors throughout, making it ideal for automated testing and AI-driven interactions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC