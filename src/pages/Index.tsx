
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Search, BarChart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-secondary-teal" />
            <h1 className="text-xl font-bold text-primary-blue">CompanyData</h1>
          </div>
          <Button 
            onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
            variant="outline"
          >
            {isAuthenticated ? 'Acessar Dashboard' : 'Login'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Informações detalhadas sobre empresas brasileiras
            </h1>
            <p className="text-lg mb-8 text-gray-100">
              Acesse, pesquise e analise dados completos sobre empresas registradas no Brasil, 
              tudo em uma interface simples e intuitiva.
            </p>
            <Button 
              onClick={() => navigate(isAuthenticated ? '/app' : '/login')} 
              className="bg-secondary-teal hover:bg-teal-700 text-white px-6 py-3 text-lg"
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-blue">
            Recursos principais
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-light-bg rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <Search className="h-10 w-10 text-secondary-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pesquisa avançada</h3>
              <p className="text-gray-600">
                Encontre empresas por CNPJ, nome, localidade, porte ou natureza jurídica com autocompletar.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-light-bg rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <Building className="h-10 w-10 text-secondary-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Perfis completos</h3>
              <p className="text-gray-600">
                Visualize dados detalhados incluindo estabelecimentos, sócios e status no Simples Nacional.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-light-bg rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <BarChart className="h-10 w-10 text-secondary-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dashboards analíticos</h3>
              <p className="text-gray-600">
                Obtenha insights com visualizações de dados sobre distribuição de empresas por estado, porte e status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-blue">
            Pronto para explorar os dados?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Acesse agora nosso sistema e descubra informações detalhadas sobre milhões de empresas brasileiras.
          </p>
          <Button 
            onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
            className="bg-secondary-teal hover:bg-teal-700 text-white px-6 py-3 text-lg"
          >
            {isAuthenticated ? 'Ir para o Dashboard' : 'Criar conta gratuita'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-blue text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Building className="h-5 w-5 text-secondary-teal" />
              <span className="font-semibold">CompanyData</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CompanyData. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
