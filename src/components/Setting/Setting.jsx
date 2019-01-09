import React, { Component } from 'react';
import auth from '../../services/authService';
import {
  SettingsPane,
  SettingsPage,
  SettingsContent,
  SettingsMenu
} from 'react-settings-pane';
import './Setting.css';

// const Profile = props => {
//   const user = auth.getCurrentUser();
//   return (
//     <div>
//       <h1>Profile : {user.name} </h1>
//       <ul>
//         <li>{user.name}</li>
//         <li>{user.email}</li>
//       </ul>
//     </div>
//   );
// };

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        'mysettings.general.name': '',
        'mysettings.general.lang': 'eng',
        'mysettings.general.avatar': ''
      }
    };
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
    this.setState({
      ...this.state,
      'mysettings.general.name': user.name,
      'mysettings.general.avatar': user.avatar
    });
  }

  // Render function of any of your components:
  render() {
    const user = auth.getCurrentUser();
    // You will maybe receive your settings from this.props or do a fetch request in your componentWillMount
    //let settings = settings;

    //But here is an example of how it should look like:
    let { settings } = this.state;
    // let settings = {
    //   'mysettings.general.name': user.name,
    //   'mysettings.general.color-theme': 'purple',
    //   'mysettings.general.email': 'dstuecken@react-settings-pane.com',
    //   'mysettings.general.picture': 'earth',
    //   'mysettings.profile.firstname': 'Dennis',
    //   'mysettings.profile.lastname': 'Stücken'
    // };

    // Define your menu
    const menu = [
      {
        title: 'General', // Title that is displayed as text in the menu
        url: '/settings/general' // Identifier (url-slug)
      }
    ];

    // Define one of your Settings pages
    const dynamicOptionsForProfilePage = [
      {
        key: 'mysettings.general.email',
        label: 'E-Mail address',
        type: 'text'
      },
      {
        key: 'mysettings.general.password',
        label: 'Password',
        type: 'password'
      }
    ];

    // Save settings after close
    const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
      // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

      if (wasSaved && newSettings !== oldSettings) {
        // do something with the settings, e.g. save via ajax.
      }
    };

    const settingsChanged = changedSettings => {
      // this is triggered onChange of the inputs
    };

    // Return your Settings Pane
    return (
      <SettingsPane
        items={menu}
        index="/settings/general"
        settings={settings}
        onPaneLeave={leavePaneHandler}
      >
        <SettingsMenu headline="General Settings" />
        <SettingsContent
          closeButtonClass="secondary"
          saveButtonClass="primary"
          header={true}
        >
          <SettingsPage handler="/settings/general">
            <fieldset className="form-group">
              <label for="profileName">Name: </label>
              <input
                type="text"
                className="form-control"
                name="mysettings.general.name"
                placeholder="Name"
                id="general.ame"
                onChange={settingsChanged}
                defaultValue={settings['mysettings.general.name']}
              />
              <label for="profileName">Avatar: </label>
              {this.state.avatar}
            </fieldset>
            <fieldset className="form-group">
              <label for="profileColor">Language :</label>
              <select
                name="mysettings.general.lang"
                id="settingLang"
                className="form-control"
                defaultValue={settings['mysettings.general.lang']}
              >
                <option value="eng">English</option>
                <option value="kor">Korean</option>
              </select>
            </fieldset>
          </SettingsPage>
          <SettingsPage
            handler="/settings/profile"
            options={dynamicOptionsForProfilePage}
          />
        </SettingsContent>
      </SettingsPane>
    );
  }
}

export default Setting;
