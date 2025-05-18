
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Download, Filter, Search, X } from 'lucide-react';
import { mockCompanyData } from '@/utils/mockData';

// Types
interface FilterOptions {
  size: string[];
  status: string[];
  state: string;
  legalNature: string;
}

interface CompanyData {
  cnpj: string;
  name: string;
  tradeName: string;
  status: string;
  size: string;
  legalNature: string;
  state: string;
}

const CompanySearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    size: [],
    status: [],
    state: '',
    legalNature: '',
  });

  // Get search query from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = (query: string) => {
    setIsLoading(true);
    
    // Mock search - in a real app this would call your API
    setTimeout(() => {
      // Filter mock data based on the search query
      const results = mockCompanyData.filter(company => 
        company.cnpj.includes(query) || 
        company.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (results.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar os termos da pesquisa ou filtros.",
        });
      } else {
        toast({
          title: `${results.length} empresas encontradas`,
          description: "Resultados disponíveis abaixo.",
        });
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search query
      const queryParams = new URLSearchParams();
      queryParams.set('query', searchQuery);
      navigate(`/app/search?${queryParams.toString()}`);
      
      performSearch(searchQuery);
    }
  };

  const handleFilterChange = (category: keyof FilterOptions, value: string) => {
    if (category === 'state' || category === 'legalNature') {
      setFilters(prev => ({ ...prev, [category]: value }));
    } else {
      setFilters(prev => {
        const existing = prev[category as 'size' | 'status'];
        if (existing.includes(value)) {
          return { 
            ...prev, 
            [category]: existing.filter(item => item !== value) 
          };
        } else {
          return { 
            ...prev, 
            [category]: [...existing, value] 
          };
        }
      });
    }
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    // Mock filter application
    setTimeout(() => {
      let filteredResults = [...mockCompanyData];
      
      // Apply text search if there's a query
      if (searchQuery.trim()) {
        filteredResults = filteredResults.filter(company => 
          company.cnpj.includes(searchQuery) || 
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters.size.length > 0) {
        filteredResults = filteredResults.filter(company => 
          filters.size.includes(company.size)
        );
      }
      
      if (filters.status.length > 0) {
        filteredResults = filteredResults.filter(company => 
          filters.status.includes(company.status)
        );
      }
      
      if (filters.state) {
        filteredResults = filteredResults.filter(company => 
          company.state === filters.state
        );
      }
      
      if (filters.legalNature) {
        filteredResults = filteredResults.filter(company => 
          company.legalNature === filters.legalNature
        );
      }
      
      setSearchResults(filteredResults);
      setIsLoading(false);
      
      toast({
        title: `${filteredResults.length} empresas encontradas`,
        description: "Filtros aplicados com sucesso.",
      });
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      size: [],
      status: [],
      state: '',
      legalNature: '',
    });
    
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  };

  const exportToCsv = () => {
    toast({
      title: "Exportação iniciada",
      description: "O download do arquivo CSV começará em instantes.",
    });
    // In a real app, this would generate and download a CSV file
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-blue">Pesquisar Empresas</h1>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          {isFiltersVisible ? (
            <>
              <X className="h-4 w-4" />
              Esconder Filtros
            </>
          ) : (
            <>
              <Filter className="h-4 w-4" />
              Exibir Filtros
            </>
          )}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buscar empresas</CardTitle>
          <CardDescription>
            Digite um CNPJ completo ou parcial, ou o nome da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="CNPJ ou Nome da Empresa"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-secondary-teal hover:bg-teal-700"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Buscando...
                  </span>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      {isFiltersVisible && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros avançados</CardTitle>
            <CardDescription>
              Refine sua busca utilizando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Company Size Filter */}
              <div>
                <Label className="mb-2 block">Porte</Label>
                <div className="space-y-2">
                  {['MEI', 'Pequeno', 'Médio', 'Grande'].map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <Checkbox 
                        id={`size-${size}`}
                        checked={filters.size.includes(size)}
                        onCheckedChange={() => handleFilterChange('size', size)}
                      />
                      <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Label className="mb-2 block">Status</Label>
                <div className="space-y-2">
                  {['Ativa', 'Suspensa', 'Inapta', 'Baixada'].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <Checkbox 
                        id={`status-${status}`}
                        checked={filters.status.includes(status)}
                        onCheckedChange={() => handleFilterChange('status', status)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Filter */}
              <div>
                <Label htmlFor="state" className="mb-2 block">Estado</Label>
                <Select
                  value={filters.state}
                  onValueChange={(value) => handleFilterChange('state', value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os estados</SelectItem>
                    {['SP', 'RJ', 'MG', 'RS', 'PR', 'BA', 'SC', 'GO', 'DF'].map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Legal Nature Filter */}
              <div>
                <Label htmlFor="legal-nature" className="mb-2 block">Natureza Jurídica</Label>
                <Select
                  value={filters.legalNature}
                  onValueChange={(value) => handleFilterChange('legalNature', value)}
                >
                  <SelectTrigger id="legal-nature">
                    <SelectValue placeholder="Selecione uma natureza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {['EI', 'LTDA', 'SA', 'EIRELI', 'ME'].map((nature) => (
                      <SelectItem key={nature} value={nature}>{nature}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetFilters}
            >
              Limpar Filtros
            </Button>
            <Button 
              onClick={applyFilters}
              disabled={isLoading}
            >
              Aplicar Filtros
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Resultados da pesquisa</CardTitle>
              <CardDescription>
                {searchResults.length} {searchResults.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}
              </CardDescription>
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-1"
              onClick={exportToCsv}
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CNPJ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Razão Social</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nome Fantasia</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">UF</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((company) => (
                    <tr key={company.cnpj} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-mono">
                        {company.cnpj}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium">
                        {company.name}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {company.tradeName || '-'}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          company.status === 'Ativa' ? 'bg-green-100 text-green-800' :
                          company.status === 'Suspensa' ? 'bg-yellow-100 text-yellow-800' :
                          company.status === 'Inapta' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {company.status}
                        </span>
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
        </Card>
      )}
    </div>
  );
};

export default CompanySearch;
