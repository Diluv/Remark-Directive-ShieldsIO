const visit = require('unist-util-visit')

function shieldDirective() {

  return function transform(tree) {

    visit(tree, ['textDirective', 'leafDirective'], ondirective)
  }

  function ondirective(node) {

    console.log(JSON.stringify(node))

    if (node.name === 'shield') {

      var apiUrl = 'https://img.shields.io/' + (node.attributes.endpoint ? 'endpoint' : 'static/v1') + '?'
      var params = new URLSearchParams()

      // Text on the left side of the shield.
      addParam('label', node.attributes.label)

      // Color of the left side of the shield.
      addParam('labelColor', node.attributes.labelColor)

      // Text on the right side of the shield.
      addParam('message', node.attributes.message)

      // Color of the right side of the shield.
      addParam('color', node.attributes.color)

      // Sets the image style of the badge.
      addParam('style', node.attributes.style)

      // Handle logo properties of the shield.
      if (node.attributes.logo) {

        // Sets the image logo.
        addParam('logo', node.attributes.logo)

        // Sets the color of the logo.
        addParam('logoColor', node.attributes.logoColor)

        // Sets the horizontal space to give the logo in the shield.
        addParam('logoWidth', node.attributes.logoWidth)

        // Remove default label text if a logo is specified and a label is not.
        if (!node.attributes.label) {
          addParam('label', ' ')
        }
      }

      // Grabs shield info from a remote endpoint. Incompatible with dynamic.
      addParam('url', node.attributes.endpoint)

      var data = node.data || (node.data = {})
      var props = data.hProperties || (data.hProperties = {})
      var classes = props.className || (props.className = [])

      classes.push(node.type === 'textDirective' ? 'shield-inline' : node.type === 'leafDirective' ? 'shield-block' : 'shield')

      node.type = 'image'
      node.url = apiUrl + params.toString()
    }

    function addParam(paramName, value) {
      if (value) {
        params.append(paramName, value)
      }
    }
  }
}

export { shieldDirective }