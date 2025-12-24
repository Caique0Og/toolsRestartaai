import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    currentTool: string;
    onToolSelect: (tool: string) => void;
}

export function Layout({ children, currentTool, onToolSelect }: LayoutProps) {
    return (
        <div className="min-h-screen bg-restarta-bg text-restarta-text">
            <Sidebar currentTool={currentTool} onToolSelect={onToolSelect} />
            <main className="ml-64 p-8 min-h-screen">
                <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
