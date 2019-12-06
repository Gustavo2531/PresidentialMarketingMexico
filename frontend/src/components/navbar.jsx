import React, { Component } from 'react';
import {withRouter} from 'react-router';

class NavbarComponent extends Component {

    isActive(pathname){
        if(this.props.location.pathname === pathname) {
            return "active"
        } else {
            return ""
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <header className="m-grid__item m-header">

                <div className="m-header__top">
                    <div className="m-container m-container--responsive m-container--xxl m-container--full-height m-page__container">
                        <div className="m-stack m-stack--ver m-stack--desktop">
                            <div className="m-stack__item m-brand">
                                <div className="m-stack m-stack--ver m-stack--general m-stack--inline">
                                    <div className="m-stack__item m-stack__item--middle m-brand__logo">
										<a href="/" className="m-brand__logo-wrapper">
											<img alt="" src="/images/logo.png"/>
										</a>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-header__bottom">
                    <div className="m-container m-container--responsive m-container--xxl m-container--full-height m-page__container">
                        <div className="m-stack m-stack--ver m-stack--desktop">
                            <div className="m-stack__item m-stack__item--middle m-stack__item--fluid">
                                <div className="m-stack__item m-stack__item--middle m-stack__item--fluid">
                                    <div id="m_header_menu" className="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-light m-aside-header-menu-mobile--submenu-skin-light ">

                                        <ul className="m-menu__nav  m-menu__nav--submenu-arrow ">
                                            <li className="m-menu__item  m-menu__item--active "  aria-haspopup="true">
                                                <a  href="/" className="m-menu__link ">
                                                    <span className="m-menu__item-here"/>
                                                    <span className="m-menu__link-text">
                                                        Inicio
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="m-menu__item"  aria-haspopup="true">
                                                <a  href="/candidatos" className="m-menu__link ">
                                                    <span className="m-menu__item-here"/>
                                                    <span className="m-menu__link-text">
                                                        Candidatos
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="m-menu__item"  aria-haspopup="true">
                                                <a  href="/comparar" className="m-menu__link ">
                                                    <span className="m-menu__item-here"/>
                                                    <span className="m-menu__link-text">
                                                        Comparar
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="m-menu__item"  aria-haspopup="true">
                                                <a  href="/debate" className="m-menu__link ">
                                                    <span className="m-menu__item-here"/>
                                                    <span className="m-menu__link-text">
                                                        Primer Debate Presidencial
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(NavbarComponent);
