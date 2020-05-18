import React from 'react';
import ReactDOM from 'react-dom';
import './AppDrawer.css';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default class AppDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    renderContent = () => {
        return (<div
          role="presentation"
          onClick={this.props.onDrawerToggle}
          onKeyDown={this.props.onDrawerToggle}
        >
          <List>
            {this.props.menuItemList.map((item, index) => (
              <ListItem button key={index} onClick={() => this.props.selectMenuItem(index)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      );
    }

    render() {
        return (
        	<Drawer anchor={"left"} open={this.props.open}>
                <div>
                    {this.renderContent()}
                </div>
	        </Drawer>           
        );
    }
}