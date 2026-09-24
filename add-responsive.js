const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\css\\style.css';
let css = fs.readFileSync(file, 'utf8');

const responsiveCss = `

/* =========================================================
   RESPONSIVE NAVBAR OVERRIDES 
   ========================================================= */
@media (max-width: 992px) {
  nav > div:first-child { padding: 0 20px !important; }
  .nav-center a { font-size: 2.6rem !important; }
  .nav-links { gap: 20px !important; }
}

@media (max-width: 768px) {
  nav { padding: 15px 0 10px 0 !important; }
  nav > div:first-child { padding: 0 15px !important; margin-bottom: 12px !important; }
  
  /* Logo */
  .nav-center { width: auto !important; flex: 1 !important; }
  .nav-center a { font-size: 2rem !important; letter-spacing: 0px !important; }
  
  /* Left/Right Container Spacing */
  .nav-left { width: auto !important; }
  .nav-right { width: auto !important; gap: 14px !important; }
  
  /* Icons Size */
  .nav-right a, .nav-right button, .nav-left button { font-size: 1.25rem !important; }
  
  /* Links */
  .nav-links { gap: 12px !important; font-size: 0.72rem !important; flex-wrap: wrap !important; }
}

@media (max-width: 480px) {
  nav > div:first-child { padding: 0 10px !important; }
  .nav-center a { font-size: 1.7rem !important; }
  .nav-links { gap: 8px !important; font-size: 0.65rem !important; }
  .nav-right { gap: 10px !important; }
  .nav-right a, .nav-right button, .nav-left button { font-size: 1.15rem !important; }
}
`;

if (!css.includes('RESPONSIVE NAVBAR OVERRIDES')) {
  fs.writeFileSync(file, css + responsiveCss);
  console.log('Appended responsive CSS');
} else {
  console.log('Already appended');
}
