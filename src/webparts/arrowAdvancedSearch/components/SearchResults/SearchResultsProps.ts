import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IExternalTemplate } from '../../utils/ITemplates';
export interface ISearchResultsProps {
    context?: IWebPartContext;
	firstRender?: Boolean;
	externalTemplate?: IExternalTemplate;
    parentCallback?: any;
    template?: string;
    results?: any[];
    searchQuery?: string;
    query?: string;
    maxResults?: number;
    sorting?: string;
    refinementFilters?: string;
    onClose: Function;
    visible: boolean;
}
