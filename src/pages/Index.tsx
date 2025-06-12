
import React, { useState, useEffect } from 'react';
import { UserList } from '@/components/UserList';
import { UserForm } from '@/components/UserForm';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateCreation: string;
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Données d'exemple pour simuler une base de données
  useEffect(() => {
    const initialUsers: User[] = [
      {
        id: 1,
        nom: 'Martin',
        prenom: 'Jean',
        email: 'jean.martin@email.com',
        telephone: '01 23 45 67 89',
        dateCreation: new Date().toISOString().split('T')[0]
      },
      {
        id: 2,
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'marie.dubois@email.com',
        telephone: '01 98 76 54 32',
        dateCreation: new Date().toISOString().split('T')[0]
      },
      {
        id: 3,
        nom: 'Leroy',
        prenom: 'Pierre',
        email: 'pierre.leroy@email.com',
        telephone: '01 11 22 33 44',
        dateCreation: new Date().toISOString().split('T')[0]
      }
    ];
    setUsers(initialUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: Omit<User, 'id' | 'dateCreation'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      dateCreation: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setShowForm(false);
    toast({
      title: "Utilisateur créé",
      description: `${userData.prenom} ${userData.nom} a été ajouté avec succès.`,
    });
  };

  const handleUpdateUser = (userData: Omit<User, 'id' | 'dateCreation'>) => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, ...userData }
        : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setShowForm(false);
    toast({
      title: "Utilisateur modifié",
      description: `${userData.prenom} ${userData.nom} a été mis à jour.`,
    });
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setUserToDelete(null);
    toast({
      title: "Utilisateur supprimé",
      description: `${userToDelete.prenom} ${userToDelete.nom} a été supprimé.`,
      variant: "destructive",
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              CRUD PHP - Gestion Utilisateurs
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Interface moderne pour la gestion des utilisateurs
          </p>
        </div>

        {/* Actions et recherche */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Utilisateur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Utilisateurs</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <Database className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Résultats Filtrés</p>
                  <p className="text-3xl font-bold">{filteredUsers.length}</p>
                </div>
                <Search className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Nouveaux Aujourd'hui</p>
                  <p className="text-3xl font-bold">
                    {users.filter(u => u.dateCreation === new Date().toISOString().split('T')[0]).length}
                  </p>
                </div>
                <Plus className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des utilisateurs */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Liste des Utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <UserList
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={setUserToDelete}
            />
          </CardContent>
        </Card>

        {/* Formulaire d'ajout/édition */}
        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onClose={handleCloseForm}
          />
        )}

        {/* Modal de confirmation de suppression */}
        {userToDelete && (
          <DeleteConfirmModal
            user={userToDelete}
            onConfirm={handleDeleteUser}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
