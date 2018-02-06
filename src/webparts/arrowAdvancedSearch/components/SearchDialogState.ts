export interface ISearchDialogState {
    /**
     * Search query.
     */
    loaded?: boolean;
    component?: any;
    template?: string;
    searchQuery?: string;
    results?: any[];
    query?: string;
    resultsVisible?: boolean;
    clearSearchbox?: number;
}