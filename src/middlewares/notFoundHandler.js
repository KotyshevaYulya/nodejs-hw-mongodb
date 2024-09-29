export const notFoundHandler = (req, res, next) => {
    res.status(400).json({
        message: "Route not found",
    });
};
