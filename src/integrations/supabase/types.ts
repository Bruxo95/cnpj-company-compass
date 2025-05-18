export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cnaes: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      empresas: {
        Row: {
          capital_social_da_empresa: number | null
          cnpj_basico: string
          ente_federativo_responsavel: string | null
          natureza_juridica: string | null
          porte_da_empresa: string | null
          qualificacao_do_profissional: string | null
          razao_social_nome_empresarial: string | null
        }
        Insert: {
          capital_social_da_empresa?: number | null
          cnpj_basico: string
          ente_federativo_responsavel?: string | null
          natureza_juridica?: string | null
          porte_da_empresa?: string | null
          qualificacao_do_profissional?: string | null
          razao_social_nome_empresarial?: string | null
        }
        Update: {
          capital_social_da_empresa?: number | null
          cnpj_basico?: string
          ente_federativo_responsavel?: string | null
          natureza_juridica?: string | null
          porte_da_empresa?: string | null
          qualificacao_do_profissional?: string | null
          razao_social_nome_empresarial?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_natureza_juridica_fkey"
            columns: ["natureza_juridica"]
            isOneToOne: false
            referencedRelation: "natureza_juridica"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "empresas_porte_da_empresa_fkey"
            columns: ["porte_da_empresa"]
            isOneToOne: false
            referencedRelation: "porte_empresa"
            referencedColumns: ["cod"]
          },
        ]
      }
      estabelecimentos: {
        Row: {
          bairro: string | null
          cep: string | null
          cnae_fiscal_principal: string | null
          cnae_fiscal_secundaria: string | null
          cnpj_basico: string
          cnpj_dv: string
          cnpj_ordem: string
          complemento: string | null
          correio_eletronico: string | null
          data_de_inicio_atividade: string | null
          data_situacao_cadastral: string | null
          data_situacao_especial: string | null
          ddd_fax: string | null
          ddd1: string | null
          ddd2: string | null
          fax: string | null
          identificador_matriz_filial: string | null
          logradouro: string | null
          motivo_situacao_cadastral: string | null
          municipio: string | null
          nome_da_cidade_no_exterior: string | null
          nome_fantasia: string | null
          numero: string | null
          pais: string | null
          situacao_cadastral: string | null
          situacao_especial: string | null
          telefone1: string | null
          telefone2: string | null
          tipo_logradouro: string | null
          uf: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cnae_fiscal_principal?: string | null
          cnae_fiscal_secundaria?: string | null
          cnpj_basico: string
          cnpj_dv: string
          cnpj_ordem: string
          complemento?: string | null
          correio_eletronico?: string | null
          data_de_inicio_atividade?: string | null
          data_situacao_cadastral?: string | null
          data_situacao_especial?: string | null
          ddd_fax?: string | null
          ddd1?: string | null
          ddd2?: string | null
          fax?: string | null
          identificador_matriz_filial?: string | null
          logradouro?: string | null
          motivo_situacao_cadastral?: string | null
          municipio?: string | null
          nome_da_cidade_no_exterior?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          pais?: string | null
          situacao_cadastral?: string | null
          situacao_especial?: string | null
          telefone1?: string | null
          telefone2?: string | null
          tipo_logradouro?: string | null
          uf?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cnae_fiscal_principal?: string | null
          cnae_fiscal_secundaria?: string | null
          cnpj_basico?: string
          cnpj_dv?: string
          cnpj_ordem?: string
          complemento?: string | null
          correio_eletronico?: string | null
          data_de_inicio_atividade?: string | null
          data_situacao_cadastral?: string | null
          data_situacao_especial?: string | null
          ddd_fax?: string | null
          ddd1?: string | null
          ddd2?: string | null
          fax?: string | null
          identificador_matriz_filial?: string | null
          logradouro?: string | null
          motivo_situacao_cadastral?: string | null
          municipio?: string | null
          nome_da_cidade_no_exterior?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          pais?: string | null
          situacao_cadastral?: string | null
          situacao_especial?: string | null
          telefone1?: string | null
          telefone2?: string | null
          tipo_logradouro?: string | null
          uf?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estabelecimentos_cnae_fiscal_principal_fkey"
            columns: ["cnae_fiscal_principal"]
            isOneToOne: false
            referencedRelation: "cnaes"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "estabelecimentos_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "estabelecimentos_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: false
            referencedRelation: "vw_empresas_completo"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "estabelecimentos_identificador_matriz_filial_fkey"
            columns: ["identificador_matriz_filial"]
            isOneToOne: false
            referencedRelation: "matriz_filial"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "estabelecimentos_motivo_situacao_cadastral_fkey"
            columns: ["motivo_situacao_cadastral"]
            isOneToOne: false
            referencedRelation: "motivos"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "estabelecimentos_municipio_fkey"
            columns: ["municipio"]
            isOneToOne: false
            referencedRelation: "municipios"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "estabelecimentos_pais_fkey"
            columns: ["pais"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "estabelecimentos_situacao_cadastral_fkey"
            columns: ["situacao_cadastral"]
            isOneToOne: false
            referencedRelation: "situacao_cadastral"
            referencedColumns: ["cod"]
          },
        ]
      }
      faixa_etaria_socio: {
        Row: {
          cod: string
          faixa_etaria: string | null
        }
        Insert: {
          cod: string
          faixa_etaria?: string | null
        }
        Update: {
          cod?: string
          faixa_etaria?: string | null
        }
        Relationships: []
      }
      identificador_socio: {
        Row: {
          cod: string
          identificador: string | null
        }
        Insert: {
          cod: string
          identificador?: string | null
        }
        Update: {
          cod?: string
          identificador?: string | null
        }
        Relationships: []
      }
      matriz_filial: {
        Row: {
          cod: string
          identificador: string | null
        }
        Insert: {
          cod: string
          identificador?: string | null
        }
        Update: {
          cod?: string
          identificador?: string | null
        }
        Relationships: []
      }
      motivos: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      municipios: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      natureza_juridica: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      opcao_simples_mei: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      paises: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      porte_empresa: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      qualificacao_socios: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      simples: {
        Row: {
          cnpj_basico: string
          data_de_exclusao_do_mei: string | null
          data_de_exclusao_do_simples: string | null
          data_de_opcao_pelo_mei: string | null
          data_de_opcao_pelo_simples: string | null
          opcao_pelo_mei: string | null
          opcao_pelo_simples: string | null
        }
        Insert: {
          cnpj_basico: string
          data_de_exclusao_do_mei?: string | null
          data_de_exclusao_do_simples?: string | null
          data_de_opcao_pelo_mei?: string | null
          data_de_opcao_pelo_simples?: string | null
          opcao_pelo_mei?: string | null
          opcao_pelo_simples?: string | null
        }
        Update: {
          cnpj_basico?: string
          data_de_exclusao_do_mei?: string | null
          data_de_exclusao_do_simples?: string | null
          data_de_opcao_pelo_mei?: string | null
          data_de_opcao_pelo_simples?: string | null
          opcao_pelo_mei?: string | null
          opcao_pelo_simples?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simples_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "simples_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: true
            referencedRelation: "vw_empresas_completo"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "simples_opcao_pelo_mei_fkey"
            columns: ["opcao_pelo_mei"]
            isOneToOne: false
            referencedRelation: "opcao_simples_mei"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "simples_opcao_pelo_simples_fkey"
            columns: ["opcao_pelo_simples"]
            isOneToOne: false
            referencedRelation: "opcao_simples_mei"
            referencedColumns: ["cod"]
          },
        ]
      }
      situacao_cadastral: {
        Row: {
          cod: string
          descricao: string | null
        }
        Insert: {
          cod: string
          descricao?: string | null
        }
        Update: {
          cod?: string
          descricao?: string | null
        }
        Relationships: []
      }
      socios: {
        Row: {
          cnpj_basico: string
          cnpj_cpf_socio: string
          data_de_entrada_sociedade: string | null
          faixa_etaria: string | null
          identificador_de_socio: string | null
          nome_do_representante: string | null
          nome_do_socio: string | null
          pais: string | null
          qualificacao_do_representante_legal: string | null
          qualificacao_do_socio: string | null
          representante_legal: string | null
        }
        Insert: {
          cnpj_basico: string
          cnpj_cpf_socio: string
          data_de_entrada_sociedade?: string | null
          faixa_etaria?: string | null
          identificador_de_socio?: string | null
          nome_do_representante?: string | null
          nome_do_socio?: string | null
          pais?: string | null
          qualificacao_do_representante_legal?: string | null
          qualificacao_do_socio?: string | null
          representante_legal?: string | null
        }
        Update: {
          cnpj_basico?: string
          cnpj_cpf_socio?: string
          data_de_entrada_sociedade?: string | null
          faixa_etaria?: string | null
          identificador_de_socio?: string | null
          nome_do_representante?: string | null
          nome_do_socio?: string | null
          pais?: string | null
          qualificacao_do_representante_legal?: string | null
          qualificacao_do_socio?: string | null
          representante_legal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "socios_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "socios_cnpj_basico_fkey"
            columns: ["cnpj_basico"]
            isOneToOne: false
            referencedRelation: "vw_empresas_completo"
            referencedColumns: ["cnpj_basico"]
          },
          {
            foreignKeyName: "socios_faixa_etaria_fkey"
            columns: ["faixa_etaria"]
            isOneToOne: false
            referencedRelation: "faixa_etaria_socio"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "socios_identificador_de_socio_fkey"
            columns: ["identificador_de_socio"]
            isOneToOne: false
            referencedRelation: "identificador_socio"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "socios_pais_fkey"
            columns: ["pais"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "socios_qualificacao_do_representante_legal_fkey"
            columns: ["qualificacao_do_representante_legal"]
            isOneToOne: false
            referencedRelation: "qualificacao_socios"
            referencedColumns: ["cod"]
          },
          {
            foreignKeyName: "socios_qualificacao_do_socio_fkey"
            columns: ["qualificacao_do_socio"]
            isOneToOne: false
            referencedRelation: "qualificacao_socios"
            referencedColumns: ["cod"]
          },
        ]
      }
    }
    Views: {
      vw_empresas_completo: {
        Row: {
          bairro: string | null
          capital_social_da_empresa: number | null
          cep: string | null
          cnae_principal_descricao: string | null
          cnpj_basico: string | null
          cnpj_completo: string | null
          cnpj_dv: string | null
          cnpj_ordem: string | null
          complemento: string | null
          correio_eletronico: string | null
          data_de_inicio_atividade: string | null
          data_situacao_cadastral: string | null
          ddd1: string | null
          ente_federativo_responsavel: string | null
          logradouro: string | null
          motivo_situacao_cadastral_descricao: string | null
          municipio_descricao: string | null
          natureza_juridica_descricao: string | null
          nome_fantasia: string | null
          numero: string | null
          porte_empresa_descricao: string | null
          qualificacao_do_profissional: string | null
          razao_social_nome_empresarial: string | null
          situacao_cadastral_descricao: string | null
          telefone1: string | null
          tipo_estabelecimento: string | null
          tipo_logradouro: string | null
          uf: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      search_by_cnpj: {
        Args: { search_term: string }
        Returns: {
          cnpj_completo: string
          razao_social: string
          nome_fantasia: string
          situacao_cadastral: string
          uf: string
          municipio: string
        }[]
      }
      search_by_name: {
        Args: { search_term: string }
        Returns: {
          cnpj_completo: string
          razao_social: string
          nome_fantasia: string
          situacao_cadastral: string
          uf: string
          municipio: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
