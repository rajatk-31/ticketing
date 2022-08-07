const express = require("express");
const path = require('path');

const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, 'data.yaml'));

// Change API Version in Document
const package = require('../package.json');
swaggerDocument.info.version = package.version;

const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Shippigo API Documentation',
    customfavIcon: "/assets/favicon.ico"
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;