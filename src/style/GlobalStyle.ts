import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`

:root {
  /*       [ color ]     */
  --black: #1D1F00;
  --light-gray: #e8e9e6;
  --dark-green: #41731D;
  --green: #79A938;
  --mid-green: #BCDD83;
  --light-green: #E2F0C9;
  --more-light-green: #F4F9E9;
  --red: #F06643;
  --dark-beige: #938570;
  --light-beige: #BDAC93;
  --light-yellow: #FFFAE0;
  --light-orange: #FFD443;
  --orange: #F2AE27;
  --light-blue: #71ABD2;
  --blue: #3C7DB6;
  --dark-blue: #2A5D93;


  /*       [ font-size ]     */
  --more-big: 28px;
  --big: 24px;
  --mid: 20px;
  --small: 16px;
  --more-small: 14px;
}

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul,li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
  }
`
