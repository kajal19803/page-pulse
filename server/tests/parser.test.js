import { describe, it, expect } from "vitest";
import { parseHTML } from "../utils/parser.js";

describe("parseHTML", () => {

  it("should parse valid HTML", () => {

    const html = `
      <html>
        <head>
          <title>Page Pulse</title>
          <meta name="description" content="Demo website">
        </head>

        <body>

          <h1>Hello</h1>

          <img src="1.jpg">

          <img src="2.jpg" alt="Logo">

          <p>This is a demo website.</p>

        </body>

      </html>
    `;

    const result = parseHTML(html);

    expect(result.title).toBe("Page Pulse");

    expect(result.metaDescription).toBe("Demo website");

    expect(result.h1Count).toBe(1);

    expect(result.missingAltImages).toBe(1);

  });

});

it("should handle missing meta description", () => {

    const html = `
    <html>

    <head>

    <title>Demo</title>

    </head>

    <body>

    <h1>Hello</h1>

    </body>

    </html>
    `;

    const result = parseHTML(html);

    expect(result.metaDescription).toBe(
      "No meta description found"
    );

});
it("should handle page without title", () => {

    const html = `
    <html>

    <body>

    <p>Hello</p>

    </body>

    </html>
    `;

    const result = parseHTML(html);

    expect(result.title).toBe(
      "No title found"
    );

});