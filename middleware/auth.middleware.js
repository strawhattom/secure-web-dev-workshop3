const canAccess = (allowedRoles = []) => (req, res) => {
    if (!allowedRoles || allowedRoles === []) return;
    if (!req.user?.role) return res.status(401).send(); // No user
    if (!allowedRoles.includes(req.user.role)) return res.status(403).send(); // No role
}

module.exports = { canAccess };