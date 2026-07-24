import axios from "axios";
import { parseHTML } from "../utils/parser.js";

export const analyzePage = async (req, res) => {
  try {
    const { url } = req.body;

    // Check if URL exists
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    // Measure response time
    const startTime = Date.now();

    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const responseTime = Date.now() - startTime;

    // Check if HTML
    const contentType = response.headers["content-type"];

    if (!contentType.includes("text/html")) {
      return res.status(400).json({
        success: false,
        message: "URL does not contain an HTML page",
      });
    }

    // Parse HTML
    const report = parseHTML(response.data);

    // Send report
    return res.json({
      success: true,
      data: {
        status: response.status,
        responseTime: `${responseTime} ms`,
        ...report,
      },
    });

  } catch (error) {

    if (error.code === "ECONNABORTED") {
      return res.status(408).json({
        success: false,
        message: "Request timed out",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};