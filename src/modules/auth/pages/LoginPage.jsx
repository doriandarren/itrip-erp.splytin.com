import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImgLogo from "../../../assets/images/logo.svg";
import EyeOff from '../../../assets/images/eye_off.svg';
import EyeOn from '../../../assets/images/eye_on.svg';
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Buttons/Button";
import { startLoginWithEmailPassword } from "../../../store/auth/thunks";
import { Toast } from "../../../helpers/helperToast";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status, errorMessage } = useSelector( state => state.auth );

  
  useEffect(() => {
    if (errorMessage) {
      Toast(`Error: ${errorMessage}` , 'error');
    }
  }, [errorMessage]);

  const onSubmit = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Los campos son requeridos");
      return;
    }

    try {
      dispatch(startLoginWithEmailPassword({ email, password }));  
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container bg-primary">
      <div className="block xl:grid grid-cols-2 gap-4">
        <div className="hidden xl:flex flex-col min-h-screen pl-24 animate__animated animate__bounceInLeft form-section">
          <div className="my-auto p-10">
            <img
              alt="GlobalFleet - Office"
              src={ImgLogo}
            />
            <div className="-intro-x font-light text-4xl leading-tight mt-10 text-white">
              The driver’s fellow
            </div>
            <div
              className="-intro-x font-light text-2xl leading-tight text-white"
            >
              ERP Edition
            </div>
          </div>
        </div>
      
        <div className="h-screen xl:h-auto flex xl:py-0 my-10 xl:my-0 bg-white ">
          <div className="my-auto mx-auto xl:ml-20 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto animate__animated animate__bounceInRight">

            <form 
              onSubmit={onSubmit}
            >
              <h2 className="intro-x text-primary text-2xl xl:text-3xl text-center xl:text-left">
                {t("login_page.title")}
              </h2>
              <div className="intro-x mt-8">
                <input
                  type="email"
                  className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline mb-3"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                  <input
                    className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <img
                        className="w-6 h-6"
                        src={showPassword ?  EyeOff : EyeOn }
                        alt="Show/Hide password"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="intro-x flex text-slate-600 text-xs sm:text-sm mt-4">
                <div className="flex items-center mr-auto">
                  <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                  <label className="cursor-pointer select-none" htmlFor="remember-me">
                    {t("login_page.remember")}
                  </label>
                </div>
                <a href="/reset">{t("login_page.forgot")}</a>
              </div>


              <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <Button
                  type="submit"
                  disabled={status!=='not-authenticated'}
                  className="w-32 h-12 flex items-center justify-center"
                >
                  {status === 'checking' ? <><PreloaderButton /></> : t("login_page.btn_login")}
                </Button>
              </div>
              
            </form>

            <div className="intro-x mt-10 xl:mt-24 text-slate-600 text-center xl:text-left">
            {t("login_page.terms_txt1")}
              <a className="text-primary" href="#"> {t("login_page.terms_txt2")}</a> {t("login_page.terms_txt3")}
              <a className="text-primary" href="#"> {t("login_page.terms_txt1")}</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
