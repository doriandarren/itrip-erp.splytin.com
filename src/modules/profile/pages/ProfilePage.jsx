import { useTranslation } from "react-i18next"
import { SessionLayout } from "../../../layouts/private/SessionLayout"
import { useState } from "react";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";


const dataForm = {
  name: "",
  title: "",
  email: "",
  role: "",
};

export const ProfilePage = () => {

  const {t} = useTranslation();

  const [formData, setFormData] = useState(dataForm);
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: implements
    //navigate("/admin/profile");
    Swal.fire("Registro guardado correctamente", "Registro guardado", "success")
  };



  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          { t("profile") }
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">

        <form onSubmit={onSubmit} className="space-y-4">

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

          <div className="flex justify-end items-end mt-7">
            <Button 
              type="submit"
            >
              {t("save")}
            </Button>
          </div>

        </form>
      </div>
      
    </SessionLayout>
  )
}
