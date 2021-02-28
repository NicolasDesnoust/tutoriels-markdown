import { HandledRoute, registerPlugin } from '@scullyio/scully';
import { RenderPlugin } from '@scullyio/scully/src/lib/pluginManagement/Plugin.interfaces';

/**
 * Nom du plugin
 */
export const THEME_APPLIER_NAME = 'theme-applier';

/**
 * Plugin Theme Applier
 *
 * Ce plugin extrait les informations du thème à partir du localStorage
 * pour l'appliquer au pré-rendu de l'application.
 * 
 * NB: L'application d'un thème consiste à placer la classe 
 * "<nom-du-theme>-theme" sur le tag <body>.
 */
const themeApplierPlugin: RenderPlugin = async (
  html: string,
  route: HandledRoute
) => {
  const regex = /(<body[^>]*>)/;

  return html.replace(
    regex,
    `$1<script>
          const theme = localStorage.getItem('theme');
    
          if (theme === 'light' || theme === 'dark') {
            const bodyClassList = document.querySelector('body').classList;
            const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
            if (removeClassList) {
              bodyClassList.remove(...removeClassList);
            }
            bodyClassList.add(theme + '-theme');
          }
        </script>`
  );
};

/**
 * Enregistrement du plugin.
 *
 * L'enregistrement sera effectif pour un projet lorsque ce fichier sera importé dans
 * le fichier de configuration Scully du projet (scully.<nom-du-projet>.config.ts).
 */
registerPlugin('render', THEME_APPLIER_NAME, themeApplierPlugin);
