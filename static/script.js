document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle Functionality ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // --- Form Submission Functionality ---
    const form = document.getElementById('predictionForm');
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loadingSpinner');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        try {
            // Show loading spinner
            loadingSpinner.style.display = 'block';
            resultDiv.style.display = 'none';

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Convert form values to numbers
            for (let key in data) {
                data[key] = parseFloat(data[key]);
            }

            // Send request to backend
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            
            // Display result with appropriate styling
            const predictionText = result.prediction === 1 ? 'Positive' : 'Negative';
            const predictionClass = result.prediction === 1 ? 'positive' : 'negative';
            
            resultDiv.innerHTML = `
                <h2>Prediction Result</h2>
                <p>Based on the provided data, the diabetes prediction is: 
                    <strong class="${predictionClass}">${predictionText}</strong>
                </p>
                <p class="probability">Confidence: ${(result.probability * 100).toFixed(2)}%</p>
            `;

        } catch (error) {
            resultDiv.innerHTML = `
                <h2>Error</h2>
                <p class="error">Sorry, something went wrong. Please try again.</p>
            `;
            console.error('Error:', error);
        } finally {
            // Hide loading spinner and show results
            loadingSpinner.style.display = 'none';
            resultDiv.style.display = 'block';
        }
    });

    // --- Form Validation ---
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
                e.target.setCustomValidity('Please enter a valid number');
            } else {
                e.target.setCustomValidity('');
            }
        });
    });
});