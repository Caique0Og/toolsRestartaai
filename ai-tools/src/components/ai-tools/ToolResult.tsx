import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { TrendImpactAnalysis } from '@/types/aiToolTypes';

interface ToolResultProps {
    result: TrendImpactAnalysis;
}

export function ToolResult({ result }: ToolResultProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getImpactColor = (impacto: string) => {
        switch (impacto) {
            case 'Positivo':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Negativo':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'Neutro':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            default:
                return 'bg-gap4x-lightBlue text-gap4x-blue border-gap4x-blue/30';
        }
    };

    return (
        <Card className="w-full shadow-lg border-gap4x-teal/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <CardTitle className="text-2xl text-gap4x-dark">Análise de Impacto</CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2 border-gap4x-blue/20 hover:bg-gap4x-lightBlue text-gap4x-blue"
                >
                    {copied ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Copiado!
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            Copiar JSON
                        </>
                    )}
                </Button>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
                {/* Impactos por Indústria */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gap4x-dark flex items-center gap-2">
                        <span className="w-1 h-6 bg-gap4x-teal rounded-full"></span>
                        Impactos por Indústria
                    </h3>
                    <div className="space-y-3">
                        {result.impactos_por_industria.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-base text-gray-900">{item.industria}</h4>
                                    <Badge className={`${getImpactColor(item.impacto)} border`}>
                                        {item.impacto}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline de Adoção */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gap4x-dark flex items-center gap-2">
                        <span className="w-1 h-6 bg-gap4x-blue rounded-full"></span>
                        Timeline de Adoção
                    </h3>
                    <div className="p-5 bg-gap4x-lightBlue border border-gap4x-blue/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-gap4x-blue text-white hover:bg-gap4x-blue/90 px-3 py-1">
                                {result.timeline_adocao.prazo}
                            </Badge>
                        </div>
                        <p className="text-sm text-gap4x-dark leading-relaxed">
                            {result.timeline_adocao.justificativa}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Setores Mais Impactados */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gap4x-dark flex items-center gap-2">
                            <span className="w-1 h-6 bg-gap4x-purple rounded-full"></span>
                            Top 5 Setores Mais Impactados
                        </h3>
                        <div className="flex flex-col gap-2">
                            {result.setores_mais_impactados.map((setor, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <span className="flex items-center justify-center w-6 h-6 bg-gap4x-purple text-white rounded-full text-xs font-bold shadow-sm">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">{setor}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ações Recomendadas */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gap4x-dark flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                            Ações Recomendadas
                        </h3>
                        <ul className="space-y-2">
                            {result.acoes_recomendadas.map((acao, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-lg"
                                >
                                    <span className="flex items-center justify-center w-5 h-5 min-w-[1.25rem] bg-green-600 text-white rounded-full text-[10px] font-bold mt-0.5 shadow-sm">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm text-gray-700 leading-snug">{acao}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
