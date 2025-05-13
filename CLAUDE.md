# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

news-puppeteer is a Node.js application that scrapes TechCrunch AI category articles using Puppeteer. It fetches the RSS feed, filters for articles published today, and then uses Puppeteer to extract article content.

## Commands

### Installation
```bash
npm install
```

### Running the Application
```bash
npm start
# or directly with
node scraper.js
```

## Architecture

The application has a simple architecture with a single JavaScript file:

- `scraper.js` - The main script that:
  1. Fetches the TechCrunch AI category RSS feed using axios
  2. Parses the XML feed using xml2js
  3. Filters articles published today
  4. Uses Puppeteer to visit each article URL and extract title and content
  5. Outputs the scraped article data as JSON

### Dependencies
- puppeteer - Headless Chrome browser for scraping web pages
- axios - HTTP client for fetching RSS feeds
- xml2js - XML parser for processing RSS feeds