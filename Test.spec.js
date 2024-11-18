

async function decodeMessageFromDoc(url) {
    try {
        // Fetch the content from the Google Doc
        const response = await fetch(url);
        const text = await response.text();

        // Parse the text to extract characters and coordinates
        const lines = text.split('\n');
        const grid = {};

        let maxX = 0;
        let maxY = 0;

        for (let line of lines) {
            // Split the line into character, x, and y coordinates
            const parts = line.trim().split(/\s+/);
            if (parts.length === 3) {
                const char = parts[0];
                const x = parseInt(parts[1], 10);
                const y = parseInt(parts[2], 10);

                // Store the character at the (x, y) position
                if (!grid[y]) {
                    grid[y] = {};
                }
                grid[y][x] = char;

                // Track the maximum x and y coordinates to determine grid size
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }

        // Print the grid row by row
        for (let y = 0; y <= maxY; y++) {
            let row = '';
            for (let x = 0; x <= maxX; x++) {
                row += (grid[y] && grid[y][x]) ? grid[y][x] : ' ';
            }
            console.log(row);
        }
    } catch (error) {
        console.error('Error fetching or processing the document:', error);
    }
}

// Replace with the actual URL of the Google Doc
decodeMessageFromDoc('https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub');
