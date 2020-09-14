import React from 'react';

export const FacebookIcon = (): JSX.Element => {
  return (
    <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <mask id="a" fill="#fff">
          <path d="M13.416 20v-7.313h2.442l.376-2.843h-2.818V8.03c0-.406.086-.737.259-.992.172-.255.555-.383 1.15-.383h1.503v-2.53c-.125-.031-.391-.06-.798-.086A22.06 22.06 0 0 0 14.136 4c-.542 0-1.04.08-1.495.242a3.07 3.07 0 0 0-1.158.719 3.292 3.292 0 0 0-.744 1.172c-.177.463-.266 1.002-.266 1.617v2.094H8v2.844h2.473V20h2.943z" />
        </mask>
        <g fill="#4063B3" mask="url(#a)">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};
