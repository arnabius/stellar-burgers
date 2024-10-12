import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <NavLink
            to={{ pathname: `/` }}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 mr-10 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end
          >
            Конструктор
          </NavLink>
        </>
        <>
          <ListIcon type={'primary'} />
          <NavLink
            to={{ pathname: `/feed` }}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end
          >
            Лента заказов
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />

        <NavLink
          to={{ pathname: `/profile` }}
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${
              styles.link
            } ${isActive ? styles.link_active : ''}`
          }
          end
        >
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
//<p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
//<p className='text text_type_main-default ml-2'>Лента заказов</p>
//<Link to={{ pathname: `/` }} className='text text_type_main-default ml-2 mr-10'>Конструктор</Link>
//<Link to={{ pathname: `/feed` }} className='text text_type_main-default ml-2' >Лента заказов</Link>
//<Link to={{ pathname: `/profile` }} className='text text_type_main-default ml-2' >{userName || 'Личный кабинет'}</Link>
