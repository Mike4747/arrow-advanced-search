import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IExternalTemplate } from '../utils/ITemplates';

export interface ISearchDialogProps {
	title?: string;
	maxResults?: number;
	sorting?: string;
	refinementFilters?: string;
	results?: any[];
    context?: IWebPartContext;
	firstRender?: Boolean;
	externalTemplate?: IExternalTemplate;
	parentCallback?: any;
	template?: string;
	component?: any;
	searchQuery?: string;
	query?: string;
}
