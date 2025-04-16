import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getTeamById, updateTeam } from "../services/teamService";

// Esquema de validación con Yup
const schema = yup.object().shape({
  name: yup.string().required("Campo obligatorio"),
  transporeon_code: yup.string().required("Campo obligatorio"),
  msoft_code: yup.string().required("Campo obligatorio"),
});

export const TeamEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Configuración de react-hook-form con Yup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTeamById(id);
        const {name, transporeon_code, msoft_code} = response.data;
        
        if (response) {
          setValue("name", name);
          setValue("transporeon_code", transporeon_code);
          setValue("msoft_code", msoft_code);
        } else {
          Swal.fire("Error", "No se pudo obtener el registro", "error");
          navigate("/admin/teams");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        Swal.fire("Error", "Hubo un problema al obtener el registro", "error");
        navigate("/admin/teams");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, setValue]);

  // Función para manejar la actualización
  const onSubmit = async (data) => {
    try {
      console.log("Datos enviados:", data);
      const response = await updateTeam(id, data);

      if (response) {
        Swal.fire("Actualizado", "Registro actualizado correctamente", "success").then(() => {
          navigate("/admin/teams");
        });
      } else {
        Swal.fire("Error", "No se pudo actualizar el registro", "error");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "Hubo un problema al actualizar el registro", "error");
    }
  };

  // Función para cancelar
  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/teams");
  };

  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("edit")}
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">

            {/* Nombre */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("name")}</label>
              <input
                type="text"
                {...register("name")}
                className={`w-full p-2 border ${
                  errors.name ? "border-danger" : "border-gray-300"
                } rounded-md`}
              />
              {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}
            </div>

            {/* Código Transporeon */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("transporeon_code")}</label>
              <input
                type="text"
                {...register("transporeon_code")}
                className={`w-full p-2 border ${
                  errors.transporeon_code ? "border-danger" : "border-gray-300"
                } rounded-md`}
              />
              {errors.transporeon_code && (
                <p className="text-danger text-sm">{errors.transporeon_code.message}</p>
              )}
            </div>

            {/* Código MSoft */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("msoft_code")}</label>
              <input
                type="text"
                {...register("msoft_code")}
                className={`w-full p-2 border ${
                  errors.msoft_code ? "border-danger" : "border-gray-300"
                } rounded-md`}
              />
              {errors.msoft_code && (
                <p className="text-danger text-sm">{errors.msoft_code.message}</p>
              )}
            </div>

            {/* Botones */}
            <div className="col-span-12 flex justify-center mt-7 gap-2">
              <Button type="submit">{t("save")}</Button>
              <Button variant="danger" onClick={onClickCancel}>
                {t("cancel")}
              </Button>
            </div>

          </form>
        )}
      </div>
    </SessionLayout>
  );
};
