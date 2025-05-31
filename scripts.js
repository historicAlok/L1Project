document.getElementById('priceForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent page reload

  // Collect form data
  const bedrooms = parseInt(document.getElementById('bedrooms').value);
  const bathrooms = parseInt(document.getElementById('bathrooms').value);
  const living_area = parseInt(document.getElementById('living_area').value);
  const zipcode = document.getElementById('zipcode').value.trim();

  // For location, get the selected option value
  const locationSelect = document.getElementById('locationDropdown');
  const location = locationSelect.options[locationSelect.selectedIndex].value;

  // Prepare the data object
  const data = {
    bedrooms,
    bathrooms,
    living_area,
    zipcode,
    location
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/predict', { // Adjust URL if different
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const result = await response.json();

    // Assuming your backend returns { "predicted_price": some_value }
    document.getElementById('result').innerText = 
      `Predicted House Price: ₹${result.predicted_price.toLocaleString()}`;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'Error occurred while predicting price.';
  }
});
