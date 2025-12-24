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

            if (toolName === 'trend-impact-analysis') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        impactos_por_industria: [
                            { industria: 'Tecnologia', impacto: 'Positivo', descricao: 'Aumento significativo na eficiência de desenvolvimento de software e criação de novos produtos.' },
                            { industria: 'Marketing', impacto: 'Positivo', descricao: 'Hiperpersonalização de campanhas e criação acelerada de conteúdo criativo.' },
                            { industria: 'Atendimento ao Cliente', impacto: 'Neutro', descricao: 'Automação resolve dúvidas simples, mas complexidade ainda exige intervenção humana.' },
                            { industria: 'Jurídico', impacto: 'Neutro', descricao: 'Auxílio na pesquisa, mas a responsabilidade final e julgamento permanecem estritamente humanos.' },
                            { industria: 'Manufatura Tradicional', impacto: 'Negativo', descricao: 'Desafios na integração de sistemas legados podem atrasar a adoção e competitividade.' },
                            { industria: 'Educação Básica', impacto: 'Negativo', descricao: 'Risco de dependência tecnológica excessiva sem o devido desenvolvimento do pensamento crítico.' }
                        ],
                        timeline_adocao: {
                            prazo: 'Curto Prazo (1-2 anos)',
                            justificativa: 'Adoção rápida devido à facilidade de acesso a modelos pré-treinados.'
                        },
                        setores_mais_impactados: ['Software', 'Marketing', 'Atendimento', 'Educação', 'Jurídico'],
                        acoes_recomendadas: [
                            'Investir em governança de dados e ética de IA.',
                            'Capacitar times para trabalhar em colaboração com IA.',
                            'Monitorar regulamentações emergentes.'
                        ]
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 1500, tokensUsed: 120 }
                };
            } else if (toolName === 'legacy-creative') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        titulo_conteudo: "O Poder da Resiliência Criativa",
                        ideia_central: "Transformar desafios em aprendizado contínuo e inspirar outras pessoas a não desistirem de criar.",
                        estrutura_sugerida: [
                            "Introdução: A importância da resiliência no mundo moderno",
                            "Capítulo 1: Como superar bloqueios criativos",
                            "Capítulo 2: Aprender com o erro e seguir em frente",
                            "Capítulo 3: Inspirar outras pessoas através do exemplo",
                            "Conclusão: Criar é resistir — e resistir é um ato criativo"
                        ],
                        recursos_recomendados: [
                            "ChatGPT ou n8n para roteirização de conteúdo",
                            "Canva e Notion para organização"
                        ],
                        estrategia_publicacao: "Publicar em formato de e-book gratuito.",
                        resumo_geral: "Ao transformar o aprendizado da resiliência em conteúdo, você cria um legado de inspiração prática."
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 1800 }
                };
            } else if (toolName === 'intelligence-extension') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        analise_habilidades: "Suas habilidades em empatia, narrativa e estratégia criam um alicerce poderoso.",
                        como_a_ia_pode_ajudar: "A IA pode analisar padrões de comportamento e linguagem em seus projetos.",
                        ideias_aplicaveis: [
                            "Usar IA para analisar o tom emocional de suas mensagens.",
                            "Desenvolver uma rotina semanal de brainstorming com IA.",
                            "Criar um assistente inteligente que simule sua voz."
                        ],
                        visao_de_dominio: "Domínio verdadeiro acontece quando você usa a IA como extensão da sua consciência criativa.",
                        resumo_geral: "Ao unir empatia, narrativa e estratégia com IA, você transforma tecnologia em sensibilidade aplicada."
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 1600 }
                };
            } else if (toolName === 'sustainable-solutions') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        simulacao_S3: "Um aplicativo que conecta restaurantes com ONGs locais.",
                        beneficios_previstos: [
                            "Redução de desperdício de alimentos.",
                            "Diminuição dos custos de descarte."
                        ],
                        impactos_sustentaveis: [
                            "Reduz emissão de CO2.",
                            "Fortalece economia circular local."
                        ],
                        melhorias_S4: "Implementar rastreabilidade via blockchain.",
                        resumo_geral: "A solução proposta une tecnologia e impacto social."
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 1900 }
                };
            } else if (toolName === 'reinvention-manifesto') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        titulo: "Manifesto da Minha Nova Versão",
                        frase_abertura: "Hoje escolho continuar sendo quem sou, mas de um novo jeito.",
                        manifesto: "Quero manter a chama da criatividade acesa, mas agora guiada por propósito.",
                        tom: "inspirador e humano",
                        chamada_acao: "Reinvente-se todos os dias."
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 1400 }
                };
            } else if (toolName === 'professional-map') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    data: {
                        proposito: "Gerar impacto positivo através da tecnologia e inovação.",
                        estrategia: "Posicionar-se como referência em transformação digital sustentável.",
                        acoes: [
                            "Fortalecer presença em eventos.",
                            "Produzir conteúdo autoral."
                        ],
                        foco_curto_prazo: "Consolidar marca pessoal digital.",
                        foco_medio_prazo: "Expandir influência como especialista.",
                        foco_longo_prazo: "Liderar projetos de impacto global.",
                        resumo_geral: "Unir propósito e estratégia ao se posicionar como líder."
                    } as any,
                    metadata: { toolName, model: 'gpt-4-mock', executionTimeMs: 2200 }
                };
            }
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
