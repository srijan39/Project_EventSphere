import Admin from "../../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import { google } from "googleapis";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminProfile = async (req, res) => {
  res.json({
    message: "Admin profile fetched",
    admin: req.admin,
  });
};

export const getSubmissions = async (req, res) => {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${process.env.GOOGLE_SHEET_NAME}!A:M`,
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    const dataRows = rows.slice(1);

    const submissions = dataRows.map((row, index) => ({
      id: index + 1,
      submittedAt: row[0] || "",
      name: row[1] || "",
      regNo: row[2] || "",
      email: row[3] || "",
      contact: row[4] || "",
      gender: row[5] || "",
      course: row[6] || "",
      accommodation: row[7] || "",
      hostel: row[8] || "",
      domain: row[9] || "",
      rating: row[10] || "",
      experience: row[11] || "",
      organization: row[12] || "",
    }));

    res.json({
      message: "Submissions fetched successfully",
      count: submissions.length,
      headers,
      submissions,
    });
  } catch (error) {
    console.error("Google Sheets fetch error:", error);

    res.status(500).json({
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};