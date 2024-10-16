// import errorMiddleware from "./errorMiddleware.js";
import jwt from 'jsonwebtoken';

const isLogidin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next({ message: 'unaunthicate please login again', statusCode: 400 });
    }
    try {
        const userDetail = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetail;
        next();
    } catch (err) {
        return next(err); // Pass the error to the error middleware
    }
};

export default isLogidin;
