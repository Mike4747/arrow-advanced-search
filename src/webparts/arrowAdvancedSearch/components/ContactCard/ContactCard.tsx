import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import  { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import styles from './ContactCard.module.scss';

interface IUserProfile {
    firstName: string;
    lastName: string;
    UserProfileProperties: Array<any>;
    Email: string;
    WorkPhone: string;
    DisplayName: string;
    Department: string;
    PictureURL: string;
    Title: string;
  }

interface IUserProfileService {
    getUserProfileProperties: Promise<IUserProfile>;
    webAbsoluteUrl: string;
    userLoginName: string;
    context: IWebPartContext;
  }
  
class UserProfileService {
  
    private context: IWebPartContext;
    private props: IUserProfileProps;
  
    constructor(_props: IUserProfileProps) {
      this.props = _props;
      this.context = _props.context;
    }
  
    public getUserProfileProperties(): Promise<IUserProfile> {
        const login: string = this.props.userLoginName; 
        console.log(login);
        return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor('${encodeURIComponent(login)}')`, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                  return response.json();
              });
        
      }
  }

export interface IUserProfileWebPartState {
  isResult?: boolean;
  firstName?: string;
  lastname?: string;
  userProfileProperties?: any[];
  isFirstName?: boolean;
  isLastName?: boolean;
  email?: string;
  isWorkPhone?: boolean;
  isDepartment?: boolean;
  displayName?: string;
  pictureUrl?: string;
  workPhone?: string;
  department?: string;
  isPictureUrl?: boolean;
  title?: string;
  office?: string;
  isOffice?: boolean;
}

export interface IUserProfileProps {
  description: string;
  userLoginName: string;
  context?: IWebPartContext;
}

export class ContactCard extends React.Component<IUserProfileProps, IUserProfileWebPartState> {
  private loading: boolean;

  constructor(props: IUserProfileProps) {
    super(props);
    this.loading=true;
    this.state = {
      isResult: false,
      firstName: "",
      lastname: "",
      userProfileProperties: [],
      isFirstName: false,
      isLastName: false,
      email: "",
      workPhone: "",
      department: "",
      pictureUrl: "",
      isPictureUrl: false,
      title: "",
      office: "",
      isOffice: false
    };
  }



  public render(): JSX.Element {
  
      if (!this.state.isResult) {
    return (<div>{this.state.displayName}</div>);
    } else {
    return (
      <div className={css(styles.ContactCard)}>
      <div className={css('ms-PersonaCard')}>
                <div className={css('ms-PersonaCard-persona')}>
                  <div className={css('ms-Persona ms-Persona--xl', styles.Persona)}>
                    <div className={css('ms-Persona-imageArea', styles.Persona)}>
                      <div className={css('ms-Persona-imageCircle')}>
                        <img className={css('ms-Persona-image')} src={this.state.pictureUrl}></img>&nbsp;&nbsp;
                      </div>
                     </div>
                    <div className={css(styles.personaDetails, 'ms-Persona-details' )}>
                      <div className={css('ms-Persona-primaryText')} title={this.state.displayName}>{this.state.displayName}</div>
                      <div className={css('ms-Persona-secondaryText')}>{this.state.title}</div>
                      <div className={css('ms-Persona-tertiaryText')}>{this.state.office}</div>
                      <ul className={css('PersonaActions')} >
                        <li id="chat" className={css(styles.PersonaAction,'PersonaAction is-active')}  >
                          <a className={css('ms-Link')} href={'sip:' + this.state.email}>
                            <i className={css('ms-Icon ms-Icon--Chat')}></i>
                          </a>
                        </li>
                        <li id="phone" className={css(styles.PersonaAction,'PersonaAction')}>
                          <a className={css('ms-Link')} href={'tel:' + this.state.workPhone}>
                            <i className={css('ms-Icon ms-Icon--Phone')}></i>
                          </a>
                        </li>
                        <li id="video" className={css(styles.PersonaAction,'PersonaAction')}>
                        <a className={css('ms-Link')} href={'ms-voip-video:' + this.state.email}>
                        <i className={css('ms-Icon ms-Icon--Video')}></i>
                        </a>
                        </li>
                        <li id="mail" className={css(styles.PersonaAction,'PersonaAction')}>
                        <a className={css('ms-Link')} href={'mailto:' + this.state.email}>
                          <i className={css('ms-Icon ms-Icon--Mail')}></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              </div>
    );
  }
}

  public componentDidMount(): void {
      this._getProperties();
    }


  public shouldComponentUpdate(nextProps, nextState): boolean {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return !this.loading;
  }

  private _getProperties(): void {
    
    const userProfileService: UserProfileService = new UserProfileService(this.props);

    userProfileService.getUserProfileProperties().then((response) => {
      if (response["@odata.null"] == true) {
        this.setState({ isResult: false});
      } else {
      this.setState({ isResult: true});
      this.setState({ userProfileProperties: response.UserProfileProperties });
      this.setState({ email: response.Email });
      this.setState({ displayName: response.DisplayName });
      this.setState({ title: response.Title });

      for (let i: number = 0; i < this.state.userProfileProperties.length; i++) {

        if (this.state.isFirstName == false || this.state.isLastName == false || this.state.isDepartment == false || this.state.isWorkPhone == false || this.state.isPictureUrl == false || this.state.isOffice == false) {

          if (this.state.userProfileProperties[i].Key == "FirstName") {
            this.setState({isFirstName: true, firstName: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "LastName") {
            this.setState({isLastName: true, lastname: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "WorkPhone") {
            this.setState({ isWorkPhone: true, workPhone: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "Department") {
            this.setState({isDepartment: true, department: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "Office") {
            this.setState({isOffice: true,  office: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "PictureURL") {
            this.setState({ isPictureUrl: true, pictureUrl: this.state.userProfileProperties[i].Value });
          }

        }

      }
    }
    this.loading=false;
    this.setState(this.state);
    });

  }
}

