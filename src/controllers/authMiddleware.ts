import { Request, Response, NextFunction } from 'express';


// Function to validate username format (contains only alphanumeric characters)
function validateUsername(username: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Regular expression to match alphanumeric characters
    return alphanumericRegex.test(username); // Test if the username matches the alphanumeric regex
}

const username = 'admin'; // Expected username
const password = 'password'; // Expected password

// Middleware function for basic authentication
export function basicAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization; // Get the Authorization header from the request

    // Check if Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized - Username and password are required' });
    }

    // Decode the base64-encoded credentials from the Authorization header
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [providedUsername, providedPassword] = auth.split(':'); // Split decoded credentials into username and password

    // Validate username format using the custom function
    if (!validateUsername(providedUsername)) {
        return res.status(400).json({ message: 'Invalid username format - Username must contain only alphanumeric characters' });
    }

    // Check if provided credentials match the expected username and password
    if (providedUsername === username && providedPassword === password) {
        next(); // Authorized, proceed to the next middleware or route handler
    } else {
        return res.status(401).json({ message: 'Unauthorized - Invalid credentials' });
    }
}
