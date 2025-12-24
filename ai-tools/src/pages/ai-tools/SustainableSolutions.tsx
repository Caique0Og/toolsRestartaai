import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Leaf, Recycle, Zap } from 'lucide-react';
import type { SustainableSolutionsAnalysis } from '@/types/aiToolTypes';

const formSchema = z.object({
    problema: z.string().min(5, 'Descreva o problema'),
    explicacao: z.string().min(5, 'Simplifique a explicação'),
});

type FormData = z.infer<typeof formSchema>;

export default function SustainableSolutions() {
    const { execute, isLoading, result, reset } = useAITool<SustainableSolutionsAnalysis>('sustainable-solutions');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        reset();
        execute(data);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-restarta-card rounded-xl border border-restarta-border shadow-lg shadow-restarta-teal/10">
                        <Leaf className="h-8 w-8 text-restarta-teal" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-teal to-restarta-gold">Soluções (S4)</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Transforme problemas em soluções sustentáveis através de simulação com IA.
                </p>
            </div>

            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-teal via-restarta-gold to-restarta-purple opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <Recycle className="h-5 w-5 text-restarta-gold" />
                        Definição do Problema
                    </CardTitle>
                    <CardDescription className="text-restarta-muted">
                        Descreva o desafio para gerar uma simulação sustentável.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="problema" className="text-restarta-text font-medium">Problema a resolver (S1)</Label>
                            <Textarea
                                id="problema"
                                placeholder="Ex: Desperdício de alimentos em restaurantes..."
                                {...register('problema')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal min-h-[100px]"
                                disabled={isLoading}
                            />
                            {errors.problema && <p className="text-sm text-red-400">{errors.problema.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="explicacao" className="text-restarta-text font-medium">Explicação simplificada (S2)</Label>
                            <Input
                                id="explicacao"
                                placeholder="Ex: Sistema que reaproveita sobras para adubo..."
                                {...register('explicacao')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                disabled={isLoading}
                            />
                            {errors.explicacao && <p className="text-sm text-red-400">{errors.explicacao.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-teal to-restarta-gold hover:from-restarta-teal/90 hover:to-restarta-gold/90 text-restarta-bg font-bold text-lg py-8 shadow-lg shadow-restarta-teal/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Recycle className="mr-2 h-6 w-6" />}
                            Gerar Simulação
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result?.success && result.data && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                    <Card className="bg-restarta-card border-restarta-border">
                        <CardHeader>
                            <CardTitle className="text-restarta-gold flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Simulação (S3)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white text-lg font-medium leading-relaxed">{result.data.simulacao_S3}</p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-restarta-bg border-restarta-border">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm uppercase text-restarta-muted font-bold tracking-wider">Benefícios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-restarta-text">
                                    {result.data.beneficios_previstos.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="bg-restarta-bg border-restarta-border">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm uppercase text-restarta-muted font-bold tracking-wider">Impacto Sustentável</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-restarta-text">
                                    {result.data.impactos_sustentaveis.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-l-4 border-l-restarta-teal bg-restarta-card border-y-0 border-r-0">
                        <CardHeader>
                            <CardTitle className="text-base text-restarta-teal">Melhorias para Sustentabilidade (S4)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-restarta-text leading-relaxed">{result.data.melhorias_S4}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
