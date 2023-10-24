import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getCoursesAnalytics, getNotificationsAnalytics, getOrdersAnalytics, getUsersAnalytics } from '../controllers/analytics.controller';
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics", isAuthenticated, authorizeRoles("admin"), getUsersAnalytics);

analyticsRouter.get("/get-orders-analytics", isAuthenticated, authorizeRoles("admin"), getOrdersAnalytics);

analyticsRouter.get("/get-courses-analytics", isAuthenticated, authorizeRoles("admin"), getCoursesAnalytics);

analyticsRouter.get("/get-notifications-analytics", isAuthenticated, authorizeRoles("admin"), getNotificationsAnalytics);

export default analyticsRouter;