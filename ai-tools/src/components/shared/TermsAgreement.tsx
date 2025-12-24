import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsAgreementProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    error?: string;
}

export const TermsAgreement = ({ checked, onCheckedChange, error }: TermsAgreementProps) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-restarta-bg/50 border border-restarta-border rounded-lg">
                <Checkbox
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    id="termsAccepted"
                    className="bg-white data-[state=checked]:bg-restarta-teal data-[state=checked]:text-white border-white/20 mt-1"
                />
                <div className="space-y-1 leading-none">
                    <Label
                        htmlFor="termsAccepted"
                        className="text-sm font-normal text-restarta-muted leading-relaxed block"
                    >
                        Concordo com os <a href="#" className="text-restarta-teal hover:text-restarta-teal/80 hover:underline transition-colors">Termos de Uso</a> e <a href="#" className="text-restarta-teal hover:text-restarta-teal/80 hover:underline transition-colors">Política de Privacidade</a>, e autorizo o processamento dos meus dados para gerar esta análise.
                    </Label>
                    {error && <p className="text-red-400 text-xs mt-2 font-medium bg-red-400/10 p-2 rounded">{error}</p>}
                </div>
            </div>
        </div>
    );
};
