
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Building, ChevronLeft, Download, MapPin, Users, Info, BarChart } from 'lucide-react';
import { formatCNPJ, mockCompanyDetail } from '@/utils/mockData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CompanyDetail = () => {
  const { cnpj = '' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Fetch company data - in a real app this would call your API
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use mock data for demo
        if (mockCompanyDetail[cnpj]) {
          setCompanyData(mockCompanyDetail[cnpj]);
        } else {
          toast({
            variant: "destructive",
            title: "Empresa não encontrada",
            description: "Não foi possível encontrar dados para o CNPJ informado."
          });
          navigate('/app/search');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro ao buscar os dados da empresa."
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (cnpj) {
      fetchCompanyData();
    }
  }, [cnpj, navigate, toast]);

  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    
    setIsExporting(true);
    toast({
      title: "Exportação iniciada",
      description: "Preparando o PDF, aguarde um momento...",
    });

    try {
      // Create a temporary div with only the content we want to export
      const exportContainer = document.createElement('div');
      exportContainer.style.width = '800px';
      exportContainer.style.padding = '20px';
      exportContainer.style.backgroundColor = 'white';
      
      // Clone the content
      const contentClone = contentRef.current.cloneNode(true) as HTMLElement;
      
      // Remove any buttons or interactive elements we don't want in the PDF
      const buttonsToRemove = contentClone.querySelectorAll('button');
      buttonsToRemove.forEach(button => button.remove());
      
      exportContainer.appendChild(contentClone);
      
      // Temporarily add to document for rendering but make it invisible
      exportContainer.style.position = 'absolute';
      exportContainer.style.left = '-9999px';
      document.body.appendChild(exportContainer);
      
      // Generate PDF
      const canvas = await html2canvas(exportContainer, {
        scale: 1,
        useCORS: true,
        logging: false
      });
      
      // Remove the temporary element
      document.body.removeChild(exportContainer);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`empresa_${companyData.cnpj}.pdf`);
      
      toast({
        title: "PDF gerado com sucesso",
        description: "O download foi iniciado automaticamente.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!companyData) {
    return null;
  }

  return (
    <div ref={contentRef}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Button 
            variant="ghost" 
            className="mb-2 -ml-4 text-sm flex items-center gap-1"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-primary-blue">{companyData.name}</h1>
          <p className="text-gray-500 font-mono">{formatCNPJ(companyData.cnpj)}</p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Exportando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Exportar PDF
            </>
          )}
        </Button>
      </div>

      {/* Status Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-6 justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${
                companyData.status === 'Ativa' ? 'bg-green-500' :
                companyData.status === 'Suspensa' ? 'bg-yellow-500' :
                companyData.status === 'Inapta' ? 'bg-red-500' :
                'bg-gray-500'
              }`}></div>
              <span className="font-medium">{companyData.status}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span>Porte: <span className="font-medium">{companyData.size}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-500" />
              <span>Natureza: <span className="font-medium">{companyData.legalNature}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Sede: <span className="font-medium">{companyData.headquarters.city} - {companyData.headquarters.state}</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4 text-gray-500" />
              <span>Capital: <span className="font-medium">R$ {companyData.capital.toLocaleString('pt-BR')}</span></span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="establishments">Estabelecimentos</TabsTrigger>
          <TabsTrigger value="partners">Sócios</TabsTrigger>
          <TabsTrigger value="simples">Simples Nacional</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Dados cadastrais da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">CNPJ</h3>
                    <p className="font-mono">{formatCNPJ(companyData.cnpj)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Razão Social</h3>
                    <p>{companyData.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nome Fantasia</h3>
                    <p>{companyData.tradeName || '-'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Natureza Jurídica</h3>
                    <p>{companyData.legalNature}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Capital Social</h3>
                    <p>R$ {companyData.capital.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data de Abertura</h3>
                    <p>{companyData.openingDate}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Situação Cadastral</h3>
                    <p>{companyData.status}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Porte da Empresa</h3>
                    <p>{companyData.size}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Atividade Principal</h3>
                    <p>{companyData.mainActivity.code} - {companyData.mainActivity.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Atividades Secundárias</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {companyData.secondaryActivities.map((activity: any, index: number) => (
                    <li key={index} className="text-sm">
                      {activity.code} - {activity.description}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Establishments Tab */}
        <TabsContent value="establishments">
          <Card>
            <CardHeader>
              <CardTitle>Estabelecimentos</CardTitle>
              <CardDescription>Matriz e filiais da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {companyData.establishments.map((establishment: any, index: number) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-secondary-teal" />
                        <h3 className="font-medium">{establishment.type}</h3>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        establishment.status === 'Ativa' ? 'bg-green-100 text-green-800' :
                        establishment.status === 'Fechada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {establishment.status}
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">CNPJ</p>
                          <p className="font-mono">{formatCNPJ(establishment.cnpj)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Data de Abertura</p>
                          <p>{establishment.openingDate}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Endereço</p>
                          <p>{establishment.address}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">CEP</p>
                          <p>{establishment.zipCode}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Cidade/UF</p>
                          <p>{establishment.city} - {establishment.state}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Quadro Societário</CardTitle>
              <CardDescription>Sócios e administradores da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {companyData.partners.map((partner: any, index: number) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-secondary-teal" />
                        <h3 className="font-medium">{partner.name}</h3>
                      </div>
                      <div className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {partner.qualification}
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">CPF/CNPJ</p>
                          <p className="font-mono">{partner.document}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Participação no Capital</p>
                          <p>{partner.capitalShare}%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Data de Entrada</p>
                          <p>{partner.entryDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">País de Origem</p>
                          <p>{partner.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simples Nacional Tab */}
        <TabsContent value="simples">
          <Card>
            <CardHeader>
              <CardTitle>Simples Nacional</CardTitle>
              <CardDescription>Informações sobre regime tributário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6">
                {companyData.simplesNacional.optante ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg">Status: Optante pelo Simples Nacional</h3>
                        <p className="text-green-600 text-sm">Empresa enquadrada no regime do Simples Nacional</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Data de Opção</p>
                        <p>{companyData.simplesNacional.optionDate}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Data de Efeito</p>
                        <p>{companyData.simplesNacional.effectDate}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Enquadramento MEI</p>
                        <p>
                          {companyData.simplesNacional.mei ? (
                            <span className="text-blue-600 font-medium">Sim - Microempreendedor Individual</span>
                          ) : (
                            <span>Não</span>
                          )}
                        </p>
                      </div>
                      
                      {companyData.simplesNacional.mei && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Data de Enquadramento MEI</p>
                          <p>{companyData.simplesNacional.meiDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">Status: Não Optante pelo Simples Nacional</h3>
                      <p className="text-gray-600 text-sm">Empresa não enquadrada no regime do Simples Nacional</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDetail;
