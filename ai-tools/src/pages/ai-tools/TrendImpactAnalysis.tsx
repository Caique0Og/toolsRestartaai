import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { ToolResult } from '@/components/ai-tools/ToolResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, TrendingUp } from 'lucide-react';
import type { TrendImpactAnalysis as TrendImpactAnalysisData } from '@/types/aiToolTypes';

const formSchema = z.object({
    tendencia_emergente: z.string().min(3, 'Tendência muito curta (mínimo 3 caracteres)'),
});

type FormData = z.infer<typeof formSchema>;

export default function TrendImpactAnalysis() {
    const { execute, isLoading, result, error, reset } = useAITool<TrendImpactAnalysisData>('trend-impact-analysis');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tendencia_emergente: '',
        },
    });

    const onSubmit = (data: FormData) => {
        reset(); // Limpa resultados anteriores
        execute(data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gap4x-lightBlue via-white to-gap4x-lightBlue p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2 mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp className="h-8 w-8 text-gap4x-blue" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gap4x-blue to-gap4x-teal bg-clip-text text-transparent">
                            Análise de Impacto de Tendências
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Descubra como uma tendência emergente afeta indústrias, setores e estratégias empresariais
                    </p>
                </div>

                {/* Form Card */}
                <Card className="shadow-lg border-gap4x-teal/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gap4x-dark">
                            <Sparkles className="h-5 w-5 text-gap4x-teal" />
                            Qual tendência você quer analisar?
                        </CardTitle>
                        <CardDescription>
                            Digite uma tendência emergente (ex: "IA Generativa", "Trabalho Remoto", "Sustentabilidade")
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tendencia_emergente" className="text-gap4x-dark font-medium">Tendência Emergente *</Label>
                                <Input
                                    id="tendencia_emergente"
                                    placeholder="Ex: IA Generativa"
                                    {...register('tendencia_emergente')}
                                    className="text-lg border-gap4x-teal/30 focus-visible:ring-gap4x-teal"
                                    disabled={isLoading}
                                />
                                {errors.tendencia_emergente && (
                                    <p className="text-sm text-red-600">
                                        {errors.tendencia_emergente.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-gap4x-blue to-gap4x-teal hover:from-gap4x-blue/90 hover:to-gap4x-teal/90 text-lg py-6"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analisando tendência...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Gerar Análise Estratégica
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Loading State */}
                {isLoading && (
                    <Card className="border-gap4x-teal/30 bg-gap4x-lightBlue/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <Loader2 className="h-5 w-5 animate-spin text-gap4x-blue" />
                                <div>
                                    <p className="font-medium text-gap4x-blue">Processando análise...</p>
                                    <p className="text-sm text-gap4x-dark/70">
                                        Nosso modelo de IA está analisando a tendência e gerando insights estratégicos.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Error State */}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            <strong>Erro:</strong> {error.message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Result */}
                {result?.success && result.data && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ToolResult result={result.data} />

                        {/* Metadata */}
                        <Card className="mt-4 border-gray-200 bg-gray-50">
                            <CardContent className="pt-4">
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Modelo:</span> {result.metadata.model}
                                    </div>
                                    <div>
                                        <span className="font-medium">Tempo:</span> {result.metadata.executionTimeMs}ms
                                    </div>
                                    {result.metadata.tokensUsed && (
                                        <div>
                                            <span className="font-medium">Tokens:</span> {result.metadata.tokensUsed}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
