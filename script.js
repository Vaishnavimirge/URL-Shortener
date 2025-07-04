const ACCESS_TOKEN = "1ca5e7420583d1ea8e87ac5a9c4abfcdc6819425";

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const apiUrl = "https://api-aal.bitly.com/v4/shorten";

    if (!longUrl) {
        alert("Please enter the URL");
        return;
    }

    const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    const data = {
        long_url: longUrl
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to shorten URL");
        }

        const result = await response.json();
        document.getElementById("shortenUrl").value = result.link;

    } catch (error) {
        alert("Error: " + error.message);
    }
}

function copyToClipboard() {
    const shortenUrlInput = document.getElementById("shortenUrl");

    if (!shortenUrlInput.value) {
        alert("No shortened URL to copy");
        return;
    }

    navigator.clipboard.writeText(shortenUrlInput.value)
        .then(() => alert("Shortened URL copied to clipboard!"))
        .catch(err => alert("Failed to copy: " + err));
}
