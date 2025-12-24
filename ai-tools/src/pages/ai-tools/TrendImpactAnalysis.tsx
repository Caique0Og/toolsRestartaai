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
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-restarta-card rounded-xl border border-restarta-border shadow-lg shadow-restarta-teal/10">
                        <TrendingUp className="h-8 w-8 text-restarta-teal" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Análise de <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-teal to-restarta-purple">Impacto de Tendências</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Descubra como uma tendência emergente afeta indústrias, setores e estratégias empresariais na era da inteligência artificial.
                </p>
            </div>

            {/* Form Card */}
            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-teal via-restarta-purple to-restarta-gold opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <Sparkles className="h-5 w-5 text-restarta-gold" />
                        Qual tendência você quer analisar?
                    </CardTitle>
                    <CardDescription className="text-restarta-muted">
                        Digite uma tendência emergente para gerar insights estratégicos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="tendencia_emergente" className="text-restarta-text font-medium">Tendência Emergente</Label>
                            <Input
                                id="tendencia_emergente"
                                placeholder="Ex: IA Generativa, Trabalho Híbrido, ESG..."
                                {...register('tendencia_emergente')}
                                className="text-lg bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-14"
                                disabled={isLoading}
                            />
                            {errors.tendencia_emergente && (
                                <p className="text-sm text-red-400">
                                    {errors.tendencia_emergente.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-teal to-restarta-purple hover:from-restarta-teal/90 hover:to-restarta-purple/90 text-white font-bold text-lg py-8 shadow-lg shadow-restarta-teal/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                    Analisando tendência...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-6 w-6" />
                                    Gerar Análise Estratégica
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Result */}
            {result?.success && result.data && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <ToolResult result={result.data} />

                    {/* Metadata */}
                    <div className="mt-6 flex items-center justify-center gap-4 text-xs text-restarta-muted font-mono opacity-60">
                        <span>MODELO: {result.metadata.model}</span>
                        <span>•</span>
                        <span>TEMPO: {result.metadata.executionTimeMs}ms</span>
                    </div>
                </div>
            )}
        </div>
    );
}
