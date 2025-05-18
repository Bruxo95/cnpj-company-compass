
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart, Building, Filter, Search } from 'lucide-react';
import { mockDashboardData, mockRecentCompanies } from '@/utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/app/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-primary-blue">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Buscar por CNPJ ou nome"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Buscar</Button>
          </form>
          <Button 
            variant="outline" 
            className="sm:ml-2 flex items-center gap-1"
            onClick={() => navigate('/app/search')}
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building className="h-4 w-4 text-secondary-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,284,731</div>
            <p className="text-xs text-gray-500">+2.5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativas</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,891,443</div>
            <p className="text-xs text-gray-500">73.6% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MEI</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,149,573</div>
            <p className="text-xs text-gray-500">+5.2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simples Nacional</CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,734,028</div>
            <p className="text-xs text-gray-500">32.8% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Distribution by State */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribuição por Estado</CardTitle>
            <CardDescription>Top 5 estados com mais empresas registradas</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {mockDashboardData.stateDistribution.map((item) => (
                <div key={item.state} className="flex items-center">
                  <div className="w-12 text-xs font-medium">{item.state}</div>
                  <div className="flex-1 mx-2">
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-secondary-teal" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs font-medium">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution by Company Size */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribuição por Porte</CardTitle>
            <CardDescription>Empresas por classificação de porte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-around gap-2">
              {mockDashboardData.sizeDistribution.map((item) => (
                <div key={item.size} className="flex flex-col items-center gap-1">
                  <div 
                    className="bg-secondary-teal rounded-t w-14 md:w-16"
                    style={{ height: `${item.percentage * 1.5}px` }}
                  ></div>
                  <div className="text-xs font-medium text-center leading-tight">
                    {item.size}
                  </div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Searches */}
      <Card>
        <CardHeader>
          <CardTitle>Empresas consultadas recentemente</CardTitle>
          <CardDescription>
            Últimas empresas que você visualizou em detalhes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CNPJ</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Razão Social</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Porte</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">UF</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {mockRecentCompanies.map((company) => (
                  <tr key={company.cnpj} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">
                      {company.cnpj}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {company.name}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {company.size}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {company.state}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/app/company/${company.cnpj.replace(/[^\d]/g, '')}`)}
                      >
                        Ver detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/search')}
          >
            Ver todas as empresas
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
