import { useMutation } from '@tanstack/react-query';
import { aiToolsApi } from '@/services/aiToolsApi';
import type { ToolExecutionResponse } from '@/types/aiToolTypes';

/**
 * Hook para executar AI Tools
 */
export function useAITool<TOutput = any>(toolName: string) {
    const mutation = useMutation<
        ToolExecutionResponse<TOutput>,
        Error,
        Record<string, any>
    >({
        mutationFn: (inputs: Record<string, any>) =>
            aiToolsApi.executeTool<TOutput>(toolName, inputs),
        onSuccess: (data) => {
            console.log('Tool executed successfully:', data);
        },
        onError: (error) => {
            console.error('Tool execution failed:', error);
        },
    });

    return {
        execute: mutation.mutate,
        executeAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        result: mutation.data,
        error: mutation.error,
        reset: mutation.reset,
    };
}
