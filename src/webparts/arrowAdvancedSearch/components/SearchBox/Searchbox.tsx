import * as React from 'react';
import styles from './Searchbox.module.scss';
import { ISearchboxProps } from './SearchboxProps';
import { ISearchboxState } from './SearchboxState';

import { Button } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// import { escape } from '@microsoft/sp-lodash-subset';

// import searchActions from '../../flux/actions/searchActions';
// import searchStore from '../../flux/stores/searchStore';

declare const window: any;

export default class Searchbox extends React.Component<ISearchboxProps, ISearchboxState> {

public ResultsPageUri: string;

constructor(props: ISearchboxProps) {
  super(props);

  this.state = {
    searchQuery: ""
  } as ISearchboxState;
}

private input: any;
public clearSearchbox() {
  //this.state.searchQuery="";
}

  public render(): React.ReactElement<ISearchboxProps> {
    // console.log(`'Searchbox.Render, searchQuery=${this.state.searchQuery}'`);
    var searchboxStyle = {
      "display": "block"
    };
    // style={searchboxStyle

    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm8 ms-md9 ms-lg10" style={searchboxStyle}>
            <SearchBox
              ref={
                input => this.input = SearchBox
              }
              onChange={this._handleInputChange.bind(this)}
              onSearch={this._handleSearch.bind(this)}>
              

            </SearchBox>
          </div>
          <div className="ms-Grid-col ms-sm4 ms-md3 ms-lg2">
            <Button id="SearchButton" onClick={this._handleSearch.bind(this)}>
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Search button event handler.
   * @param event
   */
private _handleSearch(event : any) : void {
  // this.state.searchQuery holds for now the Query
  const newState = this.state.searchQuery;
//  if (!(newState == '')) {
    this.setState({searchQuery: newState}); // we update our state
    this.props.searchTermChanged(newState); // we notify our parent
 // }
}

private _handleSearchClear(event : any) : void {
  // this.state.searchQuery holds for now the Query
  const newState = this.state.searchQuery;
    this.props.searchTermChanged(""); // we notify our parent
}

/**
   * Search input handler.
   * @param searchQuery
   */
  private _handleInputChange(searchQuery: string): void {

    this.setState((prevState: ISearchboxState, props: ISearchboxProps): ISearchboxState => {
      prevState.searchQuery = searchQuery;
      if (searchQuery.length == 0) {
        this.props.searchTermChanged(""); // we notify our parent
      }
      return prevState;
    });
  }
}
