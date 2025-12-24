/**
 * Tipos compartilhados para AI Tools
 */

export interface ToolExecutionRequest {
    toolName: string;
    inputs: Record<string, any>;
    model?: string;
}

export interface ToolExecutionResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    metadata: {
        toolName: string;
        model: string;
        executionTimeMs: number;
        tokensUsed?: number;
    };
}

export interface TrendImpactAnalysis {
    impactos_por_industria: Array<{
        industria: string;
        impacto: 'Positivo' | 'Negativo' | 'Neutro';
        descricao: string;
    }>;
    timeline_adocao: {
        prazo: string;
        justificativa: string;
    };
    setores_mais_impactados: string[];
    acoes_recomendadas: string[];
}

export interface LegacyCreativeAnalysis {
    titulo_conteudo: string;
    ideia_central: string;
    estrutura_sugerida: string[];
    recursos_recomendados: string[];
    estrategia_publicacao: string;
    resumo_geral: string;
}

export interface IntelligenceExtensionAnalysis {
    analise_habilidades: string;
    potencial_ia: string;
    ideias_aplicaveis: string[];
    visao_de_dominio: string;
    resumo_geral: string;
}

export interface SustainableSolutionsAnalysis {
    simulacao_S3: string;
    beneficios_previstos: string[];
    impactos_sustentaveis: string[];
    melhorias_S4: string;
    resumo_geral: string;
}

export interface ReinventionManifestoAnalysis {
    titulo: string;
    frase_abertura: string;
    manifesto: string;
    tom: string;
    chamada_acao: string;
}

export interface ProfessionalMapAnalysis {
    proposito: string;
    estrategia: string;
    acoes: string[];
    prazos: Array<{
        prazo: string;
        foco: string;
    }>;
    resumo_geral: string;
}

export interface ToolInfo {
    name: string;
    displayName: string;
    description: string;
    model: string;
}
