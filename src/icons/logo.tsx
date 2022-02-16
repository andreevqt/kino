import React from 'react';
import { TIconProps } from '../types/common';

const Logo: React.FC<TIconProps> = ({
  width = '157',
  height = '21'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 157 21"
    fill="currentColor"
  >
    <path
      d="M54.188 17.6l-4.428-6.462L54.008 5h-3.276l-3.852 5.472V5H44v12.6h2.88v-5.832l4.032 5.832h3.276zM61.658 8.6l-3.852 4.5V8.6h-2.628v9h1.98l3.852-4.5v4.5h2.628v-9h-1.98zM71.379 8.6v3.24h-3.06V8.6h-2.7v9h2.7v-3.24h3.06v3.24h2.7v-9h-2.7zM80.38 17.852c2.646 0 4.77-2.07 4.77-4.752s-2.124-4.752-4.77-4.752c-2.646 0-4.77 2.07-4.77 4.752s2.124 4.752 4.77 4.752zm0-2.628c-1.17 0-2.07-.846-2.07-2.124s.9-2.124 2.07-2.124 2.07.846 2.07 2.124-.9 2.124-2.07 2.124zM91.538 5h-4.77v12.6h2.88v-3.96h1.89c2.484 0 4.41-1.926 4.41-4.32S94.022 5 91.538 5zm0 5.94h-1.89V7.7h1.89c.882 0 1.53.702 1.53 1.62 0 .918-.648 1.62-1.53 1.62zM99.162 14.18h6.39c.072-.342.108-.702.108-1.08 0-2.718-1.944-4.752-4.572-4.752-2.844 0-4.788 2.07-4.788 4.752s1.908 4.752 4.986 4.752c1.71 0 3.042-.63 3.924-1.854l-2.16-1.242c-.36.396-.99.684-1.728.684-.99 0-1.818-.324-2.16-1.26zm-.054-2.016c.252-.918.936-1.422 1.962-1.422.81 0 1.62.378 1.908 1.422h-3.87zM113.637 8.6v.846c-.594-.684-1.476-1.098-2.682-1.098-2.358 0-4.302 2.07-4.302 4.752s1.944 4.752 4.302 4.752c1.206 0 2.088-.414 2.682-1.098v.846h2.7v-9h-2.7zm-2.142 6.696c-1.242 0-2.142-.846-2.142-2.196s.9-2.196 2.142-2.196 2.142.846 2.142 2.196-.9 2.196-2.142 2.196zM126.958 17.6l-3.366-4.5 3.276-4.5h-3.15l-2.7 3.942V8.6h-2.7v9h2.7v-3.978l2.88 3.978h3.06zM136.051 15.08V8.6h-2.7v6.48h-2.7V8.6h-2.7v9h7.002v2.412h2.628V15.08h-1.53zM145.417 8.6l-3.852 4.5V8.6h-2.628v9h1.98l3.852-4.5v4.5h2.628v-9h-1.98zM156.849 8.6h-4.392c-2.178 0-3.348 1.62-3.348 3.204 0 1.116.63 2.268 1.746 2.826l-2.106 2.97h3.06l1.854-2.592h.558V17.6h2.628v-9zm-4.158 2.376h1.53v1.8h-1.53c-.576 0-.954-.324-.954-.882 0-.576.378-.918.954-.918zM27.5 13.109v4.116L25 16.058v-1.783l2.5-1.166zM30 9.333l-7.5 3.5V17.5L30 21V9.333zm-12.5 2.334v6.416c0 .322-.28.584-.625.584H5.625c-.345 0-.625-.262-.625-.584v-6.416a7.916 7.916 0 01-2.5-.409v7.409C2.5 19.955 3.62 21 5 21h12.5c1.38 0 2.5-1.045 2.5-2.333v-7.409a7.915 7.915 0 01-2.5.409zm0-9.334c1.379 0 2.5 1.047 2.5 2.334C20 5.954 18.879 7 17.5 7S15 5.954 15 4.667c0-1.287 1.121-2.334 2.5-2.334zm-12.5 0c1.379 0 2.5 1.047 2.5 2.334C7.5 5.954 6.379 7 5 7S2.5 5.954 2.5 4.667C2.5 3.38 3.621 2.333 5 2.333zM17.5 0c-2.761 0-5 2.09-5 4.667s2.239 4.666 5 4.666 5-2.09 5-4.666C22.5 2.09 20.261 0 17.5 0zM5 0C2.239 0 0 2.09 0 4.667s2.239 4.666 5 4.666 5-2.09 5-4.666C10 2.09 7.761 0 5 0z"
    ></path>
  </svg>
);

export default Logo;
