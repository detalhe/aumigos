module.exports = function(req, res, next) {
    if (req.session && req.session.user && req.session.user.tipo === 'administrador') {
        return next();
    } else {
        return res.redirect('/login');
    }
};
