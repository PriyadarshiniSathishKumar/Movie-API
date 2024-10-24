document.getElementById('fetchBtn').addEventListener('click', fetchData);

function fetchData() {
    const query = document.getElementById('input').value;

    if (!query) {
        document.getElementById('result').innerText = "Please enter a movie title.";
        return;
    }

    const apiKey = 'ebc220e7';  // Replace with your actual OMDB API key
    const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=ebc220e7`;

    const options = {
        method: 'GET',
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            document.getElementById('result').innerText = "Error fetching data.";
            console.error('Error:', error);
        });
}

function displayData(data) {
    if (data.Response === "False") {
        document.getElementById('result').innerText = "Movie not found.";
        return;
    }

    // Display the fetched API data in the result div
    document.getElementById('result').innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <img src="${data.Poster}" alt="${data.Title} Poster" style="max-width: 100%; height: auto;">
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
}
