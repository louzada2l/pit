// controllers/profileController.js

const User = require('../models/User'); 

exports.editProfile = async (req, res) => {
    const { name, email, role, birth_date, profile_picture, companyLogo, companyEmployees, niche, location } = req.body;

    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (role === "cliente") {
            if (profile_picture) user.profile_picture = profile_picture;
            if (birth_date) user.birth_date = birth_date;
        }

        if (role === "colaborador") {
            if (companyLogo) user.companyLogo = companyLogo;
            if (companyEmployees) user.companyEmployees = companyEmployees;
            if (niche) user.niche = niche;
            if (location) user.location = location;
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: 'Perfil atualizado com sucesso!', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
};
