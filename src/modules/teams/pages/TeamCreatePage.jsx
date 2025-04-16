import { useTranslation } from "react-i18next";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTeam } from "../services/teamService";





export const TeamCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Schema 
  const schema = yup.object().shape({
    name: yup.string().required(t("form.required")),
    transporeon_code: yup.string().required(t("form.required")),
    msoft_code: yup.string().required(t("form.required")),
  });

  // react-hook-form con Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  
  const onSubmit = async(data) => {
    try {
      console.log("Datos enviados:", data);
      
      const response = await createTeam(data);
  
      if (response) {
        Swal.fire("Registro guardado correctamente", "Registro guardado", "success").then(() => {
          navigate("/admin/teams");
        });
      } else {
        Swal.fire("Error", "No se pudo guardar el registro", "error");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire("Error", "Hubo un problema al guardar el registro", "error");
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/teams");
  };

  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          { t("add") }
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
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
          <div className="col-span-12 flex justify-center mt-7">
            <Button type="submit">{t("save")}</Button>
            <Button variant="danger" onClick={onClickCancel}>
              {t("cancel")}
            </Button>
          </div>

        </form>
      </div>
    </SessionLayout>
  );
};
