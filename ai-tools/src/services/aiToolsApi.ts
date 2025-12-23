import { BACKEND_API_CONFIG } from '@/config/api';
import type {
    ToolExecutionRequest,
    ToolExecutionResponse,
    ToolInfo,
} from '@/types/aiToolTypes';

/**
 * Service para comunicação com a API de AI Tools
 */
class AiToolsApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BACKEND_API_CONFIG.baseUrl}/api/ai-tools`;
    }

    /**
     * Executa uma AI Tool
     */
    async executeTool<T = any>(
        toolName: string,
        inputs: Record<string, any>,
    ): Promise<ToolExecutionResponse<T>> {
        // MOCK for standalone environment if no backend
        if (import.meta.env.DEV) {
            console.log('Mocking tool execution for:', toolName, inputs);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return {
                success: true,
                data: {
                    impactos_por_industria: [
                        { industria: 'Tecnologia', impacto: 'Positivo', descricao: 'Aumento de produtividade e inovação.' },
                        { industria: 'Educação', impacto: 'Neutro', descricao: 'Necessidade de adaptação curricular.' },
                        { industria: 'Manufatura', impacto: 'Positivo', descricao: 'Otimização de processos.' }
                    ],
                    timeline_adocao: {
                        prazo: 'Curto Prazo (1-2 anos)',
                        justificativa: 'Adoção rápida devido à facilidade de acesso.'
                    },
                    setores_mais_impactados: ['Software', 'Marketing', 'Atendimento ao Cliente', 'Design'],
                    acoes_recomendadas: [
                        'Investir em capacitação da equipe.',
                        'Explorar ferramentas de automação.',
                        'Revisar processos de segurança de dados.'
                    ]
                } as any,
                metadata: {
                    toolName,
                    model: 'gpt-4-mock',
                    executionTimeMs: 1500,
                    tokensUsed: 120
                }
            };
        }


        const response = await fetch(`${this.baseUrl}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                toolName,
                inputs,
            } as ToolExecutionRequest),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao executar tool');
        }

        return response.json();
    }

    /**
     * Lista todas as tools disponíveis
     */
    async listTools(): Promise<ToolInfo[]> {
        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error('Erro ao listar tools');
        }

        return response.json();
    }

    /**
     * Obtém detalhes de uma tool específica
     */
    async getToolDetails(toolName: string): Promise<ToolInfo> {
        const response = await fetch(`${this.baseUrl}/${toolName}`);

        if (!response.ok) {
            throw new Error('Tool não encontrada');
        }

        return response.json();
    }
}

export const aiToolsApi = new AiToolsApiService();
