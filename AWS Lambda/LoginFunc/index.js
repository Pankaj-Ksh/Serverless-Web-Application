const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });
const USER_TABLE_NAME = process.env.USER_TABLE_NAME || "users";
const JWT_SECRET = process.env.JWT_SECRET || "jsonwebtoken"; // Replace with secure secret in production

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event));

  // --- Parse request body ---
  let body;
  try {
    if (event.body) {
      body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    } else {
      body = event;
    }
  } catch (err) {
    console.error("Body parse error:", err);
    return sendResponse(400, {
      success: false,
      message: "Invalid request body format.",
    });
  }

  const { email, pwd } = body;

  // --- Validate input ---
  if (!email || !pwd) {
    return sendResponse(400, {
      success: false,
      message: "Please fill all details carefully.",
    });
  }

  if (!email.endsWith("@gmail.com")) {
    return sendResponse(400, {
      success: false,
      message: "Enter a valid Gmail address.",
    });
  }

  try {
    // --- Fetch user from DynamoDB ---
    const getParams = { TableName: USER_TABLE_NAME, Key: { email: { S: email } } };
    const { Item } = await dynamoDBClient.send(new GetItemCommand(getParams));

    if (!Item) {
      return sendResponse(404, {
        success: false,
        message: `No user found with email: ${email}. Please sign up first.`,
      });
    }

    const user = unmarshall(Item);

    // --- Compare password ---
    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
      return sendResponse(401, {
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // --- Generate JWT ---
    const tokenPayload = { email: user.email, username: user.username };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "3h" });

    // --- Success Response ---
    return sendResponse(200, {
      success: true,
      message: "User logged in successfully.",
      token,
      userExist: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return sendResponse(500, {
      success: false,
      message: err.message || "Login failed. Please try again later.",
    });
  }
};

// ✅ Helper function for consistent JSON + CORS response
function sendResponse(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Allow frontend
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(bodyObj),
  };
}
