
import React from 'react';
import { User } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">👤</div>
        <p className="text-xl">Aucun utilisateur trouvé</p>
        <p className="text-sm mt-2">Commencez par ajouter votre premier utilisateur</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Version desktop */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Nom</th>
              <th className="text-left p-4 font-semibold text-gray-700">Prénom</th>
              <th className="text-left p-4 font-semibold text-gray-700">Email</th>
              <th className="text-left p-4 font-semibold text-gray-700">Téléphone</th>
              <th className="text-left p-4 font-semibold text-gray-700">Date création</th>
              <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <td className="p-4 font-medium text-gray-800">{user.nom}</td>
                <td className="p-4 text-gray-700">{user.prenom}</td>
                <td className="p-4 text-gray-700">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {user.email}
                  </div>
                </td>
                <td className="p-4 text-gray-700">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {user.telephone}
                  </div>
                </td>
                <td className="p-4 text-gray-700">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {user.dateCreation}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(user)}
                      className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(user)}
                      className="hover:bg-red-50 hover:border-red-300 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version mobile */}
      <div className="md:hidden space-y-4 p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {user.prenom} {user.nom}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(user)}
                    className="hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(user)}
                    className="hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {user.telephone}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {user.dateCreation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
