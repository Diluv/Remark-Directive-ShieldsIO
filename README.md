# Remark Directive ShieldsIO
A [Remark Directive](https://github.com/remarkjs/remark-directive) plugin that adds support for creating shields and badges using [ShieldsIO](https://shields.io/).

## Installation

```
npm install remark-directive-shieldsio
```

## Usage
To use this plugin simply import it and pass it into remark or any other valid unified plugin chain.

```js
import remark from 'remark'
import directives from 'remark-directive'
import shields from 'remark-directive-shieldsio'

remark.use(directives).use(shields).process('::shield{label=hello message=world}')
```

With the above code, the HTML output would be as follows.

```html
<img src="https://img.shields.io/static/v1?label=hello&message=world" class="shield-block">
```

This plugin also introduces several classes which require additional CSS for features like inline and block shields to work. These classes are `shield-block` and `shield-inline`. These can be styled however you wish, but the following is the default recommended styling.

```css
.shield-inline {
    display: inline;
}

.shield-block {
    display: block;
}
```

## Justification
While the majority of these features can be achieved using the standard image element there are several scenarios where this plugin is beneficial. 

1. You wish to disable the standard image element while still allowing shields to be used.
2. Your users would benefit from being able to use shields as both inline and block elements.
3. Your users would benefit from ease of use features such as easy shields with no label text.

## Formatting Guide
Shields are created using the directive syntax which looks like `::shield{label=Hello message=World}`. Each part of this string controls an aspect of the shield.
- `::` - This specifies the type of shield. One colon will create an inline shield which can be placed on the same line as text and other elements. Two colons will create a block shield that will go on a different line.
- `shield` - This is the keyword. This tells the markdown renderer that you're creating a shield.
- `{label=Hello message=World}` - These are the properties for the shield and control things like text and color. They are defined using `property=value` and are separated using spaces. If the value contains a space it should be wrapped in quotes. `property="The Value"`.

### Properties
The following table contains all valid properties for this plugin. The only required property is `message` however `label` or `logo` are strongly recommended.

| Property   | Description                                                                                                                                                             | Example                                                                       | Output                                                                                                      |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| label      | The text on the left side of the shield.                                                                                                                                | `::shield{label=Hello message=World}`                                         | ![](https://img.shields.io/static/v1?label=Hello&message=World)                                             |
| labelColor | The background color of the label. Can be hex or a common CSS name.                                                                                                     | `::shield{label=Hello labelColor=red}`                                        | ![](https://img.shields.io/static/v1?label=Hello&message=World&color=red)                                   |
| message    | The text on the right side of the shield.                                                                                                                               | `::shield{label=Hello message=World}`                                         | ![](https://img.shields.io/static/v1?label=Hello&message=World)                                             |
| color      | The background color of the message. Can be hex or a common CSS name.                                                                                                   | `::shield{label=Hello message=World color=blue}`                              | ![](https://img.shields.io/static/v1?label=Hello&message=World&color=blue)                                  |
| style      | Changes how the shield is rendered. Accepts plastic, flat, flat-square, for-the-badge, and social.                                                                      | `::shield{label=Hello message=World style=social}`                            | ![](https://img.shields.io/static/v1?label=Hello&message=World&style=social)                                |
| logo       | Adds a logo to the left side of the shield. Can be a base64 encoded image or a [Simple Icons Slug](https://github.com/simple-icons/simple-icons/blob/develop/slugs.md). | `::shield{label=Hello message=World logo=github}`                             | ![](https://img.shields.io/static/v1?label=Hello&message=World&logo=github)                                 |
| logoColor  | Changes the color of the logo. Can be hex or a common CCS name.                                                                                                         | `::shield{label=Hello message=World logo=github color=green}`                 | ![](https://img.shields.io/static/v1?label=Hello&message=World&logo=github&logoColor=green)                 |
| logoWidth  | The horizontal space to give the logo within the shield.                                                                                                                | `::shield{label=Hello message=World logo=github logoWidth=100}`               | ![](https://img.shields.io/static/v1?label=Hello&message=World&logo=github&logoWidth=100)                   |
| url        | Grabs shield data from an online resource or endpoint.                                                                                                                  | `::shield{endpoint=https://darkhax.net/assets/shields_endpoint_example.json}` | ![](https://img.shields.io/endpoint?url=https%3A%2F%2Fdarkhax.net%2Fassets%2Fshields_endpoint_example.json) |

### Inline vs Block
Shields defined with a single colon will become inline shields. These are shields that can be placed inside paragraphs or on the same line as other elements. Bold text, emoji, and hyperlinks are all examples of inline elements. For example, the markdown text `This :shield{label=shield message="is inline"} and is placed within the surrounding text.` will look like this.

![]()

```html
<p>This <img src="https://img.shields.io/static/v1?label=shield&message=is+inline" class="shield-inline"> and is placed within the surrounding text.</p>
```
