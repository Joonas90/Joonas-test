# Run Tests
echo "Running Tests..."
npm test

# Check if tests passed
if [ $? -ne 0 ]; then
  echo "Tests failed. Exiting..."
  exit 1
fi

# Start the Development Server
echo "Starting Development Server..."
npm start