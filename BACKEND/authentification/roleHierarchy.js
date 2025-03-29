// middlewares/roleMiddleware.js
const roleHierarchy = {
    admin: ['admin', 'manager', 'employee'],
    manager: ['manager', 'employee'],
    employee: ['employee']
};

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `Accès refusé. Rôles autorisés : ${allowedRoles.join(', ')}`
            });
        }
        next();
    };
};

const canAssignRole = (req, res, next) => {
    const requesterRole = req.user?.role;
    const targetRole = req.body.role;

    if (!requesterRole || !roleHierarchy[requesterRole]?.includes(targetRole)) {
        return res.status(403).json({
            success: false,
            message: `Vous n'êtes pas autorisé à attribuer le rôle ${targetRole}`
        });
    }
    next();
};

module.exports = { checkRole, canAssignRole };
