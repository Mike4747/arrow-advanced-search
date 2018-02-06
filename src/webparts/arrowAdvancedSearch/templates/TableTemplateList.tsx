import * as React from 'react';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Persona,
	PersonaSize,
	PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

import styles from '../components/SearchResults/SearchResults.module.scss';
import { IArrowSearchWebPartProps } from '../ArrowAdvancedSearchWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ContactCard } from '../components/ContactCard/ContactCard';

import * as moment from 'moment';

export interface ITableTemplateList extends IArrowSearchWebPartProps {
	context?: IWebPartContext;
	results: any[];
}

export default class TableTemplateList extends React.Component<ITableTemplateList, {}> {
	private iconUrl: string = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/16/";
	private unknown: string[] = ['aspx', 'null'];

	private getAuthorDisplayName(author: string): string {
		if (author !== null) {
			const splits: string[] = author.split('|');
			return splits[1].trim();
		} else {
			return "";
		}
	}
	private getAuthorLoginName(author: string): string {
		if (author !== null) {
			const splits: string[] = author.split('| ');
			const splits1: string[] = splits[splits.length-1].split(' ');
			return splits1[splits1.length-1].trim();
		} else {
			return "";
		}
	}

	private getDateFromString(retrievedDate: string): string {
		if (retrievedDate !== null) {
			return moment(retrievedDate).format('DD/MM/YYYY');
		} else {
			return "";
		}
	}

	public render(): JSX.Element {
		// Load the Office UI Fabrics components css file via the module loader
		// SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
		// "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-js/1.2.0/css/fabric.components.min.css
		// SPComponentLoader.loadCss('https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/2.6.3/css/fabric.components.min.css');
		// <table className={`ms-Table ${styles.templateTable}`}>
		// <td>{this.getAuthorDisplayName(result.EditorOWSUSER)}


		return (
			<div className={styles.SearchResults}>
				<div className={styles.templateList}>
				<span className={styles.headertext} >Search Results</span><hr className={styles.headerhr} />

				<ul>


					{
						this.props.results.map((result, index) => {
							return (<li  key={index}>
<a href={result.Path}><img  className={styles.templateListImg}  src={`${this.iconUrl}${result.Fileextension !== null && this.unknown.indexOf(result.Fileextension) === -1 ? result.Fileextension : 'code'}.png`} alt="File extension"/></a>

								  <a className={styles.templateListTitle}   href={result.ContentLinkOWSTEXT}>{result.Title}</a>
								  <div className={styles.templateListDescription} >{result.ContentDescriptionOWSTEXT} </div>


							<div> <a  className={styles.templateListUrl} href={result.ContentLinkOWSTEXT}>{result.ContentLinkOWSTEXT}</a></div></li>
						);

						})
					}</ul>
				</div>
			</div>
		);
	}
}