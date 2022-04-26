import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import RLogo from "../Icons/RLogo.js";
import cn from "classnames";

const Sidebar = (props) => {

  const {
    activeItem = '',
    ...restProps
  } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])

  return (
    <nav className={cn(s.root, {[s.sidebarOpen]: burgerSidebarOpen})} >
      <header className={s.logo}>
        <RLogo/>
        <span className={s.title}>Martel System</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="ToDo"
          isHeader
          iconName={<i className={'eva eva-cube-outline'}/>}
          link="/app/todo"
          index="todo"
          childrenLinks={[
            {
              header: 'Follow Ups', link: '/app/todo/followups',
            },
            {
              header: 'Messages', link: '/app/todo/messages',
            }
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Rentals"
          isHeader
          iconName={<i className={'eva eva-home-outline'}/>}
          link="/app/rentals"
          index="rentals"
          childrenLinks={[
            {
              header: 'Search', link: '/app/rentals/search',
            },
            {
              header: 'Results', link: '/app/rentals/results',
            },
            {
              header: 'Settings', link: '/app/rentals/settings',
            }
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Purchase"
          isHeader
          iconName={<i className={'eva eva-cube-outline'}/>}
          link="/app/purchase"
          index="purchase"
          childrenLinks={[
            {
              header: 'Search', link: '/app/purchase/search',
            },
            {
              header: 'Results', link: '/app/purchase/results',
            }
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Properties"
          isHeader
          iconName={<i className={'eva eva-cube-outline'}/>}
          link="/app/properties"
          index="properties"
        />
      </ul>
    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
