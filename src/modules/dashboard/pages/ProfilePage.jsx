import { useTranslation } from "react-i18next"
import { SessionLayout } from "../../../layouts/private/SessionLayout"
import { useState } from "react";
import { Button } from "../../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    role: "",
  });
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch(addUser(formData)); 
    navigate("/admin/team");
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/team"); 
  }

  return (
    <SessionLayout>

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("add")}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-gray-700">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona un rol</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Botón de Crear */}
          <div className="flex justify-end">
            <div>
              <Button type="submit">{t("save")}</Button>
            </div>

            <div>
              <Button
                variant="danger"
                onClick={onClickCancel}
              >
                {t("cancel")}
              </Button>
            </div>

          </div>

        </form>
      </div>
      
    </SessionLayout>
  )
}
