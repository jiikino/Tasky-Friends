// Simple in-memory rate limiter for task operations
const requestCounts = new Map();

export const taskRateLimiter = (req, res, next) => {
    const userId = req.userId;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 30; // 30 requests per minute per user

    if (!requestCounts.has(userId)) {
        requestCounts.set(userId, { count: 1, windowStart: now });
        return next();
    }

    const userRequests = requestCounts.get(userId);
    
    // Reset window if time has passed
    if (now - userRequests.windowStart > windowMs) {
        requestCounts.set(userId, { count: 1, windowStart: now });
        return next();
    }

    // Check if user exceeded the limit
    if (userRequests.count >= maxRequests) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again later.",
            retryAfter: Math.ceil((windowMs - (now - userRequests.windowStart)) / 1000)
        });
    }

    // Increment request count
    userRequests.count++;
    requestCounts.set(userId, userRequests);

    // Clean up old entries periodically
    if (requestCounts.size > 1000) {
        const cutoff = now - windowMs;
        for (const [key, value] of requestCounts.entries()) {
            if (value.windowStart < cutoff) {
                requestCounts.delete(key);
            }
        }
    }

    next();
};

// More restrictive rate limiter for task creation
export const taskCreationRateLimiter = (req, res, next) => {
    const userId = req.userId;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 10; // 10 task creations per minute per user

    const key = `create_${userId}`;
    
    if (!requestCounts.has(key)) {
        requestCounts.set(key, { count: 1, windowStart: now });
        return next();
    }

    const userRequests = requestCounts.get(key);
    
    // Reset window if time has passed
    if (now - userRequests.windowStart > windowMs) {
        requestCounts.set(key, { count: 1, windowStart: now });
        return next();
    }

    // Check if user exceeded the limit
    if (userRequests.count >= maxRequests) {
        return res.status(429).json({
            success: false,
            message: "Too many task creations. Please try again later.",
            retryAfter: Math.ceil((windowMs - (now - userRequests.windowStart)) / 1000)
        });
    }

    // Increment request count
    userRequests.count++;
    requestCounts.set(key, userRequests);

    next();
}; 