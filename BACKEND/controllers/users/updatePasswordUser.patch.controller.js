const findUserWherePseudo = require('../../services/users.services').findUserWherePseudo;
const updatePasswordUser = require('../../services/users.services').updateUser
const bcrypt = require('bcrypt');

const updateRoleUserController = async (req, res) => {
    const data = req.body;
    const { password } = data;

    const saltRounds = 10


}
