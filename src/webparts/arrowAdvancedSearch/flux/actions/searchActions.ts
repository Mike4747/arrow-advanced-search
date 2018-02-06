import appDispatcher from '../dispatcher/appDispatcher';
import searchActionIDs from './searchActionIDs';
import {IWebPartContext} from '@microsoft/sp-webpart-base';

export class SearchActionsStatic {
	/**
	 * @param  {string} query
	 * @param  {string} fields
	 */
	public get(context: IWebPartContext,searchQuery: string, query: string, maxResults: number, sorting: string, refinementFilters: string, fields?: string): void {
		appDispatcher.dispatch({
			actionType: searchActionIDs.SEARCH_GET,
			context: context,
			searchQuery: searchQuery,
			query: query,
			maxResults: maxResults,
			sorting: sorting,
			refinementFilters: refinementFilters,
			fields: fields
		});
	}
}

const searchActions: SearchActionsStatic = new SearchActionsStatic();
export default searchActions;