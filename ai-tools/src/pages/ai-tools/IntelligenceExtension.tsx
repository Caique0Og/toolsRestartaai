import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Brain, Sparkles, Target } from 'lucide-react';
import type { IntelligenceExtensionAnalysis } from '@/types/aiToolTypes';

const formSchema = z.object({
    habilidade_principal: z.string().min(2, 'Obrigatório'),
    objetivo_amplificacao: z.string().min(5, 'Obrigatório'),
});

type FormData = z.infer<typeof formSchema>;

export default function IntelligenceExtension() {
    const { execute, isLoading, result, reset } = useAITool<IntelligenceExtensionAnalysis>('intelligence-extension');

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
                        <Brain className="h-8 w-8 text-restarta-teal" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Extensão da <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-teal to-restarta-purple">Inteligência</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Descubra como a IA pode amplificar seu potencial combinando suas habilidades humanas.
                </p>
            </div>

            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-teal via-restarta-purple to-restarta-gold opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <Sparkles className="h-5 w-5 text-restarta-gold" />
                        Seus Dados
                    </CardTitle>
                    <CardDescription className="text-restarta-muted">
                        Compartilhe suas skills e objetivos para análise.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="habilidades" className="text-restarta-text font-medium">3 habilidades humanas que te definem</Label>
                            <Input
                                id="habilidades"
                                placeholder="Ex: empatia, narrativa, estratégia"
                                {...register('habilidade_principal')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                disabled={isLoading}
                            />
                            {errors.habilidade_principal && <p className="text-sm text-red-400">{errors.habilidade_principal.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="objetivo" className="text-restarta-text font-medium">Principal objetivo profissional</Label>
                            <Textarea
                                id="objetivo"
                                placeholder="Ex: aumentar visibilidade do projeto, migrar de carreira..."
                                {...register('objetivo_amplificacao')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal min-h-[100px]"
                                disabled={isLoading}
                            />
                            {errors.objetivo_amplificacao && <p className="text-sm text-red-400">{errors.objetivo_amplificacao.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-teal to-restarta-purple hover:from-restarta-teal/90 hover:to-restarta-purple/90 text-white font-bold text-lg py-8 shadow-lg shadow-restarta-teal/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                            Gerar Análise
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result?.success && result.data && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                    <Card className="bg-restarta-card border-restarta-border relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-24 h-24 text-restarta-gold" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-restarta-gold flex items-center gap-2">
                                <Target className="w-5 h-5" /> Resumo Estratégico
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="text-lg text-white font-medium italic border-l-4 border-restarta-teal pl-4 py-2 bg-restarta-bg/30 rounded-r-lg">
                                "{result.data.resumo_geral}"
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h4 className="text-restarta-purple font-bold flex items-center gap-2"><Brain className="w-4 h-4" /> Sua Base</h4>
                                    <p className="text-restarta-muted text-sm leading-relaxed">{result.data.analise_habilidades}</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-restarta-teal font-bold flex items-center gap-2"><Sparkles className="w-4 h-4" /> Potencial IA</h4>
                                    <p className="text-restarta-muted text-sm leading-relaxed">{result.data.como_a_ia_pode_ajudar}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-4">Ideias Aplicáveis</h4>
                                <div className="grid gap-3">
                                    {result.data.ideias_aplicaveis.map((idea, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-restarta-bg p-4 rounded-lg border border-restarta-border">
                                            <span className="bg-restarta-teal/20 text-restarta-teal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span className="text-restarta-text text-sm">{idea}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
