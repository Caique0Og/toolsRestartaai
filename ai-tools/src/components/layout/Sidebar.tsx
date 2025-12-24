import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    TrendingUp,
    BookOpen,
    Brain,
    Leaf,
    Compass,
    Map,
    Home,
    Lightbulb
} from "lucide-react";

interface SidebarProps {
    currentTool: string;
    onToolSelect: (tool: string) => void;
}

export function Sidebar({ currentTool, onToolSelect }: SidebarProps) {
    const tools = [
        { id: 'trend', label: 'Análise de Tendências', icon: TrendingUp },
        { id: 'legacy', label: 'Legado Criativo', icon: BookOpen },
        { id: 'intelligence', label: 'Extensão da Inteligência', icon: Brain },
        { id: 'sustainable', label: 'Soluções Sustentáveis', icon: Leaf },
        { id: 'manifesto', label: 'Manifesto de Reinvenção', icon: Compass },
        { id: 'career', label: 'Mapa Profissional', icon: Map },
    ];

    return (
        <div className="w-64 h-screen bg-restarta-bg border-r border-restarta-border flex flex-col fixed left-0 top-0 overflow-y-auto">
            {/* Logo Area */}
            <div className="p-6 border-b border-restarta-border">
                <div className="flex items-center gap-2 font-bold text-xl text-restarta-text">
                    <div className="w-8 h-8 bg-gradient-to-br from-restarta-teal to-restarta-purple rounded-lg flex items-center justify-center text-white">
                        <Lightbulb className="w-5 h-5" />
                    </div>
                    <span className="tracking-tight">RESTARTAI.VC</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6">
                <div>
                    <h2 className="px-4 text-xs font-semibold text-restarta-muted uppercase tracking-wider mb-2">
                        Home
                    </h2>
                    <Button
                        variant={currentTool === 'home' ? 'secondary' : 'ghost'}
                        className={cn(
                            "w-full justify-start gap-3 transition-all duration-200",
                            currentTool === 'home'
                                ? "bg-restarta-teal/10 text-restarta-teal hover:bg-restarta-teal/20"
                                : "text-restarta-muted hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => onToolSelect('home')}
                    >
                        <Home className="w-4 h-4" />
                        Início
                    </Button>
                </div>

                <div>
                    <h2 className="px-4 text-xs font-semibold text-restarta-muted uppercase tracking-wider mb-2">
                        Ferramentas AI
                    </h2>
                    <div className="space-y-1">
                        {tools.map((tool) => (
                            <Button
                                key={tool.id}
                                variant={currentTool === tool.id ? 'secondary' : 'ghost'}
                                className={cn(
                                    "w-full justify-start gap-3 transition-all duration-200",
                                    currentTool === tool.id
                                        ? "bg-restarta-teal/10 text-restarta-teal hover:bg-restarta-teal/20"
                                        : "text-restarta-muted hover:text-white hover:bg-white/5"
                                )}
                                onClick={() => onToolSelect(tool.id)}
                            >
                                <tool.icon className="w-4 h-4" />
                                {tool.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer User Profile (Mock) */}
            <div className="p-4 border-t border-restarta-border">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-restarta-card border border-restarta-border flex items-center justify-center text-restarta-teal font-bold text-sm">
                        U
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-restarta-text truncate">Usuário</p>
                        <p className="text-xs text-restarta-muted truncate">Free Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
