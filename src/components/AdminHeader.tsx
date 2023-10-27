// Header.tsx
import React from 'react';
import '../assets/styles/style-components/Header.scss';

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className="header__inner">
            <img src='/admin/logo.svg' alt="logo" className='logo'/>
            <div className='user__container'>
                <img src="../admin/user.svg" alt="user" className='user__icon'/>
                <p className='user__name'>Admin</p>
            </div>
        </div>
      </div>
    </header>
  );
}
