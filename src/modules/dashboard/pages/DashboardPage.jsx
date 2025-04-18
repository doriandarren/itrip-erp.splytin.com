import { useTranslation } from "react-i18next";
import { SessionLayout } from "../../../layouts/private/SessionLayout";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const DashboardPage = () => {
  
  const { t } = useTranslation();

  return (
    <SessionLayout>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          { t("dashboard") }
        </h2>
      </div>

      {/* Contenedor de las 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between mt-5 mr-5 bg-gradient-to-b from-gray-300/10 transition-ransform duration-300 hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Total Ventas</h3>
            <small className="text-gray-500">{t("yesterday")}</small>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">$12.500</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between mt-5 mr-5 bg-gradient-to-b from-gray-300/10 transition-ransform duration-300 hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Clientes Nuevos</h3>
            <small className="text-gray-500">{t("yesterday")}</small>
          </div>
          <div>
            <p className="text-3xl font-bold text-success">320</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between mt-5 mr-5 bg-gradient-to-b from-gray-300/10 transition-ransform duration-300 hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Pedidos Totales</h3>
            <small className="text-gray-500">{t("yesterday")}</small>
          </div>
          <div>
            <p className="text-3xl font-bold text-info">870</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SessionLayout>
  );
};
