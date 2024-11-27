const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            console.log("Usuário autenticado:", req.user); // Adicione este log
            next();
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            return res.status(401).json({ message: "Não autorizado." });
        }
    } else {
        return res.status(401).json({ message: "Sem token de autenticação." });
    }
};


module.exports = { protect };
