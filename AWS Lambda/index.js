const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const bcrypt = require("bcryptjs");

// AWS Clients
const dynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || "users";

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event));

  // --- Parse body ---
  let body;
  try {
    body =
      event.body && typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || event;
  } catch (err) {
    console.error("Body parse error:", err);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Invalid request body format.",
      }),
    };
  }

  const { username, name, email, pwd } = body;

  // --- Validate input ---
  if (!username || !name || !email || !pwd) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Please fill all details carefully.",
      }),
    };
  }

  if (!email.endsWith("@gmail.com")) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Enter a valid Gmail address.",
      }),
    };
  }

  if (pwd.length <= 5) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Password must be at least 6 characters.",
      }),
    };
  }

  try {
    // --- Check if user already exists ---
    const getParams = { TableName: USER_TABLE_NAME, Key: marshall({ email }) };
    const { Item } = await dynamoDBClient.send(new GetItemCommand(getParams));

    if (Item) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: `User already exists with email: ${email}`,
        }),
      };
    }

    // --- Hash password ---
    const hashPassword = await bcrypt.hash(pwd, 10);

    const userData = {
      username,
      name,
      email,
      password: hashPassword,
      createdAt: new Date().toISOString(),
      isVerified: false,
    };

    // --- Insert into DynamoDB ---
    const putParams = {
      TableName: USER_TABLE_NAME,
      Item: marshall(userData),
      ConditionExpression: "attribute_not_exists(email)",
    };

    await dynamoDBClient.send(new PutItemCommand(putParams));

    // --- Success Response ---
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "You are registered successfully.",
        data: { username, email },
      }),
    };
  } catch (err) {
    console.error("Signup Error:", err);
    if (err.name === "ConditionalCheckFailedException") {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: `User already exists with email: ${email}`,
        }),
      };
    }
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: err.message || "Registration failed. Please try again.",
      }),
    };
  }
};
