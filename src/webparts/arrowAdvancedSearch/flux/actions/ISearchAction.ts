import {IWebPartContext} from '@microsoft/sp-webpart-base';
export interface ISearchAction {
    actionType: Number;
    context?: IWebPartContext;
    searchQuery?: string;
    query?: string;
    maxResults?: number;
    sorting?: string;
    refinementFilters?: string;
    fields?: string;
}