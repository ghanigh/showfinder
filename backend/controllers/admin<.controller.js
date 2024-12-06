import User from '../models/admin';

const AdminController = {
  // Obtenir les détails de tous les utilisateurs
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password'); // Exclure les mots de passe pour des raisons de sécurité
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error.message });
    }
  },

  // Supprimer un utilisateur par ID
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur', details: error.message });
    }
  },

  // Modifier le rôle d'un utilisateur
  async updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Rôle invalide. Utilisez "user" ou "admin".' });
    }

    try {
      const user = await User.findByIdAndUpdate(id, { role }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Rôle utilisateur mis à jour avec succès', user });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle utilisateur', details: error.message });
    }
  },
};

export default AdminController;
