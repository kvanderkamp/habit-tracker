FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY src/HabitTracker/HabitTracker.csproj ./HabitTracker/
RUN dotnet restore ./HabitTracker/HabitTracker.csproj

# Copy everything else and build
COPY src/HabitTracker/ ./HabitTracker/
WORKDIR /src/HabitTracker
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "HabitTracker.dll"]
