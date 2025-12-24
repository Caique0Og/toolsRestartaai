import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Compass, ScrollText, PenTool } from 'lucide-react';
import type { ReinventionManifestoAnalysis } from '@/types/aiToolTypes';

const formSchema = z.object({
    continuar: z.string().min(5, 'Defina o que quer manter'),
    parar: z.string().min(5, 'Defina o que precisa parar'),
});

type FormData = z.infer<typeof formSchema>;

export default function ReinventionManifesto() {
    const { execute, isLoading, result, reset } = useAITool<ReinventionManifestoAnalysis>('reinvention-manifesto');

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
                        <Compass className="h-8 w-8 text-restarta-purple" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Manifesto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-purple to-restarta-gold">Reinvenção</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Crie um guia inspirador para sua próxima versão, definindo o que fica e o que vai.
                </p>
            </div>

            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-purple via-restarta-gold to-restarta-teal opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <PenTool className="h-5 w-5 text-restarta-gold" />
                        Nova Direção
                    </CardTitle>
                    <div className="text-sm text-restarta-muted">
                        Defina suas escolhas conscientes para moldar seu manifesto pessoal.
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="continuar" className="text-restarta-text font-medium">O que continuar fazendo (de um novo jeito)?</Label>
                            <Input
                                id="continuar"
                                placeholder="Ex: Liderar, mas com mais empatia..."
                                {...register('continuar')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-purple h-12"
                                disabled={isLoading}
                            />
                            {errors.continuar && <p className="text-sm text-red-400">{errors.continuar.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="parar" className="text-restarta-text font-medium">O que parar de fazer (para evoluir)?</Label>
                            <Input
                                id="parar"
                                placeholder="Ex: Tentar agradar a todos..."
                                {...register('parar')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-purple h-12"
                                disabled={isLoading}
                            />
                            {errors.parar && <p className="text-sm text-red-400">{errors.parar.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-purple to-restarta-gold hover:from-restarta-purple/90 hover:to-restarta-gold/90 text-white font-bold text-lg py-8 shadow-lg shadow-restarta-purple/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <ScrollText className="mr-2 h-6 w-6" />}
                            Gerar Manifesto
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result?.success && result.data && (
                <div className="animate-in fade-in zoom-in-95 duration-700">
                    <Card className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-none relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-restarta-purple to-restarta-gold" />
                        <div className="absolute bottom-0 right-0 p-8 opacity-5">
                            <Compass className="w-64 h-64 text-slate-900" />
                        </div>

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">{result.data.titulo}</h2>
                            <p className="text-2xl text-restarta-purple italic font-serif leading-relaxed">"{result.data.frase_abertura}"</p>
                        </div>

                        <div className="prose prose-lg mx-auto text-slate-700 leading-relaxed mb-12 text-center relative z-10 font-serif">
                            {result.data.manifesto}
                        </div>

                        <div className="bg-restarta-bg p-8 rounded-xl text-center border border-restarta-border relative z-10">
                            <h3 className="text-restarta-gold font-bold text-xl mb-3 tracking-wide uppercase">Chamada para Ação</h3>
                            <p className="text-white text-lg font-medium">{result.data.chamada_acao}</p>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
