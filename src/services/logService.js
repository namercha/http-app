import Raven from 'raven-js';

function init() {
    Raven.config('https://<GET-FROM-SENTRY>.ingest.sentry.io/6206365', {
        release: '1-0-0',
        environment: 'development-test',
    }).install();
}

function log(error) {
    Raven.captureException(error);
}

export default {
    init,
    log,
};