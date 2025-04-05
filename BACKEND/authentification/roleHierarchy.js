const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!Array.isArray(allowedRoles)) {
            return res.status(500).json({
                success: false,
                message: "Configuration serveur invalide"
            });
        }

        const userRole = req.user?.role?.toLowerCase();

        if (!userRole || !allowedRoles.some(role => role.toLowerCase() === userRole)) {
            return res.status(403).json({
                success: false,
                message: `Accès refusé. Rôles autorisés : ${allowedRoles.join(', ')}`,
                yourRole: req.user?.role
            });
        }
        next();
    };
};

const canAssignRole = (req, res, next) => {
    const requestedRole = (req.body.role || 'employee').toLowerCase();
    const currentUserRole = req.user?.role?.toLowerCase();

    // 1. Inscriptions publiques (employee seulement)
    if (!currentUserRole) {
        if (requestedRole === 'employee' || requestedRole === 'manager') {
            return next();
        }
        return res.status(403).json({
            success: false,
            message: "Seuls les comptes employés et manager peuvent être créés publiquement"
        });
    }

    // 2. Vérification des permissions
    const allowedRoles = roleHierarchy[currentUserRole] || [];

    if (allowedRoles.map(r => r.toLowerCase()).includes(requestedRole)) {
        return next();
    }

    // 3. Erreur détaillée
    res.status(403).json({
        success: false,
        message: `Permission refusée : ${currentUserRole} → ${requestedRole}`,
        allowedRoles: roleHierarchy[currentUserRole]
    });
};

module.exports = {
    checkRole,
    canAssignRole,
};
