'use client';
import React from "react";
import VisuallyHidden from '@/components/VisuallyHidden';
import Cookie from 'js-cookie';

import {Sun, Moon} from 'react-feather'

import {COLOR_THEME_COOKIE, LIGHT_TOKENS, DARK_TOKENS} from '@/constants'


function DarkLightToggle({initialTheme, ...delegated}) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() { 
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(nextTheme)

    Cookie.set(COLOR_THEME_COOKIE, nextTheme, {
      expires: 1000
    })

    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS

    root.setAttribute('data-color-theme', nextTheme)

    Object.entries(colors).forEach(([key, value]) => { 
      root.style.setProperty(key, value);
    })
  }

  return (
    <button 
      {...delegated}
      onClick={() => { 
        toggleTheme()
      }}  
    >
      {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem"/>}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
