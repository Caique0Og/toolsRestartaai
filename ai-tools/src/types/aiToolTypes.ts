/**
 * Tipos compartilhados para AI Tools
 */

export interface ToolExecutionRequest {
    toolName: string;
    inputs: Record<string, any>;
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

export interface ToolInfo {
    name: string;
    displayName: string;
    description: string;
    model: string;
}
