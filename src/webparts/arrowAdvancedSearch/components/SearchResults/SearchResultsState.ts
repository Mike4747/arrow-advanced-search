export interface ISearchResultsState {
    /**
     * Search query.
     */
    searchQuery?: string;
    results?: any[];
	loaded?: Boolean;
	component?: any;
    template?: string;
}