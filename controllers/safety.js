'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';

const safety = {
  createView(request, response) {

    const info = appStore.getAppInfo();
    logger.info('Safety tips page loading');

    response.render('safety', {
      title: `${info.appName} | Safety Tips`,
      id: 'safety',
      tips: [
        'Follow official evacuation alerts before local conditions worsen.',
        'Prepare a go-bag with mask, water, first aid, and flashlight.',
        'Avoid river valleys during heavy ashfall or lahars.',
        'Monitor local emergency channels and verified observatory updates.',
      ],
    });
  },
};

export default safety;
