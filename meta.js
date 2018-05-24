module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A React.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    }
  },
  "filters": {

  },
  "skipInterpolation": [
    "build/dll/*.js",
    "src/**/*.js"
  ],
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}yarn install\n  yarn start\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
