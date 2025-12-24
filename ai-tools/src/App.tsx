import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import TrendImpactAnalysis from '@/pages/ai-tools/TrendImpactAnalysis'
import LegacyCreative from '@/pages/ai-tools/LegacyCreative'
import IntelligenceExtension from '@/pages/ai-tools/IntelligenceExtension'
import SustainableSolutions from '@/pages/ai-tools/SustainableSolutions'
import ReinventionManifesto from '@/pages/ai-tools/ReinventionManifesto'
import ProfessionalMap from '@/pages/ai-tools/ProfessionalMap'
import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

function App() {
  const [currentTool, setCurrentTool] = useState<string>('home')

  const renderContent = () => {
    switch (currentTool) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="w-24 h-24 bg-restarta-card border border-restarta-border rounded-3xl flex items-center justify-center text-restarta-teal mb-6 shadow-2xl shadow-restarta-teal/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-restarta-teal/20 to-transparent" />
              <Lightbulb className="w-12 h-12 relative z-10" />
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-restarta-teal via-restarta-purple to-restarta-gold">RESTARTA AI.VC</span>
              </h1>
              <p className="text-xl text-restarta-muted leading-relaxed">
                Sua plataforma de inovação e transformação assistida por Inteligência Artificial.
                Selecione uma ferramenta para começar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-6xl text-left px-4">
              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-teal/50" onClick={() => setCurrentTool('trend')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-teal to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-teal transition-colors">Análise de Tendências</h3>
                  <p className="text-restarta-muted text-sm">Descubra impactos de tendências emergentes e prepare-se.</p>
                </CardContent>
              </Card>

              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-gold/50" onClick={() => setCurrentTool('legacy')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-gold to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-gold transition-colors">Legado Criativo</h3>
                  <p className="text-restarta-muted text-sm">Estruture seus aprendizados para deixar sua marca.</p>
                </CardContent>
              </Card>

              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-purple/50" onClick={() => setCurrentTool('intelligence')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-purple to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-purple transition-colors">Extensão da Inteligência</h3>
                  <p className="text-restarta-muted text-sm">Amplifique suas habilidades humanas com IA.</p>
                </CardContent>
              </Card>

              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-teal/50" onClick={() => setCurrentTool('sustainable')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-teal to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-teal transition-colors">Soluções Sustentáveis</h3>
                  <p className="text-restarta-muted text-sm">Simule soluções de impacto com o framework S4.</p>
                </CardContent>
              </Card>

              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-gold/50" onClick={() => setCurrentTool('manifesto')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-gold to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-gold transition-colors">Manifesto de Reinvenção</h3>
                  <p className="text-restarta-muted text-sm">Defina sua nova direção profissional e pessoal.</p>
                </CardContent>
              </Card>

              <Card className="group hover:scale-[1.02] transition-all cursor-pointer bg-restarta-card border-restarta-border hover:border-restarta-purple/50" onClick={() => setCurrentTool('career')}>
                <div className="h-1 w-full bg-gradient-to-r from-restarta-purple to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-restarta-purple transition-colors">Mapa Profissional</h3>
                  <p className="text-restarta-muted text-sm">Alinhe propósito e estratégia de carreira.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'trend':
        return <TrendImpactAnalysis />;
      case 'legacy':
        return <LegacyCreative />;
      case 'intelligence':
        return <IntelligenceExtension />;
      case 'sustainable':
        return <SustainableSolutions />;
      case 'manifesto':
        return <ReinventionManifesto />;
      case 'career':
        return <ProfessionalMap />;
      default:
        return <TrendImpactAnalysis />;
    }
  };

  return (
    <Layout currentTool={currentTool} onToolSelect={setCurrentTool}>
      {renderContent()}
    </Layout>
  )
}

export default App
