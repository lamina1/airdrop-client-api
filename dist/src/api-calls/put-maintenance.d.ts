export interface SetMaintenanceResponse {
    success: boolean;
    error?: string;
}
export declare function putMaintenance(apiKey: string, apiUrl: string, maintenance: boolean): Promise<SetMaintenanceResponse>;
