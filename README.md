# 🚀 Page Pulse

Page Pulse is a lightweight web application that analyzes any webpage and provides useful insights such as HTTP status, response time, page title, meta description, H1 count, missing image alt attributes, and approximate word count.

This project was built as part of the **Digital Heroes SDE Internship Qualification Task**.

---

## Features

- Analyze any public webpage
- HTTP Status Detection
- Response Time Measurement
- Page Title Extraction
- Meta Description Extraction
- H1 Count
- Missing Image Alt Detection
- Approximate Word Count
- URL Validation
- Timeout Handling
- Non-HTML Response Detection
- Responsive UI
- Copy Report as JSON
- Automated Unit Tests

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- Axios
- Cheerio

### Testing

- Vitest

---

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## API

### POST

```
/api/analyze
```

Body

```json
{
  "url":"https://example.com"
}
```

Response

```json
{
  "success": true,
  "data": {
    "status":200,
    "responseTime":"220 ms",
    "title":"Example",
    "metaDescription":"...",
    "h1Count":1,
    "missingAltImages":2,
    "wordCount":350
  }
}
```

---

## Design Decisions

### 1. Cheerio for HTML Parsing

Cheerio is lightweight, fast, and suitable for server-side HTML parsing without launching a browser.

### 2. Separate Parsing Logic

HTML parsing is isolated inside `parser.js`, making the application easier to maintain and unit test.

### 3. Axios Timeout

A 5-second timeout prevents the server from hanging on slow or unreachable websites, improving reliability and user experience.

---

## Future Improvements

- Lighthouse Performance Audit
- Open Graph Tag Analysis
- Favicon Detection
- Export Report as PDF
- SEO Score

---

## AI Usage

I used ChatGPT to brainstorm the project structure, review edge cases, and improve documentation. The application logic, testing, debugging, and final implementation were completed and refined manually.