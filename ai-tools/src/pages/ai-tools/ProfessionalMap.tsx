import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Map, Navigation, Flag, Rocket } from 'lucide-react';
import type { ProfessionalMapAnalysis } from '@/types/aiToolTypes';

const formSchema = z.object({
    o_que_move: z.string().min(3),
    como_gera_valor: z.string().min(3),
    lacunas: z.string().min(3),
    novo_posicionamento: z.string().min(3),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfessionalMap() {
    const { execute, isLoading, result, reset } = useAITool<ProfessionalMapAnalysis>('professional-map');

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
                        <Map className="h-8 w-8 text-restarta-teal" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Mapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-teal to-restarta-purple">Profissional</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Alinhe propósito, estratégia e ações para sua carreira.
                </p>
            </div>

            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-teal via-restarta-purple to-restarta-gold opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <Navigation className="h-5 w-5 text-restarta-gold" />
                        Mapeamento
                    </CardTitle>
                    <div className="text-sm text-restarta-muted">
                        Preencha os dados para gerar seu mapa estratégico.
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-restarta-text font-medium">O que te move profissionalmente?</Label>
                                <Input
                                    {...register('o_que_move')}
                                    placeholder="Ex: Impactar via inovação"
                                    className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                />
                                {errors.o_que_move && <p className="text-sm text-red-400">Obrigatório</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-restarta-text font-medium">Como gera valor hoje?</Label>
                                <Input
                                    {...register('como_gera_valor')}
                                    placeholder="Ex: Lidero projetos..."
                                    className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                />
                                {errors.como_gera_valor && <p className="text-sm text-red-400">Obrigatório</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-restarta-text font-medium">Lacunas a superar?</Label>
                                <Input
                                    {...register('lacunas')}
                                    placeholder="Ex: Comunicação..."
                                    className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                />
                                {errors.lacunas && <p className="text-sm text-red-400">Obrigatório</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-restarta-text font-medium">Novo posicionamento desejado?</Label>
                                <Input
                                    {...register('novo_posicionamento')}
                                    placeholder="Ex: Referência em..."
                                    className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-teal h-12"
                                />
                                {errors.novo_posicionamento && <p className="text-sm text-red-400">Obrigatório</p>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-teal to-restarta-purple hover:from-restarta-teal/90 hover:to-restarta-purple/90 text-white font-bold text-lg py-8 shadow-lg shadow-restarta-teal/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Map className="mr-2 h-6 w-6" />}
                            Gerar Mapa
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result?.success && result.data && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-restarta-card border-restarta-border">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Flag className="w-5 h-5 text-restarta-gold" /> Propósito
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-restarta-muted">{result.data.proposito}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-restarta-card border-restarta-border">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Navigation className="w-5 h-5 text-restarta-teal" /> Estratégia
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-restarta-muted">{result.data.estrategia}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-restarta-card border-restarta-border border-l-4 border-l-restarta-purple">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-restarta-purple" /> Ações Prioritárias
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {result.data.acoes.map((acao, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-restarta-bg p-3 rounded-lg border border-restarta-border">
                                        <span className="font-bold text-restarta-purple">{i + 1}.</span>
                                        <span className="text-restarta-text">{acao}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-restarta-bg p-6 rounded-xl border border-restarta-border shadow-md">
                            <h4 className="text-sm uppercase font-bold text-restarta-muted mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-restarta-teal"></span> Curto Prazo
                            </h4>
                            <p className="text-white font-medium">{result.data.foco_curto_prazo}</p>
                        </div>
                        <div className="bg-restarta-bg p-6 rounded-xl border border-restarta-border shadow-md">
                            <h4 className="text-sm uppercase font-bold text-restarta-muted mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-restarta-purple"></span> Médio Prazo
                            </h4>
                            <p className="text-white font-medium">{result.data.foco_medio_prazo}</p>
                        </div>
                        <div className="bg-restarta-bg p-6 rounded-xl border border-restarta-border shadow-md">
                            <h4 className="text-sm uppercase font-bold text-restarta-muted mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-restarta-gold"></span> Longo Prazo
                            </h4>
                            <p className="text-white font-medium">{result.data.foco_longo_prazo}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-restarta-teal to-restarta-purple p-8 rounded-xl text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-2xl mb-4 text-white">Resumo Geral</h3>
                            <p className="opacity-90 leading-relaxed text-lg">{result.data.resumo_geral}</p>
                        </div>
                        <Map className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-10" />
                    </div>
                </div>
            )}
        </div>
    );
}
