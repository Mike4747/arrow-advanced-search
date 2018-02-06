import * as React from 'react';
import { IArrowSearchWebPartProps } from '../ArrowAdvancedSearchWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

import {ISearchDialogProps} from './SearchDialogProps';
import {ISearchDialogState} from './SearchDialogState';

import  Searchbox  from './Searchbox/Searchbox';
// import { ISearchboxProps } from './SearchBox/SearchboxProps';
// import { ISearchboxState } from './SearchBox/SearchboxState';

import  SearchResults  from './SearchResults/SearchResults';
// import  {ISearchResultsProps}  from './SearchResults/SearchResultsProps';
// import  {ISearchResultsState}  from './SearchResults/SearchResultsState';

import searchActions from '../flux/actions/searchActions';
import searchStore from '../flux/stores/searchStore';

import { IExternalTemplate } from '../utils/ITemplates';
import TemplateLoader from '../templates/TemplateLoader';

/* export interface ISearchDialogProps extends IArrowSearchWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
	externalTemplate?: IExternalTemplate;
	parentCallback: any;
}

export interface ISearchState {
	results?: any[];
	loaded?: Boolean;
	component?: any;
	template?: string;
} */

export default class SearchDialog extends React.Component<ISearchDialogProps, ISearchDialogState> {
	private loader: TemplateLoader = new TemplateLoader();

	constructor(props: ISearchDialogProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			loaded: false,
			component: null,
			template: "",
			searchQuery: "",
			results: [],
			resultsVisible: false,
			clearSearchbox: 0
		};
		this._onChange = this._onChange.bind(this);
		this.onSeachResultsCloseClicked = this.onSeachResultsCloseClicked.bind(this);
	}

	public componentWillMount(): void {
		// Check if rendering is done from an external template
		if (typeof this.props.externalTemplate !== 'undefined') {
			// Loading internal template
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}
	}

    public componentDidMount(): void {
		searchStore.addChangeListener(this._onChange);
		// this._getResults(this.props);
    }

    public componentWillUnmount(): void {
        searchStore.removeChangeListener(this._onChange);
    }

	public componentWillReceiveProps(nextProps: ISearchDialogProps): void {
		// Get the new results
		// this._getResults(nextProps);
	}

	private _getResults(crntProps: ISearchDialogProps, searchQuery: string): void {
		if (typeof crntProps.externalTemplate !== 'undefined') {
			searchActions.get(crntProps.context, searchQuery, crntProps.query, crntProps.maxResults, crntProps.sorting,crntProps.refinementFilters,crntProps.externalTemplate.properties.mappings);
		} else {
			searchActions.get(crntProps.context, searchQuery, crntProps.query, crntProps.maxResults, crntProps.sorting, crntProps.refinementFilters, this.loader.getTemplateMappings(crntProps.template));
		}
	}

	private _onChange(): void {
		// Check if another template needs to be loaded
/* 		if (typeof this.props.externalTemplate === 'undefined' && this.state.template !== this.props.template) {
			this.loader.getComponent(this.props.template).then((component) => {
				var _results = searchStore.getSearchResults();
				this.setState({
					results: _results,
					template: this.props.template,
					component: component
				});
			});
		}
 */
		var _results = searchStore.getSearchResults();
        this.setState({
			results: _results,
			loaded: true,
			resultsVisible: true
        });
    }

	public onSeachboxChanged(newQuery) {
		this._getResults(this.props, newQuery);
			this.setState({
				searchQuery: newQuery
			});
  	}

    public onSeachResultsCloseClicked() {
		this.setState({
			searchQuery: "",
			resultsVisible: false
		});
		this.Searchbox.clearSearchbox();
  	}

	private Searchbox: any;

	public render(): JSX.Element {
		// console.log(`'SearchDialog.Render with resultsVisible: ${this.state.resultsVisible} '`);
	return (
		<div>
		{
			(() => {
				// Check if you need to show a title
				if (this.props.title !== "") {
					return <h1 className='ms-font-xxl'>{this.props.title}</h1>;
				}
			})()
		}
		<br />
		<Searchbox ref={element => this.Searchbox = element} searchTermChanged={(newTerm) => this.onSeachboxChanged(newTerm) }  />
		<SearchResults visible={this.state.resultsVisible} {...this.props} searchQuery={this.state.searchQuery} query={this.props.query} results={this.state.results}
		onClose={this.onSeachResultsCloseClicked} context={this.props.context}/>
		</div>
	);
	}
}
