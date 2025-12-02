import apikeyAuth from "../middleware/apiKey.js";
import protect from "../middleware/protect.js";

// Universal Authentication Middleware
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required: Provide Bearer token or ApiKey."
            });
        }

        const [scheme, credential] = authHeader.split(" ");

        if (!scheme || !credential) {
            return res.status(401).json({
                success: false,
                message: "Invalid Authorization format. Use 'Bearer <token>' or 'ApiKey <key>'.",
            });
        }

        // JWT (Bearer Token)
        if (scheme === "Bearer") {
            req.token = credential; // Token pass to next middleware
            return protect(req, res, next);
        }

        // API Key
        if (scheme === "ApiKey") {
            req.apiKey = credential; // API Key pass to next middleware
            return apikeyAuth(req, res, next);
        }

        //  Unsupported Auth
        return res.status(401).json({
            success: false,
            message: "Unsupported Authorization scheme. Use 'Bearer' or 'ApiKey'.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Auth middleware error.",
            error: error.message,
        });
    }
};

export default auth;