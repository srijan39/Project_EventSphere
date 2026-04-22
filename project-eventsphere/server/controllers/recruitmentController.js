import { google } from "googleapis";

export const submitRecruitment = async (req, res) => {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME;

    console.log("EMAIL:", serviceEmail);
    console.log("KEY exists:", !!privateKey);

    if (!privateKey || !serviceEmail || !sheetId || !sheetName) {
      return res.status(500).json({
        success: false,
        message: "Missing Google Sheets environment variables",
      });
    }

    const auth = new google.auth.JWT({
      email: serviceEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const {
      name,
      regNo,
      email,
      contact,
      gender,
      course,
      accommodation,
      hostel,
      domain,
      rating,
      experience,
      org,
      submittedAt,
    } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:M`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          submittedAt || new Date().toISOString(),
          name,
          regNo,
          email,
          contact,
          gender,
          course,
          accommodation,
          hostel || "N.A.",
          domain,
          rating,
          experience,
          org,
        ]],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Google Sheets submit error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};