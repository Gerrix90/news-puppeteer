# news-puppeteer

A Node.js application that scrapes TechCrunch AI category articles using Puppeteer. The script fetches the RSS feed, filters articles published today, and extracts their title and content.

## Features

- Fetches the latest AI news articles from TechCrunch
- Filters articles to only show those published today
- Uses Puppeteer for reliable content extraction
- Handles various page layouts and article formats
- Outputs clean JSON with article title, content, and URL

## Prerequisites

- Node.js (>=12.x)
- npm or Yarn

## Installation

```bash
git clone https://github.com/yourusername/news-puppeteer.git
cd news-puppeteer
npm install
```

## Usage

```bash
# Run the scraper with npm
npm start

# Or directly with Node
node scraper.js
```

## Configuration

You can modify the following in `scraper.js`:

- RSS feed URL (currently set to TechCrunch AI category)
- Article filtering criteria (currently set to today's date)
- Content selectors for different page layouts
- Output format

## Dependencies

- Puppeteer - Headless Chrome browser automation
- Axios - HTTP client for fetching RSS feeds
- xml2js - XML parser for processing RSS data

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
