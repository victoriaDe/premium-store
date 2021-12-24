import '@scripts/elements';
import '@scripts/tree';

import '@scss/main.scss';

import storeInit from '@scripts/init/store';
import { reloadPageSameLink } from '@scripts/listeners';

//console.log("main init")
storeInit();
reloadPageSameLink();

