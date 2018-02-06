import * as React from 'react';
import { IArrowSearchWebPartProps } from '../../ArrowAdvancedSearchWebPartProps';
import {ISearchResultsProps} from './SearchResultsProps';
import {ISearchResultsState} from './SearchResultsState';


import { IWebPartContext } from '@microsoft/sp-webpart-base';

// import  Searchbox  from '../SearchBox/Searchbox';
// import { ISearchboxProps } from '../SearchBox/SearchboxProps';
// import { ISearchboxState } from '../SearchBox/SearchboxState';

import searchActions from '../../flux/actions/searchActions';
import searchStore from '../../flux/stores/searchStore';

import { IExternalTemplate } from '../../utils/ITemplates';

import TemplateLoader from '../../templates/TemplateLoader';

import styles from  './SearchResults.module.scss';

export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsState> {
	private loader: TemplateLoader = new TemplateLoader();
	private divStyle = {
		color: 'red',
		/*float: 'left',*/
		margin:'10px 0px 0px 0px'
	  };
	constructor(props: ISearchResultsProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			results: [],
			loaded: false,
			component: null,
			template: ""
			};
		this._onChange = this._onChange.bind(this);
		this._onCloseClick = this._onCloseClick.bind(this);
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
		} else {
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}
	}

    public componentDidMount(): void {
		// searchStore.addChangeListener(this._onChange);
		// this._getResults(this.props);
    }

    public componentWillUnmount(): void {
        // searchStore.removeChangeListener(this._onChange);
    }

	public componentWillReceiveProps(nextProps: ISearchResultsProps): void {
		// Get the new results
		// this._getResults(nextProps);
		this.setState({
			results: searchStore.getSearchResults(),
		   loaded: true
	   });
	}

	private _getResults(crntProps: ISearchResultsProps): void {
		if (typeof crntProps.externalTemplate !== 'undefined') {
			searchActions.get(crntProps.context, crntProps.searchQuery, crntProps.query, crntProps.maxResults, crntProps.sorting, crntProps.refinementFilters, crntProps.externalTemplate.properties.mappings);
		} else {
			searchActions.get(crntProps.context, crntProps.searchQuery, crntProps.query, crntProps.maxResults, crntProps.sorting, crntProps.refinementFilters, this.loader.getTemplateMappings(crntProps.template));
		}
	}

	private _onChange(): void {
		// Check if another template needs to be loaded
		if (typeof this.props.externalTemplate === 'undefined' && this.state.template !== this.props.template) {
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}

        this.setState({
		 	results: searchStore.getSearchResults(),
			loaded: true
        });
    }

	private _onCloseClick(): void {
		this.props.onClose();
	}

	public render(): JSX.Element {
		// console.log(`'SearchResults.Render with props.open: ${this.props.visible} '`);
		// this.state.visible=this.props.open
		// if (this.props.firstRender || this.state.loaded) {
			if (this.state.results.length === 0) {
				return (
					<div />
				);
			} else {
				// Load the template
				if (typeof this.props.externalTemplate !== 'undefined') {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.props.externalTemplate.component;
					/* tslint:disable:variable-name */
					return <CrntComponent {...this.props} results={this.state.results} context={this.props.context} />;
				}
				else {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.state.component;
					/* tslint:disable:variable-name */
				
					return (
						<div style={{display: this.props.visible ? 'block': 'none' }}>
						<div style={this.divStyle} onClick={this._onCloseClick}>
						<i onClick={this._onCloseClick} className="ms-fontSize-xl ms-Icon ms-Icon--BoxMultiplySolid x-hidden-focus" aria-hidden="true"></i>
						</div>
						<CrntComponent {...this.props} results={this.state.results} context={this.props.context} />
						</div>
						);
					}
			}
	}

	public renderold(): JSX.Element {
		// console.log(`'SearchResults.Render with props.open: ${this.props.visible} '`);
		// this.state.visible=this.props.open
		// if (this.props.firstRender || this.state.loaded) {
			if (this.state.results.length === 0) {
				return (
					<div />
				);
			} else {
				// Load the template
				if (typeof this.props.externalTemplate !== 'undefined') {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.props.externalTemplate.component;
					/* tslint:disable:variable-name */
					return <CrntComponent {...this.props} results={this.state.results} />;
				}
				else if (this.state.component !== null) {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.state.component;
					/* tslint:disable:variable-name */
				return (
					<div style={{display: this.props.visible ? 'block': 'none' }}>
					<div style={this.divStyle} onClick={this._onCloseClick}>
					<i onClick={this._onCloseClick} className="ms-fontSize-xl  ms-Icon ms-Icon--BoxMultiplySolid x-hidden-focus" aria-hidden="true"></i>
					</div>
					<CrntComponent {...this.props} results={this.state.results} />
					</div>
					);
				} else {
					return (<div />);
				}
			}
		// } else {
		// 	return (<div />);
		// }
	}
}

