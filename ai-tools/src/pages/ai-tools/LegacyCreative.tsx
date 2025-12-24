import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAITool } from '@/hooks/useAITool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import type { LegacyCreativeAnalysis } from '@/types/aiToolTypes';

const formSchema = z.object({
    aprendizados: z.string().min(10, 'Descreva pelo menos 3 aprendizados (mínimo 10 caracteres)'),
    formato: z.string().min(3, 'Defina um formato (ex: eBook, Curso)'),
});

type FormData = z.infer<typeof formSchema>;

export default function LegacyCreative() {
    const { execute, isLoading, result, reset } = useAITool<LegacyCreativeAnalysis>('legacy-creative');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            aprendizados: '',
            formato: '',
        },
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
                        <BookOpen className="h-8 w-8 text-restarta-purple" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Legado <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-purple to-restarta-gold">Criativo</span>
                    </h1>
                </div>
                <p className="text-restarta-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    Estruture seus aprendizados para o futuro e deixe uma marca duradoura.
                </p>
            </div>

            <Card className="shadow-2xl border-restarta-border bg-restarta-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-restarta-purple via-restarta-teal to-restarta-gold opacity-50" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-xl">
                        <Sparkles className="h-5 w-5 text-restarta-gold" />
                        Defina seu Legado
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-restarta-text font-medium">3 aprendizados para a próxima geração</Label>
                            <Textarea
                                {...register('aprendizados')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-purple min-h-[100px]"
                                placeholder="Ex: A resiliência é mais importante que o talento..."
                            />
                            {errors.aprendizados && <p className="text-sm text-red-400">{errors.aprendizados.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-restarta-text font-medium">Formato desejado</Label>
                            <Input
                                {...register('formato')}
                                className="bg-restarta-bg border-restarta-border text-white placeholder:text-restarta-muted/50 focus-visible:ring-restarta-purple h-12"
                                placeholder="Ex: E-book, Podcast, Vídeo..."
                            />
                            {errors.formato && <p className="text-sm text-red-400">{errors.formato.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-restarta-purple to-restarta-teal hover:from-restarta-purple/90 hover:to-restarta-teal/90 text-white font-bold text-lg py-8 shadow-lg shadow-restarta-purple/20 transition-all hover:scale-[1.01]"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                            Gerar Legado
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result?.success && result.data && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                    <Card className="bg-restarta-card border-restarta-border">
                        <CardHeader>
                            <CardTitle className="text-restarta-gold flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" /> {result.data.titulo_conteudo}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 text-restarta-text">
                            <div>
                                <h3 className="font-bold text-restarta-teal mb-2">Ideia Central</h3>
                                <p className="text-restarta-muted">{result.data.ideia_central}</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-restarta-teal mb-2">Estrutura Sugerida</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-restarta-muted text-sm">
                                        {result.data.estrutura_sugerida.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-restarta-teal mb-2">Recursos</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-restarta-muted text-sm">
                                        {result.data.recursos_recomendados.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-restarta-bg p-4 rounded-lg border border-restarta-border">
                                <h3 className="font-bold text-white mb-2">Estratégia</h3>
                                <p className="text-restarta-muted text-sm">{result.data.estrategia_publicacao}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
